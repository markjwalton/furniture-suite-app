// src/components/panels/PanelList.tsx
import DraggablePanel from './DraggablePanel';
import PanelDropZone from './PanelDropZone';

const PanelList = ({ panels, onRemovePanel }) => {
  const handlePanelDrop = (panelId) => {
    console.log('Panel dropped:', panelId);
  };

  return (
    <div className="space-y-2">
      <PanelDropZone onDropPanel={handlePanelDrop}>
        {panels.map((panel) => (
          <DraggablePanel key={panel.id} id={panel.id} label={panel.label} />
        ))}
      </PanelDropZone>

      {panels.map((panel) => (
        <div key={panel.id}>
          <span>{panel.label}</span>
          <button onClick={() => onRemovePanel(panel.id)}>Remove</button>
        </div>
      ))}
    </div>
  );
};

export default PanelList;
