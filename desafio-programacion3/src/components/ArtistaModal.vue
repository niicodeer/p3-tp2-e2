<template>
    <div class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-button" @click="closeModal">&times;</button>
        <div class="artist-details">
          <img :src="artista.imagen" :alt="artista.nombre" class="artist-image-modal">
          <div class="artist-info-modal">
            <h2>{{ artista.nombre }}</h2>
            <span class="artist-genre">{{ artista.genero }}</span>
            <p class="artist-bio">{{ artista.biografia }}</p>
          </div>
        </div>
        <div class="spotify-embed">
            <!-- <iframe style="border-radius:12px" src="https://open.spotify.com/embed/artist/5YCc6xS5Gpj3EkaYGdjyNK?utm_source=generator&theme=0" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe> -->
          <iframe 
            style="border-radius:12px" 
            :src="`https://open.spotify.com/embed/artist/${artista.spotifyId}?utm_source=generator&theme=0`" 
            width="100%" 
            height="352" 
            frameBorder="0" 
            allowfullscreen="" 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy">
          </iframe>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    artista: {
      type: Object,
      required: true
    }
  });
  
  const emit = defineEmits(['close']);
  
  const closeModal = () => {
    emit('close');
  };
  </script>
  
  <style scoped>
  .modal-overlay {
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
  
  .modal-content {
    background: #fff;
    padding: 2rem;
    border-radius: 15px;
    width: 90%;
    max-width: 800px;
    position: relative;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    animation: slide-in 0.3s ease-out;
  }
  
  .close-button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 2rem;
    color: #888;
    cursor: pointer;
  }
  
  .artist-details {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  .artist-image-modal {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 12px;
  }
  
  .artist-info-modal h2 {
    font-family: var(--font-display);
    font-size: 2.5rem;
    color: var(--primary-color);
    margin: 0;
  }
  
  .artist-genre {
    display: inline-block;
    background-color: #eee;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    margin: 0.5rem 0 1rem 0;
    font-size: 0.9rem;
  }
  
  @media (max-width: 768px) {
    .artist-details {
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
  }
  
  @keyframes slide-in {
    from {
      transform: translateY(-30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
  </style>