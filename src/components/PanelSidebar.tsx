// FILE: /src/components/PanelSidebar.tsx

import React from "react";
import { Panel } from "./WardrobeSVG";

interface GrooveConfig {
  inset: number;
  width: number;
  depth: number;
}

interface PanelSidebarProps {
  panel: Panel;
  onUpdate: (updated: Panel) => void;
  onDelete?: (panelId: string) => void;
}

const boardStyles = ["MFC", "Ply", "Laminate"];
const boardTypes = ["Egger W1000 ST9", "Birch Ply", "White Melamine"];
const edgeStyles = ["Matte", "Gloss", "Textured"];
const edgeTypes = ["ABS", "PVC", "Melamine"];

const PanelSidebar: React.FC<PanelSidebarProps> = ({ panel, onUpdate, onDelete }) => {
  const handleChange = (field: keyof Panel, value: any) => {
    const updated = { ...panel, [field]: value };

    if (field === 'positionFromFloor' && typeof value === 'number') {
      updated.y = 2400 - value - (panel.height || 0);
    }

    onUpdate(updated);
  };

  const handleGrooveChange = (
    edge: 'left' | 'right' | 'top' | 'bottom',
    field: keyof GrooveConfig,
    value: number
  ) => {
    const updatedGrooves = {
      ...panel.grooves,
      [edge]: {
        ...(panel.grooves?.[edge] || { inset: 20, width: 9, depth: 8 }),
        [field]: value,
      },
    };
    handleChange('grooves', updatedGrooves);
  };

  const handleScribeChange = (index: number, field: 'height' | 'width', value: number) => {
    const updated = [...(panel.scribePoints || [])];
    updated[index] = { ...updated[index], [field]: value };
    handleChange('scribePoints', updated);
  };

  const addScribePoint = () => {
    const updated = [...(panel.scribePoints || []), { height: 0, width: 0 }];
    handleChange('scribePoints', updated);
  };

  const removeScribePoint = (index: number) => {
    const updated = [...(panel.scribePoints || [])];
    updated.splice(index, 1);
    handleChange('scribePoints', updated);
  };

  return (
    <div className="w-80 p-4 border-l bg-gray-50 shadow-inner h-full overflow-auto">
      <h2 className="text-lg font-bold mb-4">Edit Panel</h2>
      <div className="space-y-3 text-sm">
        <button
          className="px-2 py-1 text-white bg-red-600 rounded w-full"
          onClick={() => onDelete?.(panel.id)}
        >
          ❌ Remove Panel
        </button>

        <div>
          <label className="block font-medium">Label</label>
          <input
            type="text"
            className="w-full border px-2 py-1 rounded"
            value={panel.label || ""}
            onChange={(e) => handleChange("label", e.target.value)}
          />
        </div>

        <div>
          <label className="block font-medium">Height from Floor (mm)</label>
          <input
            type="number"
            className="w-full border px-2 py-1 rounded"
            value={panel.positionFromFloor || 0}
            onChange={(e) => handleChange("positionFromFloor", parseFloat(e.target.value))}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block font-medium">Width (mm)</label>
            <input
              type="number"
              className="w-full border px-2 py-1 rounded"
              value={panel.width}
              onChange={(e) => handleChange("width", parseFloat(e.target.value))}
            />
          </div>
          <div>
            <label className="block font-medium">Height (mm)</label>
            <input
              type="number"
              className="w-full border px-2 py-1 rounded"
              value={panel.height}
              onChange={(e) => handleChange("height", parseFloat(e.target.value))}
            />
          </div>
        </div>

        {/* Material and edge banding sections remain unchanged */}

        <div className="pt-4 border-t mt-4">
          <h3 className="font-semibold mb-2">Scribe Points</h3>
          <button
            className="mb-2 px-2 py-1 bg-blue-600 text-white rounded"
            onClick={addScribePoint}
          >
            ➕ Add Scribe Point
          </button>
          {(panel.scribePoints || []).map((pt, index) => (
            <div key={index} className="grid grid-cols-3 gap-2 mb-2">
              <input
                type="number"
                placeholder="Height"
                value={pt.height}
                onChange={(e) => handleScribeChange(index, "height", parseFloat(e.target.value))}
                className="border px-2 py-1 rounded"
              />
              <input
                type="number"
                placeholder="Width"
                value={pt.width}
                onChange={(e) => handleScribeChange(index, "width", parseFloat(e.target.value))}
                className="border px-2 py-1 rounded"
              />
              <button
                className="text-red-600 font-bold"
                onClick={() => removeScribePoint(index)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PanelSidebar;