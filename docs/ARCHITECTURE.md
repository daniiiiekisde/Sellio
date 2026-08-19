# SELLIO — Arquitectura del Sistema (Architecture V1)

## 1. Visión General
Sellio es una plataforma B2B que conecta empresas y fabricantes con comerciales y agentes de ventas multicartera e independientes.

## 2. Flujo Principal del Dominio
```text
COMPANY
   ↓
PRODUCT
   ↓
OPPORTUNITY
   ↓
REQUEST (Interés comercial o invitación)
   ↓
CONTACT (Mensajería y negociación preliminar)
   ↓
AGREEMENT (Condiciones pactadas)
   ↓
SALE (Registro de venta con snapshot inmutable)
   ↓
COMMISSION (Liquidación 100% íntegra al comercial + Sellio Fee ≤ 5%)
   ↓
PAYMENT / PAYOUT (Cobro y transferencia)
```

## 3. Principios Arquitectónicos
1. **Autoridad en Backend:** El frontend no decide ni muta fórmulas económicas. Toda liquidación y validación se respalda en backend.
2. **Inmutabilidad Financiera:** Una venta confirmada congela sus condiciones en un snapshot inmutable (`sales_snapshots` / `commission_transactions`).
3. **Privacidad Progresiva:** La identidad legal del comercial no se expone públicamente; se anonimiza mediante handles (`Comercial #XXXX`) hasta la revelación consentida.
4. **Desacoplamiento UI-Backend:** Los componentes React consumen hooks y servicios dedicados (`src/services/`, `src/hooks/`), sin consultas SQL directas.
5. **Máquina de Estados Estricta:** Las transiciones de estado (`src/utils/stateTransitions.js`) prohíben saltos ilegales o alteraciones desde el cliente.

## 4. Estructura de Directorios Objetivo
```text
src/
├── app/              # Router, providers y layout base
├── features/         # Módulos por dominio de negocio
│   ├── auth/
│   ├── companies/
│   ├── sellers/
│   ├── products/
│   ├── opportunities/
│   ├── agreements/
│   ├── sales/
│   └── commissions/
├── components/       # Componentes visuales compartidos y layouts
├── hooks/            # Hooks de React para acceso a datos
├── services/         # Servicios de integración con Supabase / APIs
├── utils/            # Motor económico, validadores, estados y privacidad
├── tests/            # Suite de tests unitarios y de integración (Vitest)
└── styles/           # Sistema de diseño y variables CSS
```
