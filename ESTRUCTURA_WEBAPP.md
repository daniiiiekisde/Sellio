# SELLIO — INSTRUCCIONES DEFINITIVAS DE ESTRUCTURA DE LA WEB APP

## 0. PROPÓSITO DE ESTE DOCUMENTO

Este archivo es una instrucción directa para el agente de desarrollo que trabaja sobre el repositorio **Sellio**.

El problema actual es que la estructura técnica inicial existe, pero la arquitectura funcional de la aplicación no está suficientemente separada por responsabilidades.

**NO crear otra arquitectura paralela.**

**NO duplicar el proyecto.**

**NO crear carpetas genéricas solo porque aparezcan en ejemplos anteriores.**

Debes tomar la estructura que ya existe en `src/` y reorganizarla para que represente correctamente el producto Sellio.

El repositorio ya dispone de las áreas principales `assets`, `components`, `context`, `hooks`, `layouts`, `pages`, `routes`, `services`, `styles` y `utils`. Deben conservarse y evolucionar sobre esa base.

---

# 1. QUÉ ES SELLIO

Sellio es un **marketplace B2B de oportunidades comerciales**.

Conecta principalmente dos lados:

```text
EMPRESAS / MARCAS / FABRICANTES
            ↕
          SELLIO
            ↕
COMERCIALES / AGENTES INDEPENDIENTES
```

La plataforma no debe tratarse como un e-commerce tradicional.

Sellio NO es principalmente:

- una tienda online;
- un portal de empleo;
- un marketplace de consumidores;
- una aplicación de inventario.

Sellio es una plataforma para que:

- una empresa publique productos y oportunidades comerciales;
- un comercial descubra productos y oportunidades;
- ambas partes puedan mostrar interés;
- ambas partes puedan comunicarse;
- posteriormente puedan establecer una relación comercial.

---

# 2. LOS 3 ROLES DE LA APLICACIÓN

La arquitectura debe distinguir claramente tres roles.

## 2.1 EMPRESA

La empresa utiliza Sellio para:

- crear y gestionar su perfil empresarial;
- publicar productos;
- publicar oportunidades comerciales;
- buscar comerciales;
- recibir solicitudes de comerciales;
- gestionar contactos;
- gestionar conversaciones;
- consultar actividad.

## 2.2 COMERCIAL

El comercial utiliza Sellio para:

- crear su perfil profesional;
- indicar experiencia y sectores;
- indicar zonas de trabajo;
- descubrir productos;
- descubrir oportunidades;
- buscar empresas;
- enviar interés o solicitudes;
- gestionar contactos;
- comunicarse con empresas;
- consultar comisiones cuando esa funcionalidad exista.

## 2.3 ADMIN

El administrador gestiona la plataforma completa:

- usuarios;
- empresas;
- comerciales;
- productos;
- oportunidades;
- conversaciones o incidencias cuando corresponda;
- transacciones o monetización cuando exista;
- configuración de la plataforma.

---

# 3. ESTRUCTURA OBJETIVO

La estructura funcional de `src/` debe terminar siendo conceptualmente equivalente a esto:

```text
src/
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
├── components/
│   ├── common/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Modal/
│   │   ├── SearchBar/
│   │   └── ...
│   │
│   ├── navigation/
│   │   ├── Navbar/
│   │   ├── Sidebar/
│   │   └── Footer/
│   │
│   ├── marketplace/
│   │   ├── ProductCard/
│   │   ├── OpportunityCard/
│   │   ├── CompanyCard/
│   │   └── SellerCard/
│   │
│   └── dashboard/
│       ├── DashboardHeader/
│       ├── StatsCard/
│       └── ...
│
├── pages/
│   ├── public/
│   │   ├── Home/
│   │   ├── Login/
│   │   └── Register/
│   │
│   ├── marketplace/
│   │   ├── Companies/
│   │   ├── Company/
│   │   ├── Products/
│   │   ├── Product/
│   │   ├── Sellers/
│   │   └── Seller/
│   │
│   ├── company/
│   │   ├── Dashboard/
│   │   ├── Products/
│   │   ├── Opportunities/
│   │   ├── Requests/
│   │   ├── Contacts/
│   │   ├── Messages/
│   │   └── Profile/
│   │
│   ├── seller/
│   │   ├── Dashboard/
│   │   ├── Marketplace/
│   │   ├── Companies/
│   │   ├── Products/
│   │   ├── Requests/
│   │   ├── Contacts/
│   │   ├── Messages/
│   │   ├── Commissions/
│   │   └── Profile/
│   │
│   └── admin/
│       ├── Dashboard/
│       ├── Users/
│       ├── Companies/
│       ├── Sellers/
│       ├── Products/
│       ├── Opportunities/
│       ├── Transactions/
│       └── Settings/
│
├── layouts/
│   ├── PublicLayout.jsx
│   ├── AuthLayout.jsx
│   └── DashboardLayout.jsx
│
├── services/
│   ├── api.js
│   ├── auth.js
│   ├── companies.js
│   ├── sellers.js
│   ├── products.js
│   ├── opportunities.js
│   └── messages.js
│
├── hooks/
│   ├── useAuth.js
│   ├── useCompanies.js
│   ├── useSellers.js
│   ├── useProducts.js
│   ├── useOpportunities.js
│   └── useMessages.js
│
├── context/
│   ├── AuthContext.jsx
│   └── AppContext.jsx
│
├── routes/
│   └── AppRoutes.jsx
│
├── utils/
│   ├── constants.js
│   ├── validators.js
│   └── formatters.js
│
├── styles/
│   ├── global.css
│   └── variables.css
│
├── App.jsx
└── main.jsx
```

