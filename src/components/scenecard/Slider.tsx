import "./Slider.scss"
import React from "react"

interface SliderProps {
  min: number
  max: number
  value: number
  onChange: (value: number) => void
  onRelease: () => void
  isLoading: boolean
}

const Slider: React.FC<SliderProps> = React.memo(({ min, max, value, onChange, onRelease, isLoading }) => {
  return (
    <div className="slider">
      <div className="slider-labels">
        <span>{min}</span>
        <span className="slider-labels-value">{value}</span>
        <span>{max}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        onMouseUp={onRelease}
        onTouchEnd={onRelease}
        disabled={isLoading}
      />

      {isLoading && <span className="slider-loading">Searching...</span>}
    </div>
  )
})

export default Slider
