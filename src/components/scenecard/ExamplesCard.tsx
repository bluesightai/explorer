import { useAppState } from "../../hooks/AppContext"
import "./Examples.scss"
import { useEffect } from "react"

const Examples = ({ handleFindSimilar }: { handleFindSimilar: () => void }) => {
  const { dispatch, state } = useAppState()
  const examples = ["tesla", "dry patch", "solar panels", "boats"]

  useEffect(() => {
    handleFindSimilar()
  }, [state.mode.type == "text" ? state.mode.query : ""])

  const handleClick = (item: string) => {
    dispatch({ type: "SET_TEXT", payload: item })
  }

  return (
    <div className="scene-card">
      <div className="example-group">
        <h3 className="example-title">Examples:</h3>
        <div className="example-list">
          {examples.map((item, index) => (
            <div key={index} className="example-item">
              <span onClick={() => handleClick(item)}>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Examples
