// src/components/map/mapLayers.ts
import { LayersList } from "@deck.gl/core"
import { GeoJsonLayer } from "@deck.gl/layers"
import { BoundingBoxResponse } from "../../hooks/supabaseTypes"
import { inverseCaliforniaPolygon } from "../californiaPolygon"
import { BoundingBoxLayer } from "./BoundingBoxLayer"
// import type { SearchAreaGeometry } from "../../hooks/useSearchArea"





export const createMapLayers = (
    targetBoundingBoxes: BoundingBoxResponse[],
    resultBoundingBoxes: BoundingBoxResponse[],
    // searchAreaGeometry: SearchAreaGeometry | null  // New parameter
): LayersList => {
    const layers: LayersList = [
        new GeoJsonLayer({
            id: "inverse-california-layer",
            data: inverseCaliforniaPolygon,
            filled: true,
            getFillColor: [0, 0, 0, 128],
            pickable: true,
        }),

        BoundingBoxLayer({
            borderColor: [0, 0, 255],
            fillColor: [0, 0, 255, 120],  // This is blue
            boundingBoxes: targetBoundingBoxes
        }),
        BoundingBoxLayer({
            borderColor: [255, 0, 0],
            fillColor: [255, 0, 0, 80],  // This is red (for result boxes)
            boundingBoxes: resultBoundingBoxes
        })
    ]

    // Add search area layer if geometry is provided
    // if (searchAreaGeometry) {
    //     layers.push(
    //         new GeoJsonLayer({
    //             id: 'search-area-layer',
    //             data: searchAreaGeometry,
    //             filled: true,
    //             getFillColor: [0, 0, 120, 64],  // Semi-transparent green

    //             pickable: true,
    //         })
    //     )
    // }

    return layers
}