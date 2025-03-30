import { useState } from 'react';
import SmplrspaceViewer from './SmplrspaceViewer';
import PanelFormModal from './PanelFormModal';

const App = () => {
  const [layoutData, setLayoutData] = useState({});
  const [modalOpen, setModalOpen] = useState(false);

  const handleSavePanel = (panelData) => {
    // Logic to update layout data
    setLayoutData((prev) => ({
      ...prev,
      panels: [...(prev.panels || []), panelData],
    }));
  };

  return (
    <div className="flex">
      <div className="w-1/3 p-4">
        <Button onClick={() => setModalOpen(true)}>Add Panel</Button>
        <PanelFormModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSave={handleSavePanel}
        />
        {/* Panel List Here */}
      </div>
      <div className="w-2/3 p-4">
        <SmplrspaceViewer layoutData={layoutData} />
      </div>
    </div>
  );
};

export default App;
