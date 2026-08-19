# SELLIO — ARCHITECTURE V1 CLEANUP

## Documento maestro de consolidación técnica del MVP

**Estado:** Pendiente de ejecución / arquitectura objetivo  
**Objetivo:** llevar la base técnica de Sellio de una arquitectura funcional a una arquitectura sólida, coherente, segura y mantenible antes de acelerar el desarrollo de funcionalidades.

---

# 1. Objetivo

Sellio ya dispone de una base funcional de producto, modelo de negocio, Supabase, RLS, sistema de oportunidades y modelo de comisiones.

El siguiente paso no es añadir funcionalidades indiscriminadamente.

El siguiente paso es **consolidar la arquitectura**.

Objetivo:

```text
BASE ACTUAL
   ↓
AUDITORÍA
   ↓
UNIFICACIÓN
   ↓
SEGURIDAD
   ↓
TESTS
   ↓
ESTRUCTURA FRONTEND
   ↓
DOCUMENTACIÓN
   ↓
MVP ESTABLE
```

La meta es que el proyecto pueda crecer sin convertirse en un conjunto de componentes, consultas y reglas duplicadas difíciles de mantener.

---

# 2. Resultado esperado

Al terminar esta fase Sellio debe tener:

- Una única fuente de verdad para cada entidad.
- Un único motor de comisiones.
- Un flujo de negocio claramente definido.
- RLS revisado tabla por tabla.
- Privacidad del comercial correctamente separada.
- Estados centralizados.
- Validaciones centralizadas.
- Servicios Supabase aislados de la UI.
- Tests para la lógica crítica.
- Migraciones versionadas y coherentes.
- Documentación técnica actualizada.
- Estructura frontend preparada para crecer.

---

# 3. Flujo principal del dominio

Este es el flujo central que debe gobernar la arquitectura:

```text
COMPANY
   ↓
PRODUCT
   ↓
OPPORTUNITY
   ↓
REQUEST
   ↓
CONTACT
   ↓
AGREEMENT
   ↓
SALE
   ↓
COMMISSION
   ↓
PAYMENT / PAYOUT
```

No se deben crear flujos paralelos que contradigan este modelo.

---

# 4. Fuente de verdad de cada entidad

Debe existir una única fuente de verdad para:

| Entidad | Fuente de verdad |
|---|---|
| Usuario | `auth.users` |
| Perfil | `profiles` |
| Empresa | `company_profiles` |
| Comercial | `seller_profiles` + datos privados separados |
| Producto | `products` |
| Oportunidad | `opportunities` |
| Solicitud | sistema de requests existente |
| Contacto | `contacts` |
| Conversación | `conversations` |
| Mensaje | `messages` |
| Acuerdo | `agreements` |
| Venta | `sales` |
| Comisión | sistema de comisiones consolidado |
| Notificación | `notifications` |
| Verificación | `verification_events` |
| Auditoría | `audit_logs` |

Antes de añadir nuevas tablas se debe comprobar si la entidad ya existe.

---

# 5. Consolidación de comisiones

Esta es una de las partes más importantes de la arquitectura.

Sellio tiene dos conceptos económicos independientes:

```text
SALE
 ├── COMMERCIAL COMMISSION
 │       ↓
 │   SELLER
 │
 └── SELLIO FEE
         ↓
       SELLIO
```

## Reglas

1. La comisión del comercial pertenece íntegramente al comercial.
2. Sellio no descuenta su comisión de la comisión del comercial.
3. La empresa paga la comisión de Sellio aparte.
4. La comisión de Sellio no puede superar el 5 %.
5. Las condiciones aplicadas a una venta confirmada son inmutables.
6. El cálculo definitivo debe producirse en backend.
7. El frontend solo debe mostrar una simulación o resultado proporcionado por el backend.

---

# 6. Commission Engine único

Debe existir una única autoridad para calcular:

- Comisión comercial.
- Comisión Sellio.
- Comisión Sellio máxima.
- Tramos de volumen.
- Redondeos.
- Importe neto de empresa.
- Snapshot económico.

Arquitectura:

```text
UI
 ↓
Hook
 ↓
Commission Service
 ↓
RPC / Edge Function
 ↓
Commission Engine
 ↓
Resultado
```

No duplicar fórmulas de comisión en componentes diferentes.

---

# 7. Casos de prueba del Commission Engine

Debe cubrir como mínimo:

```text
100 € × 2 % Sellio
100 € × 5 % Sellio
100 € × 7 % → 5 % máximo
100 € × 15 % comercial + 2 % Sellio
0 €
1 €
10.000 €
Cambio de tramo
Comisión fija
Comisión porcentual
Redondeos
```

