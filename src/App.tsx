import React from 'react';
import FillerPanelsList from './components/FillerPanelsList';
import AddFillerPanel from './components/AddFillerPanel';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-6">
      <AddFillerPanel />
      <FillerPanelsList />
    </div>
  );
}

export default App;
