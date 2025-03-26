import { Material } from '@/types/wardrobe';

export interface MaterialSwatch {
  name: string;
  code: string;
  preview: string;
  normal?: string;
  roughness?: string;
  costPerUnit?: number;
}

export type MaterialSwatchMap = Record<string, MaterialSwatch>;

export const materialSwatches: Record<string, string> = {
  // Existing materials
  W980_ST9: "/textures/W980_ST9.jpg",
  W980_SM: "/textures/W980_SM.jpg",
  W1000_ST9: "/textures/W1000_ST9.jpg",
  F058_ST2_v: "/textures/F058_ST2_v.jpg",
  F058_ST2_h: "/textures/F058_ST2_h.jpg",
  F274_ST9: "/textures/F274_ST9.jpg",
  H1330_ST10: "/textures/H1330 ST10 Vintage Santa Fe Oak.jpg",
  H1313_ST10: "/textures/H1313 ST10 Grey Brown Whiteriver Oak.jpg",
  U750_ST9: "/textures/U750 ST9 Taupe Grey.jpg",
  U780_ST9: "/textures/U780 ST9 Monument Grey.jpg",
  H3176: "/textures/H3176 Pewter Halifax Oak.jpg",
  H3178: "/textures/H3178 ST37 Black Glazed Halifax Oak.jpg",
  F812_ST9: "/textures/F812 ST9 White Levanto Marble.jpg",
  H812_ST9: "/textures/F812 ST9 White Levanto Marble.jpg",
  H1342_ST24: "/textures/H1342_ST24_H.jpg",
  H3736_ST9: "/textures/H3736_ST9_H.jpg",
  H3734_ST9: "/textures/H3734_ST9_H.jpg",

  // Flooring materials
  EPL140_ST54: "/textures/Flooring/EPL140 ST54 Narva Oak ClassicN.jpg",
  EPL141_ST47: "/textures/Flooring/EPL141 ST47 Olchon Oak white Classic.jpg",
  EPL142_ST47: "/textures/Flooring/EPL142 ST47 Sand beige Olchon Oak Classic.jpg",
  EPL143_ST49: "/textures/Flooring/EPL143 ST49 Cesena Oak white Classic.jpg",
  EPL144_ST47: "/textures/Flooring/EPL144 ST47 Olchon Oak honey Classic.jpg",
  EPL146_ST47: "/textures/Flooring/EPL146 ST47 Olchon Oak smoke Classic.jpg",
  EPL147_ST47: "/textures/Flooring/EPL147 ST47 Olchon Oak dark Classic.jpg",
  EPL149_ST49: "/textures/Flooring/EPL149 ST49 Cesena Oak nature Classic.jpg",
  EPL150_ST49: "/textures/Flooring/EPL150 ST49 Cesena Oak grey Classic.jpg",
  EPL153_ST50: "/textures/Flooring/EPL153 ST50 Asgil Oak white Classic.jpg",
  EPL154_ST50: "/textures/Flooring/EPL154 ST50 Asgil Oak light Classic.jpg",
  EPL156_ST50: "/textures/Flooring/EPL156 ST50 Asgil Oak honey Classic.jpg",
  EPL166_ST4: "/textures/Flooring/EPL166 ST4 Light Grey Chicago Concrete KingsizeN.jpg",
  EPL167_STF4: "/textures/Flooring/EPL167 STF4 Grey Sparkle Grain KingsizeN.jpg",
  EPL168_STF4: "/textures/Flooring/EPL168 STF4 White Chromix KingsizeN.jpg",
  EPL169_STF4: "/textures/Flooring/EPL169 STF4 Berdal Marble KingsizeN.jpg",
  EPL208_ST54: "/textures/Flooring/EPL208 ST54 Natural North Oak Classic N.jpg",
  EPC001_L8: "/textures/Flooring/EPC001 L8 Natural Waltham Oak Large4.jpg",
  EPC002_L8: "/textures/Flooring/EPC002 L8 White Waltham Oak Large4.jpg",
  EPC003_L7: "/textures/Flooring/EPC003 L7 Natural Clermont Oak Classic.jpg",
  EPC004: "/textures/Flooring/EPC004 Brown Clermont Oak Classic.jpg",
  EPC014_L7: "/textures/Flooring/EPC014 L7 Natural Waldeck Oak Kingsize4.jpg",
  EPC015_L7: "/textures/Flooring/EPC0015 L7 Light Waldeck Oak Kingsize4.jpg",
  EPC020_L7: "/textures/Flooring/EPC020 L7 Villanger Oak Classic.jpg",
  EPC021_L7: "/textures/Flooring/EPC021 L7 Coloured Villanger Oak Classic.jpg",
  
  // Additional flooring materials
  EPC029_STL7: "/textures/Flooring/EPC029 STL7 Calenberg Oak Classic.jpg",
  EPC030_STL7: "/textures/Flooring/EPC030 STL7 Light Bedollo Walnut Classic.jpg",
  EPC031_STL7: "/textures/Flooring/EPC031 STL7 Natural Berdal Oak Classic.jpg",
  EPC033_STL8: "/textures/Flooring/EPC033 STL8 Dark Tureni Walnut Classic.jpg",
  EPC034_STL0: "/textures/Flooring/EPC034 STL0 Melara Kingsize.jpg",
  EPC035_STL6: "/textures/Flooring/EPC035 STL6 Natural Vidora Oak Kingsize.jpg",
  EPC036_STL6: "/textures/Flooring/EPC036 STL6 Coloured Natural Vidora Oak Kingsize.jpg",
  EPC037_STL6: "/textures/Flooring/EPC037 STL6 Grey Natural Vidora Oak Kingsize.jpg",
  EPC040_STL8: "/textures/Flooring/EPC040 STL8 Aritao Oak Large.jpg",
  EPC041_STL8: "/textures/Flooring/EPC041 STL8 Natural Aritao Oak Large.jpg",
  EPC042_STL8: "/textures/Flooring/EPC042 STL8 Grey Aritao Oak Large.jpg",
  EPD003_STD5: "/textures/Flooring/EPD003 STD5 Sereda Oak Large.jpg",
  EPD005_STD5: "/textures/Flooring/EPD005 STD5 Brown Preston Oak Large.jpg",
  EPD006_STD5: "/textures/Flooring/EPD006 STD5 White Preston Oak Large.jpg",
  EPD007_STD5: "/textures/Flooring/EPD007 STD5 Darkbrown Preston Oak Large.jpg",
  EPD009_STD5: "/textures/Flooring/EPD009 STD5 Dark Preston Oak Large.jpg",
  EPD027_STD4: "/textures/Flooring/EPD027 STD4 Natural Waltham Oak Large.jpg",
  EPD028_D1: "/textures/Flooring/EPD028 D1 White Waltham Oak Large4.jpg",
  EPD033_STD4: "/textures/Flooring/EPD033 STD4 Pitaru Oak Large.jpg",
  EPD034_STD4: "/textures/Flooring/EPD034 STD4 Natural Berdal Oak Classic.jpg"
};

