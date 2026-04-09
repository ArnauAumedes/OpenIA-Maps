/**
 * Servidor para obtener información de una ubicación usando la API de OpenAI
 * Autor: Arnau Aumedes
 * Fecha: 18/03/2026
 * Versió: 1.0.0
 * Descripció: Este servidor obtiene información de una ubicación usando la API de OpenAI.
 * La información se obtiene mediante una consulta a la API de OpenAI y se devuelve en formato JSON.
 */

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import queryRouter from "./routes/query";

dotenv.config();
  
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware global
app.use(cors());                    
app.use(express.json());           

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, "..", "frontend")));

// Rutas API
app.use("/api/query", queryRouter);

// Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escoltant a http://localhost:${PORT}`);
});