import React from 'react';
import { PolygonLayer } from '@deck.gl/layers';
import { DeckGL } from '@deck.gl/react';
import { BoundingBoxResponse } from '../../hooks/useSupabase';


interface GridLayerComponentProps {
    boundingBoxes: BoundingBoxResponse[];
}

const GridLayerComponent: React.FC<GridLayerComponentProps> = ({ boundingBoxes }) => {
    const gridLayer = new PolygonLayer({
        id: 'grid-layer',
        data: boundingBoxes,
        getPolygon: (d: BoundingBoxResponse) => [
            [d.min_lon, d.min_lat],
            [d.max_lon, d.min_lat],
            [d.max_lon, d.max_lat],
            [d.min_lon, d.max_lat],
            [d.min_lon, d.min_lat]
        ],
        getFillColor: [0, 0, 255, 100],
        getLineColor: [0, 0, 255],
        getLineWidth: 2,
        pickable: true
    });

    return <DeckGL layers={[gridLayer]} />;
};

export default GridLayerComponent;
