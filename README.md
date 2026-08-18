# Sellio — Marketplace B2B

Plataforma marketplace B2B que conecta empresas y fabricantes con comerciales, agentes de ventas independientes y distribuidores.

## 🚀 Arquitectura del Proyecto

```text
src/
├── assets/          # Imágenes, iconos y fuentes estáticas locales
├── components/      # Componentes UI reutilizables (Button, Card, Modal, Navbar, etc.)
├── context/         # Contextos de React (AuthContext, AppContext)
├── hooks/           # Custom hooks de React (useAuth, useCompanies, useProducts, etc.)
├── layouts/         # Layouts principales (PublicLayout, AuthLayout, DashboardLayout)
├── pages/           # Vistas y páginas de la aplicación
│   ├── company/     # Vistas exclusivas de Empresas
│   ├── seller/      # Vistas exclusivas de Comerciales
│   └── admin/       # Vistas exclusivas de Administradores
├── routes/          # Definición y control de rutas con React Router
├── services/        # Capa de servicios y comunicación API
├── styles/          # Tokens CSS globales y variables de diseño
└── utils/           # Constantes, formateadores y validadores
```

## 🛠️ Tecnologías

- **React 18**
- **Vite**
- **React Router 6**
- **Lucide Icons**
- **Vanilla CSS (Design Tokens & Glassmorphism)**

## 📦 Instalación y Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
```
