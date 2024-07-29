import React from 'react';
import './AreaSelector.scss';

interface Area {
    id: number;
    name: string;
}

interface AreaSelectorProps {
    areaId: number;
    setAreaId: (id: number) => void;
}

const areas: Area[] = [
    { id: 1, name: 'SF' },
    { id: 2, name: 'SD' },
    { id: 3, name: 'LA' },
    { id: 4, name: 'CV' },
    { id: 5, name: 'CA' }
];

const AreaSelector: React.FC<AreaSelectorProps> = ({ areaId, setAreaId }) => {
    return (
        <div className="area-selector-compact">
            {areas.map((area) => (
                <button
                    key={area.id}
                    className={`area-button ${area.id === areaId ? 'selected' : ''}`}
                    onClick={() => setAreaId(area.id)}
                >
                    {area.name}
                </button>
            ))}
        </div>
    );
};

export default AreaSelector;