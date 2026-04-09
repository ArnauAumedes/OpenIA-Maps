/**
 * Orquestrador de l'aplicació
 * Autor: Arnau Aumedes
 * Fecha: 18/03/2026
 * Versió: 1.0.0
 * Descripció: Connecta el mapa amb el backend i gestiona la UI (formulari + historial).
 */

/**
 * Processa una consulta: crida al backend i afegeix marcador + historial.
 * @param lat - Latitud
 * @param lng - Longitud
 */
async function handleQuery(lat, lng) {
    try {
      const data = await queryBackend(lat, lng);
      addMarker(lat, lng, data.info);
      addToHistory(lat, lng, data.info);
    } catch (err) {
      alert("Error: " + err.message);
    }
  }
  
  /**
   * Afegeix una entrada a la llista d'historial.
   * @param lat - Latitud
   * @param lng - Longitud
   * @param info - Resum de la informació
   */
  function addToHistory(lat, lng, info) {
    const historyList = document.getElementById("history");
    if (!historyList) return;
  
    const li = document.createElement("li");
    const maxPreviewLength = 100;
    const preview = info.length > maxPreviewLength
      ? `${info.substring(0, maxPreviewLength)}...`
      : info;

    li.textContent = `[${lat.toFixed(4)}, ${lng.toFixed(4)}]: ${preview}`;
    li.style.cursor = "pointer";
    li.title = "Fes clic per veure el text complet";
    li.addEventListener("click", () => {
      alert(`[${lat.toFixed(4)}, ${lng.toFixed(4)}]\n\n${info}`);
    });

    historyList.prepend(li);
  }
  
  /**
   * Callback de Google Maps: s'executa quan la API està carregada.
   * Inicialitza el mapa i configura el formulari.
   */
  function initApp() {
    initMap(handleQuery);
  
    const form = document.getElementById("coords-form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const latInput = document.getElementById("lat-input");
        const lngInput = document.getElementById("lng-input");
  
        const lat = parseFloat(latInput.value);
        const lng = parseFloat(lngInput.value);
  
        if (isNaN(lat) || isNaN(lng)) {
          alert("Introdueix coordenades vàlides.");
          return;
        }
  
        if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
          alert("Coordenades fora de rang (lat: -90..90, lng: -180..180).");
          return;
        }
  
        handleQuery(lat, lng);
      });
    }
  }