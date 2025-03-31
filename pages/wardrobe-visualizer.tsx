import { useEffect, useRef, useState } from 'react';
import { loadSmplrJs } from '@smplrspace/smplr-loader';

type Panel = {
  id: string;
  label: string;
  dimensions: {
    width: number;
    height: number;
    thickness: number;
  };
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
};

interface SmplrspaceViewerProps {
  spaceId: string;
  clientToken: string;
  panels: Panel[];
}

const SmplrspaceViewer = ({ spaceId, clientToken, panels }: SmplrspaceViewerProps) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const builderRef = useRef<any>(null);
  const [isViewerReady, setIsViewerReady] = useState(false);
  const addedPanelIdsRef = useRef<Set<string>>(new Set());

  console.log('🧩 SmplrspaceViewer mounted');
  console.log('📦 Panels received:', panels);

  useEffect(() => {
    let destroyed = false;

    const initializeEditor = async () => {
      try {
        const smplr = await loadSmplrJs();
        const Builder = smplr.Builder;
        console.log('🔌 Smplrspace JS loaded');

        if (!viewerRef.current || destroyed) return;

        const builderInstance = new Builder({
          container: viewerRef.current,
          spaceId,
          clientToken,
        });

        console.log('🛠️ Starting editor...');
        await builderInstance.startEditor();

        builderRef.current = builderInstance;
        console.log('✅ Editor ready');
        setIsViewerReady(true);
      } catch (error) {
        console.error('❌ Error initializing Smplrspace editor:', error);
      }
    };

    initializeEditor();

    return () => {
      destroyed = true;
      if (builderRef.current && typeof builderRef.current.destroy === 'function') {
        builderRef.current.destroy();
        builderRef.current = null;
        addedPanelIdsRef.current.clear();
      }
    };
  }, [spaceId, clientToken]);

  useEffect(() => {
    if (!builderRef.current || !isViewerReady) {
      console.log('⏳ Waiting for builderRef or editorReady...');
      return;
    }

    console.log('🎯 Injecting panels...');

    panels.forEach((panel) => {
      if (addedPanelIdsRef.current.has(panel.id)) return;

      try {
        const width = panel.dimensions.width / 1000;
        const height = panel.dimensions.height / 1000;
        const depth = panel.dimensions.thickness / 1000;

        console.log('🟩 Adding panel:', {
          id: panel.id,
          width,
          height,
          depth,
          position: { x: 1, y: 0, z: 1 },
        });

        builderRef.current.addObject({
          id: panel.id,
          type: 'custom',
          name: panel.label,
          position: { x: 1, y: 0, z: 1 },
          rotation: panel.rotation,
          scale: { x: 1, y: 1, z: 1 },
          components: {
            geometry: {
              primitive: 'box',
              dimensions: {
                width,
                height,
                depth,
              },
            },
            material: {
              color: '#00FF00',
            },
          },
          customProperties: {
            description: `Panel: ${panel.label}`,
          },
        });

        addedPanelIdsRef.current.add(panel.id);
      } catch (err) {
        console.error(`❌ Failed to add panel ${panel.id}:`, err);
      }
    });
  }, [isViewerReady, panels]);

  return <div ref={viewerRef} className="w-full h-full"></div>;
};

export default SmplrspaceViewer;

  