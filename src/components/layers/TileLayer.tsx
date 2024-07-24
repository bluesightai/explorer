// TileLayerComponent.tsx
import type { Position } from "@deck.gl/core"
import { TileLayer } from "@deck.gl/geo-layers"
import { BitmapLayer, PathLayer } from "@deck.gl/layers"

export const NAIP_URL =
  "https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}"

interface TileLayerComponentProps {
  showBorder: boolean
}

export const TileLayerComponent: (props: TileLayerComponentProps) => TileLayer = ({ showBorder }) => {
  const devicePixelRatio = (typeof window !== "undefined" && window.devicePixelRatio) || 1

  return new TileLayer<ImageBitmap>({
    data: [NAIP_URL],
    maxRequests: 20,
    pickable: true,
    autoHighlight: showBorder,
    highlightColor: [60, 60, 60, 40],
    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,
    zoomOffset: devicePixelRatio === 1 ? -1 : 0,
    renderSubLayers: (props) => {
      const [[west, south], [east, north]] = props.tile.boundingBox
      const { data, ...otherProps } = props

      return [
        new BitmapLayer(otherProps, {
          image: data,
          bounds: [west, south, east, north],
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
                [west, north],
              ],
            ],
            getPath: (d) => d,
            getColor: [255, 0, 0],
            widthMinPixels: 4,
          }),
      ]
    },
  })
}
