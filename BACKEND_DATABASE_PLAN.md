# SELLIO — PLAN COMPLETO DE BACKEND Y BASE DE DATOS

## Estado

La primera migración de la base de datos de Sellio ya ha sido creada en el proyecto Supabase de Sellio.

Proyecto Supabase:

```text
Sellio
Region: eu-west-1
PostgreSQL 17
```

Este documento define **qué debe existir en backend, cómo se relaciona y qué debe implementarse después**.

---

# 1. OBJETIVO DEL BACKEND

El backend debe soportar todo el ciclo de Sellio:

```text
AUTENTICACIÓN
    ↓
USUARIO
    ↓
EMPRESA / COMERCIAL / ADMIN
    ↓
PERFILES
    ↓
PRODUCTOS
    ↓
OPORTUNIDADES
    ↓
DESCUBRIMIENTO
    ↓
INTERÉS DEL COMERCIAL
    ↓
CONTACTO
    ↓
MENSAJES
    ↓
ACUERDO
    ↓
VENTA
    ↓
COMISIÓN
```

La base debe estar preparada desde el principio para crecer sin tener que rediseñar las relaciones principales.

---

# 2. PRINCIPIO MÁS IMPORTANTE

Sellio no es un e-commerce ni un portal de empleo.

El flujo principal es:

```text
EMPRESA
  ↓
PRODUCTO REAL
  ↓
OPORTUNIDAD COMERCIAL
  ↓
COMERCIAL DESCUBRE
  ↓
COMERCIAL MUESTRA INTERÉS
  ↓
COMERCIAL SE ACERCA A LA EMPRESA
  ↓
CONTACTO
  ↓
ACUERDO
  ↓
VENTA
  ↓
COMISIÓN
```

El esquema de datos debe respetar este flujo.

---

# 3. AUTENTICACIÓN

Utilizar Supabase Auth.

La identidad técnica principal de un usuario es:

```text
auth.users.id
```

Nunca crear una segunda tabla de usuarios que sustituya a `auth.users`.

Crear un perfil de aplicación relacionado 1:1:

```text
profiles.id → auth.users.id
```

---

# 4. ROLES

Los tres roles principales son:

```text
company
seller
admin
```

La tabla `profiles` contiene el rol.

El backend debe usar el rol para controlar:

- navegación;
- acceso a recursos;
- acciones permitidas;
- panel correspondiente.

Nunca confiar únicamente en el frontend para seguridad.

---

# 5. PERFILES

## `profiles`

Información común:

- id;
- role;
- account_status;
- display_name;
- avatar;
- país;
- idioma;
- timestamps.

## `company_profiles`

Información de empresa:

- razón social;
- nombre comercial;
- slug;
- descripción;
- web;
- logo;
- ubicación;
- datos fiscales;
- contacto;
- verificación.

## `seller_profiles`

Información profesional visible del comercial:

- alias público;
- visibilidad;
- biografía profesional;
- años de experiencia;
- disponibilidad;
- ubicación;
- verificación.

---

# 6. ANONIMATO DEL COMERCIAL

Este requisito es estructural.

Separar:

```text
seller_profiles
        ↓
DATOS PROFESIONALES / PÚBLICOS

seller_private_data
        ↓
DATOS PRIVADOS / IDENTIDAD REAL
```

El comercial puede aparecer públicamente como:

```text
Comercial #A482
```

sin exponer automáticamente:

- nombre legal;
- email personal;
- teléfono;
- dirección;
- documentación.

La tabla `seller_private_data` queda restringida al propio comercial y a administración cuando corresponda.

El anonimato debe estar protegido por RLS y permisos de backend, no por CSS o lógica de frontend.

---

# 7. VERIFICACIÓN

La plataforma necesita distinguir identidad de visibilidad.

Un comercial puede estar:

```text
VERIFICADO INTERNAMENTE
        ↓
ANÓNIMO EXTERNAMENTE
```

Estados previstos:

```text
unverified
pending
verified
rejected
```

`verification_events` mantiene historial de cambios de verificación.

---

# 8. CATEGORÍAS

Crear una entidad común:

```text
categories
```

Debe soportar categorías jerárquicas mediante:

```text
parent_id
```

Relacionar categorías con:

```text
company_categories
seller_categories
opportunity_categories
```

Esto permitirá realizar matching por sectores.

---

# 9. INFORMACIÓN DEL COMERCIAL

Además del perfil principal, guardar relaciones específicas:

```text
seller_categories
seller_languages
seller_regions
```

Esto permitirá saber:

- qué sectores conoce;
- qué idiomas domina;
- qué zonas cubre.

Esto es importante para el futuro sistema de matching.

---