export async function loadMaterialSwatches(): Promise<MaterialSwatchMap> {
  try {
    const response = await fetch('/textures/index.json');
    if (!response.ok) {
      throw new Error('Failed to load material swatches');
    }
    const data = await response.json();
    return data.materials || {};
  } catch (error) {
    console.error('Error loading material swatches:', error);
    return {};
  }
}

export function getMaterialSwatch(code: string, swatches: MaterialSwatchMap): MaterialSwatch | null {
  return swatches[code] || null;
}

export function createMaterialFromSwatch(swatch: MaterialSwatch): Material {
  return {
    name: swatch.name,
    code: swatch.code,
    texture: 'wood grain', // Default texture type, can be made dynamic if needed
    costPerUnit: swatch.costPerUnit,
  };
}

export function getMaterialPreviewUrl(material: Material, swatches: MaterialSwatchMap): string | null {
  // First try to get the preview from the dynamic swatches
  const swatch = getMaterialSwatch(material.code, swatches);
  if (swatch?.preview) {
    return swatch.preview;
  }

  // Then check the static material swatches
  const staticUrl = materialSwatches[material.code];
  if (staticUrl) {
    return staticUrl;
  }

  // Try horizontal variant
  const horizontalCode = `${material.code}_H`;
  if (materialSwatches[horizontalCode]) {
    return materialSwatches[horizontalCode];
  }

  // If no preview is found, return null
  return null;
}