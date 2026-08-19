# SELLIO — Autenticación y Gestión de Perfiles (AUTH.md)

## 1. Flujo de Autenticación
Sellio utiliza Supabase Auth (`auth.users`) respaldado por un trigger automático para la creación de perfiles base en la tabla `profiles`.

## 2. Roles del Sistema
- `company`: Empresa fabricante o distribuidora que publica oportunidades y gestiona acuerdos.
- `seller`: Comercial independiente o agente multicartera que comercializa productos y genera comisiones.
- `admin`: Superadministrador de Sellio para supervisión, auditoría y resolución de disputas.

## 3. Manejo de Sesión en Frontend
- El hook `useAuth()` (`src/hooks/useAuth.js`) provee el estado reactivo del usuario y su perfil.
- Si Supabase no está configurado o en modo offline/demo, `authService` mantiene una sesión local persistente en memoria/storage para desarrollo ágil.
