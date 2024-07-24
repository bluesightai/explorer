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
import { GridLayer } from './layers/GridLayer';

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
    const { setSliderValue, sliderValue, handleFindSimilar, isPinning, handlePinPoint, pinnedPoints, handleMapClick, handleCleanSearch, targetBoundingBoxes, resultBoundingBoxes } = useMapInteractions();


    // const pinnedLayers = pinnedPoints.map((pinnedPoint, index) => PinLayer({ pinnedPoint, index }))
    // [...pinnedLayers],

    const layers: LayersList = [

        TileLayerComponent({ showBorder }),
        GridLayer({ boundingBoxes: targetBoundingBoxes }),


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
                handlePinPoint={handlePinPoint} handleFindSimilar={handleFindSimilar} />
            {pinnedPoints && targetBoundingBoxes.length > 0 && (
                <SceneCard
                    sliderValue={sliderValue}
                    setSliderValue={setSliderValue}
                    targetBoundingBoxes={targetBoundingBoxes} resultBoundingBoxes={resultBoundingBoxes} />)}

        </>
    );
}