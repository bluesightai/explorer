import React, { KeyboardEvent } from 'react';
import { useAppState } from "../../hooks/AppContext";
import { useBoundingBoxes } from "../../hooks/useBoundingBoxes";
import './QueryInput.scss';

const QueryInput: React.FC = () => {
    const { state, dispatch } = useAppState();
    const { handleFindSimilar } = useBoundingBoxes()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: "SET_TEXT",
            payload: event.target.value
        });
    };

    const handleSubmit = () => {
        if (state.mode.type != 'text') {
            throw Error("We should be in text mode")
        }

        const query = state.mode.query
        if (query.trim()) {
            handleFindSimilar();
        }
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };


    return (
        <div className="query-input">
            <input
                type="text"
                value={state.mode.type == 'text' ? state.mode.query : ''}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                className="input-field"
                placeholder="Enter text here"
            />
            <button
                onClick={handleSubmit}
                className="submit-button"
                aria-label="Submit"
                disabled={state.isLoading}
            >
                {state.isLoading ? <span className="loading">⏳</span> : '➡️'}
            </button>
        </div>
    );
};

export default QueryInput;