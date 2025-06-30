<template>
    <div class="cupon-overlay">
        <div class="cupon-container" id="cupon-imprimible">
            <div class="cupon-header">
                <h2>Cupón de Pago</h2>
                <button @click="$emit('close')" class="close-btn">&times;</button>
            </div>
            <div class="cupon-body">
                <p>Utiliza el siguiente código para pagar en cualquier sucursal de:</p>
                <div class="payment-logos">
                    <img src="/assets/payments/rapipago.png" alt="Rapipago">
                    <img src="/assets/payments/pagofacil.png" alt="Pago Fácil">
                    <img src="/assets/payments/mercadopago.png" alt="Mercado Pago">
                </div>
                <div class="barcode-section">
                    <VueBarcode :value="cuponData.codigo" :options="barcodeOptions"></VueBarcode>
                    <!-- <p class="codigo-numerico">{{ cuponData.codigo }}</p> -->
                </div>
                <div class="summary">
                    <h3>Resumen de tu Compra</h3>
                    <p><strong>Comprador:</strong> {{ cuponData.comprador }}</p>
                    <p><strong>Evento:</strong> {{ cuponData.evento }}</p>
                    <div v-if="Object.values(cuponData.entradas).some(qty => qty > 0)">
                        <p><strong>Entradas:</strong></p>
                        <ul>
                            <li v-for="(quantity, type) in cuponData.entradas" :key="type" style="list-style-type: none; margin-left: 1rem;">
                                <template v-if="quantity > 0"> - {{ quantity }} x {{ type }}</template>
                            </li>
                        </ul>
                    </div>
                    <p class="total-price"><strong>Total a Pagar:</strong> ${{ cuponData.total.toLocaleString('es-AR')
                        }} ARS</p>
                    <p class="vencimiento">Válido hasta: {{ cuponData.vencimiento }}</p>
                </div>
            </div>
            <div class="cupon-footer">
                <p>Al pagar, recibirás tus entradas por correo electrónico.</p>
                <button @click="handlePrint" class="print-btn"><i class="fas fa-print"></i> Imprimir Cupón</button>
            </div>
        </div>
    </div>
</template>

<script setup>
//import VueBarcode from 'vue-barcode';

import VueBarcode from '@chenfengyuan/vue-barcode';

defineProps({
    cuponData: {
        type: Object,
        required: true,
    }
});

defineEmits(['close']);

const barcodeOptions = {
    format: 'CODE128',
    width: 2,
    height: 100,
    displayValue: true,
    fontOptions: 'bold',
    textAlign: 'center',
    textPosition: 'bottom',
    textMargin: 2,
    fontSize: 18,
    background: '#ffffff',
    lineColor: '#000000',
    margin: 10
};

const handlePrint = () => {
    window.print();
};
</script>

<style scoped>
.cupon-overlay {
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
}

.cupon-container {
    max-height: 80vh;
    overflow:auto;
    background: white;
    padding: 2rem;
    border-radius: 12px;
    width: 90%;
    max-width: 500px;
    box-shadow: 0 5px 25px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.3s ease-out;
}

.cupon-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
}

.cupon-header h2 {
    margin: 0;
    font-family: var(--font-display);
    color: var(--primary-color);
}

.close-btn {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: #aaa;
}

.payment-logos {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 1rem 0;
}

.payment-logos img {
    height: 100px;
}

.barcode-section {
    text-align: center;
    margin: 2rem 0;
}

.codigo-numerico {
    font-family: 'Courier New', Courier, monospace;
    font-size: 1.4rem;
    font-weight: bold;
    letter-spacing: 2px;
    margin-top: 0.5rem;
}

.summary {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px dashed #ccc;
}

.summary p {
    margin: 0.5rem 0;
}

.total-price {
    font-size: 1.2rem;
    margin-top: 0.5rem;
    font-weight: bold;
    color: var(--secondary-color);
}

.vencimiento {
    font-style: italic;
    color: #e74c3c;
    text-align: center;
    margin-top: 1rem;
}

.cupon-footer {
    text-align: center;
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
    font-size: 0.9rem;
    color: #777;
}

.print-btn {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
    margin-top: 1rem;
}

.print-btn:hover {
    background-color: var(--secondary-color);
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

@media print {
    .cupon-overlay {
        position: absolute;
        background-color: white;
    }

    .close-btn,
    .print-btn,
    .cupon-footer p {
        display: none;
    }

    .cupon-container {
        box-shadow: none;
        border: 2px solid #000;
    }
}
</style>