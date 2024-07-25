import "./ControlWidget.scss"

const ControlWidget = ({
  isPinning,
  handlePinPoint,
  handleFindSimilar,
  handleCleanSearch,
}: {
  handleCleanSearch: (arg0: any) => void
  handleFindSimilar: (arg0: any) => void
  isPinning: boolean
  handlePinPoint: (arg0: any) => void
}) => {
  return (
    <div className="control-widget">
      <button onClick={handlePinPoint} className={`control-button ${isPinning ? "active" : ""}`}>
        <span className="control-button-icon">📍</span>
        {isPinning ? "Cancel Pin" : "Pin a Point"}
      </button>
      <button onClick={handleFindSimilar} className="control-button">
        <span className="control-button-icon">🔍</span>
        Find Similar
      </button>
      <button onClick={() => { }} className="control-button">
        <span className="control-button-icon">↗️</span>
        Share Findings
      </button>
      <button onClick={handleCleanSearch} className="control-button">
        <span className="control-button-icon">🗑️</span>
        Clear Search
      </button>
    </div>
  )
}

export default ControlWidget
