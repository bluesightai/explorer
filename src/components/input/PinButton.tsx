import { useAppState } from "../../hooks/AppContext"

const Button = ({ isPinning, handlePinPoint }: { isPinning: boolean; handlePinPoint: () => void }) => {
    const { dispatch } = useAppState()

    return (
        <button
            onClick={() => {
                handlePinPoint()
                dispatch({ type: 'SET_TARGET_BOXES', payload: [] })
            }}
            className={`control-button ${isPinning ? "active pinning" : ""}`}
        >
            <img
                src="./pin.svg"
                alt="pin icon"
                className={`control-button-icon ${isPinning ? "active" : ""}`}
            />
            {isPinning ? "Cancel" : "Select point"}
        </button>
    )
}

export default Button