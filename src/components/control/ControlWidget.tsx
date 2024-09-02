import { useAppState } from "../../hooks/AppContext"
import "./ControlWidget.scss"

const ControlWidget = () => {
  const { dispatch } = useAppState()

  const handleStartTour = () => {
    dispatch({ type: "SET_RUN_TOUR", payload: true })
  }

  return (
    <div className="left-toolbar">
      <div className="logo">
        <a href="https://bluesight.ai/" className="logo-full" target="_blank" rel="noopener noreferrer">
          <span className="logo-dot"></span> <span className="logo-name">Bluesight.ai</span>
        </a>
      </div>
      <button
        onClick={handleStartTour}
        className="start-tour-button"
      >
        Start Tour
      </button>
    </div>
  )
}

export default ControlWidget