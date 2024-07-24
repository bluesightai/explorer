// MapComponent.tsx
import DeckGL from '@deck.gl/react';
import { MapView } from '@deck.gl/core';
import type { LayersList, MapViewState } from '@deck.gl/core';
import type { TileLayerPickingInfo } from '@deck.gl/geo-layers';
import { useState } from 'react';
import { BoundingBoxResponse, useSupabase } from '../hooks/useSupabase';
import { useMapInteractions } from '../hooks/useMapInteractions';
import ControlWidget from './ControlWidget';
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
    const [pinnedPoint, setPinnedPoint] = useState<[number, number] | null>(null);
    const [boundingBoxes, setBoundingBoxes] = useState<BoundingBoxResponse[]>([]);

    const { fetchBoundingBoxes } = useSupabase();
    const { isPinning, handlePinPoint } = useMapInteractions();

    const onClick = async (info: any) => {
        if (isPinning && info.coordinate) {
            const [longitude, latitude] = info.coordinate;
            setPinnedPoint([longitude, latitude]);
            handlePinPoint(); // Turn off pinning mode
            console.log("longitude", longitude, "latitude", latitude);
            const bbox = await fetchBoundingBoxes(latitude, longitude);
            if (bbox.length > 0) {
                setBoundingBoxes(bbox);
            }
        }
    };

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
                onClick={onClick}
            />
            <ControlWidget
                isPinning={isPinning}
                handlePinPoint={handlePinPoint}
            />
            {pinnedPoint && boundingBoxes.length > 0 && (
                <SceneCard
                    referencePoint={pinnedPoint}
                    boundingBoxes={boundingBoxes}
                />
            )}
        </>
    );
}