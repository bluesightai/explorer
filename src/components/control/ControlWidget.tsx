import "./ControlWidget.scss"

const ControlWidget = ({
  isPinning,
  handlePinPoint,
}: {
  isPinning: boolean
  handlePinPoint: (arg0: any) => void
}) => {
  return (
    <div className="control-widget">
      <button onClick={handlePinPoint} className={`control-button ${isPinning ? "active" : ""}`}>
        <span className="control-button-icon">📍</span>
        {isPinning ? "Cancel Pin" : "Pin a Point"}
      </button>

    </div>
  )
}

export default ControlWidget
