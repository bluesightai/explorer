import HelpButton from "../HelpTour"
import { MAIN_TOUR_COOKIE_NAME } from "../MainMap/MapApp"
import "./ControlWidget.scss"
import Cookies from "js-cookie"

function ControlWidget({ setRunTour }: { setRunTour: (payload: boolean) => void }) {
  const resetTour = () => {
    Cookies.remove(MAIN_TOUR_COOKIE_NAME)
    setRunTour(true)
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
    </div>
  )
}

export default ControlWidget
