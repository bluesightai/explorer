// Slider.tsx
import React from 'react'

interface SliderProps {
  min: number
  max: number
  value: number
  onChange: (value: number) => void
  isLoading: boolean
}

const Slider: React.FC<SliderProps> = React.memo(({ min, max, value, onChange, isLoading }) => {
  return (
    <div className="slider">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={isLoading}
      />
      <div className="slider-labels">
        <span>{min}</span>
        <span>{max}</span>
      </div>
      {isLoading && <span className="slider-loading">Searching...</span>}
    </div>
  )
})

export default Slider