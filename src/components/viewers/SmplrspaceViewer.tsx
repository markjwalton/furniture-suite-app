import { useEffect, useRef } from 'react';
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
  const spaceRef = useRef<any>(null);

  useEffect(() => {
    if (viewerRef.current && !spaceRef.current) {
      loadSmplrJs().then((smplr) => {
        spaceRef.current = new smplr.Space({
          container: viewerRef.current!,
          spaceId,
          clientToken,
        });
        spaceRef.current.startViewer({ preview: true });
      });
    }

    return () => {
      if (spaceRef.current && typeof spaceRef.current.destroy === 'function') {
        spaceRef.current.destroy();
        spaceRef.current = null;
      }
    };
  }, [spaceId, clientToken]);

  useEffect(() => {
    if (spaceRef.current && panels.length > 0) {
      panels.forEach((panel) => {
        spaceRef.current.addObject({
          id: panel.id,
          type: 'custom',
          name: panel.label,
          position: panel.position,
          rotation: panel.rotation,
          scale: { x: 1, y: 1, z: 1 },
          components: {
            geometry: {
              primitive: 'box',
              dimensions: panel.dimensions,
            },
            material: {
              color: '#FFCC00',
            },
          },
          customProperties: {
            description: `Panel: ${panel.label}`,
          },
        });
      });
    }
  }, [panels]);

  return <div ref={viewerRef} className="w-full h-full"></div>;
};

export default SmplrspaceViewer;


