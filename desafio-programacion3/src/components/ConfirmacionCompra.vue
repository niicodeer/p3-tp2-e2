<template>
  <div class="confirmacion-overlay" @click.self="$emit('close')">
    <div class="confirmacion-container">
      <div class="confirmacion-header">
        <svg class="success-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle class="success-icon__circle" cx="26" cy="26" r="25" fill="none" />
          <path class="success-icon__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
        <h2>¡Compra Exitosa!</h2>
        <p>Tu pago ha sido procesado correctamente.</p>
      </div>
      <div class="summary">
        <h3>Resumen de tu Compra</h3>
        <p><strong>Comprador:</strong> {{ compraData.comprador }}</p>
        <p><strong>Evento:</strong> {{ compraData.evento }}</p>
        <div v-if="compraData.entradas && Object.values(compraData.entradas).some(qty => qty > 0)">
          <p><strong>Entradas:</strong></p>
          <ul>
            <li v-for="(quantity, type) in compraData.entradas" :key="type"
              style="list-style-type: none; margin-left: 1rem;">
              <template v-if="quantity > 0">- {{ quantity }} x {{ type }}</template>
            </li>
          </ul>
        </div>
        <p class="total-price"><strong>Total Pagado:</strong> ${{ compraData.total.toLocaleString('es-AR') }} ARS</p>
        <p class="transaction-id"><strong>ID de Transacción:</strong> {{ compraData.id }}</p>
      </div>
      <div class="confirmacion-footer">
        <button @click="finalizarYRedirigir" class="btn-primary">Finalizar</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
defineProps({
  compraData: {
    type: Object,
    required: true
  }
});
defineEmits(['close']);
const router = useRouter();

const finalizarYRedirigir = () => {
  router.push('/cronograma');
};
</script>

<style scoped>
.confirmacion-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

.confirmacion-container {
  background: white;
  padding: 2rem 3rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  text-align: center;
  animation: slideInUp 0.4s ease-out;
}

.confirmacion-header {
  margin-bottom: 2rem;
}

.confirmacion-header h2 {
  font-size: 2rem;
  color: #28a745;
  margin-bottom: 0.5rem;
}

.summary {
  text-align: left;
  margin-bottom: 2rem;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
  padding: 1.5rem 0;
}

.summary h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  text-align: center;
}

.summary p {
  margin: 0.5rem 0;
}

.summary ul {
  list-style: none;
  padding-left: 1rem;
}

.summary li {
  margin-bottom: 0.25rem;
}

.total-price {
  font-weight: bold;
  font-size: 1.1rem;
  margin-top: 1rem;
  color: var(--primary-color);
}

.transaction-id {
  font-size: 0.8rem;
  color: #888;
  margin-top: 1rem;
}

.confirmacion-footer .btn-primary {
  padding: 0.8rem 2.5rem;
  border: none;
  border-radius: 50px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  background: linear-gradient(90deg, var(--primary-color) 0%, var(--secondary-color) 100%);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

/* Success Icon Animation */
.success-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #fff;
  stroke-miterlimit: 10;
  margin: 0 auto 20px;
  box-shadow: inset 0px 0px 0px #28a745;
  animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
}

.success-icon__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #28a745;
  fill: none;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
}

.success-icon__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {

  0%,
  100% {
    transform: none;
  }

  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 40px #28a745;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideInUp {
  from {
    transform: translateY(50px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>