<template>
    <div class="checkout-container">
        <CuponPago v-if="showCupon" :cupon-data="cuponData" @close="showCupon = false" />
        <ConfirmacionCompra v-if="showConfirmacion" :compraData="confirmacionData" @close="showConfirmacion = false" />
        <div v-if="isLoading" class="loading-overlay">
            <div class="spinner"></div>
        </div>
        <form @submit.prevent="handleSubmit" class="checkout-form" v-if="!showCupon" novalidate>
            <fieldset>
                <legend>Datos del Comprador</legend>

                <div class="form-group">
                    <label for="nombre">Nombre completo</label>
                    <input type="text" id="nombre" v-model="formData.nombre" @blur="validateField('nombre')"
                        :class="getValidationClass('nombre')">
                    <p class="feedback-message" v-if="validation.nombre.message">{{ validation.nombre.message }}</p>
                </div>

                <div class="form-group">
                    <label for="email">Correo electrónico</label>
                    <input type="email" id="email" v-model="formData.email" @blur="validateField('email')"
                        :class="getValidationClass('email')">
                    <p class="feedback-message" v-if="validation.email.message">{{ validation.email.message }}</p>
                </div>

                <div class="form-group">
                    <label for="telefono">Número de teléfono</label>
                    <input type="tel" id="telefono" v-model="formData.telefono" @blur="validateField('telefono')"
                        :class="getValidationClass('telefono')">
                    <p class="feedback-message" v-if="validation.telefono.message">{{ validation.telefono.message }}</p>
                </div>

                <div class="form-group">
                    <label for="fechaNacimiento">Fecha de nacimiento (dd/mm/yyyy)</label>
                    <input type="date" id="fechaNacimiento" v-model="formData.fechaNacimiento"
                        @blur="validateField('fechaNacimiento')" :class="getValidationClass('fechaNacimiento')"
                        placeholder="dd/mm/yyyy">
                    <p class="feedback-message" v-if="validation.fechaNacimiento.message">{{
                        validation.fechaNacimiento.message }}</p>
                </div>

                <div class="form-group">
                    <label for="pais">País de residencia</label>
                    <select id="pais" v-model="formData.pais" @blur="validateField('pais')"
                        :class="getValidationClass('pais')">
                        <option disabled value="">Seleccione un país</option>
                        <option v-for="pais in paises" :key="pais.iso3" :value="pais.iso3">{{ pais.nameES }}
                        </option>
                    </select>
                    <p class="feedback-message" v-if="validation.pais.message">{{ validation.pais.message }}</p>
                </div>

            </fieldset>

            <fieldset>
                <legend>Detalles de la Compra</legend>

                <div class="form-group">
                    <label>Evento Seleccionado</label>
                    <input type="hidden" :value="`${evento?.id}`">
                    <input type="text" :value="`${evento?.evento}`" readonly>
                </div>

                <div class="form-group-inline">
                    <div class="form-group">
                        <label>Fecha</label>
                        <input type="date" :value="evento?.fecha" readonly>
                    </div>
                    <div class="form-group">
                        <label>Ubicación</label>
                        <input type="text" :value="`${evento?.lugar}, ${evento?.ciudad}`" readonly>
                    </div>
                </div>

                <div class="ticket-selection-group">
                    <div v-for="(ticket, index) in ticketTypes" :key="index" class="ticket-type-row">
                        <span class="ticket-name">{{ ticket.name }} (${{ ticket.price.toLocaleString() }})</span>
                        <div class="quantity-selector">
                            <button type="button" @click="updateQuantity(ticket.type, -1)">-</button>
                            <input type="number" :value="formData.entradas[ticket.type]" min="0"
                                :max="6 - totalQuantity + formData.entradas[ticket.type]" readonly>
                            <button type="button" @click="updateQuantity(ticket.type, 1)">+</button>
                        </div>
                    </div>
                </div>
                <p class="feedback-message" :class="{ 'is-valid': validation.entradas.valid, 'is-invalid': !validation.entradas.valid }" v-if="validation.entradas.message">{{ validation.entradas.message }}</p>

            </fieldset>

            <fieldset>
                <legend>Método de Pago</legend>
                <div class="form-group payment-method">
                    <label for="efectivo">
                        <input id="efectivo" type="radio" v-model="formData.metodoPago" value="Efectivo"
                            @change="validateField('metodoPago')"> <i class="fas fa-money-bill-wave"></i> Efectivo
                    </label>
                    <!-- <label for="cripto">
                        <input id="cripto" type="radio" v-model="formData.metodoPago" value="Cripto"
                            @change="validateField('metodoPago')"> <i class="fa-brands fa-btc"></i> Cripto
                    </label> -->
                    <label for="tarjeta">
                        <input id="tarjeta" type="radio" v-model="formData.metodoPago" value="Tarjeta"
                            @change="validateField('metodoPago')"> <i class="fas fa-credit-card"></i> Tarjeta de
                        <br>Crédito/Débito
                    </label>
                </div>
                <!-- <p class="feedback-message" v-if="validation.metodoPago.message">{{ validation.metodoPago.message }}</p> -->

                <div v-if="formData.metodoPago === 'Tarjeta'" class="card-details">
                    <div class="card-type-image">
                        <img v-if="cardType" :src="`/assets/cards/${cardType}.png`" :alt="`Logo ${cardType}`"
                            class="card-logo">
                    </div>
                    <div class="form-group">
                        <label for="numeroTarjeta">Número de tarjeta</label>
                        <input type="text" id="numeroTarjeta" v-model="formData.numeroTarjeta"
                            @blur="validateField('numeroTarjeta')" :class="getValidationClass('numeroTarjeta')"
                            maxlength="19" placeholder="0000 0000 0000 0000">
                        <p class="feedback-message" v-if="validation.numeroTarjeta.message">{{
                            validation.numeroTarjeta.message }}</p>
                    </div>

                    <div class="form-group-inline">
                        <div class="form-group">
                            <label for="fechaVencimiento">Fecha de vencimiento (MM/AA)</label>
                            <input type="text" id="fechaVencimiento" v-model="formData.fechaVencimiento"
                                @blur="validateField('fechaVencimiento')"
                                :class="getValidationClass('fechaVencimiento')" maxlength="5" placeholder="MM/AA">
                            <p class="feedback-message" v-if="validation.fechaVencimiento.message">{{
                                validation.fechaVencimiento.message }}</p>
                        </div>
                        <div class="form-group">
                            <label for="cvv">CVV</label>
                            <input type="text" id="cvv" v-model="formData.cvv" @blur="validateField('cvv')"
                                :class="getValidationClass('cvv')" maxlength="4" placeholder="123">
                            <p class="feedback-message" v-if="validation.cvv.message">{{ validation.cvv.message }}</p>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="nombreTarjeta">Nombre en la tarjeta</label>
                        <input type="text" id="nombreTarjeta" v-model="formData.nombreTarjeta"
                            @blur="validateField('nombreTarjeta')" :class="getValidationClass('nombreTarjeta')">
                        <p class="feedback-message" v-if="validation.nombreTarjeta.message">{{
                            validation.nombreTarjeta.message }}</p>
                    </div>
                </div>
            </fieldset>

            <div class="summary-box" v-if="isFormValid">
                <h3>Resumen de la Compra</h3>
                <p><strong>Evento:</strong> {{ selectedEvent?.evento }}</p>
                <p><strong>Comprador:</strong> {{ formData.nombre }}</p>
                <div v-if="totalQuantity > 0">
                    <p><strong>Entradas:</strong></p>
                    <ul>
                        <li v-for="(quantity, type) in formData.entradas" :key="type"
                            style="list-style-type: none; margin-left: 1rem;">
                            <p v-if="quantity > 0"> - {{ quantity }} x {{ type }}</p>
                        </li>
                    </ul>
                </div>
                <p class="total-price"><strong>Total a Pagar:</strong> ${{ totalPrice.toLocaleString('es-AR') }} ARS</p>
            </div>


            <div class="submit-container">
                <p class="feedback-message error" v-if="!isFormValid">
                    {{ submitMessage }}
                </p>
                <button type="submit" :disabled="!isFormValid || isLoading">
                    <span v-if="isLoading">Procesando...</span>
                    <span v-else>Comprar</span>
                </button>
            </div>

        </form>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed, watch } from 'vue';
