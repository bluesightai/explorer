import { updateConfigs } from "../../config"
import { useAppState } from "../../hooks/AppContext"
import MapComponent from "./MapComponent"
import Cookies from "js-cookie"
import { useCallback, useEffect, useMemo, useState } from "react"
import Joyride, { CallBackProps, STATUS, Step } from "react-joyride"

const TOUR_COOKIE_NAME = "hasSeenTour"

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { state, dispatch } = useAppState()
  const { steps, runTour, stepIndex } = state.tour
  const isSceneCardVisible = state.resultBoundingBoxes.length > 0

  const setRunTour = (setTo: boolean) => {
    dispatch({ type: "SET_RUN_TOUR", payload: setTo })
  }
  const setStepIndex = (index: number) => {
    dispatch({ type: "SET_TOUR_STEP_INDEX", payload: index })
  }
  const setSteps = (newSteps: Step[]) => {
    dispatch({ type: "SET_TOUR_STEPS", payload: newSteps })
  }

  const updatedSteps: Step[] = useMemo(() => {
    const baseSteps: Step[] = [
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

    if (isSceneCardVisible) {
      baseSteps.push({
        target: ".scene-card",
        content: "This is scene card with results",
      })
    }

    return baseSteps
  }, [isSceneCardVisible])

  useEffect(() => {
    setSteps(updatedSteps)
  }, [updatedSteps])

  const handleJoyrideCallback = useCallback(
    (data: CallBackProps) => {
      const { action, index, status, type } = data

      console.log("Joyride callback:", { action, index, status, type, currentStepIndex: stepIndex })

      if (action === "next") {
        const nextIndex = stepIndex + 1
        console.log("Moving to next step:", nextIndex)
        setStepIndex(nextIndex)
      } else if (action === "prev") {
        const prevIndex = Math.max(stepIndex - 1, 0)
        console.log("Moving to previous step:", prevIndex)
        setStepIndex(prevIndex)
      } else if (status === STATUS.FINISHED || status === STATUS.SKIPPED) {
        console.log("Tour finished or skipped")
        setRunTour(false)
        setStepIndex(0)
        Cookies.set(TOUR_COOKIE_NAME, "true", { expires: 365 })
      }

      if (type === "step:after" && index === steps.length - 1) {
        console.log("Last step reached")
        setRunTour(false)
        setStepIndex(0)
      }

      if (action === "reset" && isSceneCardVisible && steps.length > 2) {
        console.log("Resetting tour to scene card step")
        setStepIndex(2) // Start from the scene card step
        setRunTour(true)
      }
    },
    [isSceneCardVisible, steps.length],
  )

  useEffect(() => {
    async function loadConfig() {
      await updateConfigs()
      setIsLoaded(true)

      const hasSeenTour = Cookies.get(TOUR_COOKIE_NAME)
      if (!hasSeenTour) {
        setRunTour(true)
      }
    }
    loadConfig()
  }, [setRunTour])

  useEffect(() => {
    if (isSceneCardVisible && !runTour && steps.length > 2) {
      setStepIndex(2)
      setRunTour(true)
    }
  }, [isSceneCardVisible, steps.length, runTour, setStepIndex, setRunTour])

  if (!isLoaded) {
    return <div>Loading...</div>
  }
  console.log("Current step index:", stepIndex)

  return (
    <>
      <Joyride
        steps={steps}
        run={runTour}
        stepIndex={stepIndex}
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
      <MapComponent />
    </>
  )
}
