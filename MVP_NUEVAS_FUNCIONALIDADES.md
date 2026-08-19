# SELLIO — MVP NUEVAS FUNCIONALIDADES

## Documento maestro de evolución del MVP

**Estado:** Planificación / Desarrollo MVP  
**Stack:** React + Vite + JavaScript + Supabase + PostgreSQL  
**Tipo:** Marketplace B2B de oportunidades comerciales

---

# 1. Visión de Sellio

Sellio conecta empresas, fabricantes, comerciales independientes, agentes de ventas y distribuidores.

El flujo central es:

```text
EMPRESA
  ↓
PRODUCTO
  ↓
OPORTUNIDAD COMERCIAL
  ↓
COMERCIAL DESCUBRE
  ↓
MUESTRA INTERÉS
  ↓
CONTACTO
  ↓
ACUERDO
  ↓
VENTA
  ↓
COMISIONES
```

Sellio no es un e-commerce ni un portal de empleo. Su propuesta es reducir la fricción entre una empresa que necesita vender y una persona que sabe vender.

---

# 2. Principios fundamentales

1. Simplicidad.
2. Transparencia.
3. Privacidad.
4. Seguridad.
5. Escalabilidad.
6. Incentivos claros.
7. Condiciones comerciales visibles.
8. Separación entre producto y oportunidad.
9. Seguridad real en backend, no solo en frontend.
10. Toda operación económica importante debe quedar registrada.
11. Las condiciones aplicadas a una venta confirmada son inmutables.
12. El comercial debe saber cuánto puede ganar.
13. La empresa debe saber cuánto le cuesta Sellio.

---

# 3. Roles

```text
company
seller
admin
```

## Empresa

- Crear perfil empresarial.
- Crear productos.
- Crear oportunidades.
- Definir comisión del comercial.
- Definir comisión Sellio.
- Recibir solicitudes.
- Gestionar contactos.
- Negociar.
- Crear acuerdos.
- Registrar ventas.
- Consultar estadísticas.

## Comercial

- Crear perfil profesional.
- Buscar empresas, productos y oportunidades.
- Filtrar y guardar oportunidades.
- Mostrar interés.
- Contactar empresas.
- Gestionar acuerdos.
- Consultar ventas y comisiones.
- Definir sectores, regiones, idiomas y disponibilidad.

## Admin

- Gestionar usuarios, empresas y comerciales.
- Verificar usuarios.
- Moderar productos y oportunidades.
- Supervisar ventas y comisiones.
- Resolver disputas.
- Consultar auditoría y analytics.

---

# 4. Producto ≠ oportunidad

## Producto

Representa qué vende la empresa.

Ejemplo:

```text
Aceite ecológico premium
```

## Oportunidad

Representa la necesidad de comercialización.

Ejemplo:

```text
Buscamos comerciales independientes para Cataluña.
```

Un producto puede aparecer en varias oportunidades.

---

# 5. Ofertas comerciales

Cada oportunidad debe permitir definir:

- Producto.
- Precio.
- Moneda.
- Comisión comercial.
- Comisión Sellio.
- Región.
- Sector.
- Cliente objetivo.
- Experiencia requerida.
- Condiciones de venta.
- Condiciones de pago.
- Pedido mínimo.
- Fecha de inicio.
- Fecha de finalización.
- Información adicional.

---

# 6. Modelo de comisiones

Sellio utiliza **dos comisiones independientes**.

### Comisión del comercial

La empresa decide cuánto pagar al comercial.

Ejemplo:

```text
Producto: 100 €
Comercial: 15 %
Comercial recibe: 15 €
```

Sellio **no descuenta nada de esos 15 €**.

### Comisión Sellio

La empresa paga adicionalmente la comisión de Sellio.

Ejemplo:

```text
Venta:                 100 €
Comercial:              15 €
Sellio:                  2 €
Empresa conserva:       83 €
```

---

# 7. Límite de Sellio

La comisión de Sellio tendrá un máximo absoluto de:

```text
5 %
```

Este límite debe validarse tanto en frontend como en backend.

Nunca confiar únicamente en React.

---

# 8. Comisión progresiva por volumen

Sellio puede aplicar tramos para premiar volumen.

Ejemplo inicial:

