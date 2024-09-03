import "./HelpButton.scss"
import React from "react"

// Make sure to create this CSS file

interface HelpButtonProps {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
}

const HelpButton: React.FC<HelpButtonProps> = ({ onClick, className = "" }) => {
  return (
    <button onClick={onClick} className={`help-button ${className}`}>
      <span className="help-button__icon">Help &#10067;</span>
    </button>
  )
}

export default HelpButton
