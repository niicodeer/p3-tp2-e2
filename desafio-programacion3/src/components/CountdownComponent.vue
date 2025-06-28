<template>
  <div v-if="distance > 0" id="countdown" class="countdown">
    <div class="countdown-item">
      <span>{{ days }}</span>
      <span>Días</span>
    </div>
    <div class="countdown-item">
      <span>{{ hours }}</span>
      <span>Horas</span>
    </div>
    <div class="countdown-item">
      <span>{{ minutes }}</span>
      <span>Minutos</span>
    </div>
    <div class="countdown-item">
      <span>{{ seconds }}</span>
      <span>Segundos</span>
    </div>
  </div>
  <div v-else class="festival-live">¡El festival ya comenzó!</div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const festivalDate = new Date('November 15, 2025 18:00:00').getTime()

// Variables reactivas
const days = ref('00')
const hours = ref('00')
const minutes = ref('00')
const seconds = ref('00')
const distance = ref(0)

let intervalId = null

const updateCountdown = () => {
  const now = new Date().getTime()
  distance.value = festivalDate - now

  if (distance.value < 0) {
    clearInterval(intervalId)
    return
  }

  const d = Math.floor(distance.value / (1000 * 60 * 60 * 24))
  const h = Math.floor((distance.value % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const m = Math.floor((distance.value % (1000 * 60 * 60)) / (1000 * 60))
  const s = Math.floor((distance.value % (1000 * 60)) / 1000)

  days.value = d < 10 ? '0' + d : d
  hours.value = h < 10 ? '0' + h : h
  minutes.value = m < 10 ? '0' + m : m
  seconds.value = s < 10 ? '0' + s : s
}

// onMounted es un "hook" que se ejecuta cuando el componente se monta en la página
onMounted(() => {
  updateCountdown() // Ejecuta una vez al inicio
  intervalId = setInterval(updateCountdown, 1000)
})

// onUnmounted se ejecuta cuando el componente se destruye (ej. al cambiar de página)
onUnmounted(() => {
  clearInterval(intervalId) // Limpia el intervalo para evitar errores
})
</script>
