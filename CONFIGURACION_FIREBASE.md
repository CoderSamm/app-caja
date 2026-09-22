# Configuracion de Firebase y Vercel

## 1. Crear Firestore

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
2. Abre **Firestore Database** y crea la base de datos en modo produccion.
3. En **Project settings > Service accounts**, selecciona **Generate new private key**.
4. Del archivo JSON descargado copia estos valores:
   - `project_id`
   - `client_email`
   - `private_key`

## 2. Configurar Vercel

En **Settings > Environment Variables** agrega estas variables para `Production` (y `Preview` si tambien pruebas previews):

```text
FIREBASE_PROJECT_ID=tu-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...@tu-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n
```

Conserva los `\\n` dentro de `FIREBASE_PRIVATE_KEY`; la API los convierte en saltos de linea. Esta clave es privada y nunca debe aparecer en los archivos del navegador.

Despues de guardar las variables, haz un nuevo deploy. La aplicacion usara `/api/cierres` para listar, crear, actualizar y eliminar documentos de la coleccion `cierres`.

## 3. Probar

1. Abre la URL desplegada y guarda un cierre.
2. Abre `historial.html` desde otro navegador o dispositivo.
3. El mismo cierre debe aparecer porque ahora se lee desde Firestore.

Los cierres antiguos que solo existian en el `localStorage` de un navegador no se migran automaticamente.
