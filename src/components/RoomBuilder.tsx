import React, { useState } from 'react';
import PanelInputForm from './PanelInputForm';
import NestingVisualizer from './NestingVisualizer';
import { Panel, PlacedPanel } from '../types/panels';
import { maxRectanglesNest } from '../utils/nesting';

const RoomBuilder: React.FC = () => {
  const [roomWidth, setRoomWidth] = useState(5000); // mm
  const [roomDepth, setRoomDepth] = useState(4000); // mm
  const [nestedPanels, setNestedPanels] = useState<PlacedPanel[]>([]);
  const [boardWidth, setBoardWidth] = useState(0);
  const [boardHeight, setBoardHeight] = useState(0);

  const svgScale = 0.1; // scale down for SVG visibility

  const handlePanelsUpdate = (
    panels: Panel[],
    width: number,
    height: number,
    spacing: number
  ) => {
    // Add spacing between panels
    const panelsWithSpacing = panels.map(panel => ({
      ...panel,
      width: panel.width + spacing,
      height: panel.height + spacing,
    }));

    setBoardWidth(width);
    setBoardHeight(height);
    const nested = maxRectanglesNest(panelsWithSpacing, width, height);
    setNestedPanels(nested);
  };

  return (
    <div className="space-y-8">
      <div className="p-4 border rounded shadow-md bg-gray-50">
        <h2 className="text-xl font-semibold mb-3">Room Dimensions (mm)</h2>
        <div className="flex gap-2 mb-4">
          <input
            type="number"
            className="border rounded px-3 py-2 w-full"
            placeholder="Room Width"
            value={roomWidth}
            onChange={(e) => setRoomWidth(Number(e.target.value))}
          />
          <input
            type="number"
            className="border rounded px-3 py-2 w-full"
            placeholder="Room Depth"
            value={roomDepth}
            onChange={(e) => setRoomDepth(Number(e.target.value))}
          />
        </div>

        <h2 className="text-xl font-semibold mb-3">Room Layout</h2>
        <svg
          width={roomWidth * svgScale + 20}
          height={roomDepth * svgScale + 20}
          className="border rounded bg-white shadow"
        >
          <rect
            x={10}
            y={10}
            width={roomWidth * svgScale}
            height={roomDepth * svgScale}
            fill="#e5e7eb"
            stroke="#374151"
            strokeWidth={2}
          />
          <text
            x={(roomWidth * svgScale) / 2 + 10}
            y={(roomDepth * svgScale) / 2 + 10}
            fontSize={16}
            fill="#111827"
            textAnchor="middle"
            dominantBaseline="central"
          >
            {`${roomWidth}mm x ${roomDepth}mm`}
          </text>
        </svg>
      </div>

      <PanelInputForm onPanelsUpdate={handlePanelsUpdate} />

      {nestedPanels.length > 0 && (
        <div className="p-4 border rounded shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-3">Panel Nesting Preview</h2>
          <NestingVisualizer
            panels={nestedPanels}
            width={boardWidth}
            height={boardHeight}
          />
        </div>
      )}
    </div>
  );
};

export default RoomBuilder;