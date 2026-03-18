/**
 * Tipo para la información de una ubicación
 * Autor: Arnau Aumedes
 * Fecha: 18/03/2026
 * Versió: 1.0.0
 * Descripció: Este tipo define la información de una ubicación.
 * La información de una ubicación se define mediante la latitud, la longitud y la información.
 */

// Interfaz para la información de una ubicación
export interface CoordsInfo {
    lat: number;
    lng: number;
    info: string;
  }