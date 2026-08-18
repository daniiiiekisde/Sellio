# SELLIO — MODELO DE NEGOCIO, PRIVACIDAD Y FLUJO COMERCIAL

## 1. OBJETIVO DE ESTE DOCUMENTO

Este documento define las reglas funcionales y de negocio que deben respetarse al construir Sellio.

No es una sugerencia de diseño. Es la referencia para que el desarrollo de la web app no termine convirtiendo Sellio en un marketplace tradicional o en un portal de empleo.

**La idea principal de Sellio es: los comerciales encuentran oportunidades y van hacia las empresas.**

---

# 2. QUÉ ES SELLIO

Sellio es un marketplace B2B que conecta:

```text
EMPRESAS / MARCAS / FABRICANTES / DISTRIBUIDORES
                         ↓
                       SELLIO
                         ↓
              COMERCIALES INDEPENDIENTES
```

La plataforma facilita que una empresa pueda poner un producto real en circulación comercial mediante profesionales independientes.

Sellio no pretende contratar a esos comerciales como empleados.

El comercial actúa como profesional independiente/agente/representante y la relación comercial se establece entre las dos partes.

---

# 3. PRINCIPIO FUNDAMENTAL: EL COMERCIAL VA HACIA LA EMPRESA

Este punto debe quedar reflejado en toda la aplicación.

## Flujo principal

```text
EMPRESA
   ↓
PUBLICA PRODUCTO / OPORTUNIDAD
   ↓
SELLIO
   ↓
COMERCIALES DESCUBREN LA OPORTUNIDAD
   ↓
COMERCIAL SE INTERESA
   ↓
COMERCIAL CONTACTA / ACUDE A LA EMPRESA
   ↓
EMPRESA Y COMERCIAL HABLAN
   ↓
ACUERDO COMERCIAL
```

### NO diseñar el producto como:

```text
Empresa busca personas
        ↓
Empresa selecciona comercial
        ↓
Empresa persigue al comercial
```

Ese no es el concepto principal.

### El concepto es:

```text
Empresa tiene producto
        ↓
Empresa necesita venderlo
        ↓
Publica la oportunidad
        ↓
Comerciales la descubren
        ↓
Comerciales interesados se acercan a la empresa
```

La empresa ofrece una oportunidad.

El comercial decide si quiere aprovecharla.

---

# 4. COMERCIALES ANÓNIMOS

La privacidad del comercial es una característica fundamental del producto.

Un comercial **puede utilizar Sellio de forma anónima o pseudónima inicialmente**.

El objetivo es que pueda explorar oportunidades sin tener que exponer públicamente desde el primer momento:

- nombre completo;
- teléfono;
- email personal;
- cartera de clientes;
- información personal innecesaria;
- identidad profesional completa.

La plataforma debe permitir que el comercial muestre **sus capacidades comerciales sin revelar inmediatamente quién es**.

---

# 5. QUÉ PUEDE MOSTRAR UN COMERCIAL SIN REVELAR SU IDENTIDAD

El perfil anónimo puede mostrar información profesional relevante, por ejemplo:

- sectores en los que trabaja;
- experiencia aproximada;
- zonas geográficas;
- especialización;
- idiomas;
- tipo de cliente que conoce;
- categorías de productos que busca;
- experiencia en determinados mercados;
- disponibilidad;
- preferencias comerciales.

Ejemplo conceptual:

```text
COMERCIAL #A482

Sector: Alimentación
Experiencia: +5 años
Zona: Cataluña
Especialización: Horeca
Idiomas: ES / CA / EN
Interés: Productos premium

[ME INTERESA]
```

La empresa puede valorar el perfil profesional sin conocer necesariamente la identidad real del comercial.

---

# 6. LA IDENTIDAD SE REVELA CUANDO TIENE SENTIDO

El anonimato no significa que el comercial sea un usuario falso.

La plataforma puede conocer internamente su identidad cuando sea necesario para:

- verificación;
- seguridad;
- cumplimiento legal;
- gestión de la cuenta;
- acuerdos posteriores;
- protección contra fraude.

Pero esa información **no tiene por qué mostrarse públicamente a las empresas desde el principio**.

La identidad puede revelarse posteriormente cuando el comercial decida avanzar en el contacto.

---

# 7. PRINCIPIO DE PRIVACIDAD

La aplicación debe diferenciar entre:

