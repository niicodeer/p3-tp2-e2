<template>
  <div class="container">
    <h1 class="main-title">Próximos Eventos</h1>
    <p class="main-subtitle">Descubre los mejores shows y festivales. ¡No te quedes afuera!</p>
    
    <div v-if="loading" class="loading-message">Cargando eventos...</div>
    
    <div v-if="error" class="error-message">{{ error }}</div>
    
    <div v-if="!loading && !error" class="events-grid">
      <CardEvento 
        v-for="evento in eventos" 
        :key="evento.id" 
        :evento="evento" 
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CardEvento from '../components/CardEvento.vue';

const eventos = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
  try {
    const response = await fetch('/data/eventos.json');
    if (!response.ok) {
      throw new Error('No se pudieron cargar los eventos.');
    }
    
    eventos.value = await response.json();
    console.log(eventos.value);
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.main-title {
  font-family: var(--font-display);
  font-size: 3.5rem;
  text-align: center;
  margin-top: 2rem;
  color: var(--primary-color);
}
.main-subtitle {
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 3rem;
  color: #666;
}
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  padding-bottom: 4rem;
}
.loading-message, .error-message {
  text-align: center;
  font-size: 1.5rem;
  padding: 4rem;
}
</style>