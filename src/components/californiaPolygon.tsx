import { Polygon, Feature } from 'geojson';

export const californiaPolygon: Feature<Polygon> = {

    "type": "Feature",
    "properties": {},
    "geometry": {
        "type": "Polygon",
        "coordinates": [
            [
                [
                    -117.487438303077,
                    37.135956588993025
                ],
                [
                    -116.528974303077,
                    36.41847758899302
                ],
                [
                    -115.83887930307701,
                    35.887214588993025
                ],
                [
                    -114.62299830307701,
                    34.91779658899302
                ],
                [
                    -114.62299830307701,
                    34.791826588993025
                ],
                [
                    -114.458690303077,
                    34.62751858899302
                ],
                [
                    -114.32176730307701,
                    34.36462558899302
                ],
                [
                    -114.12459730307701,
                    34.22222458899302
                ],
                [
                    -114.245090303077,
                    34.090778588993025
                ],
                [
                    -114.403921303077,
                    34.02505458899302
                ],
                [
                    -114.52441330307701,
                    33.849792588993026
                ],
                [
                    -114.486075303077,
                    33.61428458899302
                ],
                [
                    -114.51293730307701,
                    33.466406588993024
                ],
                [
                    -114.716106303077,
                    33.32400658899302
                ],
                [
                    -114.650383303077,
                    32.951574588993026
                ],
                [
                    -114.51293730307701,
                    32.94609758899302
                ],
                [
                    -114.458690303077,
                    32.759881588993025
                ],
                [
                    -114.51293730307701,
                    32.67225058899302
                ],
                [
                    -114.710629303077,
                    32.63391158899302
                ],
                [
                    -116.03604930307701,
                    32.54080358899302
                ],
                [
                    -117.11500630307701,
                    32.45317258899302
                ],
                [
                    -117.235499303077,
                    32.58461958899302
                ],
                [
                    -117.31917813864881,
                    32.76972636241263
                ],
                [
                    -117.31765330307701,
                    33.03920558899302
                ],
                [
                    -117.460054303077,
                    33.214467588993024
                ],
                [
                    -117.772239303077,
                    33.455452588993026
                ],
                [
                    -118.172056303077,
                    33.68000758899302
                ],
                [
                    -118.248733303077,
                    33.61976158899302
                ],
                [
                    -118.40208730307701,
                    33.658099588993025
                ],
                [
                    -118.37971330307701,
                    33.756684588993025
                ],
                [
                    -118.554975303077,
                    33.959331588993024
                ],
                [
                    -118.791008303077,
                    33.91508558899302
                ],
                [
                    -119.207250303077,
                    34.06296358899302
                ],
                [
                    -119.26749630307701,
                    34.183456588993025
                ],
                [
                    -119.546768303077,
                    34.331857588993024
                ],
                [
                    -120.66873631264123,
                    34.452919612244216
                ],
                [
                    -120.69418650576291,
                    35.00644074410174
                ],
                [
                    -121.13261090157074,
                    35.442180666431994
                ],
                [
                    -121.88981198529383,
                    36.153112525064515
                ],
                [
                    -121.99592950122963,
                    36.546104036295034
                ],
                [
                    -121.91043882501708,
                    36.82725908549414
                ],
                [
                    -122.12492321531718,
                    36.846733164855756
                ],
                [
                    -122.33926625919689,
                    37.01688407993752
                ],
                [
                    -122.44652258898944,
                    37.13662726005512
                ],
                [
                    -122.46460729245344,
                    37.2721220833214
                ],
                [
                    -122.52784973725723,
                    37.424743392710965
                ],
                [
                    -122.52318027200641,
                    37.80331573281424
                ],
                [
                    -122.42965565986749,
                    37.83137950628149
                ],
                [
                    -122.28900900472607,
                    37.74774978165684
                ],
                [
                    -117.487438303077,
                    37.135956588993025
                ]

            ]]
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