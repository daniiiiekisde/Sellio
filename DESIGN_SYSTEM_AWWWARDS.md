# SELLIO — DESIGN SYSTEM & DIRECCIÓN VISUAL

## 1. OBJETIVO

Sellio debe sentirse como un producto tecnológico premium, moderno y memorable, con un nivel visual comparable al de los mejores sitios de **Awwwards**, pero sin sacrificar usabilidad, velocidad ni claridad.

La referencia no es copiar una web concreta. La referencia es la **calidad de ejecución**:

- dirección de arte fuerte;
- composición editorial;
- tipografía excelente;
- animaciones suaves;
- microinteracciones cuidadas;
- espacios generosos;
- jerarquía visual clara;
- sensación premium;
- responsive impecable.

**Sellio debe parecer una startup seria y ambiciosa, no una plantilla SaaS.**

---

# 2. PRINCIPIO DE DISEÑO

La interfaz debe transmitir:

> **Productos reales. Oportunidades reales. Comerciales reales. Una forma nueva de vender.**

El diseño debe equilibrar dos cosas aparentemente opuestas:

```text
PREMIUM / EMOCIONAL
        +
CLARO / FUNCIONAL
```

No queremos una página espectacular que sea difícil de utilizar.

Queremos una página espectacular **porque está muy bien diseñada**.

---

# 3. PERSONALIDAD VISUAL

Sellio debe sentirse:

- premium;
- tecnológico;
- limpio;
- atrevido;
- profesional;
- humano;
- moderno;
- europeo;
- B2B pero no corporativo aburrido.

Evitar:

- estética de plantilla genérica;
- dashboards grises sin personalidad;
- exceso de cards;
- exceso de bordes;
- sombras pesadas;
- gradientes genéricos de startup;
- iconos gigantes sin propósito;
- texto excesivamente pequeño;
- interfaces visualmente saturadas.

---

# 4. DIRECCIÓN ARTÍSTICA

La Home debe sentirse como una experiencia editorial.

No construir:

```text
Navbar
Hero con título
3 cards
Features
Pricing
Footer
```

como una landing SaaS convencional.

Construir una narrativa visual.

Ejemplo de ritmo:

```text
NAVBAR
   ↓
HERO CINEMÁTICO
   ↓
MANIFIESTO SELLIO
   ↓
PRODUCTOS / OPORTUNIDADES EN MOVIMIENTO
   ↓
EMPRESA ↔ COMERCIAL
   ↓
EXPERIENCIA DEL COMERCIAL
   ↓
EXPERIENCIA DE LA EMPRESA
   ↓
SOCIAL PROOF / CONFIANZA
   ↓
CTA
   ↓
FOOTER
```

Cada sección debe sentirse como una escena distinta de la misma historia.

---

# 5. HERO

El Hero es la sección más importante de la Home.

Debe comunicar inmediatamente qué hace Sellio.

No utilizar un Hero genérico como:

> "The future of B2B sales"

sin contexto.

Debe quedar claro que:

```text
EMPRESAS
   ↓
PUBLICAN PRODUCTOS / OPORTUNIDADES
   ↓
COMERCIALES
   ↓
DESCUBREN Y VAN A POR LA VENTA
```

El Hero puede utilizar:

- tipografía enorme;
- movimiento sutil;
- producto/imágenes de alta calidad;
- composición asimétrica;
- elementos flotantes;
- transiciones al hacer scroll.

Pero la propuesta de valor debe entenderse en segundos.

---

# 6. TIPOGRAFÍA

La tipografía debe ser una parte fundamental de la identidad.

Preferencia:

- una sans-serif contemporánea para UI;
- posibilidad de una segunda tipografía/display para titulares si mejora la dirección artística.

Priorizar tipografías modernas y legibles.

Jerarquía aproximada:

```text
DISPLAY / HERO
clamp(3.5rem, 8vw, 9rem)

H1
clamp(3rem, 6vw, 6rem)

H2
clamp(2.25rem, 4vw, 4.5rem)

H3
clamp(1.5rem, 2.5vw, 2.5rem)

BODY
1rem — 1.125rem

SMALL
0.8rem — 0.95rem
```

No aplicar tamaños literalmente sin comprobar la composición real.

Los títulos deben tener presencia.

---

# 7. GRID Y ESPACIADO

Utilizar una grid consistente.

Preferencia:

- 12 columnas en desktop;
- 6–8 columnas en tablet;
- 4 columnas en mobile cuando tenga sentido;
- contenido con max-width claro;
- márgenes laterales amplios.

El espacio en blanco es parte del diseño.

