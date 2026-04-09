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

interface OpenAIErrorLike {
  status?: number;
  code?: string;
  type?: string;
}

function isOpenAIErrorLike(error: unknown): error is OpenAIErrorLike {
  return typeof error === "object" && error !== null;
}

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

    if (isOpenAIErrorLike(error)) {
      const status = error.status;
      const code = error.code;
      const type = error.type;

      if (status === 429 || code === "insufficient_quota" || type === "insufficient_quota") {
        res.status(429).json({
          error: "Quota d'OpenAI exhaurida. Revisa el pla/facturacio del compte o prova una API key amb credit.",
          code: "insufficient_quota"
        });
        return;
      }
    }

    res.status(500).json({ error: "Error intern del servidor." });
  }
}