| Volumen mensual | Comisión Sellio |
|---:|---:|
| 0–5.000 € | 3 % |
| 5.001–15.000 € | 2,5 % |
| 15.001–30.000 € | 2 % |
| 30.001–50.000 € | 1,5 % |
| +50.000 € | 1 % |

Reglas:

- Nunca superar 5 %.
- No permitir tramos solapados.
- Registrar el tramo aplicado.
- Una venta confirmada conserva el porcentaje aplicado en ese momento.

---

# 9. Motor de comisiones

Crear:

```text
src/utils/commissionCalculator.js
src/services/commissions.js
```

El cálculo centralizado debe devolver conceptualmente:

```js
{
  saleValue,
  commercialCommission,
  sellioCommission,
  companyNet,
  commercialRateApplied,
  sellioRateApplied,
  volumeTierApplied
}
```

El motor se utilizará en ofertas, marketplace, confirmación de venta, dashboards y transacciones.

Los cálculos definitivos deberán validarse en backend/RPC/Edge Function.

---

# 10. Simulador de ganancias

El comercial podrá introducir:

- Precio.
- Comisión.
- Ventas estimadas.

Y obtener:

```text
Facturación estimada
Comisión por venta
Ingresos estimados
```

Ejemplo:

```text
Precio: 250 €
Comisión: 10 %
Ventas: 20

Facturación: 5.000 €
Ganancia comercial: 500 €
```

---

# 11. Comparador de oportunidades

Permitir comparar ofertas lado a lado.

| | Oferta A | Oferta B |
|---|---:|---:|
| Precio | 100 € | 150 € |
| Comisión | 15 % | 10 % |
| Comisión/venta | 15 € | 15 € |
| Región | Cataluña | España |
| Experiencia | Baja | Media |

Destacar potencial, comisión por venta y coincidencia con el perfil.

---

# 12. Badges

Preparar badges como:

```text
NUEVA
DESTACADA
ALTA COMISIÓN
EMPRESA VERIFICADA
OPORTUNIDAD ACTIVA
URGENTE
POPULAR
```

No utilizar etiquetas engañosas.

---

# 13. Estados de oportunidad

```text
draft
pending_review
published
paused
expired
archived
cancelled
```

Flujo habitual:

```text
DRAFT → REVISIÓN → PUBLICADA → PAUSADA/REACTIVADA → EXPIRADA → ARCHIVADA
```

---

# 14. Expiración y renovación

Una oportunidad puede tener:

```text
active_from
active_until
```

Al finalizar debe pasar automáticamente a `expired` y dejar de aparecer como activa.

La renovación debe crear un nuevo periodo sin alterar el histórico.

---

# 15. Versionado de ofertas

Una oferta puede cambiar con el tiempo.

Debe existir una versión de condiciones:

```text
offer_version
```

Ejemplo:

```text
Versión 1 → comisión 10 %
Versión 2 → comisión 12 %
```

Una venta realizada con la versión 1 mantiene el 10 %, aunque la oferta actual tenga 12 %.

---

# 16. Snapshot de venta

Al confirmar una venta guardar una copia inmutable de:

- Producto.
- Empresa.
- Comercial.
- Oportunidad.
- Versión de oferta.
- Precio.
- Moneda.
- Comisión comercial.
- Comisión Sellio.
- Porcentajes aplicados.
- Tramo de volumen.
- Fecha.

---

# 17. Ledger de comisiones

Preparar:

```text
commission_ledger
```

Estados:

```text
pending
confirmed
approved
paid
cancelled
refunded
```

Debe permitir reconstruir el historial económico de una operación.

---

# 18. Flujo de venta

```text
lead
→ interested
→ contacted
→ negotiation
→ agreement
→ sale_pending
→ sale_confirmed
→ commission_pending
→ commission_approved
→ commission_paid
```

Estados alternativos:

```text
cancelled
refunded
disputed
```

---

# 19. Disputas

Crear soporte para incidencias económicas o comerciales.

Ejemplo:

```text
Comercial: comisión no pagada
Empresa: venta cancelada
```

Una disputa debe permitir revisar:

- Venta.
- Acuerdo.
- Condiciones.
- Mensajes.
- Evidencias.
- Histórico.

---

# 20. Privacidad progresiva

El comercial puede aparecer públicamente como:

```text
Comercial #A482
```

No exponer automáticamente:

