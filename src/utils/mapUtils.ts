// src/components/map/mapUtils.ts
import { californiaPolygon } from "../components/californiaPolygon"
import { booleanPointInPolygon } from "@turf/turf"

export const isPointInCalifornia = (longitude: number, latitude: number): boolean => {
  const clickedPoint = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
  }
  // @ts-ignore
  return booleanPointInPolygon(clickedPoint, californiaPolygon)
}

export const calculateCenterAndZoom = (bbox: [number, number, number, number]) => {
  const [minLng, minLat, maxLng, maxLat] = bbox
  const centerLng = (minLng + maxLng) / 2
  const centerLat = (minLat + maxLat) / 2

  return {
    longitude: centerLng,
    latitude: centerLat,
    zoom: 16,
    transitionDuration: 1000,
  }
}
