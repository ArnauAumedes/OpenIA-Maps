/**
 * Servidor para obtener información de una ubicación usando la API de OpenAI
 * Autor: Arnau Aumedes
 * Fecha: 18/03/2026
 * Versió: 1.0.0
 * Descripció: Este servidor obtiene información de una ubicación usando la API de OpenAI.
 * La información se obtiene mediante una consulta a la API de OpenAI y se devuelve en formato JSON.
 */

import fs from "fs";
import path from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import queryRouter from "./routes/query";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const frontendPath = path.join(__dirname, "..", "frontend");

// Sirve css/js/imagenes, pero no index.html automatico
app.use(express.static(frontendPath, { index: false }));

// Inyecta GOOGLE_MAPS_API_KEY en el HTML
app.get("/", (_req, res) => {
  const indexPath = path.join(frontendPath, "index.html");
  const rawHtml = fs.readFileSync(indexPath, "utf8");
  const mapsKey = process.env.GOOGLE_MAPS_API_KEY || "";
  const html = rawHtml.replace(/__GOOGLE_MAPS_API_KEY__/g, mapsKey);
  res.send(html);
});

app.use("/api/query", queryRouter);

app.listen(PORT, () => {
  console.log("Servidor escoltant a http://localhost:" + PORT);
});