// src/adapters/SmplrspaceAdapter.ts

import { IFloorplanAPI, FloorplanData, LayoutState, FloorplanOptions, FloorplanEventType, ExportFormat } from '../interfaces/IFloorplanAPI';
import { Smplr } from '@smplrspace/smplr-loader';

export class SmplrspaceAdapter implements IFloorplanAPI {
  private smplr: any;
  private containerId!: string;

  async initialize(containerId: string, options?: FloorplanOptions): Promise<void> {
    const apiKey = import.meta.env.VITE_SMPLRSPACE_API_KEY;

    this.containerId = containerId;
    this.smplr = new Smplr({
      apiKey,
      container: document.getElementById(containerId),
      units: options?.units || 'metric',
      dimensions: {
        width: options?.width || 800,
        height: options?.height || 600,
      },
    });

    await this.smplr.init();
  }

  async loadFloorplan(planData: FloorplanData): Promise<void> {
    await this.smplr.clearScene();
    await this.smplr.loadRooms(planData.rooms);
    await this.smplr.loadFurniture(planData.furniture);
  }

  async getLayoutState(): Promise<LayoutState> {
    const furniture = await this.smplr.getFurniture();
    return { furniture };
  }

  async setLayoutState(state: LayoutState): Promise<void> {
    await this.smplr.setFurniture(state.furniture);
  }

  onEvent(eventType: FloorplanEventType, callback: (data: any) => void): void {
    this.smplr.on(eventType, callback);
  }

  async exportLayout(format: ExportFormat): Promise<string | Blob> {
    switch (format) {
      case 'json':
        return JSON.stringify(await this.getLayoutState());
      case 'svg':
        return await this.smplr.exportSVG();
      case 'png':
        return await this.smplr.exportPNG();
      case 'glb':
        return await this.smplr.exportGLB();
      default:
        throw new Error(`Unsupported export format: ${format}`);
    }
  }

  dispose(): void {
    this.smplr.destroy();
  }
}
