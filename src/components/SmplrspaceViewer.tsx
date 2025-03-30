import React, { useRef, useEffect } from 'react';
import { loadSmplrJs, Smplr } from '@smplrspace/smplr-loader';

interface SmplrspaceViewerProps {
  layoutData?: object;
}

const SmplrspaceViewer: React.FC<SmplrspaceViewerProps> = ({ layoutData }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const spaceRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;

    loadSmplrJs().then((smplr: Smplr) => {
      if (mounted && containerRef.current) {
        const space = new smplr.Space({
          spaceId: 'spc_oqr0dz9b',
          clientToken: 'pub_7b84fd15640b4327a9b8c0ba86caa26a',
          containerId: containerRef.current.id,
        });

        space.startViewer({
          preview: true,
          onReady: () => {
            console.log('Viewer ready');
            if (layoutData) {
              console.log('Applying layout:', layoutData);
              // Add your layout application logic here
            }
          },
          onError: (error: Error) => console.error('Error starting viewer', error),
        });

        spaceRef.current = space;
      }
    }).catch(console.error);

    return () => {
      mounted = false;
      spaceRef.current?.remove();
    };
  }, [layoutData]);

  return (
    <div
      id="smplr-container"
      ref={containerRef}
      style={{ width: '100%', height: '600px', backgroundColor: '#f0f0f0' }}
    />
  );
};

export default SmplrspaceViewer;

