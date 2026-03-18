/**
 * Servicio para obtener información de una ubicación usando la API de OpenAI
 * Autor: Arnau Aumedes
 * Fecha: 18/03/2026
 * Versió: 1.0.0
 * Descripció: Este servicio utiliza la API de OpenAI para obtener información de una ubicación.
 * La información se obtiene mediante una consulta a la API de OpenAI y se devuelve en formato JSON.
 */

import openaiClient from "../config/openAI";
import { CoordsInfo } from "../types/types";

/**
 * Función para obtener información de una ubicación usando la API de OpenAI
 * @param lat - La latitud de la ubicación
 * @param lng - La longitud de la ubicación
 * @returns La información de la ubicación
 */
export async function getInfoFromCoords(lat: number, lng: number): Promise<CoordsInfo> {
  const prompt = `Dona informació geogràfica, cultural i històrica sobre la ubicació amb coordenades: latitud ${lat}, longitud ${lng}. Respon en català.`;

  const response = await openaiClient.chat.completions.create({
    model: "gpt-4.1-mini",
    messages: [
      {
        role: "system",
        content: "Ets un assistent expert en geografia. Només respons preguntes relacionades amb coordenades geogràfiques."
      },
      {
        role: "user",
        content: prompt
      }
    ],
  });

  const text = response.choices[0]?.message?.content ?? "No s'ha pogut obtenir informació.";

  return { lat, lng, info: text };
}