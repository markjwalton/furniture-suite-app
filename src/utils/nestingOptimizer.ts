// src/utils/nestingOptimizer.ts
import { Panel } from '@/types/wardrobe';

interface Board {
  width: number;
  height: number;
  thickness: number;
  type: 'standard' | 'premium' | 'back';
}

interface NestedPanel extends Panel {
  x: number;
  y: number;
  rotated: boolean;
  boardIndex: number;
}

export interface NestingResult {
  nestedPanels: NestedPanel[];
  boardsUsed: number;
  boardType: 'standard' | 'premium' | 'back';
}

const BOARD_SIZES: Record<string, Board> = {
  standard: { width: 2800, height: 2070, thickness: 18, type: 'standard' },
  premium: { width: 2800, height: 2070, thickness: 19, type: 'premium' },
  back: { width: 2800, height: 2070, thickness: 8, type: 'back' },
};

export function optimizeNesting(panels: Panel[], boardType: 'standard' | 'premium' | 'back'): NestingResult {
  const board = BOARD_SIZES[boardType];
  const sortedPanels = [...panels].sort((a, b) => b.height - a.height || b.width - a.width);
  
  const nestedPanels: NestedPanel[] = [];
  let currentX = 0;
  let currentY = 0;
  let maxRowHeight = 0;
  let boardIndex = 0;

  sortedPanels.forEach(panel => {
    const fitsHorizontally = currentX + panel.width <= board.width;
    const fitsVertically = currentY + panel.height <= board.height;

    if (!fitsHorizontally) {
      currentX = 0;
      currentY += maxRowHeight;
      maxRowHeight = 0;
    }

    if (!fitsVertically || currentY + panel.height > board.height) {
      boardIndex += 1;
      currentX = 0;
      currentY = 0;
      maxRowHeight = 0;
    }

    nestedPanels.push({
      ...panel,
      x: currentX,
      y: currentY,
      rotated: false,
      boardIndex,
    });

    currentX += panel.width;
    maxRowHeight = Math.max(maxRowHeight, panel.height);
  });

  return {
    nestedPanels,
    boardsUsed: boardIndex + 1,
    boardType,
  };
}
