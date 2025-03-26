import { Panel, PlacedPanel } from '../types/panels';

type Rect = {
  x: number;
  y: number;
  width: number;
  height: number;
};

// Implements the MaxRectangles nesting algorithm
export function maxRectanglesNest(
  panels: Panel[],
  boardWidth: number,
  boardHeight: number,
  allowRotation = true
): PlacedPanel[] {
  const freeRects: Rect[] = [{ x: 0, y: 0, width: boardWidth, height: boardHeight }];
  const placedPanels: PlacedPanel[] = [];

  // Sort panels by size (largest first)
  panels.sort((a, b) => b.height * b.width - a.height * a.width);

  panels.forEach(panel => {
    let bestRectIndex = -1;
    let bestScore = Infinity;
    let bestRect: Rect | null = null;
    let rotated = false;

    freeRects.forEach((rect, i) => {
      [false, allowRotation].forEach(isRotated => {
        const pw = isRotated ? panel.height : panel.width;
        const ph = isRotated ? panel.width : panel.height;

        if (pw <= rect.width && ph <= rect.height) {
          const score = rect.width * rect.height - pw * ph;

          if (score < bestScore) {
            bestScore = score;
            bestRect = rect;
            bestRectIndex = i;
            rotated = isRotated;
          }
        }
      });
    });

    if (bestRect) {
      const placed: PlacedPanel = {
        ...panel,
        rotated,
        x: bestRect.x,
        y: bestRect.y,
      };

      placedPanels.push(placed);

      const pw = rotated ? panel.height : panel.width;
      const ph = rotated ? panel.width : panel.height;

      const rightRect: Rect = {
        x: bestRect.x + pw,
        y: bestRect.y,
        width: bestRect.width - pw,
        height: ph,
      };

      const bottomRect: Rect = {
        x: bestRect.x,
        y: bestRect.y + ph,
        width: bestRect.width,
        height: bestRect.height - ph,
      };

      freeRects.splice(bestRectIndex, 1);

      if (rightRect.width > 0 && rightRect.height > 0) {
        freeRects.push(rightRect);
      }

      if (bottomRect.width > 0 && bottomRect.height > 0) {
        freeRects.push(bottomRect);
      }
    }
  });

  return placedPanels;
}