<template>
  <main class="container container-margin">
    <section id="artistas" class="seccion">
      <h2>Artistas</h2>
      <div class="card-container">
        <article class="card artista">
          <img
            :src="artistas[0].imagen"
            :alt="artistas[0].nombre"
          />
          <div class="card-content">
            <h3>{{artistas[0].nombre}}</h3>
            <p>{{artistas[0].descripcion}}</p>
          </div>
        </article>
        <article class="card artista">
          <img
            :src="artistas[1].imagen"
            :alt="artistas[1].nombre"
          />
          <div class="card-content">
            <h3>{{artistas[1].nombre}}</h3>
            <p>{{artistas[1].descripcion}}</p>
          </div>
        </article>
        <article class="card artista">
          <img :src="artistas[2].imagen" :alt="artistas[2].nombre" />
          <div class="card-content">
            <h3>{{artistas[2].nombre}}</h3>
            <p>{{artistas[2].descripcion}}</p>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>
<script setup>
import { ref } from 'vue';

const artistas = ref([
  {
    nombre: 'La Banda Urbana',
    imagen: './assets/banda-escenario.jpg',
    descripcion: 'Fusiona el sonido clásico con el ritmo moderno del under.',
  },
  {
    nombre: 'Los Sonidos Callejeros',
    imagen: './assets/banda-callejera.jpg',
    descripcion: 'Ritmos latinos y funk directo desde las calles de la ciudad.',
  },
  {
    nombre: 'DJ Metrópolis',
    imagen: './assets/dj.jpg',
    descripcion: 'Beats electrónicos y visuales en una experiencia inmersiva.',
  },
]);
</script>
