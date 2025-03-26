import { ConfigurationState, Panel, Material } from '@/types/wardrobe';

// Check if material grain direction applies
const getGrainDirection = (material: Material): string =>
  material.code.startsWith('U') || material.code.startsWith('W') ? 'N/A' : 'Vertical';

export function extractWardrobePanels(config: ConfigurationState): Panel[] {
  const panels: Panel[] = [];
  const dims = config.dimensions!;
  const panelThickness = 18; // standard thickness
  const backPanelThickness = 8; // backs
  const sectionWidth = dims.width / config.numberOfSections;

  // Helper to create panels easily
  const createPanel = (
    id: string,
    width: number,
    height: number,
    depth: number,
    material: Material,
    edging: { top?: boolean; bottom?: boolean; left?: boolean; right?: boolean },
    type: Panel['type']
  ): Panel => ({
    id,
    width,
    height,
    depth,
    material,
    edging,
    type,
  });

  const carcassMat = config.materials.internalPanels!;
  const externalMat = config.materials.externalPanels;

  // End panels (2 pcs)
  panels.push(createPanel('Left End Panel', panelThickness, dims.height, dims.depth, externalMat, { top: true, bottom: true, front: true }, 'vertical'));
  panels.push(createPanel('Right End Panel', panelThickness, dims.height, dims.depth, externalMat, { top: true, bottom: true, front: true }, 'vertical'));

  // Base and Top panels for each section
  for (let section = 0; section < config.numberOfSections; section++) {
    panels.push(createPanel(
      `Base Panel ${section + 1}`,
      sectionWidth - panelThickness,
      dims.depth,
      panelThickness,
      carcassMat,
      { front: true },
      'horizontal'
    ));

    panels.push(createPanel(
      `Top Panel ${section + 1}`,
      sectionWidth - panelThickness,
      dims.depth,
      panelThickness,
      carcassMat,
      { front: true },
      'horizontal'
    ));

    // Back Panels
    panels.push(createPanel(
      `Back Panel ${section + 1}`,
      sectionWidth - panelThickness,
      dims.height - panelThickness,
      backPanelThickness,
      carcassMat,
      {},
      'back'
    ));

    // Intermediate panels
    if (section < config.numberOfSections - 1) {
      panels.push(createPanel(
        `Intermediate Panel ${section + 1}`,
        panelThickness,
        dims.height,
        dims.depth,
        carcassMat,
        { front: true },
        'vertical'
      ));
    }
  }

  // Shelves (example: 2 per section)
  const shelfCount = 2;
  for (let section = 0; section < config.numberOfSections; section++) {
    for (let shelf = 0; shelf < shelfCount; shelf++) {
      panels.push(createPanel(
        `Shelf S${section + 1}-${shelf + 1}`,
        sectionWidth - (panelThickness * 2),
        dims.depth - backPanelThickness,
        panelThickness,
        carcassMat,
        { front: true },
        'shelf'
      ));
    }
  }

  // Doors (1 per section, external premium)
  for (let section = 0; section < config.numberOfSections; section++) {
    panels.push(createPanel(
      `Door ${section + 1}`,
      sectionWidth,
      dims.height,
      panelThickness,
      externalMat,
      { top: true, bottom: true, left: true, right: true },
      'door'
    ));
  }

  // Apply grain direction explicitly
  panels.forEach(panel => {
    panel.material.texture = getGrainDirection(panel.material);
  });

  return panels;
}
