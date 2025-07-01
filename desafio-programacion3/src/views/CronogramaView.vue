<!-- <template>
  <main class="container container-margin">
    <h2>Cronograma de Actuaciones</h2>

    <div class="schedule-filters">
      <button @click="activeDay = 'Todos'" :class="{ active: activeDay === 'Todos' }" class="filter-btn">Todos</button>
      <button @click="activeDay = 'Viernes'" :class="{ active: activeDay === 'Viernes' }" class="filter-btn">Viernes</button>
      <button @click="activeDay = 'Sábado'" :class="{ active: activeDay === 'Sábado' }" class="filter-btn">Sábado</button>
      <button @click="activeDay = 'Domingo'" :class="{ active: activeDay === 'Domingo' }" class="filter-btn">Domingo</button>
    </div>

    <table class="schedule-table">
      <thead>
        <tr>
          <th>Artista</th>
          <th>Día</th>
          <th>Horario</th>
          <th>Escenario</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="artista in sortedSchedule" :key="artista.nombre">
          <td>{{ artista.nombre }}</td>
          <td>{{ artista.dia }}</td>
          <td>{{ artista.horario }}</td>
          <td>{{ artista.escenario }}</td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue';
import { artistas } from '../data/data';

const activeDay = ref('Todos'); // El filtro activo

const dayOrder = { "Viernes": 1, "Sábado": 2, "Domingo": 3 };

// Una 'propiedad computada' que se recalcula automáticamente cuando 'activeDay' cambia
const sortedSchedule = computed(() => {
  return artistas
    .filter(artista => {
      if (activeDay.value === 'Todos') return true;
      return artista.dia === activeDay.value;
    })
    .sort((a, b) => {
      const dayComparison = dayOrder[a.dia] - dayOrder[b.dia];
      if (dayComparison !== 0) return dayComparison;
      return a.horario.localeCompare(b.horario);
    });
});
</script>
 -->
<template>
  <main class="container container-margin">
    <div class="header-section">
      <h2>Explorar Cronogramas</h2>
      <p>Busca tu artista favorito o filtra por ciudad para ver el lineup de cada evento.</p>
    </div>

    <div class="filters-container">
      <div class="search-bar">
        <i class="fas fa-search"></i>
        <input type="text" v-model="searchQuery" placeholder="Buscar por artista o evento...">
      </div>
      <div class="category-filter">
        <i class="fas fa-map-marker-alt"></i>
        <select v-model="selectedCity">
          <option value="">Todas las ciudades</option>
          <option v-for="city in cities" :key="city" :value="city">{{ city }}</option>
        </select>
      </div>
    </div>

    <div v-if="filteredEvents.length > 0" class="events-list">
      <div v-for="event in filteredEvents" :key="event.id" class="event-card">
        <div class="event-header" @click="toggleEvent(event.id)">
          <div class="event-info">
            <h3>{{ event.evento }}</h3>
            <p><i class="fas fa-calendar-alt"></i> {{ new Date(event.fecha).toLocaleDateString('es-AR', {
              timeZone:
                'UTC'
            }) }} | <i class="fas fa-map-marker-alt"></i> {{ event.ciudad }}</p>
          </div>
          <div class="event-actions">
            <router-link :to="`/checkout/${event.id}`" class="btn btn-primary" style="padding: 0.5rem 1rem; font-size: 1rem;">Comprar Entradas</router-link>
            <i class="fas fa-chevron-down" :class="{ 'rotated': isEventExpanded(event.id) }"></i>
          </div>
        </div>
        <div v-if="isEventExpanded(event.id)" class="event-details">
          <table v-if="event.lineup && event.lineup.length > 0" class="schedule-table">
            <thead>
              <tr>
                <th>Artista</th>
                <th>Día</th>
                <th>Horario</th>
                <th>Escenario</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="artista in sortedLineup(event.lineup)" :key="artista.nombre">
                <td>{{ artista.nombre }}</td>
                <td>{{ artista.dia }}</td>
                <td>{{ artista.horario }}</td>
                <td>{{ artista.escenario }}</td>
              </tr>
            </tbody>
          </table>
          <p v-else class="no-lineup">Lineup a confirmar.</p>
        </div>
      </div>
    </div>
    <div v-else class="no-results">
      <p>No se encontraron eventos que coincidan con tu búsqueda.</p>
    </div>
  </main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

