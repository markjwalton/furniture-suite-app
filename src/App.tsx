import { useState, useEffect } from 'react';
import { supabase } from './api/supabaseClient';
import SmplrspaceViewer from './components/viewers/SmplrspaceViewer';
import PanelForm from './components/forms/PanelForm';

const App = () => {
  const [panels, setPanels] = useState([]);

  const fetchPanels = async () => {
    const { data, error } = await supabase
      .from('furniture_items')
      .select('panels')
      .eq('name', 'Test Furniture')
      .single();

    if (error) {
      console.error('Error fetching panels:', error);
      return;
    }

    setPanels(data.panels || []);
  };

  useEffect(() => {
    fetchPanels();
  }, []);

  return (
    <div className="flex w-screen h-screen">
      <div className="w-1/3 bg-gray-50 border-r border-gray-200 p-4 overflow-auto">
        <h1 className="text-xl font-bold mb-4">Wardrobe Configurator</h1>
        <PanelForm />
        <button onClick={fetchPanels} className="mt-4 bg-blue-500 text-white px-3 py-1 rounded">
          Refresh Panels
        </button>
        <div className="mt-6">
          <h2 className="text-lg font-bold mb-2">Panels List</h2>
          <ul>
            {panels.map((panel) => (
              <li key={panel.id}>
                {panel.label} - {panel.dimensions.width}x{panel.dimensions.height}x{panel.dimensions.thickness}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="w-2/3 h-full">
        <SmplrspaceViewer
          panels={panels}
          spaceId={import.meta.env.VITE_SMPLRSPACE_ID}
          clientToken={import.meta.env.VITE_SMPLRSPACE_CLIENT_TOKEN}
        />
      </div>
    </div>
  );
};

export default App;