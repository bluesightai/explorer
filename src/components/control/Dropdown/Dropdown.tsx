import { useState, useRef, useEffect } from 'react';
import './Dropdown.scss';
import { Config, ukraine_config, cali_config } from "../../../config";
import { useAppState } from "../../../hooks/AppContext";

const DropDown = ({ setViewState }: { setViewState: (config: Config) => void }) => {
    const { dispatch, state } = useAppState();
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    const handleConfigChange = (value: Config) => {
        dispatch({ type: "SET_CONFIG", payload: value });
        setIsOpen(false);
        setViewState(value);
    };

    const toggleDropdown = () => setIsOpen(!isOpen);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="styled-select" ref={selectRef}>
            <div className="styled-select__selected" onClick={toggleDropdown}>
                <span>{state.config.name}</span>
                <svg className={`styled-select__arrow ${isOpen ? 'open' : ''}`} viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5z" />
                </svg>
            </div>
            {isOpen && (
                <ul className="styled-select__options">
                    <li onClick={() => handleConfigChange(ukraine_config)}>Ukraine</li>
                    <li onClick={() => handleConfigChange(cali_config)}>California</li>
                </ul>
            )}
        </div>
    );
};

export default DropDown;