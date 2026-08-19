# SELLIO — Guía de Desarrollo Local (DEVELOPMENT.md)

## 1. Requisitos Previos
- Node.js >= 18.x
- npm >= 9.x

## 2. Instalación y Puesta en Marcha
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo Vite
npm run dev

# Ejecutar suite de pruebas con Vitest
npm test

# Compilación de producción
npm run build
```

## 3. Estándares de Código y Validación
- **Consistencia de comisiones:** Utilizar siempre `calculateCommissions()` de `src/utils/commissionCalculator.js`. Nunca hardcodear porcentajes o restas de comisiones en componentes UI.
- **Transiciones de estado:** Validar antes de mutar cualquier entidad usando `validateStateTransition()` de `src/utils/stateTransitions.js`.
- **Desacoplamiento UI:** Nunca importar directamente `supabaseClient` en componentes visuales. Usar los hooks (`useCommissions`, `useSales`, `useAgreements`, etc.).
