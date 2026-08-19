# SELLIO — CHECKLIST DE PULIDO UI/UX (POLISH V1)

Documento maestro de control de calidad visual, diseño, interacción y rendimiento para asegurar una experiencia B2B premium.

---

### 01. Design System Unificado
- [x] Tokens CSS globales consistentes (`--primary`, `--radius-xl`, `--shadow-md`, `--transition-normal`).
- [x] Componentes atómicos centralizados en `src/components/ui/` (Button, Input, Select, Badge, Card, Modal, Drawer, Toast).
- [x] Tipografía moderna sin fuentes por defecto del navegador.
- [x] Colores y contrastes validados para accesibilidad WCAG AA.

### 02. Navigation & Sidebar
- [x] Sidebar categorizado en grupos semánticos: *Inicio, Marketplace, Actividad, Finanzas, Perfil*.
- [x] Navegación contextual adaptada según rol (Comercial, Empresa, Administrador).
- [x] Selector rápido de rol (Demo Switcher) integrado con feedback visual.
- [x] Bottom Navigation Bar fija en dispositivos móviles.

### 03. Marketplace 2.0
- [x] Búsqueda reactiva con debounce e iconos integrados.
- [x] Filtros facetados laterales (Desktop) y Drawer emergente (Mobile).
- [x] Pestañas principales: *Para ti (Match), Radar, Todas, Guardadas, Catálogo*.
- [x] Alternancia fluida entre vista en Cuadrícula (Grid) y Lista (List).

### 04. Opportunity Card & Detail
- [x] Badges de estado, categoría y empresa verificada.
- [x] Indicador visual de Sellio Match con botón para ver el desglose explicativo.
- [x] Mini calculadora embebida de Sellio Potential en la tarjeta.
- [x] Ficha detallada B2B con checklist de requisitos, snapshot de versión y formulario anónimo.

### 05. Sellio Match Engine
- [x] Indicador de compatibilidad porcentual (ej. *95% Match*).
- [x] Desglose explicativo estructurado (Sector, Territorio, Experiencia, Idiomas).
- [x] Ejecución y validación backend mediante función RPC en base de datos.

### 06. Sellio Potential Simulator
- [x] Selector dinámico de presets de venta (10, 25, 50, 100 ventas).
- [x] Slider libre interactivo de proyección de ingresos.
- [x] Aviso visible de comisiones: *"La comisión del comercial no se reduce por la tarifa de Sellio"*.

### 07. Requests & Candidaturas
- [x] Postulación comercial protegiendo la identidad real (alias `#A482`).
- [x] Gestión de candidaturas en empresa con acciones directas de *Aceptar* y *Descartar*.
- [x] Revelación de contacto solo tras aceptación formal.

### 08. Messaging
- [x] Creación automática de conversación contextual tras aceptar solicitud.
- [x] Vinculación directa con la oportunidad y el acuerdo.

### 09. Agreements
- [x] Snapshot inmutable de condiciones contractuales fijadas (`offer_version`).
- [x] Transición formal de estados: `draft ──► pending_signature ──► active`.

### 10. Sales & Transactions
- [x] Registro de ventas con snapshot inmutable por trigger en BD.
- [x] Cálculo determinista de PVP × Unidades = Venta Bruta.

### 11. Commissions & Split
- [x] Desglose transparente: Comisión comercial (100% íntegra) + Tarifa Sellio (2% fijo).
- [x] Estados de liquidación claros: `pending ──► approved ──► paid`.

### 12. Dashboards (Comercial & Empresa)
- [x] Header de reputación profesional (Nivel PRO, estrellas, progreso a EXPERT).
- [x] Mini gráfico de evolución mensual y tarjeta de producto estrella.
- [x] Mini CRM de comerciales de mayor rendimiento.

### 13. Analytics & Pulse
- [x] Embudo de conversión real (Visitas ──► Solicitudes ──► Acuerdos ──► Ventas).
- [x] Distribución por canales y zonas de mayor penetración.

### 14. Profiles
- [x] Ficha de empresa verificada con Sellio Trust.
- [x] Perfil comercial con sectores, idiomas, territorios y credenciales colegiadas.

### 15. Admin Center
- [x] Panel global de control de usuarios, empresas y catálogos.
- [x] Centro de verificación y compliance de CIF/NIF.
- [x] Libro de auditoría y mediación de disputas.

### 16. Mobile-First Experience
- [x] Bottom Navigation Bar fija.
- [x] Filtros en Drawer deslizante inferior.
- [x] Tarjetas optimizadas para touch targets (mínimo 44px).

### 17. Accessibility (a11y)
- [x] Soporte para navegación por teclado (focus ring visible).
- [x] Atributos `aria-label` en botones de iconos y controles interactivos.

### 18. Loading, Empty & Error States
- [x] Skeletons elegantes de carga para cards y tablas.
- [x] Empty States contextuales con textos explicativos y botones de llamada a la acción.
- [x] Error States con botón de reintento.

### 19. Micro-animations & Feedback
- [x] Sistema de notificaciones flotantes Toast (éxito, error, aviso).
- [x] Transiciones suaves en hover de tarjetas y botones.
- [x] Feedback inmediato al guardar favoritos (animación de corazón).

### 20. Performance
- [x] Cero fallbacks falsos en la capa de datos.
- [x] Compilación Vite optimizada en menos de 3 segundos.

### 21. Final QA
- [x] Suite de 48 tests automáticos en Vitest pasando al 100%.
- [x] Pipeline de CI en GitHub Actions configurado con validación de tests y build.
