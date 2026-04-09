/**
 * API para obtener información de una ubicación usando la API de OpenAI
 * Autor: Arnau Aumedes
 * Fecha: 18/03/2026
 * Versió: 1.0.0
 * Descripció: Esta API obtiene información de una ubicación usando la API de OpenAI.
 * La información se obtiene mediante una consulta a la API de OpenAI y se devuelve en formato JSON.
 */

/**
 * Función para obtener información de una ubicación usando la API de OpenAI
 * @param lat - La latitud de la ubicación
 * @param lng - La longitud de la ubicación
 * @returns La información de la ubicación
 */
async function queryBackend(lat, lng) {
    const response = await fetch("/api/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lat, lng }),
    });
  
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Error desconegut");
    }
  
    return response.json();
  }