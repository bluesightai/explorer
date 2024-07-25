// MapComponent.tsx
import { useMapInteractions } from "../hooks/useMapInteractions"
import ControlWidget from "./control/ControlWidget"
import { GridLayer } from "./layers/GridLayer"
import SceneCard from "./scenecard/SceneCard"
import type { LayersList, MapViewState } from "@deck.gl/core"
import { Map, useControl } from 'react-map-gl';
import { MapboxOverlay } from '@deck.gl/mapbox';
import { DeckProps } from '@deck.gl/core';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapboxToken, style_url } from "../hooks/useNaipImagery"

function DeckGLOverlay(props: DeckProps) {
    // @ts-ignore
    const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
    overlay.setProps(props);
    return null;
}


const INITIAL_VIEW_STATE: MapViewState = {
    latitude: 40,
    longitude: -120,
    zoom: 4.5,
    maxZoom: 16,
    maxPitch: 85,
    bearing: 0,
}

export default function MapComponent() {
    const {
        setSliderValue,
        sliderValue,
        handleFindSimilar,
        isPinning,
        handlePinPoint,
        pinnedPoints,
        handleMapClick,
        handleCleanSearch,
        targetBoundingBoxes,
        resultBoundingBoxes,
    } = useMapInteractions()



    const layers: LayersList = [GridLayer({ boundingBoxes: targetBoundingBoxes })]

    return (
        <Map
            initialViewState={INITIAL_VIEW_STATE}
            maxZoom={16}
            mapStyle={style_url}
            mapboxAccessToken={mapboxToken}
            interactive={true}
            attributionControl={true}

        >
            <DeckGLOverlay layers={layers}
                controller={true}
                getCursor={({ isDragging }) => isDragging ? 'grabbing' : 'pointer'}
                onClick={handleMapClick}
            />
            <ControlWidget
                handleCleanSearch={handleCleanSearch}
                isPinning={isPinning}
                handlePinPoint={handlePinPoint}
                handleFindSimilar={handleFindSimilar}
            />
            {
                pinnedPoints && targetBoundingBoxes.length > 0 && (
                    <SceneCard
                        sliderValue={sliderValue}
                        setSliderValue={setSliderValue}
                        targetBoundingBoxes={targetBoundingBoxes}
                        resultBoundingBoxes={resultBoundingBoxes}
                    />
                )
            }

        </Map>)


}
