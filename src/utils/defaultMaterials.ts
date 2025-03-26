import { Material, EdgeTape, BoardType } from '@/types/wardrobe';

// Standard board materials (18mm)
export const standardBoards: Material[] = [
  {
    name: 'White',
    code: 'W980_ST2',
    boardType: 'standard',
    thickness: 18,
    texture: 'smooth',
    boardWidth: 2800,
    boardHeight: 2070,
    costPerUnit: 45.00
  },
  {
    name: 'Light Grey',
    code: 'U708_ST2',
    boardType: 'standard',
    thickness: 18,
    texture: 'smooth',
    boardWidth: 2800,
    boardHeight: 2070,
    costPerUnit: 48.00
  },
  {
    name: 'Cream',
    code: 'W911_ST2',
    boardType: 'standard',
    thickness: 18,
    texture: 'smooth',
    boardWidth: 2800,
    boardHeight: 2070,
    costPerUnit: 48.00
  }
];

// Premium board materials (18mm)
export const premiumBoards: Material[] = [
  {
    name: 'Natural Halifax Oak',
    code: 'H1180_ST37',
    boardType: 'premium',
    thickness: 18,
    texture: 'wood grain',
    boardWidth: 2800,
    boardHeight: 2070,
    costPerUnit: 85.00
  },
  {
    name: 'Grey Vicenza Oak',
    code: 'H3158_ST19',
    boardType: 'premium',
    thickness: 18,
    texture: 'wood grain',
    boardWidth: 2800,
    boardHeight: 2070,
    costPerUnit: 82.00
  },
  {
    name: 'White Levanto Marble',
    code: 'F812_ST9',
    boardType: 'premium',
    thickness: 18,
    texture: 'stone',
    boardWidth: 2800,
    boardHeight: 2070,
    costPerUnit: 90.00
  }
];

// Back panel materials (8mm)
export const backPanels: Material[] = [
  {
    name: 'White Back Panel',
    code: 'W980_ST2_8MM',
    boardType: 'back',
    thickness: 8,
    texture: 'smooth',
    boardWidth: 2800,
    boardHeight: 2070,
    costPerUnit: 35.00
  },
  {
    name: 'Light Grey Back Panel',
    code: 'U708_ST2_8MM',
    boardType: 'back',
    thickness: 8,
    texture: 'smooth',
    boardWidth: 2800,
    boardHeight: 2070,
    costPerUnit: 38.00
  }
];

// Edge tapes
export const edgeTapes: Record<string, EdgeTape> = {
  standard: {
    name: 'Standard ABS',
    thickness: 0.8,
    rollLength: 75,
    costPerRoll: 12.50
  },
  premium: {
    name: 'Premium ABS',
    thickness: 1.0,
    rollLength: 75,
    costPerRoll: 18.50
  }
};

// Helper function to find material by code
export function findMaterialByCode(code: string): Material | undefined {
  return [...standardBoards, ...premiumBoards, ...backPanels]
    .find(material => material.code === code);
}

// Default material configuration
export const defaultMaterialConfig = {
  carcass: standardBoards[0], // White standard board
  externalPanels: premiumBoards[0], // Natural Halifax Oak
  backs: backPanels[0], // White back panel
  edgeTapeStandard: edgeTapes.standard,
  edgeTapePremium: edgeTapes.premium
};

// Export all available materials grouped by type
export const allMaterials = {
  standard: standardBoards,
  premium: premiumBoards,
  back: backPanels,
  edgeTapes
};