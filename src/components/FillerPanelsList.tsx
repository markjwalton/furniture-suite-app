import { useEffect, useState } from 'react';
import { supabase } from '../utils/supabaseClient';

function FillerPanelsList() {
  const [panels, setPanels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPanels = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('filler_panels').select('*');
      setLoading(false);

      if (error) {
        console.error('Error fetching panels:', error);
      } else {
        setPanels(data);
        console.log('Panels fetched:', data); // useful debugging clearly
      }
    };

    fetchPanels();
  }, []);

  if (loading) {
    return <div>Loading panels...</div>;
  }

  if (panels.length === 0) {
    return <div>No filler panels found in your database yet.</div>;
  }

  return (
    <ul>
      {panels.map((panel) => (
        <li key={panel.id}>{panel.filler_label}</li>
      ))}
    </ul>
  );
}

export default FillerPanelsList;


