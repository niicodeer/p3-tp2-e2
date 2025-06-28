<template>
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

const activeDay = ref('Todos'); // El filtro activo

const artistas = ref([
  // ... Pega aquí la lista completa de artistas ...
  { nombre: "Wos", dia: "Viernes", horario: "22:00", escenario: "Principal" },
  // etc.
]);

const dayOrder = { "Viernes": 1, "Sábado": 2, "Domingo": 3 };

// Una 'propiedad computada' que se recalcula automáticamente cuando 'activeDay' cambia
const sortedSchedule = computed(() => {
  return artistas.value
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