No intentar llenar cada zona vacía.

Utilizar grandes espacios verticales entre secciones cuando la narrativa lo necesite.

---

# 8. COLOR

La identidad cromática debe definirse en `styles/variables.css`.

No llenar toda la interfaz de colores.

Preferir:

```text
BASE
1 color principal de fondo

TEXT
1 color principal
1 color secundario

ACCENT
1 color distintivo Sellio

STATUS
success / warning / error / info
```

El accent debe utilizarse estratégicamente.

No convertir cada botón o card en un elemento de color llamativo.

---

# 9. CONTRASTE

El contraste debe ser fuerte y elegante.

Ejemplos de dirección:

```text
LIGHT SECTION
↓
DARK SECTION
↓
IMAGE / MEDIA SECTION
↓
LIGHT SECTION
```

Cambiar el tono de una sección puede utilizarse para crear ritmo visual.

---

# 10. IMÁGENES

Las imágenes deben sentirse editoriales y reales.

Evitar fotografías de stock extremadamente artificiales.

Preferir imágenes relacionadas con:

- productos;
- profesionales comerciales;
- reuniones reales;
- distribución;
- retail;
- hospitality;
- alimentación;
- industria;
- marcas;
- packaging;
- movimiento comercial.

Las imágenes deben tener composición cuidada.

No utilizar imágenes solo porque "rellenan" un espacio.

---

# 11. PRODUCTOS Y OPORTUNIDADES

Los productos y oportunidades son protagonistas de Sellio.

Crear componentes visuales de alta calidad para:

```text
ProductCard
OpportunityCard
CompanyCard
SellerCard
```

No hacer cards SaaS genéricas.

Las cards deben poder funcionar en:

- grids;
- listas;
- carruseles;
- layouts asimétricos;
- resultados de búsqueda.

---

# 12. OPORTUNIDADES

Una oportunidad debe sentirse como una oportunidad comercial, no como una oferta de trabajo.

Ejemplo visual:

```text
OPPORTUNITY

Marca X

Buscamos comerciales
para Cataluña

Alimentación · Horeca

Comisión disponible

[ VER OPORTUNIDAD ]
```

La información más importante debe destacar inmediatamente.

---

# 13. COMERCIALES ANÓNIMOS

Este concepto debe reflejarse visualmente.

Un perfil puede aparecer como:

```text
COMMERCIAL #A482

Cataluña
+5 años experiencia
Horeca
ES · CA · EN
```

No mostrar automáticamente:

- nombre real;
- foto obligatoria;
- teléfono;
- email.

El anonimato debe sentirse intencional y premium, no como una cuenta incompleta.

---

# 14. ANIMACIONES

Las animaciones deben ser suaves, rápidas y con intención.

Preferir:

- fade;
- slide;
- scale muy pequeño;
- reveal al entrar en viewport;
- parallax sutil;
- desplazamiento horizontal controlado;
- transformaciones de navegación;
- hover states.

Evitar:

- animaciones lentas;
- rebotes exagerados;
- efectos 3D gratuitos;
- texto que tarda demasiado en aparecer;
- scroll hijacking.

La animación debe reforzar la jerarquía.

---

# 15. SCROLL EXPERIENCE

El scroll debe sentirse fluido.

Utilizar animaciones activadas por viewport cuando aporten valor.

La página puede contar una historia mediante:

```text
SCROLL
 ↓
CAMBIO DE COMPOSICIÓN
 ↓
REVELACIÓN DE CONTENIDO
 ↓
CAMBIO DE COLOR
 ↓
NUEVA ESCENA
```

Pero el usuario siempre debe conservar control sobre el scroll.

No secuestrar el scroll.

---

# 16. MICROINTERACCIONES

Todo elemento interactivo debe tener feedback.

Ejemplos:

### Button

- hover;
- active;
- focus;
- disabled.

### Card

- ligera transformación;
- cambio de imagen o información;
- cursor feedback.

### Links

- underline/reveal;
- desplazamiento sutil;
- cambio de contraste.

### Inputs

- focus state claro;
- error state;
- success state.

---

# 17. CURSOR

Puede utilizarse un cursor personalizado en desktop si aporta valor.

Ejemplo conceptual:

```text
CURSOR NORMAL
     ↓
CURSOR INTERACTIVO
     ↓
CURSOR SOBRE ELEMENTO ESPECIAL
```

No implementar un cursor custom que dificulte la usabilidad.

No sustituir completamente el comportamiento nativo sin necesidad.

---

# 18. NAVBAR

Debe ser minimalista.

No convertir el Navbar en una barra llena de botones.

