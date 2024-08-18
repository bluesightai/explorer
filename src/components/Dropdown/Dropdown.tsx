import { useState } from "react";
import './Dropdown.scss';
import { cali_config, Config, ukraine_config } from "../../config";
import { useAppState } from "../../hooks/AppContext";

const DropDown = ({ setViewState }: { setViewState: (config: Config) => void }) => {
    const { dispatch, state } = useAppState();
    const [isOpen, setIsOpen] = useState(false);

    const handleConfigChange = (value: Config) => {
        dispatch({ type: "SET_CONFIG", payload: value });
        setIsOpen(false);
        setViewState(value)
    };

    return (
        <div className="dropdown">
            <button
                className="dropdown__button"
                onClick={() => setIsOpen(!isOpen)}
            >
                {state.config.name}
            </button>
            {isOpen && (
                <ul className="dropdown__list">
                    <li
                        className="dropdown__item"
                        onClick={() => handleConfigChange(ukraine_config)}
                    >
                        Ukraine
                    </li>
                    <li
                        className="dropdown__item"
                        onClick={() => handleConfigChange(cali_config)}
                    >
                        California
                    </li>
                </ul>
            )}
        </div>
    )
}

export default DropDown;