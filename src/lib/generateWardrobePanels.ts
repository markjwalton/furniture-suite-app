type PositionedPanel = {
  id: string;
  label: string;
  width: number;
  height: number;
  x: number;
  y: number;
  color?: string;
  type?: string;
  grainDirection?: 'vertical' | 'horizontal';
};

interface WardrobeLayoutOptions {
  totalWidth: number; // full wall width in mm
  totalHeight: number; // full wall height in mm
  bayCount: number;
  shelvesPerBay?: number;
  panelThickness?: number; // e.g. 18
  backThickness?: number; // e.g. 8
  fillerSize?: number; // e.g. 100
}

export function generateWardrobePanels({
  totalWidth,
  totalHeight,
  bayCount,
  shelvesPerBay = 2,
  panelThickness = 18,
  backThickness = 8,
  fillerSize = 100,
}: WardrobeLayoutOptions): PositionedPanel[] {
  const panels: PositionedPanel[] = [];

  const usableWidth = totalWidth - fillerSize * 2;
  const usableHeight = totalHeight - fillerSize * 2;
  const bayWidth = usableWidth / bayCount;

  const baseY = totalHeight - fillerSize - panelThickness;
  const topY = fillerSize;

  // Left side panel
  panels.push({
    id: 'panel-side-L',
    label: 'Left Side',
    width: panelThickness,
    height: usableHeight,
    x: fillerSize,
    y: fillerSize,
    color: '#B0C4DE',
    type: 'left',
    grainDirection: 'vertical',
  });

  // Back panel
  panels.push({
    id: 'panel-back',
    label: 'Back Panel',
    width: usableWidth,
    height: usableHeight,
    x: fillerSize,
    y: fillerSize,
    color: '#E0E0E0',
    type: 'back',
    grainDirection: 'vertical',
  });

  for (let i = 0; i < bayCount; i++) {
    const xOffset = fillerSize + i * bayWidth;

    // Base panel per bay
    panels.push({
      id: `panel-base-${i}`,
      label: `Base ${i + 1}`,
      width: bayWidth,
      height: panelThickness,
      x: xOffset,
      y: baseY,
      color: '#D3D3D3',
      type: 'bottom',
      grainDirection: 'horizontal',
    });

    // Top panel per bay
    panels.push({
      id: `panel-top-${i}`,
      label: `Top ${i + 1}`,
      width: bayWidth,
      height: panelThickness,
      x: xOffset,
      y: topY,
      color: '#D3D3D3',
      type: 'top',
      grainDirection: 'horizontal',
    });

    // Fixed shelves
    const verticalSpace = usableHeight - panelThickness * 2;
    const shelfGap = verticalSpace / (shelvesPerBay + 1);

    for (let s = 0; s < shelvesPerBay; s++) {
      const shelfY = topY + panelThickness + shelfGap * (s + 1);

      panels.push({
        id: `panel-shelf-${i}-${s}`,
        label: `Shelf ${i + 1}-${s + 1}`,
        width: bayWidth,
        height: panelThickness,
        x: xOffset,
        y: shelfY,
        color: '#F4A261',
        type: 'shelf',
        grainDirection: 'horizontal',
      });
    }

    // Intermediate tall panel (not on final bay)
    if (i < bayCount - 1) {
      panels.push({
        id: `panel-intermediate-${i}`,
        label: `Intermediate ${i + 1}`,
        width: panelThickness,
        height: usableHeight,
        x: xOffset + bayWidth - panelThickness / 2,
        y: fillerSize,
        color: '#B0C4DE',
        type: 'intermediate',
        grainDirection: 'vertical',
      });
    }
  }

  // Right filler side panel
  panels.push({
    id: 'panel-side-R',
    label: 'Right Side',
    width: panelThickness,
    height: usableHeight,
    x: totalWidth - fillerSize - panelThickness,
    y: fillerSize,
    color: '#B0C4DE',
    type: 'right',
    grainDirection: 'vertical',
  });

  return panels;
}
  