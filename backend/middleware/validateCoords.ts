/**
 * Middleware para validar las coordenadas de una ubicación
 * Autor: Arnau Aumedes
 * Fecha: 18/03/2026
 * Versió: 1.0.0
 * Descripció: Este middleware valida las coordenadas de una ubicación.
 * Las coordenadas se validan para asegurarse de que sean números válidos y que estén dentro de un rango válido.
 */

import { Request, Response, NextFunction } from "express";

/**
 * Función para validar las coordenadas de una ubicación
 * @param req - La petición HTTP
 * @param res - La respuesta HTTP
 * @param next - La función siguiente
 * @returns void
 */
export function validateCoords(req: Request, res: Response, next: NextFunction): void {
  const { lat, lng } = req.body;

  if (lat === undefined || lng === undefined) {
    res.status(400).json({ error: "Cal enviar 'lat' i 'lng' al cos de la petició." });
    return;
  }

  const latNum = Number(lat);
  const lngNum = Number(lng);

  if (isNaN(latNum) || isNaN(lngNum)) {
    res.status(400).json({ error: "'lat' i 'lng' han de ser números vàlids." });
    return;
  }

  if (latNum < -90 || latNum > 90 || lngNum < -180 || lngNum > 180) {
    res.status(400).json({ error: "Coordenades fora de rang (lat: -90..90, lng: -180..180)." });
    return;
  }

  next();
}