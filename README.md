# Grupo 29 - TP1

Sitio web del Grupo 29 para el Trabajo Práctico 1 de la Tecnicatura. El proyecto presenta al equipo, reúne perfiles individuales y documenta el proceso de trabajo en una bitácora. El propósito es aprender desarrollo web colaborativo aplicando una estructura clara, estilos responsive e interacciones con JavaScript.

## Integrantes

- [Leonel Diaz](https://github.com/LeonelDiaz225) - Santa Fe
- [Integrante 2]()
- [Integrante 3]()
- [Integrante 4]()
- [Integrante 5]()

Los enlaces de GitHub de los integrantes pendientes quedan reservados para completarse cuando el equipo defina sus usuarios.

## Tecnologías utilizadas

- **HTML5:** estructura semántica, navegación, perfiles y bitácora.
- **CSS3:** variables, grillas, diseño responsive, modo oscuro y estados interactivos.
- **JavaScript:** alternancia de tema y sistema de pestañas en los perfiles.
- **Google Fonts:** tipografía Montserrat.
- **Iconografía:** se utilizan símbolos tipográficos y caracteres Unicode simples en acciones de navegación; no se incorporó una biblioteca externa de íconos.

## Estructura de archivos

```text
TP1/
├── index.html              # Portada y listado de integrantes
├── README.md               # Documentación del proyecto
├── css/
│   └── style.css           # Estilos globales y media queries
├── js/
│   └── main.js             # Tema claro/oscuro y pestañas
├── img/
│   └── avatar-leonel.jpg   # Imagen reservada para Leonel
└── pages/
    ├── leonel-diaz.html   # Perfil de Leonel Diaz
    ├── integrante2.html   # Plantilla del integrante 2
    ├── integrante3.html   # Plantilla del integrante 3
    ├── integrante4.html   # Plantilla del integrante 4
    ├── integrante5.html   # Plantilla del integrante 5
    └── bitacora.html       # Registro del proceso
```

La carpeta `img/` contiene los avatares de todos los integrantes.

## Guía de estilos

La paleta busca una apariencia limpia y profesional:

- `#17212B`: texto principal.
- `#F5F7F8`: fondo claro.
- `#FFFFFF`: superficies y tarjetas.
- `#0C7283`: color de acento y acciones.
- `#D9F0F2`: acento suave.
- `#213037`: superficie principal en modo oscuro.

La fuente seleccionada es **Montserrat**, cargada desde Google Fonts. La interfaz utiliza una grilla de tarjetas, bordes suaves de 6 px, jerarquía tipográfica clara y contraste suficiente para facilitar la lectura. La iconografía se resuelve con símbolos de navegación y estados, manteniendo una interfaz liviana.

El diseño adaptable incluye media queries exactas en `400px`, `900px` y `1200px`. En esos puntos se ajustan el ancho de los contenedores, la grilla de integrantes, la composición de los perfiles, la navegación y el tamaño de los textos para evitar desbordes.

## Funciones JavaScript

### Modo claro y modo oscuro

`main.js` busca los botones con el atributo `data-theme-toggle`. Al presionarlos, alterna el atributo `data-theme="dark"` en el elemento `<html>`, actualiza el texto y el atributo accesible del botón, y guarda la preferencia en `localStorage` con la clave `grupo29-theme`. Por eso el tema elegido se conserva al navegar entre la portada, los perfiles y la bitácora.

### Pestañas de los perfiles

El script identifica cada contenedor `.tabs` y sus botones `data-tab`. Al seleccionar una pestaña, cambia las clases visuales, actualiza `aria-selected` y oculta o muestra el panel correspondiente usando el atributo `hidden`. Las categorías disponibles son **Habilidades**, **Películas** y **Discos**.

En una etapa posterior agregaremos capturas de pantalla del sitio y de estas interacciones.

## Publicación

URL de publicación en Vercel: **A completar**

## Uso local

1. Abrir `index.html` en un navegador, o iniciar una extensión de servidor local desde VS Code.
2. Navegar a los perfiles desde la portada.
3. Revisar la seccion de la bitacora para analizar las decisiones y responsables del equipo.

## Cambios que podríamos agregar más adelante

- Agregar capturas de pantalla del sitio y de sus interacciones.
- Añadir validaciones de accesibilidad, navegación completa con teclado y mejores textos alternativos.
- Incorporar una sección de contacto o enlaces a redes profesionales.
- Mejorar las animaciones, la navegación y la experiencia responsive en futuras entregas.
- Publicar nuevas versiones en Vercel y actualizar la URL registrada.