const events = ref([]);
const searchQuery = ref('');
const selectedCity = ref('');
const expandedEvents = ref([]); // Almacena los IDs de los eventos expandidos
const route = useRoute();

onMounted(async () => {
  try {
    const response = await fetch('/data/eventos.json');
    if (!response.ok) throw new Error('No se pudieron cargar los eventos.');
    events.value = await response.json();

    if (route.query.search) {
      searchQuery.value = route.query.search;
    }
  } catch (error) {
    console.error("Error al cargar los eventos:", error);
  }
});

// Obtiene una lista única de ciudades para el filtro
const cities = computed(() => {
  const allCities = events.value.map(event => event.ciudad).filter(Boolean);
  return [...new Set(allCities)];
});

// Filtra los eventos según la ciudad y la búsqueda
const filteredEvents = computed(() => {
  let filtered = events.value;

  if (selectedCity.value) {
    filtered = filtered.filter(event => event.ciudad === selectedCity.value);
  }

  if (searchQuery.value.trim()) {
    const lowerCaseQuery = searchQuery.value.toLowerCase();
    filtered = filtered.filter(event =>
      // Busca en el nombre del evento, el artista principal y en el lineup
      event.evento.toLowerCase().includes(lowerCaseQuery) ||
      event.artista.toLowerCase().includes(lowerCaseQuery) ||
      (event.lineup && event.lineup.some(artist => artist.nombre.toLowerCase().includes(lowerCaseQuery)))
    );
  }

  return filtered;
});

// Objeto para ordenar los días correctamente
const dayOrder = { "Viernes": 1, "Sábado": 2, "Domingo": 3 };

// Función para ordenar el lineup de un evento específico
const sortedLineup = (lineup) => {
  if (!lineup) return [];
  return [...lineup].sort((a, b) => {
    const dayComparison = (dayOrder[a.dia] || 99) - (dayOrder[b.dia] || 99);
    if (dayComparison !== 0) return dayComparison;
    return a.horario.localeCompare(b.horario);
  });
};

// Maneja la expansión/colapso de las cards de eventos
const toggleEvent = (eventId) => {
  const index = expandedEvents.value.indexOf(eventId);
  if (index > -1) {
    expandedEvents.value.splice(index, 1);
  } else {
    expandedEvents.value.push(eventId);
  }
};

// Verifica si una card de evento está expandida
const isEventExpanded = (eventId) => {
  return expandedEvents.value.includes(eventId);
};
</script>

<style scoped>
.no-lineup {
  padding: 1.5rem;
  text-align: center;
  color: #888;
  font-style: italic;
}

.container-margin {
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.header-section {
  text-align: center;
  margin-bottom: 2.5rem;
}

.header-section h2 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.filters-container {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
  flex-wrap: wrap;
}

.search-bar,
.category-filter {
  display: flex;
  align-items: center;
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  flex-grow: 1;
  border: 1px solid #dee2e6;
}

.search-bar i,
.category-filter i {
  color: #6c757d;
  margin-right: 0.75rem;
}

.search-bar input,
.category-filter select {
  border: none;
  background: transparent;
  width: 100%;
  font-size: 1rem;
  padding: 0.25rem;
}

.search-bar input:focus,
.category-filter select:focus {
  outline: none;
}

.event-card {
  background: #fff;
  border-radius: 12px;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
}

.event-header {
  padding: 1.5rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
}

.event-header:hover {
  background-color: #f8f9fa;
}

.event-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.5rem;
  color: var(--primary-color);
}

.event-info p {
  margin: 0;
  color: #6c757d;
}

.event-header .fa-chevron-down {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.event-header .fa-chevron-down.rotated {
  transform: rotate(180deg);
}

.event-details {
  overflow: auto;
  padding: 0 1.5rem 1.5rem 1.5rem;
  animation: fadeIn 0.5s ease;
}
.event-actions{
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: end;
  text-align: center;
}

.schedule-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

.schedule-table th,
.schedule-table td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

.schedule-table th {
  background-color: #f8f9fa;
  color: var(--text-color);
}

.no-results {
  text-align: center;
  padding: 3rem;
  background-color: #f8f9fa;
  border-radius: 8px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 560px) {
 .event-actions{
  flex-direction: column;
 }   
}

@media (max-width: 768px) {
  .filters-container {
    flex-direction: column;
  }
}
</style>