Esta es la arquitectura objetivo. Adáptala al código existente en vez de eliminar y recrear todo sin criterio.

---

# 4. CAMBIO MÁS IMPORTANTE: `pages/` DEBE ESTAR ORGANIZADO POR ÁREA

La carpeta `pages/` no debe convertirse en una lista plana de páginas sin relación.

La organización principal debe ser:

```text
pages/
├── public/
├── marketplace/
├── company/
├── seller/
└── admin/
```

Esto es importante porque Sellio tiene **dos lados de negocio diferentes** y un panel de administración.

---

# 5. PÁGINAS PÚBLICAS

```text
pages/public/
├── Home/
├── Login/
└── Register/
```

Estas páginas no dependen de que el usuario esté autenticado.

### Home

Landing page de Sellio.

Debe explicar:

- qué es Sellio;
- para empresas;
- para comerciales;
- cómo funciona;
- propuesta de valor;
- llamada a registro.

### Login

Acceso común.

### Register

Registro inicial donde posteriormente se podrá seleccionar:

```text
Empresa
Comercial
```

El administrador no debe registrarse públicamente como usuario normal.

---

# 6. MARKETPLACE PÚBLICO / DESCUBRIMIENTO

```text
pages/marketplace/
├── Companies/
├── Company/
├── Products/
├── Product/
├── Sellers/
└── Seller/
```

Aquí se concentra el descubrimiento de oportunidades y perfiles.

## Companies

Listado de empresas.

## Company

Detalle de una empresa.

## Products

Listado y búsqueda de productos.

## Product

Detalle de un producto.

## Sellers

Listado de comerciales.

## Seller

Perfil público/profesional del comercial.

---

# 7. ÁREA DE EMPRESA

```text
pages/company/
├── Dashboard/
├── Products/
├── Opportunities/
├── Requests/
├── Contacts/
├── Messages/
└── Profile/
```

## Dashboard

Resumen de actividad de la empresa.

No mezclar este dashboard con el de comercial o admin.

## Products

Gestión de productos publicados por la empresa.

## Opportunities

Aquí viven las oportunidades comerciales.

Ejemplo conceptual:

> Buscamos comerciales para vender nuestro producto en Cataluña.

Por tanto, `Opportunities` es una entidad funcional distinta de `Products`.

## Requests

Solicitudes/intereses recibidos por la empresa.

## Contacts

Relaciones o contactos comerciales establecidos.

## Messages

Mensajería de la empresa.

## Profile

Perfil y datos de la empresa.

---

# 8. ÁREA DE COMERCIAL

```text
pages/seller/
├── Dashboard/
├── Marketplace/
├── Companies/
├── Products/
├── Requests/
├── Contacts/
├── Messages/
├── Commissions/
└── Profile/
```

## Dashboard

Resumen de la actividad del comercial.

## Marketplace

Vista principal de oportunidades y productos para descubrir.

## Companies

Empresas que el comercial puede explorar.

## Products

Productos que puede buscar o guardar.

## Requests

Solicitudes enviadas por el comercial.

## Contacts

Relaciones comerciales.

## Messages

Mensajería.

