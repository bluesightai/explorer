// src/components/map/mapLayers.ts
import { LayersList } from "@deck.gl/core"
import { GeoJsonLayer } from "@deck.gl/layers"
import { BoundingBoxResponse } from "../../hooks/supabaseTypes"
import { californiaPolygon, inverseCaliforniaPolygon } from "../californiaPolygon"
import { BoundingBoxLayer } from "./BoundingBoxLayer"

export const createMapLayers = (
    targetBoundingBoxes: BoundingBoxResponse[],
    resultBoundingBoxes: BoundingBoxResponse[]
): LayersList => [
        new GeoJsonLayer({
            id: "inverse-california-layer",
            data: inverseCaliforniaPolygon,
            filled: true,
            getFillColor: [0, 0, 0, 128],
            pickable: true,
        }),
        new GeoJsonLayer({
            id: "california-layer",
            data: californiaPolygon,
            filled: false,
            lineWidthMaxPixels: 0,
            lineWidthMinPixels: 0,
            pickable: true,
        }),
        BoundingBoxLayer({
            color: [0, 0, 255],  // This is blue
            boundingBoxes: targetBoundingBoxes
        }),
        BoundingBoxLayer({
            color: [255, 0, 0],  // This is red (for result boxes)
            boundingBoxes: resultBoundingBoxes
        })
    ]