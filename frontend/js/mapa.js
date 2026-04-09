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

  marker.addListener("click", () => {
    infoWindow.setContent(`<div><p>${info}</p></div>`);
    infoWindow.open(map, marker);
  });
}