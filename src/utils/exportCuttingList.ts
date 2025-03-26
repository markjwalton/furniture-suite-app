import { Panel } from '@/types/wardrobe';

interface Board {
  width: number;
  height: number;
  materialCode: string;
  panels: PanelPlacement[];
}

interface PanelPlacement {
  panel: Panel;
  x: number;
  y: number;
}

const STANDARD_BOARD = { width: 2800, height: 2070 };
const PREMIUM_BOARD = { width: 2800, height: 2070 }; // Adjust if different

export const nestPanels = (panels: Panel[]): Board[] => {
  const boards: Board[] = [];

  const sortedPanels = panels.sort((a, b) => (b.height * b.width) - (a.height * a.width));

  sortedPanels.forEach(panel => {
    let placed = false;

    for (const board of boards) {
      placed = placePanelOnBoard(board, panel);
      if (placed) break;
    }

    if (!placed) {
      const isPremium = panel.material.code.startsWith('P');
      const newBoard: Board = {
        width: isPremium ? PREMIUM_BOARD.width : STANDARD_BOARD.width,
        height: isPremium ? PREMIUM_BOARD.height : STANDARD_BOARD.height,
        materialCode: panel.material.code,
        panels: []
      };

      placePanelOnBoard(newBoard, panel);
      boards.push(newBoard);
    }
  });

  return boards;
};

const placePanelOnBoard = (board: Board, panel: Panel): boolean => {
  let cursorX = 0, cursorY = 0, maxRowHeight = 0;

  for (const placedPanel of board.panels) {
    cursorX += placedPanel.panel.width;

    if (cursorX + panel.width > board.width) {
      cursorX = 0;
      cursorY += maxRowHeight;
      maxRowHeight = 0;
    }

    maxRowHeight = Math.max(maxRowHeight, placedPanel.panel.height);
  }

  if (cursorY + panel.height > board.height) {
    return false; // No space on board
  }

  board.panels.push({ panel, x: cursorX, y: cursorY });
  return true;
};
