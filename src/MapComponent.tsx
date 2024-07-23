import DeckGL from '@deck.gl/react';
import { MapView } from '@deck.gl/core';
import { TileLayer } from '@deck.gl/geo-layers';
import { BitmapLayer, PathLayer } from '@deck.gl/layers';

import type { Position, MapViewState } from '@deck.gl/core';
import type { TileLayerPickingInfo } from '@deck.gl/geo-layers';

const NAIP_URL = 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}';



const INITIAL_VIEW_STATE: MapViewState = {
    latitude: 40,
    longitude: -120,
    zoom: 4.5,
    maxZoom: 20,
    maxPitch: 89,
    bearing: 0
};


/* global window */
const devicePixelRatio = (typeof window !== 'undefined' && window.devicePixelRatio) || 1;

function getTooltip({ tile }: TileLayerPickingInfo) {
    if (tile) {
        const { x, y, z } = tile.index;
        return `tile: x: ${x}, y: ${y}, z: ${z}`;
    }
    return null;
}

export default function MapComponent({

    showBorder = false,
}: {
    showBorder?: boolean

}) {
    const tileLayer = new TileLayer<ImageBitmap>({
        // https://wiki.openstreetmap.org/wiki/Slippy_map_tilenames#Tile_servers
        data: [NAIP_URL],

        // Since these OSM tiles support HTTP/2, we can make many concurrent requests
        // and we aren't limited by the browser to a certain number per domain.
        maxRequests: 20,

        pickable: true,
        // onViewportLoad: onTilesLoad,
        autoHighlight: showBorder,
        highlightColor: [60, 60, 60, 40],
        // https://wiki.openstreetmap.org/wiki/Zoom_levels
        minZoom: 0,
        maxZoom: 19,
        tileSize: 256,
        zoomOffset: devicePixelRatio === 1 ? -1 : 0,
        renderSubLayers: props => {
            const [[west, south], [east, north]] = props.tile.boundingBox;
            const { data, ...otherProps } = props;

            return [
                new BitmapLayer(otherProps, {
                    image: data,
                    bounds: [west, south, east, north]
                }),
                showBorder &&
                new PathLayer<Position[]>({
                    id: `${props.id}-border`,
                    data: [
                        [
                            [west, north],
                            [west, south],
                            [east, south],
                            [east, north],
                            [west, north]
                        ]
                    ],
                    getPath: d => d,
                    getColor: [255, 0, 0],
                    widthMinPixels: 4
                })
            ];
        }
    });

    return (
        <DeckGL
            layers={[tileLayer]}
            views={new MapView({ repeat: true })}
            initialViewState={INITIAL_VIEW_STATE}
            controller={true}
            // @ts-ignore
            getTooltip={getTooltip}
        >

        </DeckGL>
    );
}

