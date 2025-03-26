import { Panel } from '@/types/wardrobe';

export interface NestedPanel extends Panel {
  x: number;
  y: number;
  boardNumber: number;
}

export interface NestedResult {
  nestedPanels: NestedPanel[];
  totalBoards: number;
}

interface Board {
  width: number;
  height: number;
  usedAreas: NestedPanel[];
}

// Standard board sizes
const BOARD_STANDARD = { width: 2800, height: 2070 };

export function nestPanels(panels: Panel[]): NestedResult {
  const boards: Board[] = [];
  let currentBoard: Board = { ...BOARD_STANDARD, usedAreas: [] };

  // Sort panels largest-to-smallest for better nesting efficiency
  const sortedPanels = [...panels].sort((a, b) => Math.max(b.width, b.height) - Math.max(a.width, a.height));

  sortedPanels.forEach((panel) => {
    let placed = false;

    for (let board of boards) {
      const position = findPosition(board, panel);
      if (position) {
        board.usedAreas.push({ ...panel, ...position, boardNumber: boards.indexOf(board) + 1 });
        placed = true;
        break;
      }
    }

    // If panel wasn't placed, start a new board
    if (!placed) {
      const position = findPosition(currentBoard, panel);
      if (!position) {
        boards.push(currentBoard);
        currentBoard = { ...BOARD_STANDARD, usedAreas: [] };
      }
      currentBoard.usedAreas.push({ ...panel, ...position!, boardNumber: boards.length + 1 });
    }
  });

  if (currentBoard.usedAreas.length > 0) boards.push(currentBoard);

  const nestedPanels = boards.flatMap(b => b.usedAreas);
  return {
    nestedPanels,
    totalBoards: boards.length
  };
}

function findPosition(board: Board, panel: Panel): { x: number; y: number } | null {
  // Very basic "first-fit" placement
  let x = 0, y = 0;
  for (let placedPanel of board.usedAreas) {
    x = Math.max(x, placedPanel.x + placedPanel.width);
    if (x + panel.width > board.width) {
      x = 0;
      y = Math.max(y, placedPanel.y + placedPanel.height);
    }
  }

  if (y + panel.height <= board.height) {
    return { x, y };
  }

  return null; // No suitable position
}