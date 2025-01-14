// SearchBox.tsx
import { useAppState } from "../../hooks/AppContext"
import { useBoundingBoxes } from "../../hooks/useBoundingBoxes"
import { useSupabase } from "../../hooks/useSupabase"
import "./SearchBox.scss"
import debounce from "lodash/debounce"
import React, { KeyboardEvent, useCallback, useEffect, useState } from "react"

interface SearchBoxProps {
  isPinning: boolean
  handlePinPoint: () => void
  setPinPointNegative: () => void
  setIsSceneCardCollapsed: (isSceneCardCollapsed: boolean) => void
}

const Toggle = () => {
  const { state, dispatch } = useAppState()
  const isOn = state.largeObjects
  const handleToggle = () => dispatch({ type: "SET_LARGE_OBJECTS", payload: !isOn })
  return (
    <input
      checked={isOn}
      onChange={handleToggle}
      className="toggle"
      type="checkbox"
      id="toggle-switch"
      data-label-on={"big"}
      data-label-off={"big"}
    />
  )
}

const SearchBox: React.FC<SearchBoxProps> = ({
  isPinning,
  handlePinPoint,
  setPinPointNegative,
  setIsSceneCardCollapsed,
}) => {
  const { state, dispatch } = useAppState()
  const { handleFindSimilar } = useBoundingBoxes()
  const [isFocused, setIsFocused] = useState(false)
  const { saveQueryResult } = useSupabase()

  const handlePinClick = () => {
    handlePinPoint()
    dispatch({ type: "SET_TARGET_BOXES", payload: [] })
  }

  const query = state.mode.type == "text" ? state.mode.query : ""

  const debouncedSaveQuery = useCallback(
    debounce((query: string) => {
      if (query) {
        saveQueryResult(query)
      }
    }, 500),
    [saveQueryResult],
  )

  useEffect(() => {
    if (state.mode.type == "text") {
      debouncedSaveQuery(query)
    }
    return () => {
      debouncedSaveQuery.cancel()
    }
  }, [query])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPinPointNegative()
    dispatch({
      type: "SET_TEXT",
      payload: event.target.value,
    })
  }

  const handleSubmit = () => {
    if (state.mode.type !== "text") {
      throw Error("We should be in text mode")
    }
    const query = state.mode.query
    if (query.trim()) {
      handleFindSimilar()
      setIsSceneCardCollapsed(false)
    }
  }

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit()
    }
  }

  return (
    <div className={`search-box ${isFocused ? "focused" : ""}`}>
      <button
        onClick={handlePinClick}
        className={`pin-button ${isPinning ? "active" : ""}`}
        title={isPinning ? "Cancel pin" : "Select point"}
      >
        <img src="./pin.svg" alt="pin icon" className={`pin-icon ${isPinning ? "active" : ""}`} />
      </button>
      <div className="search-input-wrapper">
        <input
          type="text"
          value={state.mode.type === "text" ? state.mode.query : ""}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="search-input"
          placeholder="What are you looking for?"
        />
        <button onClick={handleSubmit} className="submit-button" aria-label="Submit" disabled={state.isLoading}>
          {state.isLoading ? <span className="loading">⏳</span> : "🔍"}
        </button>
        <Toggle />
      </div>
    </div>
  )
}

export default SearchBox
