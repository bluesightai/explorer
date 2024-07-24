const Slider = ({ min, max, value, onChange }: { min: number, max: number, value: number, onChange: (value: number) => void }) => (
    <div className="slider">
        <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
        />
        <div className="slider-labels">
            <span>{min}</span>
            <span>{value}</span>
            <span>{max}</span>
        </div>
    </div>
);


export default Slider   