import { useState } from 'react';
import { supabase } from '../../api/supabaseClient';

const PanelForm = () => {
  const [label, setLabel] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [thickness, setThickness] = useState('');

  // Clearly defined states for position and rotation
  const [posX, setPosX] = useState('0');
  const [posY, setPosY] = useState('0');
  const [posZ, setPosZ] = useState('0');

  const [rotX, setRotX] = useState('0');
  const [rotY, setRotY] = useState('0');
  const [rotZ, setRotZ] = useState('0');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPanel = {
      id: Date.now().toString(),
      label,
      dimensions: {
        width: parseFloat(width),
        height: parseFloat(height),
        thickness: parseFloat(thickness),
      },
      position: {
        x: parseFloat(posX),
        y: parseFloat(posY),
        z: parseFloat(posZ),
      },
      rotation: {
        x: parseFloat(rotX),
        y: parseFloat(rotY),
        z: parseFloat(rotZ),
      },
    };

    const { data, error } = await supabase
      .from('furniture_items')
      .select('panels')
      .eq('id', 'test-item-001')
      .single();

    if (error) {
      console.error('Error fetching panels:', error);
      return;
    }

    const updatedPanels = data.panels ? [...data.panels, newPanel] : [newPanel];

    const { error: updateError } = await supabase
      .from('furniture_items')
      .update({ panels: updatedPanels })
      .eq('id', 'test-item-001');

    if (updateError) {
      console.error('Error updating panels:', updateError);
      return;
    }

    console.log('Panel saved:', newPanel);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Panel Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <input
        placeholder="Width"
        type="number"
        value={width}
        onChange={(e) => setWidth(e.target.value)}
      />
      <input
        placeholder="Height"
        type="number"
        value={height}
        onChange={(e) => setHeight(e.target.value)}
      />
      <input
        placeholder="Thickness"
        type="number"
        value={thickness}
        onChange={(e) => setThickness(e.target.value)}
      />

      <input
        placeholder="Position X"
        type="number"
        value={posX}
        onChange={(e) => setPosX(e.target.value)}
      />
      <input
        placeholder="Position Y"
        type="number"
        value={posY}
        onChange={(e) => setPosY(e.target.value)}
      />
      <input
        placeholder="Position Z"
        type="number"
        value={posZ}
        onChange={(e) => setPosZ(e.target.value)}
      />

      <input
        placeholder="Rotation X"
        type="number"
        value={rotX}
        onChange={(e) => setRotX(e.target.value)}
      />
      <input
        placeholder="Rotation Y"
        type="number"
        value={rotY}
        onChange={(e) => setRotY(e.target.value)}
      />
      <input
        placeholder="Rotation Z"
        type="number"
        value={rotZ}
        onChange={(e) => setRotZ(e.target.value)}
      />

      <button type="submit">Add Panel</button>
    </form>
  );
};

export default PanelForm;


