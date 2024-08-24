import { DeckProps } from "@deck.gl/core"
import { GoogleMapsOverlay } from "@deck.gl/google-maps"
import { useMap } from "@vis.gl/react-google-maps"
import { useEffect, useMemo, useState } from "react"

const DeckGlOverlay = (props: DeckProps) => {
  const layers = props.layers
  const [isMapReady, setIsMapReady] = useState(false)
  const deck = useMemo(() => new GoogleMapsOverlay({ interleaved: true }), [])
  const map = useMap()

  useEffect(() => {
    if (map) {
      const checkMapReady = () => {
        if (map.getDiv().clientWidth > 0 && map.getDiv().clientHeight > 0) {
          setIsMapReady(true)
        } else {
          setTimeout(checkMapReady, 100)
        }
      }
      checkMapReady()
    }
  }, [map])

  useEffect(() => {
    if (isMapReady && map) {
      deck.setMap(map)
      return () => {
        deck.setMap(null)
      }
    }
  }, [isMapReady, map])

  useEffect(() => {
    if (isMapReady) {
      deck.setProps(props)
    }
  }, [layers, isMapReady])

  return null
}
export default DeckGlOverlay
