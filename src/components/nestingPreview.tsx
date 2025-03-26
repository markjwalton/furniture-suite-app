import React from 'react';
import { NestedResult } from '@/utils/nestPanels';

interface NestingPreviewProps {
  nestingResult: NestedResult;
}

const NestingPreview: React.FC<NestingPreviewProps> = ({ nestingResult }) => {
  const { nestedPanels, totalBoards } = nestingResult;
  const scaleFactor = 0.2; // adjust as needed for visibility

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Nesting Preview: {totalBoards} board(s) used</h2>
      {[...Array(totalBoards)].map((_, boardIdx) => (
        <div key={boardIdx} className="mb-4 border rounded p-2 shadow-sm">
          <div
            className="relative bg-gray-100"
            style={{
              width: 2800 * scaleFactor,
              height: 2070 * scaleFactor,
            }}
          >
            {nestedPanels
              .filter(p => p.boardNumber === boardIdx + 1)
              .map((panel, idx) => (
                <div
                  key={idx}
                  className="absolute border border-gray-500 bg-white"
                  style={{
                    left: panel.x * scaleFactor,
                    top: panel.y * scaleFactor,
                    width: panel.width * scaleFactor,
                    height: panel.height * scaleFactor,
                  }}
                  title={`${panel.id} (${panel.width} x ${panel.height}mm)`}
                >
                  <div className="text-xs text-center overflow-hidden">
                    {panel.id}
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NestingPreview;