import React, { useState } from 'react';
import { Panel } from '../types/panels';

interface Props {
  onPanelsUpdate: (
    panels: Panel[],
    boardWidth: number,
    boardHeight: number,
    spacing: number
  ) => void;
}

const PanelInputForm: React.FC<Props> = ({ onPanelsUpdate }) => {
  const [boardWidth, setBoardWidth] = useState(2800);
  const [boardHeight, setBoardHeight] = useState(2070);
  const [spacing, setSpacing] = useState(5); // Default kerf/spacing in mm

  const [panels, setPanels] = useState<Panel[]>([
    { id: 'Panel1', width: 600, height: 400 },
  ]);

  const handlePanelChange = (index: number, key: keyof Panel, value: string) => {
    const updatedPanels = [...panels];
    updatedPanels[index] = {
      ...updatedPanels[index],
      [key]: key === 'id' ? value : Number(value),
    };
    setPanels(updatedPanels);
  };

  const addPanel = () => {
    setPanels([...panels, { id: `Panel${panels.length + 1}`, width: 500, height: 500 }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPanelsUpdate(panels, boardWidth, boardHeight, spacing);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 rounded-lg border shadow bg-gray-50">
      <h2 className="text-xl font-semibold mb-2">Board Dimensions</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="number"
          className="border rounded px-3 py-2 w-full"
          placeholder="Board Width (mm)"
          value={boardWidth}
          onChange={(e) => setBoardWidth(Number(e.target.value))}
        />
        <input
          type="number"
          className="border rounded px-3 py-2 w-full"
          placeholder="Board Height (mm)"
          value={boardHeight}
          onChange={(e) => setBoardHeight(Number(e.target.value))}
        />
        <input
          type="number"
          className="border rounded px-3 py-2 w-full"
          placeholder="Spacing/Kerf (mm)"
          value={spacing}
          onChange={(e) => setSpacing(Number(e.target.value))}
        />
      </div>

      <h2 className="text-xl font-semibold mb-2">Panels</h2>
      {panels.map((panel, index) => (
        <div key={index} className="flex gap-2 mb-2">
          <input
            type="text"
            className="border rounded px-3 py-2 w-1/3"
            placeholder="Panel ID"
            value={panel.id}
            onChange={(e) => handlePanelChange(index, 'id', e.target.value)}
          />
          <input
            type="number"
            className="border rounded px-3 py-2 w-1/3"
            placeholder="Width (mm)"
            value={panel.width}
            onChange={(e) => handlePanelChange(index, 'width', e.target.value)}
          />
          <input
            type="number"
            className="border rounded px-3 py-2 w-1/3"
            placeholder="Height (mm)"
            value={panel.height}
            onChange={(e) => handlePanelChange(index, 'height', e.target.value)}
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addPanel}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
      >
        Add Panel
      </button>

      <button
        type="submit"
        className="mt-2 ml-2 px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
      >
        Generate Nesting
      </button>
    </form>
  );
};

export default PanelInputForm;