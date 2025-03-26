export interface Material {
  name: string;
  code: string;
  texture: string;
  costPerUnit?: number;
}

export interface FlooringOption {
  code: string;
}

export interface Panel {
  id: string;
  width: number;
  height: number;
  depth: number;
  material: Material;
  edging: {
    top?: boolean;
    bottom?: boolean;
    left?: boolean;
    right?: boolean;
  };
  type: 'vertical' | 'horizontal' | 'shelf' | 'drawer-front';
}

export interface ConfigurationState {
  numberOfSections: number;
  materials: {
    externalPanels: Material;
    internalPanels?: Material;
  };
  drawers: Array<{ external: boolean }>;
  installType: 'wall-to-wall' | 'open-sided';
  dimensions?: {
    width: number;
    height: number;
    depth: number;
  };
  flooring?: FlooringOption;
}

// clearly defined and exported default configuration:
export const defaultConfig: ConfigurationState = {
  numberOfSections: 3,
  materials: {
    externalPanels: {
      name: "Standard White",
      code: "W980_ST9",
      texture: "Smooth",
      costPerUnit: 50,
    },
    internalPanels: {
      name: "Standard White",
      code: "W980_ST9",
      texture: "Smooth",
      costPerUnit: 30,
    },
  },
  drawers: [{ external: true }, { external: false }],
  installType: "wall-to-wall",
  dimensions: {
    width: 2400,
    height: 2200,
    depth: 600,
  },
  flooring: {
    code: "EPL140_ST54",
  },
};