# 10. PRODUCTOS

Tabla:

```text
products
```

Relación:

```text
company_profiles
      ↓ 1:N
products
```

Una empresa puede tener múltiples productos.

Cada producto debe poder tener:

- categoría;
- nombre;
- slug;
- descripción;
- imagen;
- estado;
- confirmación de producto real;
- disponibilidad para comercialización.

Estados:

```text
draft
published
archived
```

---

# 11. OPORTUNIDADES

Tabla:

```text
opportunities
```

Una oportunidad pertenece a una empresa.

Una oportunidad puede estar relacionada con uno o varios productos:

```text
opportunities
      ↓
opportunity_products
      ↓
products
```

También puede estar relacionada con:

- categorías;
- regiones;
- condiciones comerciales;
- experiencia requerida;
- tipo de cliente;
- comisión.

---

# 12. PRODUCTO ≠ OPORTUNIDAD

No fusionar estas entidades.

### Producto

Representa qué vende la empresa.

### Oportunidad

Representa la necesidad de comercialización.

Ejemplo:

```text
PRODUCTO
Aceite ecológico premium

OPORTUNIDAD
Buscamos comerciales independientes para Cataluña
```

Una empresa puede publicar el mismo producto en varias oportunidades diferentes.

---

# 13. ZONAS

Crear relaciones separadas para regiones:

```text
seller_regions
opportunity_regions
```

No guardar toda la información geográfica en un único campo de texto si posteriormente queremos hacer búsquedas y matching.

---

# 14. SOLICITUD / INTERÉS DEL COMERCIAL

Tabla:

```text
seller_opportunity_requests
```

Representa:

```text
COMERCIAL
   ↓
ME INTERESA
   ↓
OPORTUNIDAD
```

Debe almacenar:

- comercial;
- oportunidad;
- mensaje del comercial;
- respuesta de empresa;
- estado;
- timestamps.

Estados:

```text
pending
accepted
rejected
withdrawn
cancelled
```

La relación comercial empieza aquí.

---

# 15. CONTACTOS

Tabla:

```text
contacts
```

Representa una relación entre:

```text
empresa ↔ comercial
```

Debe poder indicar si la identidad del comercial ya ha sido revelada:

```text
identity_revealed_at
```

Esto permite implementar posteriormente un flujo de privacidad progresiva.

---

# 16. MENSAJERÍA

Separar:

```text
contacts
    ↓
conversations
    ↓
messages
```

Una conversación pertenece a un contacto.

Un mensaje pertenece a una conversación.

Cada mensaje debe registrar:

- remitente;
- contenido;
- fecha;
- fecha de lectura.

Nunca permitir leer mensajes de conversaciones ajenas mediante RLS.

---

# 17. ACUERDOS

Tabla:

```text
agreements
```

Representa el acuerdo comercial entre empresa y comercial.

Debe relacionarse con:

```text
company
seller
opportunity
```

Debe almacenar las condiciones pactadas, especialmente la comisión.

Estados:

```text
draft
active
completed
terminated
cancelled
```

---

# 18. VENTAS

Tabla:

```text
sales
```

Una venta pertenece a un acuerdo.

Debe registrar:

- empresa;
- comercial;
- producto;
- acuerdo;
- importe bruto;
- moneda;
- estado;
- fecha;
- referencia externa.

Estados:

```text
pending
confirmed
cancelled
refunded
```

---

# 19. COMISIONES

Tabla:

```text
commissions
```

Una comisión pertenece a una venta.

Debe registrar:

- venta;
- comercial;
- porcentaje;
- cantidad;
- moneda;
- estado;
- aprobación;
- pago.

Estados:

```text
pending
approved
paid
cancelled
```

No calcular importes económicos importantes exclusivamente en React.

Los cálculos definitivos deberán hacerse de forma controlada en backend.

---

# 20. NOTIFICACIONES

Tabla:

```text
notifications
```

Preparada para eventos como:

- nueva solicitud;
- solicitud aceptada;
- nuevo mensaje;
- oportunidad recomendada;
- contacto creado;
- venta confirmada;
- comisión aprobada;
- comisión pagada.

---

# 21. GUARDADOS

Para permitir que el comercial guarde oportunidades y productos:

```text
saved_opportunities
saved_products
```

Estas tablas pertenecen exclusivamente al comercial.

---

# 22. SEGURIDAD / RLS

Todas las tablas sensibles deben tener Row Level Security.

Principio general:

```text
PUBLIC
  ↓
solo información explícitamente pública

AUTHENTICATED USER
  ↓
solo sus datos y recursos permitidos

COMPANY
  ↓
sus productos, oportunidades, solicitudes y contactos

SELLER
  ↓
su perfil, oportunidades públicas, sus solicitudes, contactos y mensajes

ADMIN
  ↓
control global
```

