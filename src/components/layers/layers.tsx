import { LayersList } from "@deck.gl/core";
import { GeoJsonLayer } from "@deck.gl/layers";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { BoundingBoxResponse, SimilarBox } from "../../hooks/supabaseTypes";
import { inverseCaliforniaPolygon } from "../californiaPolygon";
import { BoundingBoxLayer } from "./BoundingBoxLayer";

// Helper function to rescale similarity scores
const rescaleSimilarityScores = (scores: number[]): number[] => {
    const min = Math.min(...scores);
    const max = Math.max(...scores);
    return scores.map(score => (score - min) / (max - min));
};

// Helper function to get the center of a bounding box
const getBoundingBoxCenter = (box: BoundingBoxResponse): [number, number] => {
    return [
        (box.min_lon + box.max_lon) / 2,
        (box.min_lat + box.max_lat) / 2
    ];
};

export const createMapLayers = (
    targetBoundingBoxes: BoundingBoxResponse[],
    resultBoundingBoxes: SimilarBox[],
): LayersList => {
    // Rescale similarity scores
    const similarityScores = resultBoundingBoxes.map(box => box.similarity);
    const rescaledScores = rescaleSimilarityScores(similarityScores);

    // Prepare data for HeatmapLayer
    const heatmapData = resultBoundingBoxes.map((box, index) => ({
        position: getBoundingBoxCenter(box),
        weight: rescaledScores[index]
    }));

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

        new HeatmapLayer({
            id: 'heatmap-layer',
            data: heatmapData,
            getPosition: d => d.position,
            getWeight: d => d.weight,
            radiusPixels: 10,
            intensity: 1,
            threshold: 0.1,
            colorRange: [
                [255, 255, 178],
                [254, 204, 92],
                [253, 141, 60],
                [240, 59, 32],
                [189, 0, 38]
            ],
            updateTriggers: {
                getPosition: heatmapData,
                getWeight: heatmapData
            },
            pickable: false,
            autoHighlight: false,
            opacity: 0.8,
        })
    ];

    return layers;
};