```text
DATOS INTERNOS DE LA PLATAFORMA
              ≠
DATOS VISIBLES PARA LA EMPRESA
              ≠
DATOS QUE EL COMERCIAL DECIDE COMPARTIR
```

Esto debe tenerse en cuenta desde la arquitectura del frontend y, posteriormente, desde la base de datos y las políticas de seguridad.

Nunca confiar únicamente en ocultar campos mediante CSS o frontend.

La privacidad real deberá controlarse en backend/base de datos cuando se implemente Supabase.

---

# 8. EMPRESAS: PRODUCTOS REALES

La empresa que entra en Sellio debe tener una propuesta comercial real.

La idea inicial es priorizar empresas que:

- ya tengan un producto existente;
- tengan el producto actualmente en el mercado o preparado para comercialización real;
- tengan capacidad productiva suficiente;
- puedan atender la demanda generada;
- tengan margen suficiente para remunerar al comercial;
- estén realmente buscando ampliar ventas.

No queremos que el marketplace se llene de productos puramente conceptuales o de empresas que no pueden responder a la demanda.

---

# 9. QUÉ PUBLICA LA EMPRESA

La empresa puede publicar principalmente:

### Producto

Qué producto vende.

### Oportunidad comercial

Qué tipo de comercial busca y dónde quiere vender.

Ejemplo:

```text
PRODUCTO
Aceite ecológico premium

EMPRESA
Marca X

OPORTUNIDAD
Buscamos comerciales independientes

ZONA
Cataluña

SECTOR
Horeca / Alimentación

CONDICIONES
Comisión por venta
```

---

# 10. PRODUCTO ≠ OPORTUNIDAD

Son dos entidades diferentes.

## PRODUCTO

Representa aquello que la empresa vende.

```text
Producto
 ├── nombre
 ├── categoría
 ├── descripción
 ├── empresa
 └── información comercial
```

## OPORTUNIDAD

Representa la necesidad comercial.

```text
Oportunidad
 ├── empresa
 ├── producto(s)
 ├── zona
 ├── sector
 ├── tipo de comercial
 ├── condiciones
 └── estado
```

Una empresa puede tener varios productos y varias oportunidades.

---

# 11. EXPERIENCIA DEL COMERCIAL

El comercial debe poder navegar por oportunidades sin sentirse como un candidato buscando empleo.

La interfaz debe utilizar lenguaje como:

- oportunidades;
- productos;
- marcas;
- representación;
- ventas;
- sectores;
- zonas;
- condiciones comerciales.

Evitar convertir Sellio en:

- ofertas de empleo;
- CVs tradicionales;
- procesos de selección laboral.

---

# 12. EXPERIENCIA DE LA EMPRESA

La empresa debe poder:

1. Crear perfil.
2. Publicar productos.
3. Publicar oportunidades.
4. Definir zonas.
5. Definir sectores.
6. Definir condiciones comerciales.
7. Recibir muestras de interés.
8. Gestionar las solicitudes.
9. Comunicarse con los comerciales interesados.
10. Establecer acuerdos.

La empresa no necesita perseguir perfiles aleatoriamente.

La plataforma debe ayudar a que lleguen comerciales interesados en su producto.

---

# 13. EXPERIENCIA DEL COMERCIAL

El comercial debe poder:

1. Registrarse.
2. Crear su perfil profesional.
3. Elegir si quiere mantener su identidad pública oculta.
4. Definir sectores.
5. Definir zonas.
6. Definir especialización.
7. Explorar oportunidades.
8. Ver productos.
9. Mostrar interés.
10. Contactar con la empresa cuando decida avanzar.
11. Negociar las condiciones.
12. Establecer una relación comercial.

---

# 14. CONTACTO Y ACERCAMIENTO

El contacto debe estar diseñado para respetar el principio:

> **El comercial se acerca a la empresa porque ha encontrado una oportunidad que le interesa.**

El contacto puede empezar dentro de Sellio y posteriormente pasar a una conversación directa entre ambas partes.

El sistema no debe obligar a revelar toda la identidad inmediatamente.

---

# 15. POSIBLE FLUJO DE INTERÉS

```text
COMERCIAL VE OPORTUNIDAD
        ↓
[ME INTERESA]
        ↓
SELLIO REGISTRA EL INTERÉS
        ↓
EMPRESA RECIBE LA SOLICITUD
        ↓
COMERCIAL DECIDE QUÉ INFORMACIÓN COMPARTIR
        ↓
CONTACTO
        ↓
CONVERSACIÓN
        ↓
REUNIÓN / VISITA / NEGOCIACIÓN
        ↓
ACUERDO
```

