/**
 * Ruta para obtener información de una ubicación usando la API de OpenAI
 * Autor: Arnau Aumedes
 * Fecha: 18/03/2026
 * Versió: 1.0.0
 * Descripció: Esta ruta obtiene información de una ubicación usando la API de OpenAI.
 * La información se obtiene mediante una consulta a la API de OpenAI y se devuelve en formato JSON.
 */

import { Router } from "express";
import { handleQuery } from "../controller/openAIController";
import { validateCoords } from "../middleware/validateCoords";

// Creación del router
const router = Router();

// Ruta para obtener información de una ubicación usando la API de OpenAI
// Se valida las coordenadas y se obtiene la información de la ubicación
router.post("/", validateCoords, handleQuery);

export default router;