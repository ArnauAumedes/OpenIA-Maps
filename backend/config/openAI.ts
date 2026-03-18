/**
 * Configuración de la API de OpenAI
 * Autor: Arnau Aumedes
 * Fecha: 18/03/2026
 * Versió: 1.0.0
 * Descripció: Este archivo configura la API de OpenAI para usarla en el proyecto.
 * La API de OpenAI se usa para obtener información de una ubicación.
 */

import OpenAI from "openai";
import dotenv from "dotenv";

// Carga de las variables de entorno
dotenv.config();

// Creación del cliente de OpenAI
const openaiClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Exportación del cliente de OpenAI
export default openaiClient;