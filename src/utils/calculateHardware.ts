import { Panel } from '@/types/wardrobe';

export interface HardwareSummary {
  cams: number;
  pins: number;
  hinges: number;
  handles: number;
  pushToOpen: number;
}

const CAM_PIN_SPACING = 400; // mm, typical spacing for cam & pin
const HINGES_PER_DOOR = 3;   // standard count for typical doors

export function calculateHardware(panels: Panel[], useHandles: boolean = true): HardwareSummary {
  let cams = 0;
  let pins = 0;
  let hinges = 0;
  let handles = 0;
  let pushToOpen = 0;

  panels.forEach(panel => {
    // Calculate cams and pins (one set every 400mm along edges)
    const verticalEdges = panel.type === 'vertical' ? panel.height : 0;
    const horizontalEdges = panel.type === 'horizontal' ? panel.width : 0;

    cams += Math.ceil((verticalEdges + horizontalEdges) / CAM_PIN_SPACING);
    pins += Math.ceil((verticalEdges + horizontalEdges) / CAM_PIN_SPACING);

    // Hinges & Handles (for doors and drawer-fronts)
    if (panel.type === 'drawer-front') {
      handles += useHandles ? 1 : 0;
      pushToOpen += useHandles ? 0 : 1;
    }

    if (panel.type === 'door') {
      hinges += HINGES_PER_DOOR;
      handles += useHandles ? 1 : 0;
      pushToOpen += useHandles ? 0 : 1;
    }
  });

  return {
    cams,
    pins,
    hinges,
    handles,
    pushToOpen
  };
}