La información privada del comercial nunca debe ser pública.

---

# 23. REGLAS DE RLS FUNDAMENTALES

## Empresa

Puede:

- leer oportunidades públicas;
- crear sus productos;
- editar sus productos;
- crear sus oportunidades;
- gestionar solicitudes relacionadas con sus oportunidades;
- gestionar sus contactos;
- participar en sus conversaciones.

No puede modificar recursos de otra empresa.

## Comercial

Puede:

- leer productos publicados;
- leer oportunidades publicadas;
- leer perfiles profesionales permitidos;
- crear sus solicitudes;
- gestionar sus solicitudes;
- gestionar sus contactos;
- participar en sus conversaciones;
- guardar oportunidades/productos;
- leer sus comisiones.

No puede modificar productos u oportunidades de empresas.

## Admin

Puede gestionar las entidades administrativas necesarias.

---

# 24. BACKEND NO DEBE CONFIAR EN EL FRONTEND

Nunca hacer:

```text
if (user.role === 'admin') {
   mostrar botón
}
```

como único mecanismo de seguridad.

El frontend puede ocultar botones por UX.

Pero la base de datos y backend deben impedir realmente la operación.

---

# 25. STORAGE

Preparar Supabase Storage para:

```text
company-assets
seller-assets
product-assets
verification-documents
```

Los documentos de verificación deben ser privados.

Las imágenes públicas pueden utilizar buckets con acceso apropiado.

No mezclar documentación sensible con imágenes públicas.

---

# 26. REALTIME

Supabase Realtime podrá utilizarse posteriormente para:

- mensajes nuevos;
- notificaciones;
- cambios de solicitudes;
- estados de conversaciones.

No activar lógica compleja de tiempo real hasta que el MVP de mensajería esté definido.

---

# 27. MATCHING

El backend debe quedar preparado para recomendar oportunidades.

Variables iniciales:

```text
sector
zona
experiencia
idiomas
especialización
producto
cliente objetivo
```

Primera versión del matching puede ser basada en filtros y coincidencias.

No empezar todavía con IA compleja.

---

# 28. FLUJO DE DATOS PRINCIPAL

```text
AUTH USER
   ↓
PROFILE
   ├── COMPANY PROFILE
   │       ↓
   │    PRODUCTS
   │       ↓
   │    OPPORTUNITIES
   │       ↓
   │    REQUESTS
   │       ↓
   │    CONTACTS
   │       ↓
   │    CONVERSATIONS
   │       ↓
   │    AGREEMENTS
   │       ↓
   │    SALES
   │       ↓
   │    COMMISSIONS
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

# 29. BACKEND API / SERVICES

En React, mantener services separados:

```text
services/
├── api.js
├── auth.js
├── companies.js
├── sellers.js
├── products.js
├── opportunities.js
├── requests.js
├── contacts.js
├── messages.js
├── agreements.js
├── sales.js
├── commissions.js
└── notifications.js
```

Cada service debe representar una responsabilidad clara.

---

# 30. FUNCIONES DE BACKEND

Cuando una operación requiera reglas de negocio o datos sensibles, utilizar RPC/Edge Functions en lugar de confiar en el cliente.

Ejemplos futuros:

```text
create_agreement
confirm_sale
calculate_commission
approve_commission
reveal_seller_identity
create_contact_from_request
```

Estas funciones deberán validar:

- usuario autenticado;
- rol;
- pertenencia al recurso;
- estado de la operación;
- reglas de negocio.

---

# 31. REVELACIÓN DE IDENTIDAD

Debe existir un flujo explícito para revelar identidad.

No debe hacerse automáticamente simplemente porque exista un contacto.

Conceptualmente:

```text
SELLER ANÓNIMO
       ↓
INTERÉS
       ↓
CONTACTO
       ↓
CONVERSACIÓN
       ↓
SELLER DECIDE REVELAR IDENTIDAD
       ↓