Ejemplo esperado:

```text
Venta:              100 €
Comercial:           15 €
Sellio:               2 €
Empresa:             83 €
```

---

# 8. Modelo histórico financiero

Una venta confirmada debe congelar sus condiciones.

Guardar:

- Producto.
- Empresa.
- Comercial.
- Oportunidad.
- Versión de oferta.
- Precio.
- Moneda.
- Comisión comercial.
- Comisión Sellio.
- Tramo aplicado.
- Fecha.

Nunca recalcular una venta histórica usando las condiciones actuales de una oferta.

---

# 9. Idempotencia

Las operaciones críticas deben ser idempotentes.

Especialmente:

- Crear venta.
- Confirmar venta.
- Crear comisión.
- Aprobar comisión.
- Registrar pago.
- Registrar reembolso.
- Procesar webhook.

Utilizar cuando corresponda:

```text
idempotency_key
external_reference
unique constraints
```

Si una operación se ejecuta dos veces accidentalmente, no debe generar dos ventas ni dos pagos.

---

# 10. Máquina de estados

Centralizar todos los estados.

Crear una fuente única para:

```text
OPPORTUNITY_STATUS
REQUEST_STATUS
CONTACT_STATUS
AGREEMENT_STATUS
SALE_STATUS
COMMISSION_STATUS
DISPUTE_STATUS
VERIFICATION_STATUS
```

Además de definir estados, definir transiciones válidas.

Ejemplo:

```text
sale_pending
    ↓
sale_confirmed
    ↓
commission_pending
    ↓
commission_approved
    ↓
commission_paid
```

No permitir saltos arbitrarios desde el frontend.

---

# 11. Seguridad y RLS

Auditar tabla por tabla.

Checklist:

```text
profiles                 [ ]
company_profiles         [ ]
seller_profiles          [ ]
seller_private_data      [ ]
products                 [ ]
opportunities            [ ]
requests                 [ ]
contacts                 [ ]
conversations            [ ]
messages                 [ ]
agreements               [ ]
sales                    [ ]
commissions              [ ]
notifications            [ ]
verification_events      [ ]
audit_logs               [ ]
```

Reglas fundamentales:

- Empresa A no puede leer recursos privados de Empresa B.
- Comercial A no puede leer datos privados de Comercial B.
- Un comercial no puede modificar una venta ajena.
- Una empresa no puede modificar una comisión histórica.
- Un usuario no puede escalar su rol desde el cliente.
- Los documentos privados no pueden ser públicos.
- La identidad legal del comercial no debe formar parte de las consultas públicas.

---

# 12. Privacidad del comercial

Separar claramente:

```text
SELLER PROFILE PÚBLICO
        +
SELLER PRIVATE DATA
```

Información pública/profesional:

- Handle.
- Sectores.
- Regiones.
- Idiomas.
- Experiencia.
- Disponibilidad.
- Estado de verificación.

Información privada:

- Nombre legal.
- DNI/NIE.
- Teléfono privado.
- Dirección.
- Documentación.
- Identidad fiscal.

La información privada solo debe estar disponible según las reglas explícitas del producto y RLS.

---

# 13. Arquitectura frontend objetivo

Evolucionar progresivamente hacia una estructura basada en features:

```text
src/
├── app/
│   ├── App.jsx
│   ├── providers/
│   └── router/
│
├── features/
│   ├── auth/
│   ├── companies/
│   ├── sellers/
│   ├── products/
│   ├── opportunities/
│   ├── requests/
│   ├── contacts/
│   ├── messaging/
│   ├── agreements/
│   ├── sales/
│   ├── commissions/
│   ├── notifications/
│   ├── verification/
│   └── analytics/
│
├── components/
│   ├── ui/
│   ├── layout/
│   └── common/
│
├── lib/
│   ├── supabase/
│   ├── errors/
│   └── constants/
│
├── routes/
│
└── styles/
```

No es obligatorio migrar todo de golpe. Se puede hacer feature por feature.

---

# 14. Estructura interna de una feature

Ejemplo:

```text
features/commissions/
├── components/
├── hooks/
├── services/
├── utils/
├── schemas/
├── constants/
└── index.js
```

Ventaja: toda la lógica relacionada con una funcionalidad permanece junta.

---

# 15. Capa de acceso a Supabase

Los componentes no deberían consultar directamente Supabase.

Patrón:

```text
Component
   ↓
Hook
   ↓
Service
   ↓
Supabase / RPC
```

Ejemplo:

