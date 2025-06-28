<template>
  <div>
    <section id="hero">
        <div class="hero-content">
            <h2>Vive la música en el corazón de tu ciudad</h2>
            <p>Festival gratuito al aire libre · 15 al 17 de Noviembre · Parque Central</p>
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
