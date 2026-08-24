
README - Función editarGasto()

¿QUÉ PROBLEMA RESUELVE ESTA FUNCIÓN?
=======================================

La función editarGasto() permite modificar el valor de un gasto ya registrado en la tabla sin necesidad de eliminar la fila y volver a crearla.

Por ejemplo:

| Gasto | Detalle  | Valor |
| ----- | -------- | ----- |
| 1     | Almuerzo | 100   |
| 2     | Taxi     | 200   |

Total gastos: 300

Si el usuario desea cambiar el valor del Taxi de 200 a 300, la función editarGasto() permite realizar ese cambio y actualizar automáticamente el total acumulado.

CONCEPTO PRINCIPAL
==================

La función trabaja con dos estados:

1. Editar
2. Guardar

El estado actual depende del texto que tenga el botón.

Ejemplo:

<button>Editar</button>

o

<button>Guardar</button>

La función pregunta:

    if(botonEditarGasto.textContent === 'Editar')

Es decir:

    ¿El botón está en modo Editar?

Si la respuesta es Sí, prepara la fila para ser modificada.

Si la respuesta es No, guarda los cambios realizados.

PRIMER CLIC - MODO EDITAR
=========================

Cuando el botón dice:

    Editar

la función realiza los siguientes pasos.

PASO 1 - Obtener el valor actual
--------------------------------

Obtiene el valor que actualmente tiene el gasto.

Ejemplo:

    Taxi = 200

Código:

    valorAnteriorGasto =
    Number(filaGasto.children[2].textContent);

Resultado:

    valorAnteriorGasto = 200

PASO 2 - Guardar el valor original
----------------------------------

El valor se almacena temporalmente dentro de la fila.

Código:

    filaGasto.dataset.valorAnteriorGasto =
    valorAnteriorGasto;

Piensa en esto como una nota adhesiva.

Antes:

    Taxi = 200

Después:

    Taxi = 200
    Valor original guardado = 200

La razón de almacenar este valor es que más adelante será necesario para recalcular correctamente los totales.

PASO 3 - Buscar la celda del valor
----------------------------------

La función localiza la celda donde aparece el monto del gasto.

Visualmente:

    | Taxi | 200 |

Obtiene la celda que contiene:

    200

PASO 4 - Crear un input
-----------------------

Crea un campo de entrada dinámicamente.

Antes:

    200

Después:

    

PASO 5 - Reemplazar el texto por el input
-----------------------------------------

La celda deja de mostrar texto y comienza a mostrar un campo editable.

Antes:

    | Taxi | 200 |

Después:

    | Taxi | [200] |

Ahora el usuario puede escribir otro valor.

PASO 6 - Cambiar el botón
--------------------------

El botón cambia de:

    Editar

a:

    Guardar

Visualmente queda:

    | Taxi | [200] | Guardar |

EL USUARIO MODIFICA EL VALOR
============================

Por ejemplo:

Antes:

    200

Después:

    300

SEGUNDO CLIC - MODO GUARDAR
===========================

Ahora el botón muestra:

    Guardar

Por lo tanto, la función entra al bloque else.

PASO 1 - Recuperar el valor original
------------------------------------

Recupera el valor que fue guardado anteriormente.

Código:

    const valorAnteriorGasto =
    Number(filaGasto.dataset.valorAnteriorGasto);

Resultado:

    200

PASO 2 - Obtener el nuevo valor
-------------------------------

Obtiene el valor escrito por el usuario.

Código:

    const valorNuevoGasto =
    Number(inputTotalGasto.value);

Resultado:

    300

En este momento la función ya tiene dos datos importantes:

    Valor anterior = 200

    Valor nuevo = 300

PASO 3 - Eliminar el input
--------------------------

El campo editable desaparece y vuelve a mostrarse texto normal.

Antes:

    [300]

Después:

    300

La tabla vuelve a su apariencia original.

PASO 4 - Actualizar el acumulado
--------------------------------

Supongamos que existe este escenario:

    Almuerzo = 100
    Taxi = 200

    Total = 300

Ahora el usuario cambia Taxi a:

    300

La función debe recalcular el total.

Por eso ejecuta:

    gastosAcumulados =
    gastosAcumulados
    - valorAnteriorGasto
    + valorNuevoGasto;

Lo que equivale a:

    300 - 200 + 300

Resultado:

    400

PASO 5 - Actualizar el resumen
------------------------------

Se ejecuta:

    actualizarResumen();

Esto actualiza los valores mostrados en pantalla.

Antes:

    Total gastos: $300

Después:

    Total gastos: $400

PASO 6 - Regresar a modo Editar
-------------------------------

Finalmente el botón vuelve a su estado inicial.

Antes:

    Guardar

Después:

    Editar

La fila queda lista para futuras modificaciones.

¿POR QUÉ EXISTE dataset.valorAnteriorGasto?
=============================================

Esta es la parte más importante de toda la función.

Cuando el usuario cambia un valor, el sistema necesita saber:

1. Cuánto valía antes.
2. Cuánto vale ahora.

Sin el valor anterior no sería posible actualizar correctamente el total acumulado.

Por ejemplo:

Total actual:

    1000

Gasto original:

    200

Nuevo gasto:

    300

La operación correcta es:

    1000 - 200 + 300

Resultado:

    1100

Por eso se guarda temporalmente el valor original usando:

    filaGasto.dataset.valorAnteriorGasto

FLUJO COMPLETO
==============

Click en Editar
      ↓
Guardar valor original
      ↓
Convertir celda en input
      ↓
Cambiar botón a Guardar
      ↓
Usuario modifica el valor
      ↓
Click en Guardar
      ↓
Obtener valor nuevo
      ↓
Actualizar acumulado
      ↓
Actualizar resumen
      ↓
Regresar botón a Editar

RESUMEN FINAL
=============

La función editarGasto() permite:

- Editar el valor de un gasto existente.
- Recordar el valor original.
- Mostrar un campo editable temporalmente.
- Guardar el nuevo valor.
- Recalcular automáticamente el total acumulado.
- Actualizar el resumen en pantalla.
- Volver al estado inicial para futuras modificaciones.

La idea más importante de toda la función es:

    "Guardar el valor anterior para poder restarlo
    del acumulado y reemplazarlo por el nuevo valor."
# app-caja-menor
