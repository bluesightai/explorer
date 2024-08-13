import React, { KeyboardEvent } from 'react';
import { useAppState } from "../../hooks/AppContext";
import { useBoundingBoxes } from "../../hooks/useBoundingBoxes";
import './QueryInput.scss';

const QueryInput: React.FC = () => {
    const { state, dispatch } = useAppState();
    const { handleTextSearch } = useBoundingBoxes();
    const query = state.query;

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: "SET_TEXT",
            payload: event.target.value
        });
    };

    const handleSubmit = () => {
        if (query.trim()) {
            handleTextSearch();
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
                value={query}
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