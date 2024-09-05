import "./HelpButton.scss"
import React from "react"

interface HelpButtonProps {
  onClick: () => void
  className?: string
}

const HelpButton: React.FC<HelpButtonProps> = ({ onClick, className = "" }) => {
  return (
    <button onClick={() => onClick()} className={`help-button ${className}`}>
      <span className="help-button__text">Site Tutorial</span>
    </button>
  )
}

export default HelpButton