Desktop:

```text
SELLIO       Explore    For Companies    For Sellers       Login    Join
```

El diseño exacto puede evolucionar, pero la jerarquía debe ser clara.

Al hacer scroll puede:

- reducir altura;
- cambiar fondo;
- añadir blur;
- cambiar contraste.

---

# 19. MOBILE

Mobile no debe ser simplemente desktop reducido.

Debe existir una composición específica para mobile.

Prioridades:

1. legibilidad;
2. navegación;
3. velocidad;
4. interacción táctil;
5. contenido prioritario.

Los efectos visuales deben reducirse cuando sea necesario.

---

# 20. ACCESSIBILITY

El diseño premium no justifica una mala accesibilidad.

Mantener:

- contraste suficiente;
- navegación por teclado;
- focus states;
- labels de formularios;
- alt text;
- reduced motion;
- tamaños táctiles adecuados.

Respetar `prefers-reduced-motion`.

Si el usuario reduce movimiento, las animaciones deben simplificarse o desaparecer.

---

# 21. PERFORMANCE

Awwwards no significa página lenta.

Priorizar:

- lazy loading de imágenes;
- optimización de imágenes;
- evitar librerías innecesarias;
- animaciones GPU-friendly;
- evitar renders innecesarios;
- minimizar JavaScript pesado;
- code splitting cuando sea útil.

No introducir una librería de animación simplemente porque "se ve bien".

---

# 22. MOTION SYSTEM

Si se utiliza una librería de motion, centralizar las reglas.

Crear patrones consistentes para:

```text
fadeIn
fadeUp
reveal
scaleIn
stagger
pageTransition
```

No programar cientos de animaciones diferentes sin sistema.

Duraciones orientativas:

```text
Microinteraction: 150–250ms
UI transition: 250–400ms
Section reveal: 500–800ms
Hero / cinematic: 700–1200ms
```

Son referencias, no valores obligatorios.

---

# 23. DASHBOARDS

Los dashboards no deben intentar parecer una landing de Awwwards.

Aquí la prioridad cambia:

```text
USABILIDAD
 > DECORACIÓN
```

Pero deben mantener la identidad Sellio mediante:

- tipografía;
- colores;
- spacing;
- iconografía;
- componentes;
- microinteracciones.

El dashboard debe ser premium pero extremadamente funcional.

---

# 24. DASHBOARD DE COMERCIAL

Debe priorizar:

```text
OPORTUNIDADES RECOMENDADAS
        ↓
NUEVAS OPORTUNIDADES
        ↓
SOLICITUDES
        ↓
CONTACTOS
        ↓
MENSAJES
```

El comercial debe encontrar rápidamente qué puede vender.

---

# 25. DASHBOARD DE EMPRESA

Debe priorizar:

```text
MIS PRODUCTOS
        ↓
MIS OPORTUNIDADES
        ↓
INTERESES RECIBIDOS
        ↓
CONTACTOS
        ↓
ACTIVIDAD
```

La empresa debe poder saber rápidamente si existen comerciales interesados.

---

# 26. ADMIN

El admin debe priorizar información y control.

No necesita efectos visuales excesivos.

Debe tener:

- tablas claras;
- filtros;
- estados;
- acciones;
- métricas;
- logs cuando sean necesarios.

---

# 27. ICONOGRAFÍA

Utilizar un único sistema de iconos.

Los iconos deben ser:

- consistentes;
- simples;
- finos;
- reconocibles.

No mezclar cinco estilos diferentes.

---

# 28. BORDERS Y SHADOWS

Usarlos con moderación.

Preferir jerarquía mediante:

- spacing;
- contraste;
- escala;
- tipografía;
- composición.

No resolver toda la UI mediante:

```text
border + shadow + rounded card
```

---

# 29. BORDER RADIUS

Definir una escala global.

Por ejemplo:

```text
small
medium
large
pill
```

No utilizar 15 radios distintos.

El sistema debe ser coherente.

---

# 30. FORMULARIOS

Los formularios deben sentirse premium pero rápidos.

Especialmente:

- registro;
- creación de empresa;
- creación de producto;
- creación de oportunidad;
- perfil comercial.

Dividir formularios largos en pasos cuando sea necesario.

---

# 31. CREACIÓN DE OPORTUNIDAD

Debe ser una experiencia muy cuidada.

Conceptualmente:

```text
01 PRODUCTO
      ↓
02 MERCADO
      ↓
03 ZONA
      ↓
04 PERFIL DE COMERCIAL
      ↓
05 CONDICIONES
      ↓
06 PUBLICAR
```

