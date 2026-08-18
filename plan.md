# Proyecto MVP — Estructura inicial de la Web App

## 1. Objetivo

Crear la estructura base de una web app para un marketplace B2B que conecta:

* Empresas que quieren vender sus productos.
* Comerciales/vendedores independientes que buscan productos y empresas para representar.
* Administradores de la plataforma.

El objetivo de esta primera fase es **crear una arquitectura limpia, escalable y preparada para el desarrollo posterior del MVP**.

> IMPORTANTE: En esta fase NO desarrollar funcionalidades complejas que todavía no hayan sido especificadas. Primero crear correctamente la estructura, rutas, componentes base y separación de responsabilidades.

---

# 2. Stack inicial

Utilizar:

* React
* Vite
* JavaScript/JSX
* CSS
* React Router para navegación

La arquitectura debe permitir incorporar posteriormente:

* Backend/API
* Base de datos
* Autenticación
* Sistema de mensajería
* Sistema de comisiones
* Pagos
* Notificaciones
* Panel administrativo

No implementar estas funcionalidades todavía salvo que sean necesarias para dejar preparada la arquitectura.

---

# 3. Estructura raíz

Crear la siguiente estructura:

```text
proyecto-mvp/
│
├── public/
│   ├── images/
│   └── icons/
│
├── src/
│   │
│   ├── assets/
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── components/
│   │   ├── Navbar/
│   │   ├── Footer/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Modal/
│   │   ├── SearchBar/
│   │   └── ProductCard/
│   │
│   ├── pages/
│   │   │
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── Register/
│   │   ├── Dashboard/
│   │   ├── Companies/
│   │   ├── Company/
│   │   ├── Products/
│   │   ├── Product/
│   │   ├── Sellers/
│   │   ├── Seller/
│   │   ├── Messages/
│   │   ├── Profile/
│   │   ├── Settings/
│   │   │
│   │   ├── company/
│   │   │   ├── Dashboard/
│   │   │   ├── Products/
│   │   │   ├── Requests/
│   │   │   ├── Orders/
│   │   │   └── Profile/
│   │   │
│   │   ├── seller/
│   │   │   ├── Dashboard/
│   │   │   ├── Marketplace/
│   │   │   ├── Companies/
│   │   │   ├── Contacts/
│   │   │   ├── Commissions/
│   │   │   └── Profile/
│   │   │
│   │   └── admin/
│   │       ├── Dashboard/
│   │       ├── Users/
│   │       ├── Companies/
│   │       ├── Sellers/
│   │       ├── Products/
│   │       ├── Transactions/
│   │       └── Settings/
│   │
│   ├── layouts/
│   │   ├── PublicLayout.jsx
│   │   ├── DashboardLayout.jsx
│   │   └── AuthLayout.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── companies.js
│   │   ├── products.js
│   │   ├── sellers.js
│   │   └── messages.js
│   │
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useCompanies.js
│   │   ├── useProducts.js
│   │   └── useMessages.js
│   │
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   └── AppContext.jsx
│   │
│   ├── routes/
│   │   └── AppRoutes.jsx
│   │
│   ├── utils/
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   └── constants.js
│   │
│   ├── styles/
│   │   ├── global.css
│   │   └── variables.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

# 4. Arquitectura de usuarios

La plataforma tendrá inicialmente tres tipos principales de usuario:

```text
                    PLATAFORMA
                        │
          ┌─────────────┼─────────────┐
          │             │             │
       EMPRESA       COMERCIAL       ADMIN
          │             │             │
     Productos      Marketplace      Control
     Ofertas        Empresas         Usuarios
     Solicitudes    Productos        Empresas
     Pedidos        Contactos        Comerciales
     Perfil         Comisiones       Productos
                                   Transacciones