import CuponPago from './CuponPago.vue';
import ConfirmacionCompra from './ConfirmacionCompra.vue';

// --- STATE MANAGEMENT ---
const formData = reactive({
    nombre: '',
    email: '',
    telefono: '',
    fechaNacimiento: '',
    pais: '',
    eventoId: '',
    entradas: {},
    metodoPago: '',
    numeroTarjeta: '',
    fechaVencimiento: '',
    cvv: '',
    nombreTarjeta: '',
});

const validation = reactive({
    nombre: { isValid: false, message: '' },
    email: { isValid: false, message: '' },
    telefono: { isValid: false, message: '' },
    fechaNacimiento: { isValid: false, message: '' },
    pais: { isValid: false, message: '' },
    eventoId: { isValid: false, message: '' },
    entradas: { isValid: false, message: '' },
    metodoPago: { isValid: false, message: '' },
    numeroTarjeta: { isValid: false, message: '' },
    fechaVencimiento: { isValid: false, message: '' },
    cvv: { isValid: false, message: '' },
    nombreTarjeta: { isValid: false, message: '' },
});

const props = defineProps({
    evento: {
        type: Object,
        required: true
    }
});
const showCupon = ref(false);
const cuponData = ref(null);
const showConfirmacion = ref(false);
const confirmacionData = ref(null);
const isLoading = ref(false);