La empresa debe entender exactamente qué está publicando.

---

# 32. PERFIL ANÓNIMO DEL COMERCIAL

Debe sentirse como un perfil profesional deliberadamente privado.

Ejemplo visual:

```text
┌───────────────────────────────┐
│ COMMERCIAL #A482               │
│                               │
│ +5 años                       │
│ Cataluña                      │
│ Horeca                        │
│ Alimentación                  │
│                               │
│ ES · CA · EN                  │
│                               │
│ [ VER OPORTUNIDADES ]         │
└───────────────────────────────┘
```

No mostrar campos personales por defecto.

---

# 33. EMPTY STATES

Los estados vacíos deben estar diseñados.

No mostrar simplemente:

> No data.

Ejemplo:

```text
Todavía no tienes oportunidades guardadas.

Descubre productos que encajen con tu perfil.

[ EXPLORAR OPORTUNIDADES ]
```

---

# 34. LOADING STATES

Utilizar skeletons o estados de carga elegantes.

No bloquear toda la pantalla con un spinner siempre que pueda evitarse.

---

# 35. ERROR STATES

Los errores deben explicar:

- qué ha ocurrido;
- qué puede hacer el usuario;
- cómo continuar.

Nunca mostrar errores técnicos crudos al usuario.

---

# 36. COPY / MICROCOPY

El texto de interfaz debe ser corto y directo.

Evitar lenguaje corporativo innecesario.

Preferir:

```text
Explorar oportunidades
Ver producto
Me interesa
Contactar
Publicar oportunidad
```

En vez de:

```text
Iniciar proceso de interacción comercial
```

---

# 37. LENGUAJE DE SELLIO

Usar consistentemente:

- oportunidad;
- producto;
- empresa;
- comercial;
- representación;
- venta;
- comisión;
- contacto;
- acuerdo.

Evitar tratar al comercial como:

- candidato;
- empleado;
- trabajador solicitado;
- postulante.

---

# 38. COMPONENTES QUE DEBEN TENER ESPECIAL CALIDAD VISUAL

Prioridad máxima:

1. Navbar
2. Hero
3. ProductCard
4. OpportunityCard
5. CompanyCard
6. SellerCard
7. SearchBar
8. CTA
9. Dashboard navigation
10. Forms

---

# 39. HOME — EXPERIENCIA RECOMENDADA

La Home debe contar una historia.

### SCENE 01 — INTRO

Presentar Sellio.

### SCENE 02 — EL PROBLEMA

Las empresas tienen productos pero necesitan ventas.

### SCENE 03 — LA SOLUCIÓN

Los comerciales descubren oportunidades.

### SCENE 04 — EL MARKETPLACE

Mostrar productos y oportunidades reales.

### SCENE 05 — PRIVACIDAD

Mostrar que el comercial puede descubrir oportunidades sin exponer inmediatamente su identidad.

### SCENE 06 — CONEXIÓN

Empresa ↔ comercial.

### SCENE 07 — RESULTADO

Venta → comisión.

### SCENE 08 — CTA

Entrar en Sellio.

---

# 40. REGLA DE ORO

Antes de añadir un efecto visual, preguntarse:

> **¿Mejora la experiencia o solo demuestra que podemos hacerlo?**

Si solo demuestra capacidad técnica, probablemente debe eliminarse.

---

# 41. CRITERIO DE CALIDAD

Una página está terminada cuando:

- parece diseñada específicamente para Sellio;
- no parece una plantilla;
- tiene una jerarquía visual clara;
- funciona perfectamente en mobile;
- las animaciones son naturales;
- las interacciones tienen feedback;
- las imágenes tienen dirección artística;
- la tipografía está cuidada;
- el spacing es consistente;
- no hay elementos decorativos sin función;
- mantiene tiempos de carga razonables;
- sigue siendo accesible.

---

# 42. INSTRUCCIÓN AL AGENTE

No rehacer la arquitectura funcional descrita en los demás documentos del proyecto.

Este documento define **cómo debe verse y sentirse Sellio**, no cómo debe funcionar el backend.

Respetar siempre:

- `ESTRUCTURA_WEBAPP.md` para arquitectura frontend;
- `MODELO_NEGOCIO_Y_FLUJO.md` para reglas de negocio;
- `BACKEND_DATABASE_PLAN.md` para backend/base de datos;
- este documento para diseño visual y experiencia.

No implementar una estética Awwwards sacrificando las reglas de negocio.

No convertir la aplicación en una demo visual desconectada del producto.

**Sellio debe ser espectacular, pero debe seguir siendo una herramienta real.**

# FIN
