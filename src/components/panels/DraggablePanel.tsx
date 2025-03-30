import { useDrag } from 'react-dnd';

interface DraggablePanelProps {
  id: string;
  label: string;
}

const DraggablePanel = ({ id, label }: DraggablePanelProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'PANEL',
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 bg-gray-200 rounded cursor-move ${
        isDragging ? 'opacity-50' : 'opacity-100'
      }`}
    >
      {label}
    </div>
  );
};

export default DraggablePanel;
