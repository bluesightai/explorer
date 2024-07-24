import React from 'react';
import MapComponent from './components/MapComponent';

const App: React.FC = () => {

  return (
    <div className="App" style={{ width: '100vw', height: '100vh' }}>
      <MapComponent />
    </div>
  );
};

export default App;