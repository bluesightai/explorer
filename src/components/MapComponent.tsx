// MapComponent.tsx
import { useState, useEffect, useCallback } from 'react';
import { useMapInteractions } from "../hooks/useMapInteractions"
import ControlWidget from "./control/ControlWidget"
import { GridLayer } from "./layers/GridLayer"
import SceneCard from "./scenecard/SceneCard"
import type { LayersList, MapViewState } from "@deck.gl/core"
import { Map, useControl, Popup, ViewStateChangeEvent } from 'react-map-gl';
import { MapboxOverlay } from '@deck.gl/mapbox';
import { DeckProps } from '@deck.gl/core';
import { GeoJsonLayer } from '@deck.gl/layers';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapboxToken, style_url } from "../hooks/useNaipImagery"
import { californiaPolygon, inverseCaliforniaPolygon } from './californiaPolygon';
import { booleanPointInPolygon } from '@turf/turf';

function DeckGLOverlay(props: DeckProps) {
    // @ts-ignore
    const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props));
    overlay.setProps(props);
    return null;
}

const INITIAL_VIEW_STATE: MapViewState = {
    latitude: 37.5,
    longitude: -120,
    zoom: 5.5,
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

    const [popupInfo, setPopupInfo] = useState<{ longitude: number; latitude: number } | null>(null);

    const handleClick = (info: any, event: any) => {
        if (!info.coordinate) return;

        const clickedPoint = {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'Point',
                coordinates: [info.coordinate[0], info.coordinate[1]]
            }
        };
        // @ts-ignore
        const isInCalifornia = booleanPointInPolygon(clickedPoint, californiaPolygon);

        if (isInCalifornia) {
            handleMapClick(info, event);
        } else {
            setPopupInfo({ longitude: info.coordinate[0], latitude: info.coordinate[1] });
        }
    };

    const [viewState, setViewState] = useState<MapViewState>(INITIAL_VIEW_STATE);


    const handleTileClick = useCallback((bbox: [number, number, number, number]) => {
        const [minLng, minLat, maxLng, maxLat] = bbox;
        const centerLng = (minLng + maxLng) / 2;
        const centerLat = (minLat + maxLat) / 2;

        setViewState(prevState => ({
            ...prevState,
            longitude: centerLng,
            latitude: centerLat,
            zoom: 15, // Adjust this zoom level as needed
            transitionDuration: 1000, // Smooth transition in milliseconds
        }));
    }, []);


    const handleViewStateChange = useCallback((e: ViewStateChangeEvent) => setViewState(e.viewState), []);



    const layers: LayersList = [
        new GeoJsonLayer({
            id: 'inverse-california-layer',
            data: inverseCaliforniaPolygon,
            filled: true,
            getFillColor: [0, 0, 0, 128],  // Semi-transparent black
            pickable: true,
        }),
        new GeoJsonLayer({
            id: 'california-layer',
            data: californiaPolygon,
            filled: false,
            lineWidthMaxPixels: 0,
            lineWidthMinPixels: 0,
            // getLineColor: [255, 255, 255],  // White border
            pickable: true,
        }),
        GridLayer({ boundingBoxes: targetBoundingBoxes }),
        GridLayer({ boundingBoxes: resultBoundingBoxes })
    ];

    useEffect(() => {
        if (targetBoundingBoxes.length === 0) {
            setPopupInfo(null);
        }
    }, [targetBoundingBoxes]);



    return (
        <Map
            {...viewState}
            mapStyle={style_url}
            mapboxAccessToken={mapboxToken}
            interactive={true}
            attributionControl={true}
            onMove={handleViewStateChange}

        >
            <DeckGLOverlay
                layers={layers}
                controller={true}
                getCursor={({ isDragging }) => isDragging ? 'grabbing' : 'pointer'}
                onClick={handleClick}
            />

            {popupInfo && (
                <Popup
                    longitude={popupInfo.longitude}
                    latitude={popupInfo.latitude}
                    closeOnClick={false}
                    onClose={() => setPopupInfo(null)}
                >
                    Clicking outside California is not allowed.
                </Popup>
            )}

            <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}>
                <ControlWidget
                    handleCleanSearch={handleCleanSearch}
                    isPinning={isPinning}
                    handlePinPoint={handlePinPoint}
                    handleFindSimilar={handleFindSimilar}
                />
            </div>

            {pinnedPoints && targetBoundingBoxes.length > 0 && (
                <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 2 }}>
                    <SceneCard
                        onTileClick={handleTileClick}
                        sliderValue={sliderValue}
                        setSliderValue={setSliderValue}
                        targetBoundingBoxes={targetBoundingBoxes}
                        resultBoundingBoxes={resultBoundingBoxes}
                    />
                </div>
            )}
        </Map>
    )
}