<template>
    <div class="container">
      <div v-if="loading" class="loading-message">Cargando formulario...</div>
      <div v-if="error" class="error-message">{{ error }}</div>
      
      <div v-if="!loading && !error && selectedEvent">
        <h1 class="main-title">Formulario de Compra</h1>
        <p class="main-subtitle">Estás comprando para: <strong>{{ selectedEvent.evento }}</strong></p>
        
        <CheckoutForm :evento="selectedEvent" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import CheckoutForm from '../components/CheckoutForm.vue';
  
  const route = useRoute();
  const selectedEvent = ref(null);
  const loading = ref(true);
  const error = ref(null);
  
  onMounted(async () => {
    const eventId = parseInt(route.params.id);
    if (!eventId) {
      error.value = "No se ha especificado un evento válido.";
      loading.value = false;
      return;
    }
    
    try {
      const response = await fetch('/data/eventos.json');
      if (!response.ok) throw new Error('Error al cargar datos del evento.');
      
      const todosLosEventos = await response.json();
      const eventoEncontrado = todosLosEventos.find(e => e.id === eventId);
      
      if (eventoEncontrado) {
        selectedEvent.value = eventoEncontrado;
      } else {
        throw new Error('El evento solicitado no existe.');
      }
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
</style>