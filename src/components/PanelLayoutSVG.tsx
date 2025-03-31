import React from 'react';

// A mock panel type
type Panel = {
  id: string;
  label: string;
  width: number; // in mm
  height: number; // in mm
  x: number; // position in mm
  y: number;
  color?: string;
};

interface PanelLayoutProps {
  panels: Panel[];
  scale?: number; // SVG scaling factor (default: 0.2 = 1:5)
}

const PanelLayoutSVG: React.FC<PanelLayoutProps> = ({ panels, scale = 0.2 }) => {
  const svgWidth = Math.max(...panels.map(p => p.x + p.width)) * scale + 50;
  const svgHeight = Math.max(...panels.map(p => p.y + p.height)) * scale + 50;

  return (
    <svg width={svgWidth} height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="bg-gray-50 border">
      {panels.map((panel) => (
        <g key={panel.id}>
          <rect
            x={panel.x * scale}
            y={panel.y * scale}
            width={panel.width * scale}
            height={panel.height * scale}
            fill={panel.color || '#ddd'}
            stroke="#333"
            strokeWidth={1}
          />
          <text
            x={(panel.x + panel.width / 2) * scale}
            y={(panel.y + panel.height / 2) * scale}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={12}
            fill="#000"
          >
            {panel.label}
          </text>
        </g>
      ))}
    </svg>
  );
};

export default PanelLayoutSVG;
