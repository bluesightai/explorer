import { useAppState } from "../../hooks/AppContext"
import SceneCard from "./SceneCard"
import Cookies from "js-cookie"
import React, { useCallback, useEffect } from "react"
import Joyride, { CallBackProps, EVENTS, STATUS, Step } from "react-joyride"

const SCENE_TOUR_COOKIE_NAME = "hasSeenSceneTour"

interface SceneCardWrapperProps {
  onTileClick: (boundingBox: [number, number, number, number]) => void
  handleCleanSearch: () => void
  handleFindSimilar: () => void
  isSceneCardCollapsed: boolean
  setIsSceneCardCollapsed: (isSceneCardCollapsed: boolean) => void
}

const SceneCardWrapper: React.FC<SceneCardWrapperProps> = (props) => {
  const { state, dispatch } = useAppState()
  const haveResultBoxes = state.resultBoundingBoxes.length > 0

  const sceneCardSteps: Step[] = [
    {
      disableBeacon: true,

      target: ".scene-card",
      content: "This is the scene card where you can view and interact with results.",
    },
    {
      disableBeacon: true,

      target: ".carousel",
      content: "This carousel shows your selected areas or search results. Click to zoom in.",
    },
    {
      disableBeacon: true,

      target: ".slider",
      content: "Use this slider to adjust how many matches you are looking for.",
    },
    {
      disableBeacon: true,

      target: ".expandable-grid",
      content: "This grid shows matches based on your search. Click on a tile zoom in.",
    },
    {
      disableBeacon: true,

      target: ".negative-box-button",
      content: "You can click here if it's not a match and we will improve based on that ",
    },
    {
      disableBeacon: true,

      target: ".clear-button",
      content: "Click here to clear your search and start over.",
    },
  ]

  useEffect(() => {
    const hasSeenTour = Cookies.get(SCENE_TOUR_COOKIE_NAME)
    if (!hasSeenTour && haveResultBoxes) {
      dispatch({ type: "SET_HELP_TOUR", payload: "second" })
    }
  }, [haveResultBoxes])

  const handleJoyrideCallback = useCallback((data: CallBackProps) => {
    const { status, type } = data

    if (type === EVENTS.TOUR_END && (status === STATUS.FINISHED || status === STATUS.SKIPPED)) {
      dispatch({ type: "SET_HELP_TOUR", payload: "off" })
      Cookies.set(SCENE_TOUR_COOKIE_NAME, "true", { expires: 365 })
    }
  }, [])

  return (
    <>
      <Joyride
        steps={sceneCardSteps}
        run={state.helpTour === "second"}
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
      <div className="scene-card-container">
        <SceneCard {...props} />
      </div>
    </>
  )
}

export default SceneCardWrapper
