import React from 'react';
import { PlacedPanel } from '../types/panels';

interface NestingVisualizerProps {
  panels: PlacedPanel[];
  width: number;
  height: number;
}

const NestingVisualizer: React.FC<NestingVisualizerProps> = ({ panels, width, height }) => {
  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      className="border rounded-lg shadow-md bg-gray-50"
    >
      {panels.map(panel => (
        <g key={panel.id}>
          <rect
            x={panel.x}
            y={panel.y}
            width={panel.rotated ? panel.height : panel.width}
            height={panel.rotated ? panel.width : panel.height}
            fill="#60a5fa"
            stroke="#2563eb"
            strokeWidth={2}
            rx={4}
          />
          <text
            x={panel.x + (panel.rotated ? panel.height : panel.width) / 2}
            y={panel.y + (panel.rotated ? panel.width : panel.height) / 2}
            fontSize={14}
            fill="#ffffff"
            textAnchor="middle"
            dominantBaseline="central"
          >
            {panel.id}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default NestingVisualizer;