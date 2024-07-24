// MapComponent.tsx
import DeckGL from '@deck.gl/react';
import { MapView } from '@deck.gl/core';
import type { LayersList, MapViewState } from '@deck.gl/core';
import type { TileLayerPickingInfo } from '@deck.gl/geo-layers';
import { useMapInteractions } from '../hooks/useMapInteractions';
import ControlWidget from './control/ControlWidget';
import SceneCard from './scenecard/SceneCard';
import { TileLayerComponent } from './layers/TileLayer';
import { PinLayer } from './layers/PinLayer';

const INITIAL_VIEW_STATE: MapViewState = {
    latitude: 40,
    longitude: -120,
    zoom: 4.5,
    maxZoom: 20,
    maxPitch: 89,
    bearing: 0
};

function getTooltip({ tile }: TileLayerPickingInfo) {
    if (tile) {
        const { x, y, z } = tile.index;
        return `tile: x: ${x}, y: ${y}, z: ${z}`;
    }
    return null;
}

export default function MapComponent({ showBorder = false }: { showBorder?: boolean }) {
    const { isPinning, handlePinPoint, pinnedPoint, handleMapClick, boundingBoxes, handleCleanSearch } = useMapInteractions();

    const referenceIDs = boundingBoxes.map(item => item.id)

    console.log("Reference ids is", referenceIDs)

    const layers: LayersList = [
        TileLayerComponent({ showBorder }),
        ...(pinnedPoint ? [PinLayer({ pinnedPoint })] : [])
    ];

    return (
        <>
            <DeckGL
                layers={layers}
                views={new MapView({ repeat: true })}
                initialViewState={INITIAL_VIEW_STATE}
                controller={true}
                // @ts-ignore
                getTooltip={getTooltip}
                onClick={handleMapClick}
            />
            <ControlWidget
                handleCleanSearch={handleCleanSearch}
                isPinning={isPinning}
                handlePinPoint={handlePinPoint} handleFindSimilar={function (arg0: any): void {
                    throw new Error('Function not implemented.');
                }} />
            {pinnedPoint && boundingBoxes.length > 0 && (
                <SceneCard
                    referencePoint={pinnedPoint}
                    boundingBoxes={boundingBoxes}
                />)}

        </>
    );
}