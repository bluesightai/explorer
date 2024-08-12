import { useAppState } from '../../hooks/AppContext';
import { useBoundingBoxes } from '../../hooks/useBoundingBoxes';

const QueryInput = () => {
    const { state, dispatch } = useAppState();
    const { handleTextSearch } = useBoundingBoxes();
    const query = state.query

    const handleInputChange = (event: any) => {
        dispatch({
            type: "SET_TEXT",
            payload: event.target.value
        })
    };

    const handleButtonClick = () => {
        // TODO: Implement button click functionality
        handleTextSearch()
    };

    return (
        <div className="flex flex-col space-y-2">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                className="border border-gray-300 rounded px-2 py-1"
                placeholder="Enter text here"
            />
            <button
                onClick={handleButtonClick}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Submit
            </button>
        </div>
    );
};

export default QueryInput;