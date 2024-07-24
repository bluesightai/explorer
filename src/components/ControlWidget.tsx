import { useMapInteractions } from '../hooks/useMapInteractions';

const ControlWidget = ({ isPinning, handlePinPoint }: { isPinning: boolean; handlePinPoint: (arg0: any) => void }) => {
  const {
    handleFindSimilar,
    handleShareFindings,
    handleCleanSearch
  } = useMapInteractions();

  return (
    <div style={{
      position: 'absolute',
      top: '10px',
      left: '10px',
      zIndex: 1,
      backgroundColor: 'white',
      padding: '10px',
      borderRadius: '5px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
    }}>
      <button onClick={handlePinPoint} style={{ backgroundColor: isPinning ? 'lightblue' : 'white' }}>
        {isPinning ? 'Cancel Pin' : 'Pin a Point'}
      </button>
      <button onClick={handleFindSimilar}>Find Similar</button>
      <button onClick={handleShareFindings}>Share Findings</button>
      <button onClick={handleCleanSearch}>Clean Search</button>
    </div>
  );
};

export default ControlWidget;