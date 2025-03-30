import React, { useEffect, useRef } from 'react';
import { loadSmplrJs } from '@smplrspace/smplr-loader';
import { supabase } from '../utils/supabaseClient';

export const FloorplanComponent = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    loadSmplrJs().then(async (smplr) => {
      const space = new smplr.Space({
        spaceId: 'spc_oqr0dz9b',  // your actual Smplrspace ID
        clientToken: 'pub_7b84fd15640b4327a9b8c0ba86caa26a', // your actual token
        containerId: 'floorplan-container',
      });

      space.startViewer({
        preview: true,
        onReady: async () => {
          console.log('Viewer is ready');

          const { data: furnitureItems, error } = await supabase
            .from('furniture_items')
            .select('*');

          if (!error && furnitureItems) {
            furnitureItems.forEach((item) => {
              space.addObject({
                id: item.id,
                type: 'box',
                width: item.actual_width_mm,
                height: item.actual_height_mm,
                depth: item.actual_depth_mm,
                position: {
                  x: item.position_x_mm,
                  y: item.position_y_mm,
                },
                rotation: item.rotation_deg,
                material: 'wood', // or set dynamically
              });
            });
          } else {
            console.error('Error loading furniture:', error);
          }
        },
        onError: (error) => console.error('Could not start viewer', error),
      });
    });
  }, []);

  return (
    <div
      id="floorplan-container"
      ref={containerRef}
      style={{ width: '100%', height: '700px', background: '#f0f0f0' }}
    ></div>
  );
};
