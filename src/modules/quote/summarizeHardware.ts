import { Panel } from '@/types/wardrobe';

export interface HardwareSummary {
  hinges: {
    quantity: number;
    costPerUnit: number;
    totalCost: number;
  };
  handles: {
    quantity: number;
    costPerUnit: number;
    totalCost: number;
  };
  drawerSlides: {
    quantity: number;
    costPerUnit: number;
    totalCost: number;
  };
  shelfPins: {
    quantity: number;
    costPerUnit: number;
    totalCost: number;
  };
  totalCost: number;
}

export function summarizeHardware(panels: Panel[]): HardwareSummary {
  const costs = {
    hinge: 8.50,
    handle: 12.00,
    drawerSlide: 25.00,
    shelfPin: 0.50,
  };

  const hingeCount = panels.filter(p => p.type === 'vertical').length * 2;
  const handleCount = panels.filter(p => p.type === 'drawer-front').length;
  const drawerSlideCount = handleCount * 2; // Two slides per drawer
  const shelfPinCount = panels.filter(p => p.type === 'shelf').length * 4;

  const summary: HardwareSummary = {
    hinges: {
      quantity: hingeCount,
      costPerUnit: costs.hinge,
      totalCost: hingeCount * costs.hinge,
    },
    handles: {
      quantity: handleCount,
      costPerUnit: costs.handle,
      totalCost: handleCount * costs.handle,
    },
    drawerSlides: {
      quantity: drawerSlideCount,
      costPerUnit: costs.drawerSlide,
      totalCost: drawerSlideCount * costs.drawerSlide,
    },
    shelfPins: {
      quantity: shelfPinCount,
      costPerUnit: costs.shelfPin,
      totalCost: shelfPinCount * costs.shelfPin,
    },
    totalCost: 0, // Calculated below
  };

  summary.totalCost = Object.values(summary)
    .filter(item => typeof item === 'object' && 'totalCost' in item)
    .reduce((sum, item) => sum + (item as any).totalCost, 0);

  return summary;
}