<template>
    <div class="event-card">
        <div class="card-image">
            <i class="fas fa-music fa-5x"></i>
        </div>
        <div class="card-body">
            <span class="card-genre">{{ evento.genero }}</span>
            <h3 class="card-title">{{ evento.evento }}</h3>
            <p class="card-artist">{{ evento.artista }}</p>
            <div class="card-details">
                <span><i class="fas fa-calendar-alt"></i> {{ new Date(evento.fecha).toLocaleDateString('es-AR', {
                    timeZone: 'UTC' }) }}</span>
                <span><i class="fas fa-map-marker-alt"></i> {{ evento.lugar }}, {{ evento.ciudad }}</span>
            </div>
            <router-link :to="`/checkout/${evento.id}`" class="btn-comprar">
                Comprar Entradas
            </router-link>
        </div>
    </div>
</template>

<script setup>
defineProps({
    evento: {
        type: Object,
        required: true
    }
});
</script>

<style scoped>
.event-card {
    background-color: #fff;
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.event-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.12);
}

.card-image {
    background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
}

.card-body {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    /* Para que el botón siempre quede abajo */
}

.card-genre {
    background-color: var(--primary-color);
    color: white;
    font-size: 0.75rem;
    padding: 0.2rem 0.6rem;
    border-radius: 20px;
    align-self: flex-start;
    margin-bottom: 1rem;
}

.card-title {
    font-size: 1.5rem;
    margin: 0;
    color: var(--dark-color);
}

.card-artist {
    font-weight: bold;
    color: #555;
    margin-bottom: 1.5rem;
}

.card-details {
    font-size: 0.9rem;
    color: #777;
    margin-bottom: 1.5rem;
}

.card-details span {
    display: block;
    margin-bottom: 0.5rem;
}

.card-details i {
    margin-right: 0.5rem;
    color: var(--primary-color);
}

.btn-comprar {
    display: block;
    width: 100%;
    text-align: center;
    padding: 0.8rem;
    border-radius: 8px;
    background-color: var(--primary-color);
    color: white;
    text-decoration: none;
    font-weight: bold;
    transition: background-color 0.3s ease;
    margin-top: auto;
    /* Empuja el botón al final de la card */
}

.btn-comprar:hover {
    background-color: var(--secondary-color);
}
</style>