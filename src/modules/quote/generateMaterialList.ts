import { Panel } from '@/types/wardrobe';

export interface MaterialSummary {
  code: string;
  name: string;
  quantity: number; // in square meters
  costPerUnit: number;
  totalCost: number;
  panels: string[]; // panel IDs using this material
}

export type MaterialList = MaterialSummary[];

export function generateMaterialList(panels: Panel[]): MaterialList {
  const materialMap = new Map<string, MaterialSummary>();

  panels.forEach(panel => {
    const area = (panel.width * panel.height) / 1000000; // Convert to square meters
    const materialCode = panel.material.code;

    if (!materialMap.has(materialCode)) {
      materialMap.set(materialCode, {
        code: materialCode,
        name: panel.material.name,
        quantity: 0,
        costPerUnit: panel.material.costPerUnit || 0,
        totalCost: 0,
        panels: [],
      });
    }

    const material = materialMap.get(materialCode)!;
    material.quantity += area;
    material.panels.push(panel.id);
    material.totalCost = material.quantity * material.costPerUnit;
  });

  return Array.from(materialMap.values());
}