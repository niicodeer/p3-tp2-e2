<template>
  <main class="container container-margin">
    <h2>Contacto</h2>
    <form action="mailto:e.agustinrz@gmail.com" method="post" enctype="text/plain">
      <label for="nombre">Nombre:</label>
      <input type="text" id="nombre" name="nombre" required /><br />
      <label for="correo">Correo electrónico:</label>
      <input type="email" id="correo" name="correo" required /><br />
      <label for="asunto">Asunto:</label>
      <select id="asunto" name="asunto">
        <option value="info">Información</option>
        <option value="entradas">Entradas</option>
        <option value="artistas">Artistas</option>
        <option value="prensa">Prensa</option></select
      ><br />
      <label for="mensaje">Mensaje:</label>
      <textarea id="mensaje" name="mensaje" rows="4" required></textarea><br />
      <button type="submit">Enviar</button>
    </form>
  </main>
</template>
