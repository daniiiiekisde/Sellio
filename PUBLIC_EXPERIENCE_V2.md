# Sellio — Public Experience V2

## Objetivo

Convertir la capa pública de Sellio en una experiencia de producto premium: más editorial, más tecnológica y menos parecida a una landing genérica, sin tocar la lógica de negocio.

## Dirección visual

- Creative-tech B2B.
- Tipografía grande pero controlada; evitar depender únicamente de titulares gigantes.
- Contraste entre superficies claras y escenas dark.
- Grid fino y ruido ambiental como textura, no como decoración dominante.
- Cards con profundidad y movimiento mínimo.
- CTA tratados como escenas finales, no como simples cajas.
- Responsive diseñado desde el contenido.

## Arquitectura visual

```text
PublicLayout
├── Navbar
├── PublicExperience
│   ├── Page-specific hero
│   ├── Narrative / proof
│   ├── Product explanation
│   └── Premium CTA
└── Footer
```

## Páginas pulidas

### Home
- Hero split con producto realista y simulador.
- Navegación flotante premium.
- Storytelling de marketplace, Match y economía.
- CTA final de alto impacto.

### Cómo funciona
- Escena dark editorial.
- Flujo 01 → 04 en una composición continua.
- Mensaje centrado en reducir fricción.
- CTA final orientado a empezar.

### Precios
- Dos modelos claramente separados: Comercial / Empresa.
- Ejemplo de 100 € para explicar la comisión sin ambigüedad.
- La comisión comercial permanece íntegra.
- CTA de conversión específico por rol.

### Confianza
- Seis pilares de seguridad y trazabilidad.
- Layout asimétrico 12 columnas.
- Mensaje de confianza orientado a operaciones reales.
- CTA final de infraestructura comercial.

### Login / Registro
- Superficie tipo glass sobre fondo dark.
- Formulario centrado y compacto.
- Mantener toda la lógica existente de autenticación.

## Sistema compartido

`src/layouts/PublicPagesExperience.css`

Este archivo contiene la capa transversal para evitar que cada página invente su propio lenguaje visual.

## QA antes de producción

- [ ] Revisar desktop 1440 / 1280 / 1024.
- [ ] Revisar tablet 768.
- [ ] Revisar móvil 390 / 360.
- [ ] Verificar contraste y focus states.
- [ ] Verificar `prefers-reduced-motion`.
- [ ] Confirmar que todos los CTA mantienen sus rutas.
- [ ] Confirmar que ningún contenido visual sustituye datos reales.
- [ ] Ejecutar tests y build en CI.
