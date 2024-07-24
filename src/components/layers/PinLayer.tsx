// PinLayerComponent.tsx
import { IconLayer } from '@deck.gl/layers';

interface PinLayerComponentProps {
    pinnedPoint: [number, number] | null;
}

export const PinLayer: (props: PinLayerComponentProps) => IconLayer = ({ pinnedPoint }) => {
    return new IconLayer({
        id: 'pin-layer',
        data: pinnedPoint ? [pinnedPoint] : [],
        getPosition: d => d,
        getIcon: _ => ({
            url: 'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png',
            width: 128,
            height: 128,
            anchorY: 128
        }),
        getSize: 40,
        pickable: true
    });
};