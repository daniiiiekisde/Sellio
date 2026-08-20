# SELLIO — Guía de Despliegue (DEPLOYMENT.md)

## 1. Variables de Entorno Requeridas

Sellio está conectado al proyecto Supabase de producción:

```env
VITE_SUPABASE_URL=https://kabjkjqruaxnuovedzgo.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_p9c-bmS1YyyAyPCazVPDDA_NoHpMiVN
```

El cliente Supabase de la aplicación lee estas variables desde `import.meta.env`.

> **Aviso de Seguridad:** Nunca incluir una `SERVICE_ROLE_KEY` en el frontend ni en variables con prefijo `VITE_`. La publishable/anon key sí está diseñada para uso público en el cliente; el acceso real a los datos debe quedar protegido mediante RLS y las políticas de Supabase.

## 2. Compilación y Despliegue

1. Ejecutar `npm test` para asegurar que las suites de pruebas pasan.
2. Ejecutar `npm run build` para generar el bundle optimizado en `dist/`.
3. Desplegar `dist/` en el proveedor de alojamiento estático preferido.
4. Si el proveedor gestiona variables de entorno por separado, configurar las mismas `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` allí.
