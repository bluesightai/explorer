import { updateConfigs } from "../../config"
import MapComponent from "./MapComponent"
import Cookies from "js-cookie"
import { useCallback, useEffect, useState } from "react"
import Joyride, { CallBackProps, EVENTS, STATUS, Step } from "react-joyride"

export const MAIN_TOUR_COOKIE_NAME = "hasSeenTour"

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [runTour, setRunTour] = useState(false)
  const [steps, setSteps] = useState<Step[]>([])

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

  useEffect(() => {
    async function loadConfig() {
      await updateConfigs()
      setIsLoaded(true)

      const hasSeenTour = Cookies.get(MAIN_TOUR_COOKIE_NAME)
      if (!hasSeenTour) {
        setSteps(initialSteps)
        setRunTour(true)
      }
    }
    loadConfig()
  }, [])

  const handleJoyrideCallback = useCallback((data: CallBackProps) => {
    const { status, type } = data

    if (type === EVENTS.TOUR_END && (status === STATUS.FINISHED || status === STATUS.SKIPPED)) {
      setRunTour(false)
      Cookies.set(MAIN_TOUR_COOKIE_NAME, "true", { expires: 365 })
    }
  }, [])

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <>
      <Joyride
        steps={steps}
        run={runTour}
        continuous={true}
        showSkipButton={true}
        showProgress={true}
        callback={handleJoyrideCallback}
        styles={{
          options: {
            zIndex: 10000,
          },
        }}
      />
      <MapComponent setRunTour={(payload: boolean) => setRunTour(payload)} />
    </>
  )
}
