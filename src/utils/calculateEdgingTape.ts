import { Panel } from '@/types/wardrobe';

export interface EdgingSummary {
  material: string; // premium or standard
  length: number; // Total edging length (mm)
  requiredRolls: number; // Rounded to standard roll lengths
}

const ROLL_SIZES = [75000, 100000, 150000]; // mm (75m, 100m, 150m)

export function calculateEdgingTape(panels: Panel[]): EdgingSummary[] {
  const edgingUsage = {
    premium: 0,
    standard: 0,
  };

  panels.forEach((panel) => {
    const perimeterEdges = [
      panel.edging.top && panel.width,
      panel.edging.bottom && panel.width,
      panel.edging.left && panel.height,
      panel.edging.right && panel.height,
    ].filter(Boolean) as number[];

    const totalEdgeLength = perimeterEdges.reduce((sum, edge) => sum + edge, 0);

    const materialType = panel.material.code.startsWith('U') || panel.material.code.startsWith('W')
      ? 'standard'
      : 'premium';

    edgingUsage[materialType] += totalEdgeLength;
  });

  return Object.entries(edgingUsage).map(([material, length]) => {
    const requiredRoll = ROLL_SIZES.find(size => size >= length) || ROLL_SIZES[ROLL_SIZES.length - 1];
    return {
      material,
      length,
      requiredRolls: Math.ceil(length / requiredRoll),
    };
  });
}