- Nombre legal.
- Teléfono.
- Email personal.
- Dirección.
- Documentación.

Flujo:

```text
ANÓNIMO
 ↓
INTERÉS
 ↓
CONTACTO
 ↓
CONVERSACIÓN
 ↓
REVELACIÓN EXPLÍCITA
```

La revelación debe estar protegida por RLS/backend.

---

# 21. Verificación

Estados:

```text
unverified
pending
verified
rejected
```

Crear historial mediante:

```text
verification_events
```

Mostrar `Empresa verificada` o `Comercial verificado` únicamente cuando corresponda.

---

# 22. Reputación

Preparar un sistema futuro de valoraciones tras operaciones reales.

Aspectos:

- Profesionalidad.
- Comunicación.
- Cumplimiento.
- Claridad.
- Experiencia.

Escala inicial:

```text
1–5
```

Debe incluir protección contra manipulaciones y valoraciones falsas.

---

# 23. Favoritos

Comercial:

```text
saved_products
saved_opportunities
saved_companies
```

Empresa:

```text
saved_sellers
```

---

# 24. Alertas

Preparar alertas por coincidencia:

```text
Nueva oportunidad
↓
Sector compatible
Región compatible
Idioma compatible
Experiencia compatible
```

Ejemplo:

```text
Nueva oportunidad para ti
Distribución de productos ecológicos en Cataluña
Comisión: 12 %
```

---

# 25. Matching

Variables iniciales:

- Sector.
- Categoría.
- Región.
- Idiomas.
- Experiencia.
- Producto.
- Cliente objetivo.
- Disponibilidad.

Primera versión: matching por reglas y filtros.

No implementar IA compleja hasta validar el MVP.

---

# 26. Score de matching

Ejemplo:

```text
Sector          +30
Región          +20
Idioma          +15
Experiencia     +15
Categoría       +10
Disponibilidad  +10
--------------------
TOTAL           100
```

Mostrar, cuando proceda:

```text
92 % de coincidencia
```

El cálculo debe ser explicable.

---

# 27. Búsqueda y filtros

Comerciales:

- Categoría.
- Sector.
- Región.
- Comisión.
- Precio.
- Experiencia.
- Empresa verificada.
- Nuevas.
- Destacadas.
- Disponibilidad.

Empresas:

- Categoría.
- Región.
- Experiencia.
- Idiomas.
- Disponibilidad.
- Verificación.

Ordenación:

```text
Más relevantes
Más recientes
Mayor comisión
Mayor potencial
Empresa verificada
Más populares
```

---

# 28. Analytics

Eventos mínimos:

```text
product_view
opportunity_view
search
filter_used
save_opportunity
interest_sent
interest_accepted
contact_created
message_sent
agreement_created
sale_created
sale_confirmed
commission_created
commission_paid
```

---

# 29. Funnel

```text
VISITAS
 ↓
PRODUCTOS VISTOS
 ↓
OPORTUNIDADES VISTAS
 ↓
INTERESES
 ↓
CONTACTOS
 ↓
NEGOCIACIONES
 ↓
ACUERDOS
 ↓
VENTAS
 ↓
COMISIONES
```

Métricas:

- Conversion rate.
- Interest rate.
- Contact rate.
- Agreement rate.
- Sale rate.
- Commission rate.

---

# 30. Dashboard de empresa

Módulos:

```text
Resumen
Productos
Oportunidades
Solicitudes
Comerciales
Contactos
Mensajes
Acuerdos
Ventas
Comisiones
Analytics
Configuración
```

KPIs:

- Oportunidades activas.
- Solicitudes pendientes.
- Contactos activos.
- Ventas.
- Comisión Sellio.
- Conversión.

---

# 31. Dashboard comercial

Módulos:

```text
Resumen
Marketplace
Mis oportunidades
Guardados
Solicitudes
Contactos
Mensajes
Acuerdos
Ventas
Mis comisiones
Analytics
Perfil
Configuración
```

KPIs:

- Oportunidades activas.
- Solicitudes.
- Contactos.
- Ventas.
- Comisión pendiente.
- Comisión pagada.
- Ingresos generados.

---

# 32. Dashboard admin

Módulos:

```text
Resumen
Usuarios
Empresas
Comerciales
Productos
Oportunidades
Solicitudes
Ventas
Comisiones
Disputas
Verificaciones
Auditoría
Configuración
```