```text
CommissionSimulator
        ↓
useCommission
        ↓
commissionService
        ↓
calculate_commission()
```

Esto permite cambiar la implementación sin modificar toda la UI.

---

# 16. Validación centralizada

Crear schemas para:

```text
company
seller
product
opportunity
request
agreement
sale
commission
```

La validación debe existir antes de:

- Crear.
- Actualizar.
- Publicar.
- Confirmar.
- Ejecutar operaciones económicas.

Si se incorpora Zod, utilizarlo como capa de validación de frontend/servicios, sin sustituir las restricciones de PostgreSQL.

---

# 17. Manejo de errores

Definir una estrategia común para:

```text
loading
empty
error
success
unauthorized
forbidden
not_found
conflict
validation_error
network_error
```

Los errores del backend deben transformarse en mensajes útiles para el usuario.

No mostrar errores SQL directamente.

---

# 18. Tests

Prioridad máxima:

```text
commissionCalculator
commissionEngine
matchingScore
permissions
validators
stateTransitions
```

Tests de integración:

```text
Empresa crea oportunidad
 ↓
Comercial muestra interés
 ↓
Empresa acepta
 ↓
Contacto
 ↓
Acuerdo
 ↓
Venta
 ↓
Comisión
```

Tests de seguridad:

```text
Company A → Company B data = DENY
Seller A → Seller B private data = DENY
Seller → modify company sale = DENY
Company → modify historical commission = DENY
```

---

# 19. Auditoría

Usar `audit_logs` para operaciones sensibles:

```text
commission_changed
agreement_created
agreement_modified
sale_confirmed
sale_cancelled
commission_approved
commission_paid
identity_revealed
verification_changed
refund_created
dispute_resolved
```

Registrar:

```text
actor_id
actor_role
action
entity_type
entity_id
metadata
created_at
```

Para operaciones especialmente sensibles, guardar valores anteriores y nuevos cuando corresponda.

---

# 20. Migraciones Supabase

Las migraciones deben ser:

- Versionadas.
- Ordenadas.
- Reproducibles.
- Idempotentes cuando sea posible.
- Sin borrar datos accidentalmente.
- Compatibles con el esquema anterior.

Antes de crear una tabla nueva:

```text
¿Existe ya?
¿Tiene otro nombre?
¿Existe una tabla equivalente?
¿Hay datos en producción?
¿Hay RLS existente?
```

No crear dos sistemas paralelos para la misma entidad.

---

# 21. Política de cambios de base de datos

Todo cambio estructural debe pasar por una migración.

No modificar producción manualmente sin dejar la migración correspondiente en el repositorio.

Flujo:

```text
Cambio SQL
 ↓
Migration
 ↓
Aplicar en Supabase
 ↓
Verificar
 ↓
Commit
 ↓
Repo = Supabase
```

El repositorio debe ser la referencia reproducible del estado de la base de datos.

---

# 22. Documentación técnica

Crear y mantener:

```text
docs/
├── ARCHITECTURE.md
├── DATABASE.md
├── SECURITY.md
├── COMMISSIONS.md
├── AUTH.md
├── API.md
├── DEVELOPMENT.md
└── DEPLOYMENT.md
```

`MVP_NUEVAS_FUNCIONALIDADES.md` debe seguir siendo el documento funcional/roadmap.

Este documento representa la limpieza arquitectónica.

---

# 23. Observabilidad

Preparar métricas y logs para:

- Errores de backend.
- Errores de RPC.
- Fallos de autenticación.
- Fallos de pagos.
- Disputas.
- Errores de cálculo.
- Operaciones críticas.

El sistema debe permitir descubrir dónde falla una operación sin tener que reproducirla manualmente.

---

# 24. Rendimiento

Revisar:

- Índices PostgreSQL.
- Consultas repetidas.
- N+1 queries.
- Paginación.
- Carga de marketplace.
- Imágenes.
- Mensajería.
- Analytics.

El marketplace debe utilizar paginación y filtros server-side cuando el volumen lo requiera.

---

# 25. Responsive y accesibilidad

Cada feature debe comprobar:

```text
desktop
 tablet
 mobile
```

Estados imprescindibles:

- Loading.
- Empty.
- Error.
- Success.

Accesibilidad mínima:

- Navegación por teclado.
- Labels.
- Contraste adecuado.
- Focus visible.
- Mensajes de error comprensibles.

---

# 26. Seguridad del código

No almacenar en frontend:

- Service role key.
- Secretos.
- Tokens privados.
- Credenciales.

