import React, { useEffect } from 'react';
import { loadSmplrJs } from '@smplrspace/smplr-loader';

export const FloorplanComponent = () => {
  useEffect(() => {
    loadSmplrJs()
      .then((smplr) => {
        const space = new smplr.Space({
          spaceId: 'spc_oqr0dz9b',
          clientToken: 'pub_7b84fd15640b4327a9b8c0ba86caa26a',
          containerId: 'floorplan-container', // matches div below
        });

        space.startViewer({
          preview: true,
          onReady: () => console.log('Viewer is ready'),
          onError: (error) => console.error('Could not start viewer', error),
        });
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div
      id="floorplan-container"
      style={{ width: '800px', height: '600px', background: '#f0f0f0' }}
    ></div>
  );
};