identity_revealed_at
```

La implementación definitiva deberá definir qué campos se muestran después de la revelación.

---

# 32. AUDITORÍA

A medida que aumente la importancia de las operaciones, añadir auditoría para acciones sensibles:

- cambios de rol;
- verificaciones;
- revelación de identidad;
- acuerdos;
- cambios de comisión;
- confirmación de ventas;
- pagos.

Para el MVP puede implementarse progresivamente, pero la arquitectura debe permitirlo.

---

# 33. MIGRACIONES

Toda modificación estructural de Supabase debe hacerse mediante migraciones.

No modificar producción manualmente sin dejar registro.

Orden recomendado:

```text
migration_001_initial_schema
migration_002_security_hardening
migration_003_storage
migration_004_realtime
migration_005_business_functions
...
```

---

# 34. TIPOS TYPESCRIPT

Después de cambios de esquema, regenerar los tipos de Supabase.

Guardar los tipos generados en el frontend/backend correspondiente, por ejemplo:

```text
src/types/database.types.ts
```

Los servicios deben utilizar esos tipos para evitar inconsistencias entre frontend y base de datos.

---

# 35. DATOS QUE NO DEBEN ESTAR EN EL FRONTEND

Nunca incluir:

- service role key;
- secretos;
- credenciales privadas;
- documentos de identidad;
- información privada de otros usuarios.

El frontend solo debe usar la clave pública/publishable correspondiente y acceso RLS.

---

# 36. FASES DE BACKEND

## FASE 1 — BASE DE DATOS

Estado: **iniciada/completada para el esquema inicial**.

Ya existe:

- Auth integration;
- profiles;
- empresas;
- comerciales;
- privacidad del comercial;
- categorías;
- productos;
- oportunidades;
- solicitudes;
- contactos;
- mensajes;
- acuerdos;
- ventas;
- comisiones;
- notificaciones;
- verificación;
- guardados;
- índices;
- triggers;
- RLS.

## FASE 2 — AUTH

Implementar:

- registro empresa;
- registro comercial;
- login;
- logout;
- recuperación de contraseña;
- creación automática del profile;
- selección de rol controlada.

## FASE 3 — PERFILES

Implementar:

- perfil empresa;
- perfil comercial;
- alias anónimo;
- visibilidad;
- categorías;
- idiomas;
- regiones.

## FASE 4 — PRODUCTOS

Implementar CRUD para empresas.

## FASE 5 — OPORTUNIDADES

Implementar publicación y gestión.

## FASE 6 — MARKETPLACE

Implementar búsqueda y filtros.

## FASE 7 — SOLICITUDES

Implementar `Me interesa`.

## FASE 8 — CONTACTOS + MENSAJES

Implementar comunicación entre partes.

## FASE 9 — ACUERDOS

Implementar acuerdos comerciales.

## FASE 10 — VENTAS + COMISIONES

Implementar el seguimiento económico.

## FASE 11 — NOTIFICACIONES

Implementar eventos y avisos.

## FASE 12 — MATCHING

Implementar recomendaciones por compatibilidad.

---

# 37. MVP REAL

No es necesario implementar todo el esquema para lanzar el MVP.

El mínimo funcional debe poder hacer:

```text
REGISTRO
 ↓
PERFIL
 ↓
EMPRESA PUBLICA PRODUCTO
 ↓
EMPRESA PUBLICA OPORTUNIDAD
 ↓
COMERCIAL ANÓNIMO VE OPORTUNIDAD
 ↓
ME INTERESA
 ↓
EMPRESA RECIBE SOLICITUD
 ↓
CONTACTO
 ↓
MENSAJES
```

Después se añade:

```text
ACUERDO
 ↓
VENTA
 ↓
COMISIÓN
```

---

# 38. NO SOBRECONSTRUIR

Aunque la base esté preparada para ventas, pagos, comisiones y reputación, no desarrollar todo simultáneamente.

Primero validar:

```text
EMPRESA ↔ SELLIO ↔ COMERCIAL
```

El valor inicial está en la conexión.

---

# 39. CRITERIO DE ÉXITO DEL BACKEND

El backend estará correctamente construido cuando:

- cada usuario tenga una identidad segura;
- los roles estén separados;
- las empresas controlen sus recursos;
- los comerciales puedan permanecer anónimos;
- los datos privados estén protegidos;
- los productos y oportunidades estén separados;
- el comercial pueda mostrar interés;
- empresa y comercial puedan contactar;
- los mensajes estén aislados por conversación;
- los acuerdos puedan registrar condiciones;
- las ventas puedan registrar resultados;
- las comisiones puedan calcularse y pagarse posteriormente;
- RLS impida acceso indebido;
- las migraciones permitan evolucionar el esquema.

---

# 40. REGLA FINAL

**No construir el backend pensando en una tienda online.**

Construirlo pensando en esta relación:

```text
EMPRESA TIENE PRODUCTO
        ↓
EMPRESA NECESITA VENTAS
        ↓
CREA OPORTUNIDAD
        ↓
COMERCIAL ANÓNIMO DESCUBRE
        ↓
COMERCIAL SE ACERCA
        ↓
RELACIÓN COMERCIAL
        ↓
VENTA
        ↓
COMISIÓN
```

Esta cadena es el núcleo de Sellio y debe guiar la arquitectura completa del backend.

# FIN