---

# 33. Notificaciones

Tabla:

```text
notifications
```

Tipos:

```text
new_request
request_accepted
request_rejected
new_message
new_opportunity
opportunity_expiring
contact_created
agreement_created
sale_confirmed
commission_pending
commission_approved
commission_paid
verification_completed
dispute_created
```

---

# 34. Mensajería

Arquitectura:

```text
contacts
 ↓
conversations
 ↓
messages
```

Preparar posteriormente:

- Mensajes en tiempo real.
- Adjuntos.
- Notificaciones.
- Leído/no leído.
- Indicador de escritura.

RLS obligatorio para impedir leer conversaciones ajenas.

---

# 35. Acuerdos

Tabla:

```text
agreements
```

Debe relacionar:

- Empresa.
- Comercial.
- Oportunidad.
- Producto.

Debe guardar condiciones pactadas, especialmente la comisión.

Estados:

```text
draft
pending
active
completed
terminated
cancelled
```

---

# 36. Seguridad y Supabase

Utilizar:

```text
Supabase Auth
PostgreSQL
RLS
Storage
Realtime
RPC
Edge Functions
```

La seguridad real nunca debe depender de ocultar botones en React.

---

# 37. RLS

Principio:

```text
PUBLIC
  ↓ información explícitamente pública

AUTHENTICATED
  ↓ datos y recursos permitidos

COMPANY
  ↓ sus productos, oportunidades, solicitudes y contactos

SELLER
  ↓ su perfil, solicitudes, contactos, mensajes y comisiones

ADMIN
  ↓ control administrativo
```

Nunca permitir que un usuario modifique recursos de otra cuenta.

---

# 38. Funciones backend

Preparar funciones como:

```text
create_agreement
confirm_sale
calculate_commission
approve_commission
reveal_seller_identity
create_contact_from_request
create_commission
process_refund
create_dispute
```

Cada función debe validar:

- Autenticación.
- Rol.
- Propiedad del recurso.
- Estado de la operación.
- Reglas económicas.

---

# 39. Auditoría

Crear:

```text
audit_logs
```

Registrar como mínimo:

- Cambios de rol.
- Verificaciones.
- Revelación de identidad.
- Cambios de comisión.
- Acuerdos.
- Ventas.
- Pagos.
- Reembolsos.
- Disputas.

Campos conceptuales:

```text
actor_id
action
entity_type
entity_id
metadata
created_at
```

---

# 40. Storage

Buckets previstos:

```text
company-assets
seller-assets
product-assets
verification-documents
agreement-documents
```

Los documentos privados nunca deben estar en buckets públicos.

---

# 41. Componentes React

Añadir progresivamente:

```text
src/components/
├── commissions/
│   ├── CommissionPreview.jsx
│   ├── CommissionBreakdown.jsx
│   ├── CommissionBadge.jsx
│   ├── OfferCommissionForm.jsx
│   ├── VolumeCommissionTiers.jsx
│   └── CommissionSimulator.jsx
│
├── opportunities/
│   ├── OpportunityCard.jsx
│   ├── OpportunityFilters.jsx
│   ├── OpportunityStatus.jsx
│   ├── OpportunityBadge.jsx
│   └── OpportunityCompare.jsx
│
├── marketplace/
│   ├── MarketplaceGrid.jsx
│   ├── MarketplaceFilters.jsx
│   ├── SortSelector.jsx
│   └── MatchingScore.jsx
│
├── messaging/
│   ├── ConversationList.jsx
│   ├── Conversation.jsx
│   ├── Message.jsx
│   └── MessageInput.jsx
│
├── verification/
│   ├── VerificationBadge.jsx
│   └── VerificationStatus.jsx
│
├── analytics/
│   ├── StatCard.jsx
│   ├── FunnelChart.jsx
│   └── ConversionCard.jsx
│
└── notifications/
    ├── NotificationBell.jsx
    └── NotificationItem.jsx
```

---

# 42. Hooks

Preparar:

```text
useAuth
useCompanies
useSellers
useProducts
useOpportunities
useRequests
useContacts
useMessages
useAgreements
useSales
useCommissions
useNotifications
useMatching
useAnalytics
```

---

# 43. Services

