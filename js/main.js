const canvas = document.getElementById('espacio-canvas');
const ctx = canvas.getContext('2d');

function ajustarTamanio() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', ajustarTamanio);
ajustarTamanio();

// Configuración del motor de viaje espacial e hiperespacio
const estrellas = [];
const CANTIDAD_ESTRELLAS = 220;

// Variables de velocidad y aceleración
let velocidadActual = 6;            // Velocidad inicial base
let velocidadObjetivo = 6;          // Velocidad meta calculada
const VELOCIDAD_BASE = 6;           // Velocidad mínima en la cima
const VELOCIDAD_MAXIMA = 75;        // Velocidad en el fondo de la página

class Estrella {
    constructor() {
        this.resetear(true);
    }

    // Inicializa la estrella en el espacio
    resetear(inicial = false) {
        this.x = (Math.random() - 0.5) * canvas.width * 2;
        this.y = (Math.random() - 0.5) * canvas.height * 2;
        this.z = inicial ? Math.random() * canvas.width : canvas.width;
        this.prevZ = this.z;
        this.radioBase = Math.random() * 1.6 + 0.8;
        
        // Tonos lumínicos galácticos: blanco estelar, cian, y verde sable de luz
        const tonos = ['#FFFFFF', '#E0F2FE', '#BAE6FD', '#67E8F9', '#39FF7A', '#1DB954', '#A7F3D0'];
        this.color = tonos[Math.floor(Math.random() * tonos.length)];
    }

    actualizar() {
        this.prevZ = this.z;
        this.z -= velocidadActual;
        
        // Al sobrepasar el punto de visión, se reubica al fondo
        if (this.z <= 0) {
            this.resetear();
        }
    }

    dibujar() {
        // Coordenadas actuales proyectadas
        const k = canvas.width / this.z;
        const posX = this.x * k + canvas.width / 2;
        const posY = this.y * k + canvas.height / 2;

        // Si se sale de pantalla, no dibujar
        if (posX < -50 || posX > canvas.width + 50 || posY < -50 || posY > canvas.height + 50) {
            return;
        }

        // A mayor velocidad, las estrellas se estiran en estelas de luz (Hyperspace streaks)
        if (velocidadActual > 10) {
            const prevK = canvas.width / Math.max(this.prevZ, 1);
            const prevPosX = this.x * prevK + canvas.width / 2;
            const prevPosY = this.y * prevK + canvas.height / 2;

            ctx.beginPath();
            ctx.moveTo(prevPosX, prevPosY);
            ctx.lineTo(posX, posY);
            
            // Grosor y resplandor variable con la aceleración
            const anchoLinea = Math.min((this.radioBase * k) * 0.8, 3.5);
            ctx.lineWidth = anchoLinea;
            ctx.strokeStyle = this.color;
            ctx.lineCap = 'round';
            ctx.stroke();
        } else {
            // Modo punto estelar con aura sutil
            const radioProyectado = Math.min(this.radioBase * k, 4.5);
            ctx.beginPath();
            ctx.arc(posX, posY, radioProyectado, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
    }
}

// Inicializar constelaciones
for (let i = 0; i < CANTIDAD_ESTRELLAS; i++) {
    estrellas.push(new Estrella());
}

// Suavizado cinemático de aceleración (Inercia de la nave)
function actualizarVelocidad() {
    const factorInercia = 0.08; // Suavidad de transición
    velocidadActual += (velocidadObjetivo - velocidadActual) * factorInercia;
}

// Bucle principal de animación
function animarEspacio() {
    actualizarVelocidad();

    // Limpia y crea un rastro translúcido para permitir ver la imagen de textura del fondo
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < estrellas.length; i++) {
        estrellas[i].actualizar();
        estrellas[i].dibujar();
    }

    requestAnimationFrame(animarEspacio);
}

animarEspacio();

// Control de velocidad continuo por profundidad de Scroll
// Cuanto más abajo se scrollea, más se acelera la nave
function calcularVelocidadPorScroll() {
    const scrollMaximo = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1
    );
    const scrollActual = window.scrollY || window.pageYOffset || 0;
    const factorProgreso = Math.min(Math.max(scrollActual / scrollMaximo, 0), 1);

