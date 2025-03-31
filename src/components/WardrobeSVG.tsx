// FILE: /src/components/WardrobeSVG.tsx

import React from "react";

export type GrooveConfig = {
  inset: number;
  width: number;
  depth: number;
};

export type ScribePoint = {
  height: number;
  width: number;
};

export type Panel = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: string;
  grainDirection?: "vertical" | "horizontal";
  label?: string;
  color?: string;
  depth?: number;
  positionFromFloor?: number;
  insetFromLeft?: number;
  insetFromRight?: number;
  grooves?: {
    left?: GrooveConfig;
    right?: GrooveConfig;
    top?: GrooveConfig;
    bottom?: GrooveConfig;
  };
  edges?: {
    front?: boolean;
    back?: boolean;
    left?: boolean;
    right?: boolean;
  };
  boardType?: string;
  boardStyle?: string;
  boardThickness?: number;
  edgeBanding?: {
    type?: string;
    style?: string;
    color?: string;
    thickness?: number;
    edges?: {
      front?: boolean;
      back?: boolean;
      left?: boolean;
      right?: boolean;
    };
  };
  scribePoints?: ScribePoint[];
  snapToDefault?: boolean;
  backInsetLeft?: number;
  backInsetRight?: number;
};

interface WardrobeSVGProps {
  panels: Panel[];
  selectedPanelId?: string;
  onSelectPanel?: (panelId: string) => void;
}

const WardrobeSVG: React.FC<WardrobeSVGProps> = ({
  panels,
  selectedPanelId,
  onSelectPanel,
}) => {
  const grooveInset = 20;
  const grooveWidth = 9;

  // Sort to render backs first for layering
  const sortedPanels = [...panels].sort((a, b) => {
    if (a.type === 'back') return -1;
    if (b.type === 'back') return 1;
    return 0;
  });

  return (
    <svg width="100%" height="100%" viewBox="0 0 3000 2500" className="border">
      {sortedPanels.map((panel) => {
        const isSelected = selectedPanelId === panel.id;
        const isTall = panel.height > panel.width;

        const grooveX =
          panel.type === "left"
            ? panel.x + panel.width - grooveInset - grooveWidth
            : panel.type === "intermediate"
            ? panel.x + grooveInset
            : null;

        const renderScribedEdge = panel.scribePoints && panel.scribePoints.length >= 2;

        return (
          <g
            key={panel.id}
            onClick={() => onSelectPanel?.(panel.id)}
            className="cursor-pointer"
          >
            {/* Scribed filler shape */}
            {renderScribedEdge ? (
              <polygon
                fill={panel.color || "#e5e7eb"}
                stroke={isSelected ? "#3b82f6" : "#1f2937"}
                strokeWidth={isSelected ? 2 : 1}
                points={panel.scribePoints
                  .map((pt) => `${panel.x + pt.width},${panel.y + pt.height}`)
                  .join(" ") + ` ${panel.x},${panel.y + panel.height}`}
              />
            ) : (
              <rect
                x={panel.x}
                y={panel.y}
                width={panel.width}
                height={panel.height}
                fill={panel.color || "#e5e7eb"}
                stroke={isSelected ? "#3b82f6" : "#1f2937"}
                strokeWidth={isSelected ? 2 : 1}
              />
            )}

            {/* Groove marker */}
            {grooveX !== null && isTall && (
              <rect
                x={grooveX}
                y={panel.y}
                width={grooveWidth}
                height={panel.height}
                fill="#9ca3af"
              />
            )}

            {/* Grain direction */}
            {panel.grainDirection && (
              <text
                x={panel.x + panel.width / 2}
                y={panel.y + panel.height / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="28"
                fill="#374151"
                transform={
                  panel.grainDirection === "horizontal"
                    ? `rotate(-90, ${panel.x + panel.width / 2}, ${panel.y + panel.height / 2})`
                    : undefined
                }
              >
                ↓
              </text>
            )}

            {/* Label */}
            {panel.label && (
              <text
                x={panel.x + 12}
                y={panel.y + 32}
                fontSize="24"
                fill="#111827"
              >
                {panel.label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
};

export default WardrobeSVG;