const paises = ref([]);
// --- DATA FETCHING ---
onMounted(async () => {
    try {
        /* const eventResponse = await fetch('./data/eventos.json');
        eventos.value = await eventResponse.json(); */
        const countryResponse = await fetch('/data/paises.json');
        paises.value = await countryResponse.json();
    } catch (error) {
        console.error("Error cargando los datos:", error);
    }
    formData.eventoId = props.evento.id;
    if (props.evento) {
        const initialEntradas = {};
        if (props.evento.precio_general) initialEntradas['General'] = 0;
        if (props.evento.precio_vip) initialEntradas['VIP'] = 0;
        if (props.evento.precio_palco > 0) initialEntradas['Palco'] = 0;
        formData.entradas = initialEntradas;
    }
    validateField('entradas');
});


// --- VALIDATION LOGIC ---
const detectCardType = (number) => {
    const cleanedNumber = String(number).replace(/\s/g, '');
    if (/^4/.test(cleanedNumber)) return 'visa';
    if (/^5[1-5]/.test(cleanedNumber)) return 'mastercard';
    if (/^3[47]/.test(cleanedNumber)) return 'amex';
    return null;
};
const validators = {
    nombre: (value) => {
        if (!/^[a-zA-Z\s]{3,}$/.test(value)) return "El nombre debe tener al menos 3 letras y solo contener letras y espacios. ";
        return '';
    },
    email: (value) => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Formato de correo electrónico no válido. ";
        return '';
    },
    telefono: (value) => {
        if (!/^\d{10}$/.test(value)) return "El teléfono debe contener 10 dígitos, sin espacios ni guiones. ";
        return '';
    },
    fechaNacimiento: (value) => {
        if (!value) {
            return "Debes seleccionar tu fecha de nacimiento.";
        }
        const birthDate = new Date(value + 'T00:00:00');
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            return "Debes ser mayor de 18 años para comprar.";
        }
        return '';
    },
    pais: (value) => {
        if (!value) return "Debes seleccionar un país. ";
        return '';
    },
    eventoId: (value) => {
        if (!value) return "Debes seleccionar un evento.";
        return '';
    },
    entradas: (value) => {
        const total = Object.values(value).reduce((sum, qty) => sum + qty, 0);
        if (total < 1) return "Debes seleccionar al menos una entrada.";
        if (total > 6) return `No puedes comprar más de 6 entradas en total (seleccionaste ${total}).`;
        return '';
    },
    metodoPago: (value) => {
        if (!value) return "Debes seleccionar un método de pago. ";
        return '';
    },
    numeroTarjeta: (value) => {
        const cleanedValue = String(value).replace(/\s/g, '');
        // Regex para Visa (16), MasterCard (16) y American Express (15)
        if (!/^(4\d{15}|5[1-5]\d{14}|3[47]\d{13})$/.test(cleanedValue)) return "Número de tarjeta no válido para Visa, MasterCard o American Express.";
        return '';
    },
    fechaVencimiento: (value) => {
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) return "Formato de fecha no válido (MM/AA).";
        const [month, year] = value.split('/');
        const expiryDate = new Date(`20${year}`, month, 0); // Ultimo dia del mes de expiracion
        const today = new Date();
        today.setHours(23, 59, 59, 999); // Final del dia actual
        if (expiryDate < today) return "La tarjeta ha expirado.";
        return '';
    },
    cvv: (value) => {
        const cardType = detectCardType(formData.numeroTarjeta);
        if (cardType === 'amex') {
            if (!/^\d{4}$/.test(value)) return "El CVV para American Express debe tener 4 dígitos.";
        } else {
            if (!/^\d{3}$/.test(value)) return "El CVV debe tener 3 dígitos.";
        }
        return '';
    },
    nombreTarjeta: (value) => {
        if (!/^[a-zA-Z\s]{3,}$/.test(value)) return "El nombre debe tener al menos 3 letras y solo contener letras y espacios.";
        return '';
    }
};


