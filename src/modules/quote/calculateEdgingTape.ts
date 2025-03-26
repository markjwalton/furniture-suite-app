import { Panel } from '@/types/wardrobe';

export interface EdgeTapeCalculation {
  totalLength: number; // in meters
  breakdownByPanel: Array<{
    panelId: string;
    length: number;
    edges: ('top' | 'bottom' | 'left' | 'right')[];
  }>;
  costPerMeter: number;
  totalCost: number;
}

export function calculateEdgingTape(panels: Panel[]): EdgeTapeCalculation {
  const costPerMeter = 2.5; // Example cost in currency units
  const breakdown = panels.map(panel => {
    const edges: ('top' | 'bottom' | 'left' | 'right')[] = [];
    let length = 0;

    if (panel.edging.top) {
      edges.push('top');
      length += panel.width;
    }
    if (panel.edging.bottom) {
      edges.push('bottom');
      length += panel.width;
    }
    if (panel.edging.left) {
      edges.push('left');
      length += panel.height;
    }
    if (panel.edging.right) {
      edges.push('right');
      length += panel.height;
    }

    return {
      panelId: panel.id,
      length,
      edges,
    };
  });

  const totalLength = breakdown.reduce((sum, item) => sum + item.length, 0) / 1000; // Convert to meters
  const totalCost = totalLength * costPerMeter;

  return {
    totalLength,
    breakdownByPanel: breakdown,
    costPerMeter,
    totalCost,
  };
}