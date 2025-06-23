import { artistas } from "./data.js";

// Espera a que todo el contenido del DOM esté cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", () => {
  // --- LÓGICA DEL CONTADOR REGRESIVO (para index.html) ---

  // Seleccionamos el contenedor del contador
  const countdownElement = document.getElementById("countdown");

  // Solo ejecutamos el contador si el elemento existe en la página actual
  if (countdownElement) {
    const festivalDate = new Date("November 15, 2025 18:00:00").getTime();

    const updateCountdown = setInterval(() => {
      const now = new Date().getTime();
      const distance = festivalDate - now;

      // Cálculos de tiempo
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Actualizamos el HTML
      document.getElementById("days").innerText = days < 10 ? "0" + days : days;
      document.getElementById("hours").innerText =
        hours < 10 ? "0" + hours : hours;
      document.getElementById("minutes").innerText =
        minutes < 10 ? "0" + minutes : minutes;
      document.getElementById("seconds").innerText =
        seconds < 10 ? "0" + seconds : seconds;

      // Si la cuenta regresiva termina
      if (distance < 0) {
        clearInterval(updateCountdown);
        countdownElement.innerHTML =
          "<div class='festival-live'>¡El festival ya comenzó!</div>";
      }
    }, 1000);
  }

  // --- LÓGICA DEL CRONOGRAMA INTERACTIVO (para cronograma.html) ---

  const scheduleBody = document.getElementById("schedule-body");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // ** INICIO DE LA MODIFICACIÓN **

  // 1. Objeto para definir el orden correcto de los días
  const dayOrder = {
    Viernes: 1,
    Sábado: 2,
    Domingo: 3,
  };

  // 2. Función para renderizar la tabla del cronograma (actualizada con sort)
  const renderSchedule = (filter) => {
    scheduleBody.innerHTML = "";

    const filteredArtists = artistas.filter((artista) => {
      if (filter === "Todos") {
        return true;
      }
      return artista.dia === filter;
    });

    // 3. AÑADIMOS .sort() ANTES de recorrer los artistas para ordenarlos
    const sortedArtists = filteredArtists.sort((a, b) => {
      // Primero, comparamos por día usando nuestro objeto de orden
      const dayComparison = dayOrder[a.dia] - dayOrder[b.dia];

      if (dayComparison !== 0) {
        // Si los días son diferentes, ordenamos por día
        return dayComparison;
      } else {
        // Si los días son iguales, ordenamos por horario (alfabéticamente funciona bien para HH:MM)
        return a.horario.localeCompare(b.horario);
      }
    });

    // Ahora recorremos la lista ya ordenada (sortedArtists)
    sortedArtists.forEach((artista) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${artista.nombre}</td>
        <td>${artista.dia}</td>
        <td>${artista.horario}</td>
        <td>${artista.escenario}</td>
      `;
      scheduleBody.appendChild(row);
    });
  };

  // ** FIN DE LA MODIFICACIÓN **

  // Solo ejecutamos la lógica del cronograma si los elementos existen
  if (scheduleBody && filterButtons.length > 0) {
    // Añadimos el evento de clic a cada botón de filtro
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        // Quitamos la clase 'active' de todos los botones
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        // Añadimos la clase 'active' al botón clickeado
        button.classList.add("active");

        const dayFilter = button.getAttribute("data-day");
        renderSchedule(dayFilter);
      });
    });

    // Renderizamos el cronograma completo por primera vez al cargar la página
    renderSchedule("Todos");
  }
});
