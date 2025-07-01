<template>
  <header class="site-header">
    <div class="container">
      <div class="logo">
        <router-link to="/">
          <h1><i class="fas fa-headphones-alt"></i> Sonidos de la Ciudad</h1>
        </router-link>
      </div>
      <nav class="main-nav" :class="{ 'mobile-menu-open': isMobileMenuOpen }">
        <button @click="toggleMobileMenu" class="mobile-nav-toggle">
          <i :class="isMobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
        </button>
        <ul @click="closeMobileMenuOnNavigation">
          <li><router-link to="/artistas">Artistas</router-link></li>
          <li><router-link to="/cronograma">Cronograma</router-link></li>
          <li><router-link to="/eventos">Eventos</router-link></li>
          <li><router-link to="/contacto">Contacto</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

const isMobileMenuOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// Cierra el menú si se hace clic en un enlace
const closeMobileMenuOnNavigation = () => {
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
  }
};
</script>

<style scoped>
.site-header {
  background-color: #fff;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  position: sticky;
  top: 0;
  z-index: 1000;
  border-bottom: 1px solid #eee;
}

.container {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.logo h1 {
  margin: 0;
  font-size: 1.5rem;
  color: var(--light-color);
}

.logo a {
  text-decoration: none;
}

.main-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 2rem;
  align-items: center;
}

.main-nav a {
  text-decoration: none;
  color: var(--text-color-light);
  font-weight: 600;
  font-size: 1rem;
  padding-bottom: 5px;
  transition: color 0.3s ease, border-color 0.3s ease;
  border-bottom: 2px solid transparent;
}

.main-nav a:hover,
.main-nav .router-link-exact-active {
  color: var(--light-color);
  border-bottom-color: var(--light-color);
}

/* Botón de menú móvil */
.mobile-nav-toggle {
  display: none;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: var(--light-color);
  z-index: 1001;
}

@media (max-width: 425px) {
  .container{
    padding: 0 0.5rem;
  }
}

/* Estilos para pantallas pequeñas */
@media (max-width: 768px) {
  .main-nav ul {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: #ffffff;
    flex-direction: column;
    padding: 1rem 0;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    border-top: 1px solid #eee;
  }

  .main-nav.mobile-menu-open ul {
    display: flex;
    background-color: #8332da;
  }

  .main-nav li {
    width: 100%;
    text-align: center;
  }

  .main-nav a {
    padding: 1rem 0;
    display: block;
    width: 100%;
    border-bottom: none;
  }

  .main-nav a:hover,
  .main-nav .router-link-exact-active {
    background-color: var(--primary-color-light);
    color: var(--primary-color);
  }

  .mobile-nav-toggle {
    display: block;
  }
}
</style>