# SELLIO — Guía de Despliegue (DEPLOYMENT.md)

## 1. Variables de Entorno Requeridas
Configurar en el entorno de despliegue (ej. Vercel, Netlify o Cloudflare Pages):

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-anon-key-publica
```

> **Aviso de Seguridad:** Nunca incluir la `SERVICE_ROLE_KEY` en el frontend ni en variables con prefijo `VITE_`.

## 2. Compilación y Despliegue
1. Ejecutar `npm test` para asegurar que todas las suites de pruebas unitarias y de validación pasan.
2. Ejecutar `npm run build` para generar el bundle optimizado en la carpeta `dist/`.
3. Desplegar el directorio `dist/` en el proveedor de alojamiento estático preferido.
