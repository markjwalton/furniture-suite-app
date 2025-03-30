import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

interface Panel {
  id: string;
  label: string;
  width: number;
  height: number;
  material: string;
}

const PanelList: React.FC = () => {
  const [panels, setPanels] = useState<Panel[]>([]);

  useEffect(() => {
    const fetchPanels = async () => {
      const { data, error } = await supabase.from('panels').select('*');
      if (error) {
        console.error('Error fetching panels:', error);
      } else {
        setPanels(data || []);
      }
    };

    fetchPanels();
  }, []);

  return (
    <div>
      <h2>Panel List</h2>
      <table>
        <thead>
          <tr>
            <th>Label</th>
            <th>Width (mm)</th>
            <th>Height (mm)</th>
            <th>Material</th>
          </tr>
        </thead>
        <tbody>
          {panels.map(panel => (
            <tr key={panel.id}>
              <td>{panel.label}</td>
              <td>{panel.width}</td>
              <td>{panel.height}</td>
              <td>{panel.material}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PanelList;