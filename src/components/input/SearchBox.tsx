import React, { KeyboardEvent, useState } from 'react';
import { useAppState } from "../../hooks/AppContext";
import { useBoundingBoxes } from "../../hooks/useBoundingBoxes";
import './SearchBox.scss'

interface SearchBoxProps {
    isPinning: boolean;
    handlePinPoint: () => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ isPinning, handlePinPoint }) => {
    const { state, dispatch } = useAppState();
    const { handleFindSimilar } = useBoundingBoxes();
    const [isFocused, setIsFocused] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: "SET_TEXT",
            payload: event.target.value
        });
    };

    const handleSubmit = () => {
        if (state.mode.type !== 'text') {
            throw Error("We should be in text mode");
        }

        const query = state.mode.query;
        if (query.trim()) {
            handleFindSimilar();
        }
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    const handlePinClick = () => {
        handlePinPoint();
        dispatch({ type: 'SET_TARGET_BOXES', payload: [] });
    };

    return (
        <div className={`search-box ${isFocused ? 'focused' : ''}`}>
            <button
                onClick={handlePinClick}
                className={`pin-button ${isPinning ? 'active' : ''}`}
                title={isPinning ? 'Cancel pin' : 'Select point'}
            >
                <img
                    src="./pin.svg"
                    alt="pin icon"
                    className={`pin-icon ${isPinning ? 'active' : ''}`}
                />
            </button>
            <div className="search-input-wrapper">
                <input
                    type="text"
                    value={state.mode.type === 'text' ? state.mode.query : ''}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className="search-input"
                    placeholder="Enter text here"
                />
                <button
                    onClick={handleSubmit}
                    className="submit-button"
                    aria-label="Submit"
                    disabled={state.isLoading}
                >
                    {state.isLoading ? <span className="loading">⏳</span> : '🔍'}
                </button>
            </div>
        </div>
    );
};

export default SearchBox;