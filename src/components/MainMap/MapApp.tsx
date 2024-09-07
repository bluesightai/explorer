import { updateConfigs } from "../../config"
import { useAppState } from "../../hooks/AppContext"
import MapComponent from "./MapComponent"
import Cookies from "js-cookie"
import { useCallback, useEffect } from "react"
import Joyride, { CallBackProps, EVENTS, STATUS, Step } from "react-joyride"

export const MAIN_TOUR_COOKIE_NAME = "hasSeenTour"

const initialSteps: Step[] = [
  {
    disableBeacon: true,

    target: ".search-input",
    content: "Type in what you are looking for, eg. solar panels, blue car",
  },
  {
    disableBeacon: true,

    target: ".submit-button",
    content: "Press ↩️ or click this button to search",
  },
  {
    disableBeacon: true,

    target: ".pin-button",
    content: "Enable image search. Then select any point on the map.",
  },
  {
    disableBeacon: true,

    target: ".toggle",
    content: "Toggle between big / small object search.",
  },
]

export default function App() {
  const { state, dispatch } = useAppState()

  useEffect(() => {
    async function loadConfig() {
      await updateConfigs()
      dispatch({ type: "SET_LOADING", payload: false })

      const hasSeenTour = Cookies.get(MAIN_TOUR_COOKIE_NAME)
      if (!hasSeenTour) {
        dispatch({ type: "SET_HELP_TOUR", payload: "first" })
      }
    }
    loadConfig()
  }, [])

  const handleJoyrideCallback = useCallback((data: CallBackProps) => {
    const { status, type } = data

    if (type === EVENTS.TOUR_END && (status === STATUS.FINISHED || status === STATUS.SKIPPED)) {
      dispatch({ type: "SET_HELP_TOUR", payload: "off" })
      Cookies.set(MAIN_TOUR_COOKIE_NAME, "true", { expires: 365 })
    }
  }, [])

  return (
    <>
      <Joyride
        steps={initialSteps}
        run={state.helpTour === "first"}
        continuous={true}
        showSkipButton={true}
        showProgress={true}
        callback={handleJoyrideCallback}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: "var(--blue)",
          },
        }}
      />
      <MapComponent />
    </>
  )
}