Utilizar variables de entorno únicamente para valores públicos apropiados y mantener secretos en Supabase/entorno de servidor.

---

# 27. Reglas de negocio que no deben romperse

```text
1. Comercial conserva el 100 % de su comisión.
2. Sellio cobra a la empresa aparte.
3. Sellio máximo 5 %.
4. Comisión histórica inmutable.
5. Venta histórica inmutable en sus datos económicos.
6. No existen duplicados por reintentos.
7. Privacidad del comercial por defecto.
8. Backend es la autoridad económica.
9. RLS es obligatorio.
10. Todo cambio estructural de DB queda en Git.
```

---

# 28. Orden de ejecución

## Fase A — Auditoría

- [ ] Inventario de tablas.
- [ ] Inventario de funciones.
- [ ] Inventario de RLS.
- [ ] Inventario de migraciones.
- [ ] Inventario de componentes.
- [ ] Detectar duplicidades.

## Fase B — Consolidación de datos

- [ ] Definir fuente de verdad.
- [ ] Unificar comisiones.
- [ ] Revisar relaciones.
- [ ] Revisar constraints.
- [ ] Revisar índices.

## Fase C — Seguridad

- [ ] RLS tabla por tabla.
- [ ] Privacidad seller.
- [ ] Protección financiera.
- [ ] Auditoría.
- [ ] Storage privado.

## Fase D — Backend

- [ ] Commission Engine.
- [ ] State transitions.
- [ ] Idempotencia.
- [ ] Validaciones.
- [ ] RPC/Edge Functions.

## Fase E — Frontend

- [ ] Estructura por features.
- [ ] Services.
- [ ] Hooks.
- [ ] Schemas.
- [ ] Error handling.

## Fase F — Calidad

- [ ] Unit tests.
- [ ] Integration tests.
- [ ] Security tests.
- [ ] Responsive.
- [ ] Accessibility.

## Fase G — Documentación

- [ ] Architecture.
- [ ] Database.
- [ ] Security.
- [ ] API.
- [ ] Development.
- [ ] Deployment.

---

# 29. Definition of Done — Architecture V1

La limpieza arquitectónica estará terminada cuando:

- [ ] No existan entidades duplicadas conceptualmente.
- [ ] El flujo principal esté definido.
- [ ] El Commission Engine sea único.
- [ ] La comisión Sellio tenga límite backend de 5 %.
- [ ] La comisión comercial sea independiente.
- [ ] Las ventas históricas sean inmutables.
- [ ] Las operaciones críticas sean idempotentes.
- [ ] Los estados estén centralizados.
- [ ] Las transiciones estén validadas.
- [ ] RLS esté auditado.
- [ ] La privacidad del comercial esté protegida.
- [ ] Los servicios Supabase estén separados de la UI.
- [ ] Las validaciones estén centralizadas.
- [ ] Existan tests para el núcleo económico.
- [ ] Las migraciones del repo coincidan con Supabase.
- [ ] Exista documentación técnica mínima.

---

# 30. Prioridad

Orden recomendado:

```text
████████████████████  CRÍTICO

1. Modelo de datos
2. Comisiones
3. RLS / privacidad
4. Estados
5. Idempotencia
6. Tests económicos

██████████████        ALTO

7. Services
8. Validación
9. Auditoría
10. Migraciones

██████████            MEDIO

11. Feature architecture
12. Error handling
13. Performance
14. Documentation

██████                POST-MVP

15. Observabilidad avanzada
16. Optimización avanzada
17. IA / matching avanzado
```

---

# 31. Regla final

> **Antes de añadir complejidad, consolidar el núcleo.**

Sellio debe ser capaz de hacer perfectamente una cosa:

```text
EMPRESA
 ↓
PUBLICA PRODUCTO + OPORTUNIDAD
 ↓
COMERCIAL ENCUENTRA
 ↓
COMERCIAL MUESTRA INTERÉS
 ↓
SE CONECTAN
 ↓
ACUERDAN
 ↓
VENDEN
 ↓
SE CALCULAN LAS COMISIONES CORRECTAMENTE
```

Si este circuito es sólido, el resto del producto puede crecer encima sin rehacer la arquitectura.

---

# 32. Meta

Objetivo de Architecture V1:

```text
NO BUSCAMOS MÁS CÓDIGO.

BUSCAMOS MEJOR CÓDIGO.
```

Resultado esperado:

```text
Sellio
  ↓
Arquitectura limpia
  ↓
Seguridad sólida
  ↓
Datos coherentes
  ↓
Reglas económicas fiables
  ↓
Frontend mantenible
  ↓
MVP preparado para escalar
```
