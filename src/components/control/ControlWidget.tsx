import { useAppState } from "../../hooks/AppContext"
import HelpButton from "../HelpTour"
import { MAIN_TOUR_COOKIE_NAME } from "../MainMap/MapApp"
import "./ControlWidget.scss"
import Cookies from "js-cookie"

function ControlWidget() {
  const { state, dispatch } = useAppState()

  const resetTour = () => {
    Cookies.remove(MAIN_TOUR_COOKIE_NAME)

    const tourToStart = state.resultBoundingBoxes.length > 0 ? "second" : "first"
    dispatch({ type: "SET_HELP_TOUR", payload: tourToStart })
  }

  return (
    <div className="left-toolbar">
      <div className="logo-and-help">
        <div className="logo">
          <a href="https://bluesight.ai/" className="logo-full" target="_blank" rel="noopener noreferrer">
            <span className="logo-dot"></span> <span className="logo-name">Bluesight.ai</span>
          </a>
        </div>
        <HelpButton onClick={resetTour} />
      </div>
      <div className="contact-info">
        <a href="mailto:szymon@bluesight.ai" className="contact-link">
          Contact: hello@bluesight.ai
        </a>
      </div>
    </div>
  )
}

export default ControlWidget
