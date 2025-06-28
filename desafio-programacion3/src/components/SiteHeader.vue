<template>
  <header class="site-header">
    <div class="container">
      <div class="logo">
        <router-link to="/">
          <h1><i class="fas fa-headphones-alt"></i> Sonidos de la Ciudad</h1>
        </router-link>
      </div>
      <nav class="main-nav">
        <ul>
          <li><router-link to="/artistas">Artistas</router-link></li>
          <li><router-link to="/cronograma">Cronograma</router-link></li>
          <li><router-link to="/entradas">Entradas</router-link></li>
          <li><router-link to="/contacto">Contacto</router-link></li>
        </ul>
      </nav>
    </div>
  </header>
</template>
