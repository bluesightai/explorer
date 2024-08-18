// src/components/map/mapUtils.ts
import { brightPolygon } from "../components/highlightPolygon"
import { booleanPointInPolygon } from "@turf/turf"

export const isPointInCalifornia = (bounding_box: number[][], longitude: number, latitude: number): boolean => {
  const clickedPoint = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "Point",
      coordinates: [longitude, latitude],
    },
  }
  // @ts-ignore
  return booleanPointInPolygon(clickedPoint, brightPolygon(bounding_box))
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
