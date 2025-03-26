import { ConfigurationState, Panel } from '@/types/wardrobe';
import { calculateEdgingTape } from './calculateEdgingTape';
import { summarizeHardware } from './summarizeHardware';
import { generateMaterialList } from './generateMaterialList';

export interface QuoteSummary {
  panels: Panel[];
  edging: ReturnType<typeof calculateEdgingTape>;
  hardware: ReturnType<typeof summarizeHardware>;
  materials: ReturnType<typeof generateMaterialList>;
  labour: {
    workshopDays: number;
    installDays: number;
    projectManagementDays: number;
    deliveryCost: number;
    rates: {
      workshop: number;
      install: number;
      pm: number;
    };
    total: number;
  };
  totalCost: number;
}

export function generateQuoteSummary(
  config: ConfigurationState,
  panels: Panel[],
  options: {
    workshopDays: number;
    installDays: number;
    projectManagementDays: number;
    deliveryCost: number;
    rates: {
      workshop: number;
      install: number;
      pm: number;
    };
  }
): QuoteSummary {
  const edging = calculateEdgingTape(panels);
  const hardware = summarizeHardware(panels);
  const materials = generateMaterialList(panels);

  const labourTotal =
    options.workshopDays * options.rates.workshop +
    options.installDays * options.rates.install +
    options.projectManagementDays * options.rates.pm +
    options.deliveryCost;

  const materialCost = materials.reduce((sum, m) => sum + m.costPerUnit * m.quantity, 0);

  const totalCost = materialCost + labourTotal;

  return {
    panels,
    edging,
    hardware,
    materials,
    labour: {
      ...options,
      total: labourTotal,
    },
    totalCost,
  };
}