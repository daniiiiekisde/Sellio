# SELLIO — Contrato de Servicios y API (API.md)

## 1. Capa de Servicios Frontend
Todos los accesos al backend se encapsulan a través de la capa `src/services/`.

### Servicios Principales
- `commissionService`: Liquidaciones, resúmenes agregados para empresa/comercial, snapshots y ledger.
- `salesService`: Creación y confirmación de ventas con congelación de snapshot inmutable y cambio de estado validado.
- `agreementsService`: Creación, consulta y actualización de contratos/acuerdos.
- `opportunitiesService`: Publicación, filtrado y postulación a oportunidades.
- `productsService`: Gestión de catálogo de productos.
- `messagesService`: Mensajería en tiempo real y canales de conversación.
- `verificationService`: Verificación de identidad y control documental.
- `auditService`: Registro de trazas de auditoría para operaciones sensibles.

## 2. Manejo de Errores Estandarizado
Los servicios canalizan todas las excepciones a través de `normalizeError()` (`src/utils/errorHandler.js`), ocultando detalles SQL o de infraestructura y entregando mensajes accionables para la interfaz de usuario.
