# Recomendaciones para reducir el abandono de carrito

Contexto: el checkout de Corlima **ya tiene compra como invitado**, pero está
escondida detrás de "iniciar sesión / crear cuenta". Ordenadas de mayor impacto
y menor esfuerzo a mayor esfuerzo.

## 1. Poner "Comprar como invitado" como opción principal  (impacto alto / riesgo bajo)
Hoy es un enlace de texto pequeño. Propuesta:

- Convertirlo en el **bloque primario** del paso 1, arriba y con botón grande.
- Reordenar: primero "Comprar como invitado", debajo/al lado "¿Ya tienes cuenta?
  Inicia sesión" como opción secundaria.
- Mensaje claro: "No necesitas crear una cuenta para comprar".

Dónde: plantilla del paso de Datos Personales, en el módulo `digitag_registerhook`
(y/o `prestaclhook`). Es un cambio de maquetación/copy, no de lógica.

## 2. Revisar el ajuste nativo de PrestaShop  (verificación, 1 minuto)
Back-office → **Parámetros de la tienda → Clientes**:

- "Permitir pedidos de invitado" debe estar en **Sí** (parece que ya lo está,
  porque el enlace existe).
- Si se quiere aún menos fricción, evaluar el **checkout de una página** nativo
  y qué campos son realmente obligatorios.

## 3. Reducir campos obligatorios del formulario de invitado  (impacto medio)
El formulario pide Nombre, Apellidos, **DNI** y Correo. Evaluar:

- ¿El DNI es imprescindible en este punto o se puede pedir más adelante (en
  facturación)? Cada campo obligatorio extra baja la conversión.
- El toggle "Cliente Hogar / Cliente Empresa" podría venir preseleccionado en
  "Hogar" (mayoría de compradores) para no añadir una decisión.

## 4. Ofrecer "crear cuenta al final"  (impacto medio)
Patrón recomendado: dejar comprar como invitado y, **en la pantalla de
confirmación**, ofrecer "Guarda tus datos para la próxima vez" (crear contraseña
con el correo ya ingresado). Se capturan cuentas sin bloquear la venta.

## 5. Señales de confianza y continuidad en el checkout  (impacto medio)
- Mostrar el resumen del carrito y el envío "Gratis" desde el primer paso (ya
  aparece a la derecha; mantenerlo visible).
- Íconos de pago seguro y política de cambios cerca del botón de pago.
- Botón de checkout persistente desde el carrito (ya existe "Pasar por caja").

## 6. Medición  (para saber si funciona)
Enganchar con el trabajo de analítica pendiente de Corlima: medir
`begin_checkout` → `add_shipping_info` → `add_payment_info` → `purchase` en GA4
para ver en qué paso se cae la gente antes y después del cambio. (Ojo: la
medición de Google de Corlima hoy está rota; ver notas del proyecto.)

---

### Orden sugerido de ejecución
1. Verificar ajuste de invitado en back-office (punto 2).
2. Rediseñar el paso 1 para priorizar invitado (punto 1).
3. Recortar campos del formulario de invitado (punto 3).
4. Crear-cuenta-al-final (punto 4).
5. Confianza + medición (puntos 5 y 6).

Todo esto es **front / configuración**; no toca catálogo, precios ni pagos.
