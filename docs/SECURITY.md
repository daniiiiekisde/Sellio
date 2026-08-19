# SELLIO — Seguridad, Privacidad y RLS (SECURITY.md)

## 1. Modelo de Seguridad y Control de Acceso
Sellio implementa un modelo de aislamiento multi-tenant mediante Row Level Security (RLS) en PostgreSQL/Supabase.

## 2. Reglas de Aislamiento Críticas
- **Aislamiento de Empresas:** La Empresa A no puede leer ni modificar ventas, acuerdos, productos ni mensajes privados de la Empresa B.
- **Aislamiento de Comerciales:** El Comercial A no puede acceder a las comisiones privadas, ventas ni datos de contacto del Comercial B.
- **Protección de Datos Privados:** Los datos identificativos del comercial (DNI/NIE, teléfono real, dirección) residen en `seller_private_data` con acceso denegado por defecto hasta que exista un acuerdo activo o revelación consentida (`contacts.is_revealed = true`).
- **Inmutabilidad Financiera:** Las empresas y comerciales tienen permiso de solo lectura (`SELECT`) sobre ventas históricas confirmadas y registros de comisiones. La mutación de estado económico solo se efectúa mediante RPC autorizadas.
- **Blindaje del Límite de Sellio:** Restricción de base de datos (`CHECK (sellio_rate <= 5.0)`) para asegurar que la tasa de Sellio nunca supere el 5%.

## 3. Registro de Auditoría (`audit_logs`)
Operaciones críticas que generan auditoría obligatoria:
- Modificación de acuerdos comerciales (`agreement_modified`).
- Confirmación y anulación de ventas (`sale_confirmed`, `sale_cancelled`).
- Aprobación y liquidación de comisiones (`commission_approved`, `commission_paid`).
- Revelación de identidad de comercial (`identity_revealed`).
- Apertura o resolución de disputas (`dispute_resolved`).
