const { cert, getApps, initializeApp } = require('firebase-admin/app');
const { FieldValue, getFirestore } = require('firebase-admin/firestore');

function obtenerFirestore() {
    if (!getApps().length) {
        const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
        initializeApp({
            credential: cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey
            })
        });
    }

    return getFirestore();
}

function configurarRespuesta(res) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
}

function responderError(res, estado, mensaje) {
    configurarRespuesta(res);
    res.status(estado).json({ error: mensaje });
}

function transformarCierre(documento) {
    const datos = documento.data();
    return {
        id: documento.id,
        ...datos.datos,
        createdAt: datos.createdAt?.toDate?.().toISOString() || null
    };
}

module.exports = async function handler(req, res) {
    try {
        const firestore = obtenerFirestore();
        const cierres = firestore.collection('cierres');
        const id = typeof req.query?.id === 'string' ? req.query.id : '';

        if (req.method === 'GET') {
            const consulta = await cierres.orderBy('createdAt', 'desc').get();
            return res.status(200).json(consulta.docs.map(transformarCierre));
        }

        if (req.method === 'POST' || req.method === 'PUT') {
            const cierre = req.body;
            if (!cierre || typeof cierre !== 'object') {
                return responderError(res, 400, 'El cierre enviado no es válido.');
            }

            const datos = { ...cierre };
            delete datos.id;
            delete datos.createdAt;

            if (req.method === 'POST') {
                const documento = await cierres.add({
                    datos,
                    createdAt: FieldValue.serverTimestamp()
                });
                return res.status(201).json(transformarCierre(await documento.get()));
            }

            if (!id) {
                return responderError(res, 400, 'Falta el id del cierre que se quiere actualizar.');
            }

            const documento = cierres.doc(id);
            const existente = await documento.get();
            if (!existente.exists) {
                return responderError(res, 404, 'No se encontró el cierre.');
            }

            await documento.update({ datos });
            return res.status(200).json(transformarCierre(await documento.get()));
        }

        if (req.method === 'DELETE') {
            if (!id) {
                return responderError(res, 400, 'Falta el id del cierre que se quiere eliminar.');
            }

            const documento = cierres.doc(id);
            if (!(await documento.get()).exists) {
                return responderError(res, 404, 'No se encontró el cierre.');
            }

            await documento.delete();
            return res.status(204).end();
        }

        res.setHeader('Allow', 'GET, POST, PUT, DELETE');
        return responderError(res, 405, 'Método no permitido.');
    } catch (error) {
        console.error(error);
        return responderError(res, 500, error.message || 'Error interno del servidor.');
    }
};