```text
src/services/

api.js
auth.js
companies.js
sellers.js
products.js
opportunities.js
requests.js
contacts.js
messages.js
agreements.js
sales.js
commissions.js
notifications.js
matching.js
analytics.js
verification.js
```

Cada service debe tener una responsabilidad clara.

---

# 44. Utils

```text
src/utils/

commissionCalculator.js
formatters.js
validators.js
constants.js
matchingScore.js
currency.js
date.js
permissions.js
```

---

# 45. Rutas empresa

```text
/company/dashboard
/company/products
/company/products/new
/company/products/:id
/company/opportunities
/company/opportunities/new
/company/opportunities/:id
/company/requests
/company/contacts
/company/messages
/company/agreements
/company/sales
/company/commissions
/company/analytics
/company/settings
```

---

# 46. Rutas comercial

```text
/seller/dashboard
/seller/marketplace
/seller/opportunities/:id
/seller/saved
/seller/requests
/seller/contacts
/seller/messages
/seller/agreements
/seller/sales
/seller/commissions
/seller/analytics
/seller/profile
/seller/settings
```

---

# 47. Rutas admin

```text
/admin/dashboard
/admin/users
/admin/companies
/admin/sellers
/admin/products
/admin/opportunities
/admin/requests
/admin/sales
/admin/commissions
/admin/disputes
/admin/verifications
/admin/audit
/admin/settings
```

---

# 48. Experiencia del comercial

Una oportunidad debe responder rápidamente:

```text
¿Qué producto es?
¿Quién lo vende?
¿Dónde puedo venderlo?
¿Cuánto gano?
¿Qué necesito?
¿Está verificada la empresa?
¿Cómo contacto?
```

Estructura visual recomendada:

```text
PRODUCTO
 ↓
EMPRESA
 ↓
PRECIO
 ↓
COMISIÓN
 ↓
REGIÓN
 ↓
REQUISITOS
 ↓
POTENCIAL
 ↓
[ ME INTERESA ]
```

---

# 49. Experiencia de empresa

```text
CREAR PRODUCTO
 ↓
CREAR OPORTUNIDAD
 ↓
DEFINIR COMISIÓN
 ↓
PUBLICAR
 ↓
RECIBIR COMERCIALES
 ↓
SELECCIONAR
 ↓
CONTACTAR
 ↓
ACORDAR
 ↓
REGISTRAR VENTA
 ↓
GESTIONAR COMISIONES
```

---

# 50. Diseño y confianza

Sellio debe transmitir:

```text
Profesional
Simple
Transparente
B2B
Seguro
Moderno
```

Elementos de confianza:

- Empresa verificada.
- Comercial verificado.
- Condiciones claras.
- Comisión visible.
- Historial.
- Estados.
- Privacidad.

---

# 51. Evitar dark patterns

Nunca:

- Ocultar comisiones.
- Ocultar costes.
- Cambiar condiciones sin aviso.
- Crear falsas urgencias.
- Forzar contactos.
- Manipular rankings sin indicarlo.
- Ocultar información económica relevante.

---

# 52. Monetización

Modelo principal inicial:

```text
EMPRESA
  ↓
VENTA
  ↓
SELLIO COBRA HASTA 5 %
```

La comisión del comercial es independiente.

Modelos futuros posibles:

```text
Comisión por venta
Suscripción empresarial
Ofertas destacadas
Analytics premium
Herramientas comerciales
```

No introducir demasiados modelos en el MVP.

---

# 53. KPI principal

El KPI principal no debe ser únicamente el número de usuarios.

Debe ser:

```text
VENTAS GENERADAS A TRAVÉS DE SELLIO
```

Métricas complementarias:

```text
Usuarios registrados
Empresas activas
Comerciales activos
Productos publicados
Oportunidades publicadas
Solicitudes
Contactos
Acuerdos
Ventas
GMV
Comisión comercial
Comisión Sellio
Ingresos Sellio
```

---

# 54. Fases de desarrollo

## FASE 1 — Fundación

- React.
- Vite.
- Routing.
- Layouts.
- Componentes base.
- Design system.
- Supabase.
- Auth.

## FASE 2 — Usuarios

- Profiles.
- Company profiles.
- Seller profiles.
- Roles.
- RLS.
- Verificación básica.

## FASE 3 — Marketplace