La reunión o visita puede producirse fuera de Sellio.

Sellio facilita el descubrimiento y el primer contacto; no necesariamente debe controlar toda la relación comercial.

---

# 16. EL ACUERDO ES ENTRE EMPRESA Y COMERCIAL

Sellio actúa como plataforma intermediaria de descubrimiento y conexión.

Conceptualmente:

```text
SELLIO
   │
   ├── facilita descubrimiento
   ├── facilita contacto
   ├── facilita confianza
   └── facilita gestión
          ↓
EMPRESA ↔ COMERCIAL
```

La relación comercial final puede establecerse entre las dos partes.

---

# 17. MODELO DE REMUNERACIÓN DEL COMERCIAL

Una idea central del modelo es que el comercial tenga una remuneración vinculada a resultados.

Principio:

> **El comercial cobra cuando vende.**

La empresa remunera al comercial por el resultado comercial acordado.

Las condiciones deben ser claras antes de que el comercial decida entrar en una oportunidad.

Ejemplo conceptual:

```text
Producto vendido: 1.000 €
Comisión acordada: 10%
Comercial: 100 €
Empresa: 900 € antes de sus demás costes
```

Los porcentajes concretos no deben fijarse en el código hasta que se defina el modelo definitivo.

---

# 18. MONETIZACIÓN DE SELLIO

Ambos lados deben poder entrar inicialmente de forma gratuita para conseguir liquidez en el marketplace.

La monetización puede llegar posteriormente mediante:

- límites de uso;
- planes premium;
- promoción de oportunidades;
- campañas;
- posiciones destacadas;
- niveles de servicio;
- funcionalidades avanzadas.

La plataforma debe evitar bloquear el crecimiento inicial con una barrera de pago demasiado pronto.

---

# 19. LO QUE SELLIO NO DEBE SER

No convertir Sellio en:

### Portal de empleo

El comercial no es necesariamente empleado de la empresa.

### LinkedIn genérico

El objetivo no es simplemente crear perfiles profesionales.

### E-commerce

Sellio no necesita comenzar gestionando stock, almacenes o envíos.

### Marketplace B2C

No está orientado al consumidor final.

### Agencia comercial tradicional

Sellio conecta las partes; no necesita convertirse inicialmente en la empresa que realiza las ventas por ellas.

---

# 20. CONFIANZA Y VERIFICACIÓN

El anonimato debe coexistir con confianza.

La plataforma debe poder tener internamente:

```text
IDENTIDAD VERIFICADA
        ↓
PERFIL PÚBLICO ANÓNIMO / PSEUDÓNIMO
```

En el futuro podrán existir niveles de verificación para:

- empresas;
- comerciales;
- productos;
- oportunidades.

También podrán existir posteriormente:

- valoraciones;
- historial;
- tasa de respuesta;
- acuerdos realizados;
- reputación.

No implementar todo esto ahora si no está definido para el MVP.

---

# 21. MATCHING

El matching debe ayudar a encontrar oportunidades relevantes para cada comercial.

Puede tener en cuenta:

- sector;
- zona;
- experiencia;
- especialización;
- producto;
- tipo de cliente;
- idiomas;
- mercado objetivo.

Ejemplo:

```text
MATCH 92%

Comercial especializado en Horeca
Cataluña
7 años de experiencia

Producto recomendado:
Marca de alimentación premium
```

El matching debe servir principalmente para **ayudar al comercial a descubrir oportunidades**, no para convertirlo en un candidato laboral que una empresa selecciona.

---

# 22. ESTRUCTURA FUNCIONAL DE LA WEB APP

La arquitectura funcional debe reflejar este modelo:

```text
SELLIO
│
├── PUBLIC
│   ├── Home
│   ├── Login
│   └── Register
│
├── MARKETPLACE
│   ├── Empresas
│   ├── Productos
│   ├── Oportunidades
│   └── Comerciales
│
├── EMPRESA
│   ├── Dashboard
│   ├── Productos
│   ├── Oportunidades
│   ├── Solicitudes
│   ├── Contactos
│   ├── Mensajes
│   └── Perfil
│
├── COMERCIAL
│   ├── Dashboard
│   ├── Marketplace
│   ├── Empresas
│   ├── Productos
│   ├── Oportunidades
│   ├── Solicitudes
│   ├── Contactos
│   ├── Mensajes
│   ├── Comisiones
│   └── Perfil
│
└── ADMIN
    ├── Dashboard
    ├── Usuarios
    ├── Empresas
    ├── Comerciales
    ├── Productos
    ├── Oportunidades
    ├── Transacciones
    └── Configuración
```

