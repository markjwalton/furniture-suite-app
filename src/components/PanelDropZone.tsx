import { useDrop } from 'react-dnd';

interface PanelDropZoneProps {
  onDropPanel: (id: string) => void;
  children?: React.ReactNode;
}

const PanelDropZone = ({ onDropPanel, children }: PanelDropZoneProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'PANEL',
    drop: (item: { id: string }) => onDropPanel(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`border-2 border-dashed p-4 rounded-lg ${
        isOver ? 'bg-green-100 border-green-400' : 'bg-gray-100 border-gray-300'
      }`}
    >
      {children || 'Drag panels here'}
    </div>
  );
};

export default PanelDropZone;
