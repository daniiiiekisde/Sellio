# SELLIO — Modelo de Datos y Base de Datos (DATABASE.md)

## 1. Fuentes de Verdad
| Entidad | Tabla / Origen | Responsabilidad |
|---|---|---|
| Usuario | `auth.users` | Identidad, autenticación y credenciales |
| Perfil General | `profiles` | Rol de usuario (`company`, `seller`, `admin`) y metadata |
| Perfil de Empresa | `company_profiles` | Datos públicos y de empresa (CIF, sector, razón social) |
| Perfil Comercial | `seller_profiles` | Datos profesionales públicos (handle anónimo, sectores, regiones) |
| Datos Privados Comercial | `seller_private_data` | DNI/NIE, teléfono privado, dirección y datos fiscales |
| Producto | `products` | Catálogo de productos y precios base de empresas |
| Oportunidad | `opportunities` | Ofertas de captación de comerciales y condiciones |
| Solicitud / Interés | `requests` | Postulaciones de comerciales o invitaciones |
| Contacto | `contacts` | Registro de relación y estado de revelación de identidad |
| Mensajería | `conversations`, `messages` | Hilos de chat y mensajes entre partes |
| Acuerdo | `agreements` | Contrato / condiciones acordadas entre empresa y comercial |
| Venta | `sales` | Registro de transacciones comerciales |
| Snapshot de Venta | `sales_snapshots` | Snapshot JSON inmutable de las condiciones al confirmar la venta |
| Liquidación / Comisiones | `commission_transactions` / `commission_ledger` | Registro de importes a liquidar al comercial y fee de Sellio |
| Notificaciones | `notifications` | Notificaciones en tiempo real para usuarios |
| Auditoría | `audit_logs` | Registro inmutable de eventos sensibles |

## 2. Inmutabilidad de Ventas y Comisiones
Una vez que una venta pasa a estado `confirmed`, se crea un registro asociado en `sales_snapshots` y `commission_transactions`. Ningún cambio posterior en el catálogo o en la oportunidad puede alterar retrospectivamente el cálculo de esa venta.

## 3. Idempotencia
Las operaciones de inserción de transacciones de comisión y confirmación de ventas deben utilizar identificadores únicos (`deal_id`, `sale_id`, o `idempotency_key`) para evitar duplicaciones en caso de reintentos de red.