---

# 23. PRIVACIDAD EN LA ARQUITECTURA

La privacidad del comercial debe estar presente desde el principio.

La futura base de datos debe distinguir entre:

```text
DATOS PRIVADOS
        ↓
DATOS PROFESIONALES
        ↓
DATOS PÚBLICOS
```

Ejemplo:

```text
PRIVATE
- nombre legal
- email
- teléfono
- documentación

PROFESSIONAL
- experiencia
- sectores
- zonas
- especialización
- idiomas

PUBLIC / ANONYMOUS
- identificador del comercial
- experiencia aproximada
- sectores
- zonas
- especialización
- información comercial seleccionada
```

El frontend nunca debe recibir datos privados que no necesita mostrar.

---

# 24. SUPABASE

Supabase podrá utilizarse posteriormente para:

- autenticación;
- base de datos;
- perfiles;
- empresas;
- comerciales;
- productos;
- oportunidades;
- solicitudes;
- contactos;
- mensajes;
- políticas de acceso.

Especial atención a **Row Level Security (RLS)** cuando se implemente la base de datos.

El anonimato no debe depender del frontend.

Las políticas de Supabase/backend deben determinar qué datos puede consultar cada tipo de usuario.

---

# 25. MVP — QUÉ DEBE DEMOSTRAR

El MVP debe demostrar principalmente este circuito:

```text
EMPRESA CON PRODUCTO REAL
        ↓
PUBLICA OPORTUNIDAD
        ↓
COMERCIAL ANÓNIMO / PSEUDÓNIMO
DESCUBRE LA OPORTUNIDAD
        ↓
MUESTRA INTERÉS
        ↓
SE ACERCA A LA EMPRESA
        ↓
CONTACTO
        ↓
NEGOCIACIÓN
        ↓
POSIBLE ACUERDO
        ↓
VENTA
        ↓
COMISIÓN DEL COMERCIAL
```

Si este circuito funciona, Sellio está demostrando su hipótesis principal.

---

# 26. HIPÓTESIS PRINCIPAL

La hipótesis que queremos validar es:

> **Existen empresas con productos reales y margen suficiente que necesitan ampliar ventas, y existen comerciales independientes dispuestos a descubrir esos productos y acercarse a esas empresas para venderlos.**

La plataforma debe reducir la fricción entre ambos.

---

# 27. REGLA DE ORO PARA EL DESARROLLO

Cada decisión de interfaz, routing, base de datos o funcionalidad debe preguntarse:

> **¿Esto ayuda a que un comercial encuentre una oportunidad y se acerque a una empresa para vender un producto real?**

Si la respuesta es no, no debe convertirse automáticamente en una prioridad del MVP.

---

# 28. REGLAS QUE EL AGENTE DE DESARROLLO DEBE RESPETAR

1. No convertir Sellio en un portal de empleo.
2. No asumir que la empresa debe buscar activamente y contactar primero al comercial.
3. El flujo principal es comercial → oportunidad → empresa.
4. Los comerciales pueden mantener su identidad oculta/pseudónima públicamente.
5. La plataforma puede conocer y verificar la identidad internamente cuando sea necesario.
6. No exponer datos privados del comercial sin autorización.
7. Diferenciar producto y oportunidad.
8. Priorizar empresas con productos reales y capacidad de atender ventas.
9. Mostrar las condiciones comerciales con claridad.
10. El comercial cobra por las ventas según el acuerdo establecido.
11. Ambas partes pueden entrar inicialmente gratis.
12. Monetización posterior mediante límites, planes, promociones, campañas y funcionalidades premium.
13. No desarrollar funcionalidades complejas que todavía no estén definidas.
14. No inventar reglas de negocio.
15. La arquitectura técnica debe permitir implementar esta lógica correctamente con Supabase/backend.

---

# 29. FRASE CENTRAL DEL PRODUCTO

La idea que debe quedar clara al construir Sellio es:

> **Las empresas tienen productos. Los comerciales encuentran esos productos y van a por la venta.**

Ese es el núcleo del proyecto.

# FIN
