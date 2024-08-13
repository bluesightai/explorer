import { Polygon, Feature } from 'geojson';

export const californiaPolygon: Feature<Polygon> = {

    "type": "Feature",
    "properties": {},
    "geometry": {
        "type": "Polygon",
        "coordinates": [
            [
                [-122.565182134572, 37.6852879987652],
                [-122.247044518633, 37.6852879987652],
                [-122.247044518633, 37.8771837626192],
                [-122.565182134572, 37.8771837626192],
                [-122.565182134572, 37.6852879987652]]]
    }
}



export const clipPolygon: Feature<Polygon> = {

    "type": "Feature",
    "properties": {},
    "geometry": {
        "type": "Polygon",
        "coordinates": [
            [
                [-122.565182134572, 37.6852879987652],
                [-122.247044518633, 37.6852879987652],
                [-122.247044518633, 37.8771837626192],
                [-122.565182134572, 37.8771837626192],
                [-122.565182134572, 37.6852879987652]
                // [min_lon, min_lat],
                // [max_lon, min_lat],
                // [max_lon, max_lat],
                // [min_lon, max_lat],
                // [min_lon, min_lat]

            ]]
    }
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
                [-180, -90]
            ],
            // Use the coordinates from californiaPolygon as a hole
            clipPolygon.geometry.coordinates[0]
        ]
    }
};