import { Feature, Polygon } from "geojson"

export const californiaPolygon: Feature<Polygon> = {
    type: "Feature",
    properties: {},
    geometry: {
        type: "Polygon",
        coordinates: [
            [
                [-122.62763794718, 37.1849048387767],
                [-121.496378836813, 37.1849048387767],
                [-121.496378836813, 37.8776203228048],
                [-122.62763794718, 37.8776203228048],
                [-122.62763794718, 37.1849048387767],
            ],
        ],
    },
}

export const clipPolygon: Feature<Polygon> = {
    type: "Feature",
    properties: {},
    geometry: {
        type: "Polygon",
        coordinates: [
            [
                [-122.62763794718, 37.1849048387767],
                [-121.496378836813, 37.1849048387767],
                [-121.496378836813, 37.8776203228048],
                [-122.62763794718, 37.8776203228048],
                [-122.62763794718, 37.1849048387767],
                // [min_lon, min_lat],
                // [max_lon, min_lat],
                // [max_lon, max_lat],
                // [min_lon, max_lat],
                // [min_lon, min_lat]
            ],
        ],
    },
}

export const inverseCaliforniaPolygon: Feature<Polygon> = {
    type: "Feature",
    properties: {},
    geometry: {
        type: "Polygon",
        coordinates: [
            [
                [-180, -90],
                [-180, 90],
                [180, 90],
                [180, -90],
                [-180, -90],
            ],
            // Use the coordinates from californiaPolygon as a hole
            clipPolygon.geometry.coordinates[0],
        ],
    },
}

