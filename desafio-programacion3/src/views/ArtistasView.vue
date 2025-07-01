<template>
  <main class="container container-margin">
    <div class="header-section">
      <h2>Conoce a los Artistas</h2>
      <p>Descubre el talento que da vida a nuestros festivales. Haz clic en un artista para saber más.</p>
    </div>
    
    <div v-if="artistas.length > 0" class="card-container">
      <article v-for="artista in artistas" :key="artista.id" class="card artista" @click="openModal(artista)">
        <img :src="artista.imagen" :alt="artista.nombre"/>
        <div class="card-content">
          <h3>{{artista.nombre}}</h3>
          <p>{{artista.descripcionCorta}}</p>
        </div>
      </article>
    </div>
     <div v-else class="loading-message">Cargando artistas...</div>
  </main>
  
  <ArtistaModal 
    v-if="selectedArtist" 
    :artista="selectedArtist" 
    @close="closeModal" 
  />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ArtistaModal from '../components/ArtistaModal.vue';

const artistas = ref([]);
const selectedArtist = ref(null); // Almacena el artista para el modal

// Carga los datos de los artistas al montar el componente
onMounted(async () => {
  try {
    const response = await fetch('/data/artistas.json');
    artistas.value = await response.json();
  } catch (error) {
    console.error("Error al cargar los artistas:", error);
  }
});

// Funciones para manejar el estado del modal
const openModal = (artista) => {
  selectedArtist.value = artista;
};

const closeModal = () => {
  selectedArtist.value = null;
};
</script>

<style scoped>
/* Estilos para la vista de Artistas */
.container-margin {
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.header-section {
  text-align: center;
  margin-bottom: 2.5rem;
}

.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.card.artista {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.card.artista:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

.card.artista img {
  width: 100%;
  max-height: 250px;
  object-fit: cover;
  object-position: center;
}

.card-content {
  padding: 1.5rem;
}

.card-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
}

.card-content p {
  color: #ebeaea;
}
</style>