```

## Empresa

La empresa utilizará la plataforma para:

* Crear su perfil empresarial.
* Publicar productos.
* Gestionar productos.
* Encontrar comerciales.
* Recibir solicitudes.
* Gestionar contactos.
* Gestionar pedidos en fases posteriores.
* Consultar información de actividad.

Ruta conceptual:

```text
/pages/company/
```

---

## Comercial

El comercial utilizará la plataforma para:

* Crear su perfil profesional.
* Explorar empresas.
* Explorar productos.
* Buscar oportunidades.
* Contactar con empresas.
* Gestionar contactos.
* Consultar comisiones.
* Gestionar su actividad.

Ruta conceptual:

```text
/pages/seller/
```

---

## Administrador

El administrador tendrá control global sobre la plataforma.

Debe poder gestionarse posteriormente:

* Usuarios.
* Empresas.
* Comerciales.
* Productos.
* Transacciones.
* Configuración.
* Actividad de la plataforma.

Ruta conceptual:

```text
/pages/admin/
```

---

# 5. Componentes

La carpeta:

```text
src/components/
```

debe contener componentes reutilizables.

## Navbar

```text
components/Navbar/
```

Responsable de la navegación principal.

Debe estar preparado para cambiar según:

* Usuario no autenticado.
* Empresa.
* Comercial.
* Administrador.

---

## Footer

```text
components/Footer/
```

Footer general reutilizable.

---

## Button

```text
components/Button/
```

Componente reutilizable para botones.

Debe permitir posteriormente variantes como:

* Primary
* Secondary
* Outline
* Danger
* Disabled

No hace falta implementar todas las variantes ahora si no son necesarias.

---

## Card

```text
components/Card/
```

Componente genérico para contenidos reutilizables.

---

## Modal

```text
components/Modal/
```

Componente base para ventanas modales.

---

## SearchBar

```text
components/SearchBar/
```

Componente reutilizable para búsquedas.

---

## ProductCard

```text
components/ProductCard/
```

Componente específico para mostrar productos.

Debe quedar preparado para mostrar posteriormente:

* Imagen.
* Nombre.
* Empresa.
* Categoría.
* Descripción.
* Precio si corresponde.
* Información adicional.
* CTA.

---

# 6. Pages

## Páginas públicas

```text
/pages/Home/
/pages/Login/
/pages/Register/
```

Estas páginas serán accesibles sin autenticación.

---

## Marketplace

```text
/pages/Companies/
/pages/Company/
/pages/Products/
/pages/Product/
/pages/Sellers/
/pages/Seller/
```

Estas páginas servirán para explorar:

* Empresas.
* Productos.
* Comerciales.

La información real se conectará posteriormente mediante API.

---

# 7. Dashboard

Crear una estructura preparada para dashboards.

```text
/pages/Dashboard/
```

Y dashboards específicos:

```text
/pages/company/Dashboard/
/pages/seller/Dashboard/
/pages/admin/Dashboard/
```

El dashboard que se muestre deberá depender del tipo de usuario autenticado.

---

# 8. Layouts

Crear:

```text
src/layouts/
```

## PublicLayout

Para páginas públicas.

Ejemplo conceptual:

```text
Navbar
   ↓
Contenido
   ↓
Footer
```

---

## AuthLayout

Para:

* Login.
* Registro.
* Recuperación de acceso en el futuro.

---

## DashboardLayout

Para zonas privadas.

Ejemplo:

```text
Sidebar / Navigation
        ↓
Topbar
        ↓
Contenido
```

Debe estar preparado para adaptarse a:

* Empresa.
* Comercial.
* Administrador.

---

# 9. Services

Crear:

```text
src/services/
```

Los services serán la capa encargada de comunicarse con el backend.

## api.js

Configurar aquí la base para futuras peticiones HTTP.

Ejemplo conceptual:

```text
API
 │
 ├── Auth
 ├── Companies
 ├── Products
 ├── Sellers
 └── Messages
```

No crear todavía endpoints ficticios que no existan.

---

## auth.js

Preparar la lógica relacionada con autenticación.

---

## companies.js

Preparar las funciones relacionadas con empresas.

---

## products.js

Preparar las funciones relacionadas con productos.

---

## sellers.js

Preparar las funciones relacionadas con comerciales.

---

## messages.js

Preparar la futura comunicación/mensajería entre usuarios.

---

# 10. Hooks

Crear:

```text
src/hooks/
```

Hooks previstos:

```text
useAuth.js
useCompanies.js
useProducts.js
useMessages.js
```

Su objetivo es centralizar lógica reutilizable relacionada con cada área.

No crear lógica compleja hasta que la funcionalidad correspondiente esté definida.

---

# 11. Context

Crear:

```text
src/context/
```

## AuthContext

Responsable del estado global de autenticación.

Debe quedar preparado para almacenar posteriormente información como:

```text
user
isAuthenticated
userType
loading
login
logout
```

---

## AppContext

Para estados globales de aplicación que no correspondan directamente a autenticación.

---

# 12. Routing

Crear:

```text
src/routes/AppRoutes.jsx
```

Centralizar aquí las rutas de la aplicación.

La estructura deberá permitir posteriormente rutas públicas y privadas.

Conceptualmente:

```text
PUBLIC
├── /
├── /login
└── /register

COMPANY
├── /company/dashboard
├── /company/products
├── /company/requests
├── /company/orders
└── /company/profile

SELLER
├── /seller/dashboard
├── /seller/marketplace
├── /seller/companies
├── /seller/contacts
├── /seller/commissions
└── /seller/profile

