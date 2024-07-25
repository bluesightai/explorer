import type { Position } from "@deck.gl/core"
import { TileLayer } from "@deck.gl/geo-layers"
import { BitmapLayer, PathLayer } from "@deck.gl/layers"
import { useState, useEffect } from 'react'

declare global {
  interface Window {
    mapboxgl: any;
  }
}

interface TileLayerComponentProps {
  showBorder: boolean
}

// Change the return type to include null
export const TileLayerComponent: (props: TileLayerComponentProps) => TileLayer | null = ({ showBorder }) => {
  const mapboxToken = 'pk.eyJ1Ijoic3p5bW9uem15c2xvbnkiLCJhIjoiY2x5eDYxb2JqMWxkaTJrczZjZ3Nhd2hrZSJ9.jpzoW1-5ILOP-hIWtXBPxA'
  const [mapboxLoaded, setMapboxLoaded] = useState(false)

  useEffect(() => {
    if (!window.mapboxgl) {
      const script = document.createElement('script')
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.9.1/mapbox-gl.js'
      script.async = true
      script.onload = () => {
        window.mapboxgl.accessToken = mapboxToken
        setMapboxLoaded(true)
      }
      document.body.appendChild(script)
    } else {
      setMapboxLoaded(true)
    }
  }, [mapboxToken])

  const devicePixelRatio = (typeof window !== "undefined" && window.devicePixelRatio) || 1

  if (!mapboxLoaded) {
    return null
  }

  return new TileLayer({
    data: [''],
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
      const { x, y, z } = props.tile.index

      const mapboxUrl = `https://api.mapbox.com/v4/mapbox.satellite/${z}/${x}/${y}@${devicePixelRatio}x.webp?access_token=${mapboxToken}`

      return [
        new BitmapLayer({
          id: `${props.id}-bitmap`,
          image: mapboxUrl,
          bounds: [west, south, east, north],
        }),
        showBorder &&
        new PathLayer<Position[]>({
          id: `${props.id}-border`,
          data: [[[west, north], [west, south], [east, south], [east, north], [west, north]]],
          getPath: (d) => d,
          getColor: [255, 0, 0],
          widthMinPixels: 4,
        }),
      ].filter(Boolean) as any[]
    },
  })
}