import { updateConfigs } from "../../config"
import { useAppState } from "../../hooks/AppContext"
import MapComponent from "./MapComponent"
import Cookies from "js-cookie"
import { useCallback, useEffect } from "react"
import Joyride, { CallBackProps, EVENTS, STATUS, Step } from "react-joyride"

export const MAIN_TOUR_COOKIE_NAME = "hasSeenTour"

const initialSteps: Step[] = [
  {
    target: ".logo",
    content: "This is the logo of our application.",
    disableBeacon: true,
  },
  {
    target: ".search-input",
    content: "Use this search box to find locations.",
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
      />
      <MapComponent />
    </>
  )
}