    // Curva de aceleración: a mayor scroll, hiperespacio continuo
    velocidadObjetivo = VELOCIDAD_BASE + (VELOCIDAD_MAXIMA - VELOCIDAD_BASE) * Math.pow(factorProgreso, 1.2);
}

window.addEventListener('scroll', calcularVelocidadPorScroll, { passive: true });
calcularVelocidadPorScroll();


// SCROLL Y ANIMACIONES
document.addEventListener('DOMContentLoaded', () => {
    
    // =====================================================
    //  CARRUSEL INFINITO DE STAFF
    // =====================================================
    const track = document.getElementById('carousel-track');

    if (track) {
        const cards = Array.from(track.querySelectorAll('.tarjeta-resumen'));
        let currentX = 0;
        let isPaused = true;
        let animationFrameId;
        const speed = 1.2; // Velocidad en píxeles por frame
        let seekTargetId = null;

                function animarCarrusel() {
            let shouldMove = !isPaused;
            let currentSpeed = speed;
            let moveDirection = -1; // -1 for left, 1 for right

            if (seekTargetId) {
                const targetCard = document.getElementById(seekTargetId);
                if (targetCard) {
                    const cardRect = targetCard.getBoundingClientRect();
                    const viewportRect = track.parentElement.getBoundingClientRect();
                    const cardCenter = cardRect.left + cardRect.width / 2;
                    const viewportCenter = viewportRect.left + viewportRect.width / 2;
                    const diff = cardCenter - viewportCenter;
                    
                    if (Math.abs(diff) <= 15) {
                        currentX -= diff; // snap to exact center
                        shouldMove = true; 
                        moveDirection = 0; 
                    } else {
                        currentSpeed = 15;
                        shouldMove = true;
                        moveDirection = diff > 0 ? -1 : 1;
                    }
                }
            }

            if (shouldMove) {
                if (moveDirection !== 0) {
                    currentX += currentSpeed * moveDirection;
                }
                
                const firstCard = track.firstElementChild;
                const lastCard = track.lastElementChild;
                const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
                const cardWidth = firstCard.offsetWidth + gap;

                if (currentX <= -cardWidth) {
                    track.appendChild(firstCard);
                    currentX += cardWidth;
                } else if (currentX > 0) {
                    track.insertBefore(lastCard, firstCard);
                    currentX -= cardWidth;
                }

                track.style.transform = `translateX(${currentX}px)`;
            }
            animationFrameId = requestAnimationFrame(animarCarrusel);
        }

        // Activa el carrusel y la animación de entrada cuando la sección es visible
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    isPaused = false;
                    if (!animationFrameId) {
                        animarCarrusel();
                    }

                    // Animación de entrada escalonada en las cards originales
                    cards.forEach((card, i) => {
                        setTimeout(() => {
                            card.classList.add('card-visible');
                        }, 120 * i);
                    });
                } else {
                    isPaused = true;
                }
            });
        }, { threshold: 0.15 });

        const section = document.getElementById('seccion-integrantes');
        if (section) sectionObserver.observe(section);

        // Pausa al hacer hover para poder hacer click en los botones
        track.addEventListener('mouseenter', () => {
            if (!seekTargetId) isPaused = true;
        });
        track.addEventListener('mouseleave', () => {
            if (!seekTargetId) isPaused = false;
        });
        
        // Mini cards hover control
        const miniCards = document.querySelectorAll('.mini-card');
        miniCards.forEach(mc => {
            mc.addEventListener('mouseenter', () => {
                seekTargetId = mc.getAttribute('data-target');
                isPaused = true; // Pause normal scrolling so it stays centered
            });
            mc.addEventListener('mouseleave', () => {
                seekTargetId = null;
                isPaused = false; // Resume normal scrolling
            });
        });
    }

    // Observador de revelado para otras secciones (hero, sobre nosotros)
    const elementosRevelables = document.querySelectorAll('.revelable');
    
    if (elementosRevelables.length > 0) {
        const observadorScroll = new IntersectionObserver((entradas) => {
            entradas.forEach((entrada) => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add('visible-scroll');
                } else {
                    entrada.target.classList.remove('visible-scroll');
                }
            });
        }, {
            threshold: 0.25,
            rootMargin: '-10% 0px -10% 0px'
        });

        elementosRevelables.forEach((el) => observadorScroll.observe(el));
    }

    // Función de scroll ultra suave con velocidad reducida a la mitad (duración extendida a 1600ms)
    function desplazamientoLentoSuave(posicionDestino, duracion = 1600) {
        const posicionInicial = window.pageYOffset || document.documentElement.scrollTop;
        const distancia = posicionDestino - posicionInicial;
        let tiempoInicio = null;

        function animacion(tiempoActual) {
            if (!tiempoInicio) tiempoInicio = tiempoActual;
            const tiempoTranscurrido = tiempoActual - tiempoInicio;
            const progreso = Math.min(tiempoTranscurrido / duracion, 1);

            // Función de suavizado easeInOutCubic para una cinemática majestuosa
            const factorSuavizado = progreso < 0.5 
                ? 4 * progreso * progreso * progreso 
                : 1 - Math.pow(-2 * progreso + 2, 3) / 2;

            window.scrollTo(0, posicionInicial + distancia * factorSuavizado);

            if (tiempoTranscurrido < duracion) {
                requestAnimationFrame(animacion);
            }
        }

        requestAnimationFrame(animacion);
    }

    // Navegación ultrasuave y centrada para enlaces internos (#...) al 50% de velocidad
    const enlacesInternos = document.querySelectorAll('a[href^="#"]');
    enlacesInternos.forEach((enlace) => {
        enlace.addEventListener('click', (e) => {
            const targetId = enlace.getAttribute('href');
            if (targetId && targetId !== '#') {
                const elementoDestino = document.querySelector(targetId);
                if (elementoDestino) {
                    e.preventDefault();
                    
                    // Calcular centro de pantalla para el elemento destino
                    const rect = elementoDestino.getBoundingClientRect();
                    const posicionAbsoluta = rect.top + window.pageYOffset;
                    const posicionCentrada = posicionAbsoluta - (window.innerHeight - rect.height) / 2;

                    desplazamientoLentoSuave(posicionCentrada, 1600);

                    // Actualizar URL sin saltos bruscos
                    if (history.pushState) {
                        history.pushState(null, null, targetId);
                    }

                    // Cerrar el menú móvil si está abierto
                    const menuToggle = document.getElementById('menu-toggle');
                    const navPrincipal = document.getElementById('nav-principal');
                    if (menuToggle && navPrincipal && navPrincipal.classList.contains('nav-abierto')) {
                        menuToggle.classList.remove('abierto');
                        navPrincipal.classList.remove('nav-abierto');
                    }
                }
            }
        });
    });

    // Mostrar el encabezado inmediatamente al scrollear hacia abajo
    const headerOculto = document.getElementById('header-oculto');

    if (headerOculto) {
        window.addEventListener('scroll', () => {
            const scrollActual = window.scrollY || window.pageYOffset || 0;
            
            // Aparece apenas el usuario scrollea más de 40px desde el tope
            if (scrollActual > 40) {
                headerOculto.classList.add('visible');
            } else {
                headerOculto.classList.remove('visible');
            }
        }, { passive: true });
    }

    // =====================================================
    //  MENÚ HAMBURGUESA (MÓVIL)
    // =====================================================
    const menuToggle = document.getElementById('menu-toggle');
    const navPrincipal = document.getElementById('nav-principal');

    if (menuToggle && navPrincipal) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('abierto');
            navPrincipal.classList.toggle('nav-abierto');
        });
    }

    // =====================================================
    //  SCROLLSPY: RESALTAR ENLACE ACTIVO EN NAVBAR
    // =====================================================
    const secciones = document.querySelectorAll('.seccion-completa');
    const navLinks = document.querySelectorAll('.navegacion-principal a.nav-link');

    if (secciones.length > 0 && navLinks.length > 0) {
        const spyOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Se activa cuando el centro de la sección pasa por el centro de la pantalla
            threshold: 0
        };

        const scrollSpy = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remover activo de todos
                    navLinks.forEach(link => link.classList.remove('activo'));
                    // Buscar el enlace que coincida con el ID de la sección
                    const activeLink = document.querySelector(`.navegacion-principal a[href="#${entry.target.id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('activo');
                    }
                }
            });
        }, spyOptions);

        secciones.forEach(seccion => scrollSpy.observe(seccion));
    }

    // =====================================================
    //  CONTROLADOR DE AUDIO — Tema Star Wars
    // =====================================================
    const audio    = document.getElementById('audio-tema');
    const btnSon   = document.getElementById('btn-sonido');
    const icoMute  = document.querySelector('.icono-mute');
    const onda1    = document.querySelector('.onda-1');
    const onda2    = document.querySelector('.onda-2');

    if (audio && btnSon) {
        // Volumen objetivo y duración del fade
        const VOL_TARGET = 0.35;
        const FADE_MS    = 1200;
        let   fadeTimer  = null;

        // Conserva la elección al navegar entre la portada y los perfiles.
        let sonidoActivo = localStorage.getItem('yl-sonido') !== 'off';

        /** Fade gradual del volumen */
        function fadeVolume(desde, hasta, onDone) {
            clearInterval(fadeTimer);
            const pasos  = 30;
            const delta  = (hasta - desde) / pasos;
            let   actual = desde;
            let   i      = 0;
            fadeTimer = setInterval(() => {
                actual = Math.min(Math.max(actual + delta, 0), 1);
                audio.volume = actual;
                if (++i >= pasos) {
                    clearInterval(fadeTimer);
                    if (onDone) onDone();
                }
            }, FADE_MS / pasos);
        }

        /** Actualiza el ícono según el estado */
        function actualizarIcono() {
            if (sonidoActivo) {
                btnSon.classList.add('sonido-activo');
                btnSon.classList.remove('sonido-mute');
                btnSon.title = 'Silenciar';
                if (icoMute) icoMute.style.display = 'none';
                if (onda1)   onda1.style.display   = '';
                if (onda2)   onda2.style.display   = '';
            } else {
                btnSon.classList.remove('sonido-activo');
                btnSon.classList.add('sonido-mute');
                btnSon.title = 'Activar sonido';
                if (icoMute) icoMute.style.display = '';
                if (onda1)   onda1.style.display   = 'none';
                if (onda2)   onda2.style.display   = 'none';
            }
        }

        /** Activa el audio */
        function activarAudio() {
            if (audio.currentTime === 0) {
                audio.currentTime = 3;
            }
            audio.volume = VOL_TARGET;
            let playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.catch(() => {
                    // El navegador bloqueó el autoplay — esperamos interacción
                    sonidoActivo = false;
                    actualizarIcono();
                    document.addEventListener('click', iniciarEnPrimerClick, { once: true });
                });
            }
        }

        /** Desactiva audio */
        function desactivarAudio() {
            clearInterval(fadeTimer);
            audio.pause();
            audio.volume = 0;
        }

        const iniciarEnPrimerClick = () => {
            sonidoActivo = true;
            actualizarIcono();
            activarAudio();
        };

        // Aplicar estado inicial
        actualizarIcono();
        if (sonidoActivo) {
            activarAudio();
        }

        // Toggle al hacer click
        btnSon.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que dispare el evento general de click
            sonidoActivo = !sonidoActivo;
            localStorage.setItem('yl-sonido', sonidoActivo ? 'on' : 'off');
            actualizarIcono();
            if (sonidoActivo) {
                activarAudio();
            } else {
                desactivarAudio();
            }
        });
    }
});
