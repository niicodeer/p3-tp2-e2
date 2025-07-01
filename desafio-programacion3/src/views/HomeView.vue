<!-- <template>
  <div>
    <section id="hero">
        <div class="hero-content">
            <h2>Vive la música en el corazón de tu ciudad</h2>
            <p>Festival gratuito al aire libre<br>15 al 17 de Noviembre<br>Parque Central</p>
            <Countdown/>
            <a href="#entradas" class="btn btn-primary">Reservá tu entrada</a>
        </div>
    </section>

    <main class="container">
        <section id="artistas" class="seccion">
            <h2>Artistas Principales</h2>
            <div class="card-container">
                <div class="card artista">
                    <img src="./assets/banda-escenario.jpg" alt="La Banda Urbana">
                    <div class="card-content">
                        <h3>La Banda Urbana</h3>
                        <p>Fusiona el sonido clásico con el ritmo moderno del under.</p>
                    </div>
                </div>
                <div class="card artista">
                    <img src="./assets/banda-callejera.jpg" alt="Los Sonidos Callejeros">
                    <div class="card-content">
                        <h3>Los Sonidos Callejeros</h3>
                        <p>Ritmos latinos y funk directo desde las calles de la ciudad.</p>
                    </div>
                </div>
                <div class="card artista">
                    <img src="./assets/dj.jpg"  alt="DJ Metrópolis">
                    <div class="card-content">
                        <h3>DJ Metrópolis</h3>
                        <p>Beats electrónicos y visuales en una experiencia inmersiva.</p>
                    </div>
                </div>
            </div>
        </section>

        <section id="generos" class="seccion">
            <h2>Géneros Musicales</h2>
            <div class="generos-grid">
                <span><i class="fas fa-guitar"></i> Rock Alternativo</span>
                <span><i class="fas fa-microphone-alt"></i> Pop Latino</span>
                <span><i class="fas fa-compact-disc"></i> Electrónica</span>
                <span><i class="fas fa-leaf"></i> Folk</span>
                <span><i class="fas fa-music"></i> Jazz</span>
            </div>
        </section>

        <section id="audio" class="seccion">
            <h2>Escuchá un adelanto</h2>
            <div class="audios-container">
                <div class="audio-player">
                    <p>La Banda Urbana</p>
                    <audio controls src="./assets/audio/AMOR-DE-INSTANTE.mp3"></audio>
                </div>
                <div class="audio-player">
                    <p>Los Sonidos Callejeros</p>
                    <audio controls src="./assets/audio/AMOR-DE-INSTANTE.mp3"></audio>
                </div>
                <div class="audio-player">
                    <p>DJ Metrópolis</p>
                    <audio controls src="./assets/audio/AMOR-DE-INSTANTE.mp3"></audio>
                </div>
            </div>
        </section>

        <section id="contacto" class="seccion">
            <h2>Contacto y Redes</h2>
            <form class="contact-form" action="mailto:e.agustinrz@gmail.com">
                <div class="form-group">
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" name="nombre" required minlength="3">
                </div>
                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required placeholder="tu@email.com">
                </div>
                <div class="form-group">
                    <label for="mensaje">Mensaje:</label>
                    <textarea id="mensaje" name="mensaje" rows="4" required></textarea>
                </div>
                <button type="submit" class="btn btn-form">Enviar Consulta</button>
            </form>
            <div class="social-links">
                <p>O seguinos en nuestras redes:</p>
                <a href="#" class="social-icon"><i class="fab fa-facebook"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
            </div>
            <p class="email-contact">O escribinos a: <a href="mailto:e.agustinrz@gmail.com">info@sonidosciudad.com</a></p>
        </section>
    </main>
  </div>
</template>

<script setup>
import Countdown from '../components/CountdownComponent.vue' // Importamos el nuevo componente
</script>
 -->

<template>
    <main class="home-view">
        <!-- Hero Carousel Section -->
        <section class="hero-carousel">
            <div v-for="(event, index) in featuredEvents" :key="event.id" class="carousel-slide"
                :class="{ active: index === currentSlide }">
                <img :src="event.imagen" :alt="event.evento" class="carousel-bg">
                <div class="carousel-content">
                    <h1>{{ event.evento }}</h1>
                    <p>{{ event.artista }}</p>
                    <router-link :to="`/checkout/${event.id}`" class="btn btn-primary">Comprar Entradas</router-link>
                </div>
            </div>
            <button @click="prevSlide" class="carousel-control prev">&#10094;</button>
            <button @click="nextSlide" class="carousel-control next">&#10095;</button>
        </section>

        <!-- Próximos Eventos Section -->
        <section id="proximos-eventos" class="seccion container">
            <h2>Próximos Eventos</h2>
            <div class="eventos-grid">
                <div v-for="event in upcomingEvents" :key="event.id" class="evento-card">
                    <img :src="event.imagen" :alt="event.evento" class="evento-card-img">
                    <div class="evento-card-body">
                        <h3>{{ event.evento }}</h3>
                        <p><i class="fas fa-calendar-alt"></i> {{ new Date(event.fecha).toLocaleDateString('es-AR', {
                            timeZone: 'UTC'
                        }) }}</p>
                        <p><i class="fas fa-map-marker-alt"></i> {{ event.lugar }}, {{ event.ciudad }}</p>
                        <router-link :to="`/cronograma?search=${encodeURIComponent(event.evento)}`"
                            class="btn-secondary">Ver Evento</router-link>
                    </div>
                </div>
            </div>
        </section>

        <section id="reproductor-playlist" class="seccion">
            <h2>Ambientate para los próximos festivales</h2>
            <div class="playlist-container">
                <iframe style="border-radius:12px"
                    src="https://open.spotify.com/embed/playlist/37i9dQZF1E4wxAHFnNtXcu?utm_source=generator"
                    width="100%" height="352" frameBorder="0" allowfullscreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"></iframe>
            </div>
        </section>
        <section id="contacto" class="seccion">
            <div class="social-links">
                <p>Seguinos en nuestras redes:</p>
                <a href="#" class="social-icon"><i class="fab fa-facebook"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
            </div>
            <p class="email-contact">O escribinos a: <a href="mailto:e.agustinrz@gmail.com">info@sonidosciudad.com</a>
            </p>
        </section>
    </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { RouterLink } from 'vue-router';