ADMIN
├── /admin/dashboard
├── /admin/users
├── /admin/companies
├── /admin/sellers
├── /admin/products
├── /admin/transactions
└── /admin/settings
```

Preparar la arquitectura para implementar posteriormente:

* Protected routes.
* Role-based access.
* Redirecciones según usuario.

---

# 13. Utils

Crear:

```text
src/utils/
```

## validators.js

Validaciones reutilizables.

Ejemplos futuros:

* Email.
* Contraseña.
* Formularios.
* Datos empresariales.

---

## formatters.js

Funciones para formatear datos.

Ejemplos:

* Moneda.
* Fechas.
* Texto.
* Datos de usuario.

---

## constants.js

Constantes globales.

Por ejemplo, tipos de usuario:

```text
COMPANY
SELLER
ADMIN
```

Evitar repetir strings directamente por toda la aplicación.

---

# 14. Styles

Crear:

```text
src/styles/
```

## global.css

Estilos globales.

Debe incluir únicamente estilos generales de la aplicación.

---

## variables.css

Variables globales preparadas para definir posteriormente:

* Colores.
* Tipografías.
* Espaciados.
* Border radius.
* Sombras.
* Breakpoints.

No fijar una identidad visual definitiva si todavía no ha sido definida.

---

# 15. Assets

Separar:

```text
src/assets/
├── images/
├── icons/
└── fonts/
```

Los assets propios de la aplicación deberán mantenerse separados del contenido público de `public/`.

---

# 16. Public

Utilizar:

```text
public/
├── images/
└── icons/
```

Para recursos que deban servirse directamente desde la raíz pública.

---

# 17. Variables de entorno

Crear:

```text
.env
```

No introducir claves reales.

Preparar únicamente la estructura necesaria para futuras variables, por ejemplo:

```text
VITE_API_URL=
```

Nunca subir secretos al repositorio.

El `.env` debe estar incluido en `.gitignore` cuando corresponda.

---

# 18. Seguridad y arquitectura

Desde el principio mantener estas reglas:

1. No guardar secretos en el frontend.
2. No incluir API keys privadas en React.
3. No confiar en el frontend para controlar permisos.
4. Los permisos reales deberán validarse posteriormente en backend.
5. Separar claramente UI, lógica y comunicación con API.
6. Evitar duplicación de código.
7. Crear componentes reutilizables.
8. Mantener nombres consistentes.
9. No crear archivos innecesarios.
10. No desarrollar funcionalidades que todavía no estén definidas.

---

# 19. Convenciones

Utilizar nombres claros y consistentes.

Componentes React:

```text
PascalCase
```

Ejemplo:

```text
ProductCard.jsx
DashboardLayout.jsx
```

Hooks:

```text
useNombre.js
```

Services:

```text
nombre.js
```

Utilidades:

```text
nombre.js
```

---

# 20. Objetivo de esta primera implementación

En esta primera fase el agente debe:

### PASO 1

Crear el proyecto React + Vite.

### PASO 2

Crear toda la estructura de carpetas.

### PASO 3

Crear los archivos base necesarios.

### PASO 4

Configurar React Router.

### PASO 5

Crear las rutas iniciales.

### PASO 6

Crear los layouts.

### PASO 7

Crear componentes base reutilizables.

### PASO 8

Preparar `AuthContext`.

### PASO 9

Preparar la estructura de services, hooks y utils.

### PASO 10

Comprobar que la aplicación arranca correctamente.

---

# 21. IMPORTANTE — No desarrollar todavía

NO implementar todavía:

* Sistema de pagos.
* Sistema de comisiones real.
* Base de datos.
* Backend definitivo.
* Chat real.
* Notificaciones reales.
* Algoritmo de matching.
* Sistema completo de pedidos.
* Verificación empresarial.
* KYC.
* Suscripciones.
* Automatizaciones.
* Funcionalidades avanzadas de administración.

Estas funcionalidades se definirán posteriormente.

---

# 22. Resultado esperado

Al finalizar esta fase debe existir una aplicación React funcional con una arquitectura limpia y preparada para crecer.

La prioridad es:

```text
ESTRUCTURA
     ↓
ROUTING
     ↓
LAYOUTS
     ↓
COMPONENTES
     ↓
AUTENTICACIÓN PREPARADA
     ↓
SERVICES PREPARADOS
     ↓
FUNCIONALIDADES DEL MVP
```

No saltarse directamente al desarrollo de funcionalidades sin haber dejado organizada esta base.

---

# 23. Regla principal para el agente

**No inventar funcionalidades ni decisiones de negocio que no estén especificadas.**

Cuando exista una decisión técnica necesaria que pueda afectar a la arquitectura futura, detenerse y explicarla antes de hacer una implementación que pueda obligar a rehacer el proyecto.

La aplicación debe construirse pensando en que el MVP será posteriormente ampliado a una plataforma completa.

# FIN
