import React from 'react';
import { ConfigurationState } from '@/types/wardrobe';

interface WardrobeSVGProps {
  config: ConfigurationState;
  width?: number;
  height?: number;
  depth?: number;
  numberOfSections?: number;
  panelThickness?: number;
  fillers?: {
    top: { height: number };
    bottom: { height: number };
  };
  flooringCode?: string;
}

const WardrobeSVG: React.FC<WardrobeSVGProps> = ({
  config,
  width = 800,
  height = 600,
  depth = 600,
  numberOfSections = 3,
  panelThickness = 19,
  fillers = { top: { height: 0 }, bottom: { height: 0 } },
  flooringCode
}) => {
  const dimensions = config.dimensions || { width: 2400, height: 2200, depth: 600 };
  const sectionWidth = dimensions.width / numberOfSections;

  const scale = Math.min(width / dimensions.width, height / dimensions.height) * 0.9;
  const translateX = (width - dimensions.width * scale) / 2;
  const translateY = (height - dimensions.height * scale) / 2;

  return (
    <svg width={width} height={height} className="bg-gray-50 rounded-lg">
      <g transform={`translate(${translateX},${translateY}) scale(${scale})`}>
        <rect
          x={0}
          y={0}
          width={dimensions.width}
          height={dimensions.height}
          fill="#f8f8f8"
          stroke="#ccc"
        />

        {/* Sections */}
        {Array.from({ length: numberOfSections - 1 }).map((_, i) => (
          <line
            key={i}
            x1={(i + 1) * sectionWidth}
            y1={0}
            x2={(i + 1) * sectionWidth}
            y2={dimensions.height}
            stroke="#ddd"
          />
        ))}

        {/* Drawers */}
        {config.drawers.map((drawer, idx) => (
          <rect
            key={idx}
            x={drawer.external ? 0 : panelThickness}
            y={dimensions.height - (idx + 1) * 200}
            width={drawer.external ? dimensions.width : sectionWidth - panelThickness * 2}
            height={200}
            fill="#eaeaea"
            stroke="#ccc"
          />
        ))}

        {/* Optional flooring */}
        {flooringCode && (
          <rect
            x={-50}
            y={dimensions.height}
            width={dimensions.width + 100}
            height={100}
            fill="#ddd"
          />
        )}
      </g>
    </svg>
  );
};

export default WardrobeSVG;
