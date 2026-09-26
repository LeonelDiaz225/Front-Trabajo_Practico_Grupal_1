# Yoda Labs - Trabajo Práctico Grupal 1

Sitio web oficial de **Yoda Labs**, desarrollado para el Trabajo Práctico Grupal 1 de la materia **Desarrollo de Sistemas Web Front End (2026 · 2do Cuatrimestre)** de la Tecnicatura Superior (IFTS N°29).

El proyecto presenta al equipo, expone sus propósitos y filosofía técnica, despliega perfiles individuales interactivos enriquecidos con animaciones y contenidos multimedia, y documenta integralmente el proceso en una bitácora de desarrollo.

---

## Integrantes del Equipo

- **Leonel Diaz** - Santa Fe | GitHub: [LeonelDiaz225](https://github.com/LeonelDiaz225) | Portfolio: [repo-front-phi.vercel.app](https://repo-front-phi.vercel.app/)
- **Maximiliano Millan** - Buenos Aires | GitHub: [Plecto](https://github.com/estoesplecto) | Portfolio: [mmillan.vercel.app](https://mmillan.vercel.app/)
- **Itziar Urriola** - Buenos Aires | GitHub: [Itz-U](https://github.com/itziarurriola) | Portfolio: [pfo-1-portfolio-itziar-urriola.vercel.app](https://pfo-1-portfolio-itziar-urriola.vercel.app/)
- **Yohana Olivera** - Tucumán | GitHub: [Yohana Olivera](https://github.com/LeonelDiaz225) | Portfolio: [yohaolivera.github.io/pfo-portfolio-yohana](https://yohaolivera.github.io/pfo-portfolio-yohana/)
- **Melisa Solano** - Buenos Aires | GitHub: [Melisa Solano](https://github.com/LeonelDiaz225) | Portfolio: [portfolio-melisa.vercel.app](https://portfolio-melisa.vercel.app/)

---

## Tecnologías Utilizadas

- **HTML5 Semántico:** estructura accesible, encabezados, navegación bidireccional y páginas de perfiles.
- **CSS3 Moderno:** variables personalizadas (`:root`), flexbox, CSS grid, transformaciones y transiciones 3D (`perspective`, `rotateY`, `backface-visibility`), diseño adaptativo y personalización de barras de desplazamiento.
- **JavaScript (Vanilla):**
  - Animación de partículas estelares en `<canvas>` 2D con simulación de profundidad tridimensional (`z-index: -1`, `requestAnimationFrame`).
  - Detección de desplazamiento (`scroll`) y observador de intersección (`IntersectionObserver`) para visibilidad y fijación dinámica de encabezado.
  - Interacción táctil/clic en tarjetas de integrantes con efecto *Flip 3D* para conmutar datos personales y multimedia favorita.
- **Google Fonts:**
  - *Space Grotesk* (títulos principales y botones).
  - *Inter* (cuerpo de texto y legibilidad general).
  - *Orbitron* (navegación y pie de página).
  - *Syne* (nombres y subtítulos).
  - *Plus Jakarta Sans* (roles y textos secundarios).
  - *Zen Dots* (detalles futuristas y títulos destacados).
- **Iconografía & Recursos:** imágenes y logotipos optimizados en formato WebP/PNG/JPG representativos del universo espacial y temático del equipo.

---

## Estructura de Archivos y Carpetas

```text
Front-Trabajo_Practico_Grupal_1/
├── index.html              # Portada principal: hero, propósito y staff de integrantes
├── bitacora.html           # Bitácora oficial: métricas, fases, acuerdos y dificultades
├── leonel.html             # Perfil individual de Leonel Diaz
├── maximiliano.html        # Perfil individual de Maximiliano Millan
├── itziar.html             # Perfil individual de Itziar Urriola
├── yohana.html             # Perfil individual de Yohana Olivera
├── melisa.html             # Perfil individual de Melisa Solano
├── README.md               # Documentación general y técnica del proyecto
├── css/
│   ├── style.css           # Estilos globales, canvas espacial, portada y media queries
│   ├── perfiles.css        # Sistema de tarjetas Flip 3D, galerías y perfiles
│   └── bitacora.css        # Estilos, tablas y tarjetas de la sección bitácora
├── js/
│   ├── main.js             # Motor de canvas espacial, estrellas y scroll/header reactivo
│   └── perfiles.js         # Controlador del giro interactivo 3D en las tarjetas
└── img/                    # Avatares, portadas de películas, discos y logotipos
```

---

## Guía de Estilos e Identidad Visual

La identidad visual está inspirada en la dualidad y equilibrio del desarrollo web bajo la temática espacial de **Yoda Labs**:

### Paleta de Colores

- **Fondo Espacial:** `#090D14` (profundidad oscura del universo).
- **Verde Yoda (Luz):** `#58C98B` (acento principal, títulos y estados activos).
- **Verde Fuerza:** `#418576` (bordes sutiles, divisiones y detalles).
- **Azul Labs:** `#214358` (superficies de tarjetas y estados *hover* de navegación).
- **Texto Claro:** `#E2E8F0` (alta legibilidad y contraste óptimo).

*Acentos personalizados por integrante:*
- Leonel: `#007bff` (Azul luminoso).
- Maximiliano: `#ff9900` (Naranja estelar).
- Yohana: `#ff66b2` (Rosa nébula).
- Melisa: `#e63c3c` (Rojo sith/cristal kyber).
- Itziar: `#b266ff` (Violeta fuerza).

### Breakpoints Adaptativos (Responsive Design)

El proyecto implementa los breakpoints obligatorios de la consigna para garantizar una visualización sin desbordes:
- **`400px` (Móviles / Small screens):** espaciados compactos, una sola columna para tarjetas y adaptación vertical de componentes sin recortes.
- **`900px` (Tablets / Dispositivos medianos):** reorganización de la grilla de staff en 3 columnas y vista adaptada para la tarjeta de perfil.
- **`1200px` (Escritorio / Grandes resoluciones):** grilla de 5 integrantes en una sola fila panorámica y contenedores con márgenes holgados.

---

## Funciones JavaScript

### 1. Canvas Estelar Tridimensional y Aceleración Espacial (`js/main.js`)
Genera más de 220 partículas estelares calculando su posición tridimensional `(x, y, z)` y velocidad relativa con respecto al centro de la ventana. Incorpora un motor de **velocidad variable continua**:
- **Velocidad base:** desplazamiento fluido en la parte superior.
- **Aceleración progresiva por profundidad (*Scroll Depth*):** a medida que el usuario desciende en la página, la velocidad se incrementa exponencialmente hasta alcanzar el hiperespacio (las estrellas se estiran en rayos lumínicos *hyperspace streaks*).
- **Inercia cinemática:** suavizado en cada cuadro que brinda sensación de peso y aceleración real de nave espacial.

### 2. Header Reactivo al Desplazamiento (`js/main.js`)
Controla la aparición suave del texto de descripción con `IntersectionObserver` y monitorea el scroll vertical para acoplar inmediatamente el navbar fijo en la parte superior apenas el usuario inicia el desplazamiento hacia abajo (`scrollY > 40px`).

### 3. Tarjeta Interactiva Flip 3D (`js/perfiles.js`)
Agrega interactividad dinámica a la tarjeta personal del integrante. Mediante eventos de clic o teclado, conmuta la clase `.girada` para realizar una rotación de 180° sobre el eje Y con perspectiva 3D, permitiendo alternar de forma natural entre la vista de datos/habilidades y el dorso con películas y discos favoritos.

---

## Sección Bitácora de Desarrollo

Accesible desde el menú principal (`bitacora.html`), recopila el historial real del equipo:
- **Organización y Arquitectura:** acuerdos iniciales y repositorio.
- **Identidad Visual y Canvas:** diseño galáctico y desarrollo de animaciones.
- **Perfiles y Tarjetas 3D:** unificación de fichas de integrantes, películas y música.
- **Consolidación y Navegación:** validación cruzada de enlaces, botones internos de navegación y responsive design.

---

## Uso de Inteligencia Artificial y Criterio de Autoría

Conforme a la consigna del trabajo práctico:
- **Herramientas y Modelos Utilizados:** Asistente técnico impulsado por modelos avanzados de lenguaje (Gemini / Claude) en planes estándar.
- **Ámbitos de Asistencia:** Colaboró en la generación de fórmulas matemáticas para la proyección de perspectiva del canvas espacial, sugerencias de sintaxis CSS moderna para transformaciones 3D, y redacción de borradores de la documentación técnica.
- **Criterio de Adaptación y Autoría:** Cada línea de código e interacción generada fue revisada línea por línea, adaptada a la estética propia de **Yoda Labs**, testeada en diferentes resoluciones y validada en su integración con la estructura del sitio por los integrantes del equipo. Las decisiones temáticas, la selección de contenidos personales y el control de diseño final corresponden enteramente al equipo de estudiantes.

---

## Publicación

- **Repositorio de GitHub:** [LeonelDiaz225/Front-Trabajo_Practico_Grupal_1](https://github.com/LeonelDiaz225/Front-Trabajo_Practico_Grupal_1.git)
- **Despliegue en Vercel:** *En proceso de configuración y despliegue*
