# CORLIMA — Checkout Dev

Repositorio de **desarrollo** para trabajar la experiencia de compra de
[corlima.pe](https://www.corlima.pe) (PrestaShop 1.7, tema `childtheme` sobre
`classic`). El objetivo es **reducir el abandono de carrito** que se produce
cuando el usuario percibe que necesita crear una cuenta para terminar la compra.

> Este repo NO es el sitio de producción. Es una copia del front renderizado
> de cada vista del flujo de compra, capturada para analizar y prototipar
> mejoras sin tocar el PrestaShop de Corlima.

## Qué contiene

```
capturas/
  01-home/index.html            Portada (curl, HTML de servidor)
  02-categoria/bar.html         Listado de categoria /categoria/1000/bar
  03-producto/producto.html     Ficha de producto (KitchenAid Artisan 4.7L)
  04-carrito/carrito.html       Pagina de carrito /carrito (con 2 articulos)
  05-checkout/pedido.html       Checkout /pedido, paso 1 (puerta de cuenta)
  05-checkout/pedido-invitado.html  Checkout paso 1 con el formulario de invitado abierto
assets/
  css/  js/                     CSS y JS principales del tema y modulos
docs/
  FLUJO.md                      Recorrido paso a paso del comprador
  RECOMENDACIONES.md            Propuestas para bajar el abandono
  img/                          Capturas de pantalla de cada vista
```

## Cómo se capturó

- **Páginas públicas** (home, categoría, producto): `curl` con user-agent de
  navegador. Es el HTML tal cual lo entrega el servidor.
- **Páginas con sesión** (carrito, checkout): descargadas desde el navegador
  real (la sesión ya tenía un carrito con 2 artículos), porque dependen de la
  cookie de sesión de PrestaShop.

## Datos personales (PII)

La sesión de captura pertenecía a una cuenta real de Corlima, así que **todas
las capturas fueron saneadas** antes de guardarse:

- Correos electrónicos reemplazados por `cliente@ejemplo.com`.
- Valores de inputs (nombre, apellidos, DNI, contraseña) vaciados.
- Tokens CSRF / `token=` de sesión reemplazados por `REMOVED`.

Auditado: no quedan correos de cliente, ni nombres, ni tokens de sesión.
Aun así, el repo es **privado**.

## Hallazgo principal

El checkout de Corlima **ya permite comprar como invitado** (existe el enlace
"Comprar como invitado sin registrarte" en el paso 1). El problema no es que
falte la función, sino que esa opción está **poco visible**: la pantalla la
dominan "Iniciar sesión" y "Crear cuenta", y el acceso de invitado es un enlace
pequeño en medio. Ver `docs/FLUJO.md` y `docs/RECOMENDACIONES.md`.

## Ver las capturas

Son archivos HTML sueltos; las rutas de CSS/JS apuntan al dominio de producción,
así que para verlas con estilos hace falta conexión (cargan los assets desde
corlima.pe). Ábrelas en el navegador directamente.