const allEvents = ref([]);
const currentSlide = ref(0);

// --- Computed Properties ---
const featuredEvents = computed(() => {
    // Destacar eventos con imágenes y que sean próximos
    return allEvents.value
        .filter(event => event.imagen)
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
        .slice(0, 5); // Tomar los 5 primeros para el carrusel
});

const upcomingEvents = computed(() => {
    // Mostrar los próximos 6 eventos que no están en el carrusel
    const featuredIds = new Set(featuredEvents.value.map(e => e.id));
    return allEvents.value
        .filter(event => new Date(event.fecha) >= new Date()) // Solo eventos futuros
        .filter(event => !featuredIds.has(event.id)) // Excluir los del carrusel
        .sort((a, b) => new Date(a.fecha) - new Date(b.fecha))
        .slice(0, 3);
});

const genres = computed(() => {
    const allGenres = allEvents.value.map(event => event.genero).filter(Boolean);
    return [...new Set(allGenres)];
});

// --- Carousel Logic ---
const nextSlide = () => {
    if (featuredEvents.value.length > 0) {
        currentSlide.value = (currentSlide.value + 1) % featuredEvents.value.length;
    }
};

const prevSlide = () => {
    if (featuredEvents.value.length > 0) {
        currentSlide.value = (currentSlide.value - 1 + featuredEvents.value.length) % featuredEvents.value.length;
    }
};

// --- Lifecycle Hooks ---
onMounted(async () => {
    try {
        const response = await fetch('/data/eventos.json');
        if (!response.ok) throw new Error('No se pudieron cargar los eventos.');
        allEvents.value = await response.json();
    } catch (error) {
        console.error("Error al cargar los eventos:", error);
    }

    // Auto-play carousel
    setInterval(nextSlide, 5000);
});
</script>

<style scoped>
/* General Section Styling */
.seccion {
    padding: 4rem 0;
}

.container {
    max-width: 1200px;
    margin: 2.5rem auto;
    padding: 0 1rem;
}

.seccion h2 {
    text-align: center;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    font-weight: 700;
}

/* Hero Carousel */
.hero-carousel {
    position: relative;
    width: 100%;
    height: 85vh;
    overflow: hidden;
    color: white;
}

.carousel-slide {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: opacity 1s ease-in-out;
}

.carousel-slide.active {
    opacity: 1;
}

.carousel-bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.6);
}

.carousel-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
}

.carousel-content h1 {
    font-size: 4rem;
    font-weight: bold;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
}

.carousel-content p {
    font-size: 1.5rem;
    margin-bottom: 2rem;
    text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
}

.carousel-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.3);
    border: none;
    color: white;
    font-size: 2rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    z-index: 10;
    border-radius: 8px;
}

.carousel-control.prev {
    left: 1rem;
}

.carousel-control.next {
    right: 1rem;
}

/* Próximos Eventos */
.eventos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.evento-card {
    background: #fff;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.evento-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.evento-card-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.evento-card-body {
    padding: 1.5rem;
}

.evento-card-body h3 {
    font-size: 1.5rem;
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--primary-color);
}

.evento-card-body p {
    color: #6c757d;
    margin-bottom: 1rem;
}

.evento-card-body .btn-secondary {
    display: inline-block;
    width: 100%;
    text-align: center;
}

/* Géneros */
.generos-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
}

.generos-grid span {
    background-color: var(--primary-color-light);
    color: var(--primary-color);
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    font-weight: 500;
    transition: background-color 0.3s ease;
}

.generos-grid span:hover {
    background-color: var(--primary-color);
    color: #fff;
}

.generos-grid i {
    margin-right: 0.5rem;
}

/* Contacto */
.contact-form {
    max-width: 600px;
    margin: 0 auto 2rem auto;
}

.redes-sociales {
    text-align: center;
}

.redes-sociales a {
    color: var(--text-color);
    font-size: 1.8rem;
    margin: 0 1rem;
    transition: color 0.3s ease;
}

.redes-sociales a:hover {
    color: var(--primary-color);
}

.playlist-container {
    max-width: 1200px;
    margin: 2rem auto;
}
.social-links p{
    text-align: center;
    font-size: 1.4rem;
}
</style>