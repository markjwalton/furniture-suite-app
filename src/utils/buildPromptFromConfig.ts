import { ConfigurationState } from "@/types/wardrobe"; // adjust path if needed

export interface PromptConfig {
  style?: string[];
  colors?: string[];
  roomType?: string;
  furniture?: string[];
  mood?: string;
  lighting?: string;
  additionalDetails?: string;
}

export function buildPromptFromConfig(config: PromptConfig | ConfigurationState): string {
  // Handle wardrobe configuration
  if ('numberOfSections' in config) {
    const sectionCount = config.numberOfSections;
    const material = config.materials.externalPanels;
    const drawerCount = config.drawers?.length || 0;
    const hasInternal = config.drawers?.some(d => !d.external);
    const installType = config.installType === "wall-to-wall" ? "wall-to-wall" : "open on one side";

    return `A modern fitted wardrobe, ${sectionCount} sections wide, installed ${installType}, 
in ${material.name} (${material.code}) with ${material.texture} texture. 
It includes ${drawerCount} drawers${drawerCount > 0 ? ` (${hasInternal ? "some internal" : "all external"})` : ""}, 
push-to-open or handle depending on section. 
Panel style is minimal, modern, matte finish, photographed in a softly lit room, clean studio backdrop.`;
  }

  // Handle interior design configuration
  const parts: string[] = [];
  
  if (config.roomType) {
    parts.push(`Create a ${config.roomType}`);
  }

  if (config.style?.length) {
    parts.push(`in ${config.style.join(' and ')} style`);
  }

  if (config.colors?.length) {
    const colorList = config.colors.join(', ');
    parts.push(`using a color palette of ${colorList}`);
  }

  if (config.furniture?.length) {
    const furnitureList = config.furniture.join(', ');
    parts.push(`featuring ${furnitureList}`);
  }

  if (config.mood) {
    parts.push(`with a ${config.mood} atmosphere`);
  }

  if (config.lighting) {
    parts.push(`with ${config.lighting} lighting`);
  }

  if (config.additionalDetails) {
    parts.push(config.additionalDetails);
  }

  let prompt = parts.join(' ');
  
  if (!prompt.endsWith('.')) {
    prompt += '.';
  }

  prompt += ' Make it photorealistic and professionally designed with attention to detail.';

  return prompt;
}

// Example usage:
/*
const interiorConfig: PromptConfig = {
  roomType: 'living room',
  style: ['modern', 'minimalist'],
  colors: ['warm gray', 'white', 'natural wood'],
  furniture: ['sectional sofa', 'coffee table', 'floor lamp'],
  mood: 'cozy and inviting',
  lighting: 'natural sunlight through large windows',
  additionalDetails: 'Include some indoor plants and abstract wall art'
};

const wardrobeConfig: ConfigurationState = {
  numberOfSections: 3,
  materials: {
    externalPanels: {
      name: 'White Oak',
      code: 'WO-101',
      texture: 'wood grain'
    }
  },
  drawers: [
    { external: true },
    { external: false }
  ],
  installType: 'wall-to-wall'
};

const interiorPrompt = buildPromptFromConfig(interiorConfig);
const wardrobePrompt = buildPromptFromConfig(wardrobeConfig);
*/