const validateField = (field) => {
    const errorMessage = validators[field](formData[field]);
    validation[field].isValid = !errorMessage;
    validation[field].message = errorMessage || (formData[field] ? '✓ Válido' : '');
};

// --- COMPUTED PROPERTIES ---
const selectedEvent = computed(() => {
    return props.evento || null;
});

const ticketTypes = computed(() => {
    const types = [];
    if (!props.evento) return types;
    if (props.evento.precio_general) types.push({ type: 'General', name: 'Entrada General', price: props.evento.precio_general });
    if (props.evento.precio_vip) types.push({ type: 'VIP', name: 'Entrada VIP', price: props.evento.precio_vip });
    if (props.evento.precio_palco > 0) types.push({ type: 'Palco', name: 'Entrada Palco', price: props.evento.precio_palco });
    return types;
});

const totalQuantity = computed(() => {
    return Object.values(formData.entradas).reduce((sum, qty) => sum + qty, 0);
});

const cardType = computed(() => {
    return detectCardType(formData.numeroTarjeta);
});
const isFormValid = computed(() => {
    for (const field in validation) {
        if (formData.metodoPago !== 'Tarjeta' && ['numeroTarjeta', 'fechaVencimiento', 'cvv', 'nombreTarjeta'].includes(field)) {
            continue;
        }
        if (!validation[field].isValid) {
            return false;
        }
    }
    return true;
    //return Object.values(validation).every(field => field.isValid);
});

const submitMessage = computed(() => {
    //const invalidFields = Object.keys(validation).filter(key => !validation[key].isValid);
    const invalidFields = Object.keys(validation).filter(key => {
        if (formData.metodoPago !== 'Tarjeta' && ['numeroTarjeta', 'fechaVencimiento', 'cvv', 'nombreTarjeta'].includes(key)) {
            return false;
        }
        return !validation[key].isValid
    });
    if (invalidFields.length > 0) {
        return `Por favor, corrige los siguientes campos para continuar: ${invalidFields.join(', ')}.`;
    }
    return '';
});

const totalPrice = computed(() => {
    if (!props.evento || formData.cantidad < 1) return 0;

    return ticketTypes.value.reduce((total, ticket) => {
        const quantity = formData.entradas[ticket.type] || 0;
        return total + (quantity * ticket.price);
    }, 0);
});


// --- WATCHERS for Real-time Validation ---
Object.keys(formData).forEach(field => {
    watch(() => formData[field], (newValue) => {
        if (field === 'numeroTarjeta') {
            // Auto-formatea el numero de tarjeta con espacios
            const formatted = String(newValue).replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
            if (formData.numeroTarjeta !== formatted) {
                formData.numeroTarjeta = formatted;
            }
        }
        validateField(field);
    });
});

watch(() => formData.entradas, () => {
    validateField('entradas');
}, { deep: true });


const updateQuantity = (type, amount) => {
    const currentQuantity = formData.entradas[type];
    const newQuantity = currentQuantity + amount;

    if (newQuantity < 0) return;
    if (totalQuantity.value + amount > 6) {
        validation.entradas.message = 'No puedes comprar más de 6 entradas en total.';
        return;
    }

    formData.entradas[type] = newQuantity;
};