## Commissions

Zona reservada para el futuro sistema de comisiones.

No implementar la lógica financiera ahora si todavía no está definida.

## Profile

Perfil profesional del comercial.

---

# 9. ÁREA ADMIN

```text
pages/admin/
├── Dashboard/
├── Users/
├── Companies/
├── Sellers/
├── Products/
├── Opportunities/
├── Transactions/
└── Settings/
```

El admin debe ser un área aislada del resto.

No reutilizar automáticamente las páginas de empresa/comercial como si fueran el panel admin.

El admin necesita vistas de gestión y supervisión.

---

# 10. COMPONENTES: NO HACER UN `components/` CAÓTICO

Los componentes reutilizables deben estar separados por función.

```text
components/
├── common/
├── navigation/
├── marketplace/
└── dashboard/
```

### `common/`

Elementos genéricos:

- Button
- Card
- Modal
- SearchBar
- inputs
- badges
- loaders
- etc.

### `navigation/`

- Navbar
- Sidebar
- Footer

### `marketplace/`

Componentes propios de la lógica marketplace:

- ProductCard
- OpportunityCard
- CompanyCard
- SellerCard

### `dashboard/`

Componentes específicos de dashboards:

- DashboardHeader
- StatsCard
- etc.

---

# 11. PRODUCTO Y OPORTUNIDAD NO SON LO MISMO

Este punto es MUY IMPORTANTE.

No modelar todo como `Product`.

Debe existir conceptualmente:

```text
PRODUCT
```

y

```text
OPPORTUNITY
```

### Product

Qué vende la empresa.

Ejemplo:

```text
Producto: Aceite ecológico
Empresa: Marca X
Categoría: Alimentación
```

### Opportunity

Qué busca la empresa a nivel comercial.

Ejemplo:

```text
Buscamos comercial
Zona: Cataluña
Sector: Alimentación / Horeca
Producto: Aceite ecológico
```

Una oportunidad puede estar relacionada con uno o varios productos.

---

# 12. SERVICES DEBEN REFLEJAR LAS ENTIDADES

No limitar `services/` a unas pocas categorías antiguas.

Usar:

```text
services/
├── api.js
├── auth.js
├── companies.js
├── sellers.js
├── products.js
├── opportunities.js
└── messages.js
```

No crear llamadas reales al backend si todavía no existen endpoints.

El objetivo inicial es que la estructura quede preparada.

---

# 13. HOOKS

Los hooks deben seguir la misma separación.

```text
hooks/
├── useAuth.js
├── useCompanies.js
├── useSellers.js
├── useProducts.js
├── useOpportunities.js
└── useMessages.js
```

No mezclar toda la lógica de marketplace dentro de `useProducts`.

Las oportunidades deben poder evolucionar de forma independiente.

---

# 14. ROUTES

`src/routes/AppRoutes.jsx` será la fuente principal de las rutas.

Las rutas deben quedar conceptualmente así:

```text
PUBLIC
/
/login
/register

MARKETPLACE
/companies
/companies/:id
/products
/products/:id
/sellers
/sellers/:id

COMPANY
/company/dashboard
/company/products
/company/opportunities
/company/requests
/company/contacts
/company/messages
/company/profile

SELLER
/seller/dashboard
/seller/marketplace
/seller/companies
/seller/products
/seller/requests
/seller/contacts
/seller/messages
/seller/commissions
/seller/profile

ADMIN
/admin/dashboard
/admin/users
/admin/companies
/admin/sellers
/admin/products
/admin/opportunities
/admin/transactions
/admin/settings
```

La nomenclatura de las rutas debe seguir esta separación.

---

# 15. LAYOUTS

Debe haber tres layouts conceptuales:

```text
PublicLayout
AuthLayout
DashboardLayout
```

## PublicLayout

Navbar + contenido + Footer.

## AuthLayout

Login / Register.

## DashboardLayout

Zona privada.

El `DashboardLayout` debe ser reutilizable para empresa, comercial y admin, pero permitir navegación distinta según el rol.

---

# 16. AUTENTICACIÓN Y ROLES

`AuthContext` debe representar como mínimo la idea de:

```text
user
isAuthenticated
userType
loading
login
logout
```

`userType` deberá poder distinguir:

```text
COMPANY
SELLER
ADMIN
```

No desarrollar todavía un sistema de permisos de backend ficticio.

Sí dejar preparada la arquitectura para:

- protected routes;
- role-based navigation;
- role-based pages;
- redirecciones.

---

# 17. QUÉ DEBE MOVERSE / REORGANIZARSE

Antes de crear archivos nuevos, revisar qué existe actualmente.

El repositorio ya contiene una estructura base con:

```text
src/assets
src/components
src/context
src/hooks
src/layouts
src/pages
src/routes
src/services
src/styles
src/utils
```

Por tanto:

1. reutiliza esas carpetas;
2. mueve archivos existentes a su categoría correcta cuando sea necesario;
3. cambia imports afectados;
4. elimina duplicados;
5. no mantengas dos arquitecturas paralelas.

---

# 18. QUÉ NO DEBE HACER EL AGENTE

NO hacer esto:

```text
pages/
Home.jsx
Login.jsx
Company.jsx
Seller.jsx
Dashboard.jsx
...
```

No dejar una carpeta `pages` plana para todo.

NO hacer esto:

```text
components/
Everything.jsx
MegaCard.jsx
MainContent.jsx
```

No crear componentes gigantes que mezclen múltiples áreas de negocio.

NO hacer esto:

- meter lógica de empresa dentro de la página de comercial;
- mezclar admin con usuario final;
- tratar oportunidades como si fueran productos;
- crear endpoints inventados;
- duplicar servicios;
- duplicar layouts;
- crear una segunda estructura paralela a la indicada aquí.

---

# 19. REGLA DE ESCALABILIDAD

La estructura debe permitir que el proyecto crezca sin terminar con algo como:

```text
src/
  200 archivos mezclados
```

Cada área de negocio debe tener límites claros.

```text
PUBLIC
MARKETPLACE
COMPANY
SELLER
ADMIN
```

Ese es el principio organizativo principal de Sellio.

---

# 20. ORDEN DE TRABAJO

El agente debe actuar en este orden:

### FASE 1 — AUDITORÍA

Revisar todos los archivos actuales del repositorio.

### FASE 2 — MAPEO

Decidir qué archivo existente pertenece a qué área.

### FASE 3 — REORGANIZACIÓN

Mover/crear carpetas y archivos siguiendo esta estructura.

### FASE 4 — IMPORTS

Actualizar todos los imports y rutas rotas.

### FASE 5 — ROUTING

Ajustar `AppRoutes.jsx`.

### FASE 6 — LAYOUTS

Asegurar que las páginas usan el layout apropiado.

### FASE 7 — VALIDACIÓN

Comprobar que:

- el proyecto inicia;
- no existen imports rotos;
- no existen rutas duplicadas;
- no existen componentes duplicados;
- la estructura coincide con este documento.

---

# 21. CRITERIO DE ACEPTACIÓN

La reorganización se considera correcta cuando:

- `pages/` está separado por áreas;
- empresa, comercial y admin están claramente diferenciados;
- marketplace está separado de dashboards privados;
- productos y oportunidades están diferenciados;
- `components/` está organizado por función;
- `services/` refleja las entidades principales;
- `hooks/` refleja las entidades principales;
- routing refleja la misma arquitectura;
- no hay dos arquitecturas simultáneas;
- la aplicación sigue funcionando.

---

# 22. PRIORIDAD

La prioridad ahora NO es añadir más funcionalidades.

La prioridad es conseguir una **estructura de aplicación correcta**.

Primero:

```text
ARQUITECTURA
    ↓
ESTRUCTURA
    ↓
ROUTING
    ↓
LAYOUTS
    ↓
COMPONENTES
    ↓
FUNCIONALIDADES
```

No saltar directamente al último punto.

---

# 23. INSTRUCCIÓN FINAL AL AGENTE

Trabaja sobre el repositorio Sellio existente.

Lee este documento antes de modificar la estructura.

**No interpretes esta estructura como una sugerencia. Es la arquitectura funcional que debe seguir la aplicación.**

No inventes otra organización.

No dupliques carpetas.

No borres código funcional sin analizarlo primero.

Reorganiza lo que ya existe y, después, crea únicamente lo necesario para completar esta arquitectura.

Cuando termines, la estructura del proyecto debe permitir entender a simple vista dónde está:

```text
PUBLIC
MARKETPLACE
COMPANY
SELLER
ADMIN
```

y cada una de esas áreas debe tener sus propios componentes, páginas y lógica sin mezclar responsabilidades.

# FIN DE LAS INSTRUCCIONES
