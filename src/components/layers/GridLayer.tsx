// BoundingBoxLayer.tsx
import { GeoJsonLayer } from '@deck.gl/layers';
import { Feature, Polygon } from 'geojson';

export interface BoundingBoxResponse {
    id: number;
    min_lat: number;
    min_lon: number;
    max_lat: number;
    max_lon: number;
}

interface BoundingBoxLayerProps {
    boundingBoxes: BoundingBoxResponse[];
}

export const GridLayer = ({ boundingBoxes }: BoundingBoxLayerProps) => {
    // Convert BoundingBoxResponse array to GeoJSON features
    const features: Feature<Polygon>[] = boundingBoxes.map(box => ({
        type: 'Feature',
        geometry: {
            type: 'Polygon',
            coordinates: [[
                [box.min_lon, box.min_lat],
                [box.max_lon, box.min_lat],
                [box.max_lon, box.max_lat],
                [box.min_lon, box.max_lat],
                [box.min_lon, box.min_lat], // Close the polygon
            ]],
        },
        properties: {
            id: box.id,
        },
    }));

    return new GeoJsonLayer({
        id: 'bounding-box-layer',
        data: {
            type: 'FeatureCollection',
            features: features,
        },
        filled: true,
        getFillColor: [255, 0, 0, 100], // Semi-transparent red
        getLineColor: [255, 0, 0],
        getLineWidth: 2,
        lineWidthMinPixels: 1,
        pickable: true,
        onClick: (info) => {
            console.log('Clicked bounding box:', info.object.properties.id);
        },
        autoHighlight: true,
        highlightColor: [255, 255, 0, 150], // Highlight color when hovered
    });
};