/**
 * Gestió del mapa de Google Maps
 * Autor: Arnau Aumedes
 * Fecha: 18/03/2026
 * Versió: 1.0.0
 * Descripció: Inicialitza el mapa i gestiona marcadors.
 */

let map;
let infoWindow;

/**
 * Escapa HTML per evitar injectar contingut no segur al popup.
 * @param text - Text d'entrada
 * @returns Text escapçat per HTML
 */
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Dona format visual al text de la resposta per mostrar-lo al marcador.
 * @param lat - Latitud
 * @param lng - Longitud
 * @param info - Text informatiu
 * @returns HTML formatejat per a la InfoWindow
 */
function formatInfoWindowContent(lat, lng, info) {
  const fallbackText = "No hi ha informació disponible.";
  const rawText = String(info || "").replace(/\s+/g, " ").trim() || fallbackText;
  const safeCoords = `${lat}, ${lng}`;

  // Divideix només en finals de frase reals, evitant trencar decimals (ex. 41.4324).
  const sentenceSplitRegex = /(?<=[.!?])\s+(?=[A-ZÀ-Ý])/u;
  const sentences = rawText.split(sentenceSplitRegex).map((s) => s.trim()).filter(Boolean);

  const intro = escapeHtml(sentences[0] || rawText);
  const details = sentences.slice(1).map(escapeHtml);

  const detailItems = details.length
    ? details.map((sentence) => `<li>${sentence}</li>`).join("")
    : `<li>${escapeHtml(rawText)}</li>`;

  return `
    <div class="map-info-window">
      <h3>Informacio de la ubicacio</h3>
      <p class="coords"><strong>Coordenades:</strong> ${safeCoords}</p>
      <p class="intro">${intro}</p>
      <p class="section-title">Detalls</p>
      <ul class="details">${detailItems}</ul>
    </div>
  `;
}

/**
 * Inicialitza el mapa centrat a l'Institut Sa Palomera.
 * Accepta un callback que s'executarà quan l'usuari faci clic al mapa,
 * rebent lat i lng com a paràmetres.
 * @param onMapClick - Callback amb (lat, lng) quan es fa clic al mapa
 */
function initMap(onMapClick) {
  const defaultCenter = { lat: 41.67843691203128, lng: 2.780779717194248 };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: defaultCenter,
  });

  infoWindow = new google.maps.InfoWindow();

  if (onMapClick) {
    map.addListener("click", (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      onMapClick(lat, lng);
    });
  }
}

/**
 * Afegeix un marcador al mapa amb una finestra d'informació.
 * @param lat - Latitud
 * @param lng - Longitud
 * @param info - Text informatiu que es mostra al fer clic al marcador
 */
function addMarker(lat, lng, info) {
  const marker = new google.maps.Marker({
    position: { lat, lng },
    map: map,
  });

  // Centra el mapa exactament en el nou marcador amb tota la precisió rebuda.
  map.panTo({ lat, lng });

  // Si el zoom és massa general, l'incrementem per veure millor punts precisos.
  const currentZoom = map.getZoom() ?? 8;
  const minFocusZoom = 15;
  if (currentZoom < minFocusZoom) {
    map.setZoom(minFocusZoom);
  }

  marker.addListener("click", () => {
    infoWindow.setContent(formatInfoWindowContent(lat, lng, info));
    infoWindow.open(map, marker);
  });
}