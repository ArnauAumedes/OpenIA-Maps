/**
 * Controlador para obtener información de una ubicación usando la API de OpenAI
 * Autor: Arnau Aumedes
 * Fecha: 18/03/2026
 * Versió: 1.0.0
 * Descripció: Este controlador obtiene información de una ubicación usando la API de OpenAI.
 * La información se obtiene mediante una consulta a la API de OpenAI y se devuelve en formato JSON.
 */

import { Request, Response } from "express";
import { getInfoFromCoords } from "../services/openAIService";

/**
 * Función para obtener información de una ubicación usando la API de OpenAI
 * @param req - La petición HTTP
 * @param res - La respuesta HTTP
 * @returns void
 */
export async function handleQuery(req: Request, res: Response): Promise<void> {
  try {
    const lat = Number(req.body.lat);
    const lng = Number(req.body.lng);

    const result = await getInfoFromCoords(lat, lng);

    res.json(result);
  } catch (error) {
    console.error("Error cridant a OpenAI:", error);
    res.status(500).json({ error: "Error intern del servidor." });
  }
}