- Productos.
- Empresas.
- Oportunidades.
- Búsqueda.
- Filtros.
- Detalle.

## FASE 4 — Conexión

- Solicitudes.
- Contactos.
- Mensajería.
- Notificaciones.

## FASE 5 — Negocio

- Acuerdos.
- Ventas.
- Motor de comisiones.
- Ledger.
- Histórico.

## FASE 6 — Inteligencia

- Matching.
- Recomendaciones.
- Analytics.
- Simulador.
- Comparador.

## FASE 7 — Escalado

- Pagos.
- Facturación.
- Disputas.
- Reputación.
- Promociones.
- Automatizaciones.

---

# 55. MVP imprescindible

Para una primera versión real:

- Registro.
- Login.
- Roles.
- Perfil empresa.
- Perfil comercial.
- Productos.
- Oportunidades.
- Marketplace.
- Búsqueda.
- Solicitudes.
- Contactos.
- Mensajería básica.
- Acuerdos.
- Ventas.
- Comisiones.
- Dashboard.
- RLS.
- Auditoría mínima.

## Puede esperar

- IA avanzada.
- Matching complejo.
- Reputación avanzada.
- Pagos automáticos.
- Facturación automática.
- Promociones.
- Analytics avanzado.

---

# 56. Reglas económicas inmutables

1. La comisión comercial pertenece al comercial.
2. Sellio no descuenta su comisión de la comisión comercial.
3. La empresa paga la comisión Sellio.
4. Sellio nunca supera el 5 %.
5. La comisión debe ser visible antes de mostrar interés.
6. La comisión aplicada a una venta queda congelada.
7. Una modificación posterior no altera ventas antiguas.
8. Toda operación económica queda registrada.
9. Las disputas deben poder auditarse.
10. Los cálculos críticos se validan en backend.

---

# 57. Reglas de seguridad

1. RLS obligatorio.
2. No confiar en React.
3. No exponer datos privados.
4. No exponer documentos de verificación.
5. No permitir modificar ventas ajenas.
6. No permitir modificar comisiones históricas.
7. Auditar operaciones sensibles.
8. Validar roles en backend.
9. Validar propiedad de recursos.
10. Mantener secretos fuera del frontend.

---

# 58. Criterio de calidad

Una funcionalidad no está terminada simplemente porque funcione visualmente.

Debe cubrir:

```text
UI
+
Lógica
+
Backend
+
Seguridad
+
Validación
+
Estados
+
Errores
+
Persistencia
+
Auditoría cuando corresponda
```

---

# 59. Checklist de cada funcionalidad

- [ ] UI creada.
- [ ] Responsive.
- [ ] Loading.
- [ ] Estado vacío.
- [ ] Estado error.
- [ ] Validaciones.
- [ ] Backend.
- [ ] RLS.
- [ ] Persistencia.
- [ ] Feedback.
- [ ] Manejo de errores.
- [ ] Auditoría si es sensible.
- [ ] Mobile.
- [ ] Accesibilidad básica.
- [ ] Sin duplicación de lógica.

---

# 60. Arquitectura conceptual

```text
AUTH USER
    ↓
PROFILE
    ├── COMPANY PROFILE
    │      ↓
    │   PRODUCTS
    │      ↓
    │   OPPORTUNITIES
    │      ↓
    │   REQUESTS
    │      ↓
    │   CONTACTS
    │      ↓
    │   CONVERSATIONS
    │      ↓
    │   AGREEMENTS
    │      ↓
    │   SALES
    │      ↓
    │   COMMISSIONS
    │
    └── SELLER PROFILE
           ↓
       CATEGORIES
       LANGUAGES
       REGIONS
           ↓
       DISCOVERY
           ↓
       REQUESTS
           ↓
       CONTACTS
           ↓
       CONVERSATIONS
           ↓
       AGREEMENTS
           ↓
       SALES
           ↓
       COMMISSIONS
```

---

# 61. Estructura frontend objetivo

```text
src/
├── assets/
├── components/
│   ├── common/
│   ├── companies/
│   ├── sellers/
│   ├── products/
│   ├── opportunities/
│   ├── marketplace/
│   ├── commissions/
│   ├── messaging/
│   ├── notifications/
│   ├── verification/
│   └── analytics/
├── context/
├── hooks/
├── layouts/
├── pages/
│   ├── public/
│   ├── company/
│   ├── seller/
│   └── admin/
├── routes/
├── services/
├── utils/
├── styles/
├── App.jsx
└── main.jsx
```

