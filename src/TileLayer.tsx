import React from 'react';
import { TileLayer } from '@deck.gl/geo-layers';
import { BitmapLayer } from '@deck.gl/layers';
import { DeckGL } from '@deck.gl/react';
import type { TileLayerProps } from '@deck.gl/geo-layers';

const NAIP_URL = 'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}';

interface TileLayerComponentProps {
    onTilesLoad: () => void;
}

const TileLayerComponent: React.FC<TileLayerComponentProps> = ({ onTilesLoad }) => {
    const tileLayer = new TileLayer({
        data: NAIP_URL,
        minZoom: 0,
        maxZoom: 22,
        renderSubLayers: (props: any) => {
            const {
                bbox: { west, south, east, north }
            } = props.tile;
            return new BitmapLayer(props, {
                data: undefined,
                image: props.data,
                bounds: [west, south, east, north]
            });
        },
        onViewportLoad: onTilesLoad,
    } as Partial<TileLayerProps>);

    return <DeckGL layers={[tileLayer]} />;
};

export default TileLayerComponent;