const handleEventChange = () => {
    validateField('eventoId');
    formData.tipoEntrada = 'General';
    formData.cantidad = 1;
};

const getValidationClass = (field) => {
    if (validation[field].message === '') return '';
    return validation[field].isValid ? 'is-valid' : 'is-invalid';
};

// --- FORM SUBMISSION ---
const handleSubmit = () => {
    if (isFormValid.value) {
        isLoading.value = true;
        setTimeout(() => {
            if (formData.metodoPago === 'Efectivo') {
                const vencimiento = new Date();
                vencimiento.setDate(vencimiento.getDate() + 5); // Cupón válido por 5 días
                cuponData.value = {
                    codigo: Math.random().toString().slice(2, 16), // Genera un código numérico aleatorio
                    comprador: formData.nombre,
                    evento: selectedEvent.value?.evento,
                    entradas: formData.entradas,
                    total: totalPrice.value,
                    vencimiento: vencimiento.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' })
                };
                showCupon.value = true;
            } else {
                confirmacionData.value = {
                    id: Math.random().toString(36).substring(2, 10).toUpperCase(),
                    comprador: formData.nombre,
                    evento: selectedEvent.value?.evento,
                    entradas: formData.entradas,
                    total: totalPrice.value,
                };
                showConfirmacion.value = true;
            }
            isLoading.value = false;
        }, 2000);

    }
};

</script>
<style scoped>
.ticket-selection-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 1.5rem 0;
}

.ticket-type-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    border: 1px solid #eee;
    border-radius: 8px;
}

.ticket-name {
    font-weight: 500;
}

.quantity-selector {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.quantity-selector input {
    width: 40px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0.2rem;
}

.quantity-selector button {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    border: 1px solid var(--primary-color);
    background-color: var(--primary-color-light);
    color: var(--primary-color);
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s;
}

.quantity-selector button:hover {
    background-color: var(--primary-color);
    color: white;
}

.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
}

.spinner {
    border: 6px solid #f3f3f3;
    border-top: 6px solid var(--primary-color);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.form-hidden {
    visibility: hidden;
}

.checkout-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.checkout-form fieldset {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
}

.checkout-form legend {
    font-family: var(--font-display);
    font-size: 1.8rem;
    color: var(--primary-color);
    padding: 0 0.5rem;
}

.payment-method {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
}

.payment-method label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    min-height: 85px;
    text-align: center;
}

.card-details {
    border: 1px solid #eee;
    border-radius: 8px;
    padding: 1rem;
    margin-top: 1rem;
    background-color: #fcfcfc;
}

.card-type-image {
    min-height: 40px;
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0.5rem;
}

.card-logo {
    height: 35px;
    width: auto;
    transition: all 0.3s ease-in-out;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group-inline {
    display: flex;
    gap: 1.5rem;
}

.form-group-inline .form-group {
    flex: 1;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #555;
}

.form-group input,
.form-group select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    transition: all 0.3s ease;
}

/* Estilos de Validación Visual */
.form-group input.is-valid,
.form-group select.is-valid {
    border-color: #28a745;
    box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.25);
}

.form-group input.is-invalid,
.form-group select.is-invalid {
    border-color: #dc3545;
    box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);
}

.feedback-message {
    font-size: 0.875rem;
    margin-top: 0.25rem;
    color: #dc3545;
    /* Error por defecto */
}

.is-valid+.feedback-message {
    color: #28a745;
}

input:read-only {
    background-color: #e9ecef;
    /* cursor: not-allowed; */
}

.submit-container {
    text-align: center;
    border-top: 1px solid #eee;
    padding-top: 1.5rem;
}

.submit-container button {
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

.submit-container button:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

.submit-container button:not(:disabled):hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.summary-box {
    border: 2px dashed var(--primary-color);
    border-radius: 8px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    background-color: #f8f9fa;
}

.summary-box h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.summary-box p {
    margin-bottom: 0.5rem;
}

.summary-box .total-price {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--dark-color);
    margin-top: 1rem;
    text-align: right;
}

@media (max-width: 560px) {
    .form-group-inline {
        flex-direction: column;
    }
}
</style>