---

# 62. Escalabilidad

La arquitectura debe funcionar para:

```text
10 usuarios
↓
100
↓
1.000
↓
10.000
↓
100.000+
```

Regla:

> Construir hoy lo necesario para que mañana no haya que destruirlo.

No sobrearquitecturar el MVP, pero tampoco crear estructuras que impidan evolucionar.

---

# 63. Definición de MVP listo

Sellio podrá considerarse listo para una primera prueba real cuando:

- [ ] Una empresa pueda registrarse.
- [ ] Un comercial pueda registrarse.
- [ ] Existan perfiles separados.
- [ ] Una empresa pueda crear un producto.
- [ ] Una empresa pueda publicar una oportunidad.
- [ ] Un comercial pueda encontrarla.
- [ ] El comercial pueda ver claramente la comisión.
- [ ] El comercial pueda mostrar interés.
- [ ] La empresa pueda aceptar/rechazar.
- [ ] Se pueda crear un contacto.
- [ ] Se pueda conversar.
- [ ] Se pueda crear un acuerdo.
- [ ] Se pueda registrar una venta.
- [ ] Se pueda calcular la comisión.
- [ ] La comisión quede registrada.
- [ ] La venta quede registrada.
- [ ] Las condiciones históricas sean inmutables.
- [ ] RLS impida accesos indebidos.
- [ ] El administrador pueda supervisar operaciones.

---

# 64. Orden recomendado de implementación

```text
1. Auth
2. Profiles
3. Roles
4. Company
5. Seller
6. Products
7. Opportunities
8. Marketplace
9. Search / Filters
10. Requests
11. Contacts
12. Messaging
13. Agreements
14. Sales
15. Commission Engine
16. Commission Ledger
17. Dashboards
18. Notifications
19. RLS completo
20. Audit Logs
21. Matching
22. Analytics
23. Simulator
24. Comparador
25. Pagos
```

---

# 65. Filosofía de desarrollo

Sellio no necesita 200 funcionalidades para validar el negocio.

Necesita pocas funcionalidades muy bien hechas.

El núcleo es:

```text
EMPRESA
   ↓
PRODUCTO
   ↓
OPORTUNIDAD
   ↓
COMERCIAL
   ↓
INTERÉS
   ↓
CONTACTO
   ↓
ACUERDO
   ↓
VENTA
   ↓
COMISIÓN
```

Si este flujo funciona de principio a fin, Sellio tiene un MVP real.

---

# 66. Regla maestra

> **Sellio gana cuando la empresa vende y el comercial gana dinero.**

El ecosistema debe buscar:

```text
EMPRESA GANA
     +
COMERCIAL GANA
     +
SELLIO GANA
     =
ECOSISTEMA SANO
```

---

# 67. Objetivo final

### Empresa

> Tengo un producto y necesito venderlo.

```text
Crear producto
↓
Crear oportunidad
↓
Definir comisión
↓
Publicar
↓
Recibir comerciales
↓
Seleccionar
↓
Vender
```

### Comercial

> Sé vender, pero necesito encontrar qué vender.

```text
Crear perfil
↓
Explorar oportunidades
↓
Encontrar producto
↓
Ver cuánto gano
↓
Mostrar interés
↓
Contactar
↓
Vender
↓
Cobrar comisión
```

### Sellio

```text
Facilita la conexión
↓
Facilita el acuerdo
↓
Facilita la venta
↓
Genera valor
↓
Monetiza la transacción
```

---

# 68. Frase de producto

> **Encuentra qué vender. Encuentra quién lo venda.**

---

# 69. Estado del documento

Este archivo es el **documento maestro de evolución del MVP de Sellio**.

No implica que todas las funcionalidades deban desarrollarse inmediatamente. Las prioridades deben seguir:

```text
CORE
 ↓
SEGURIDAD
 ↓
MONETIZACIÓN
 ↓
EXPERIENCIA
 ↓
AUTOMATIZACIÓN
 ↓
ESCALABILIDAD
```

Cualquier nueva funcionalidad importante debe evaluarse contra este documento antes de incorporarse al producto.
