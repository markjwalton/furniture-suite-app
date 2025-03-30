import { useEffect, useState } from 'react';
import { supabase } from './api/supabaseClient';
import AuthComponent from './components/AuthComponent';
import PanelFormModal from './modals/PanelFormModal';
import PanelList from './components/panels/PanelList';
import { Button } from '@/components/ui/button';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [panels, setPanels] = useState([]);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSavePanel = (panelData) => {
    setPanels((prev) => [...prev, { ...panelData, id: Date.now().toString() }]);
  };

  const handleRemovePanel = (panelId) => {
    setPanels((prev) => prev.filter((panel) => panel.id !== panelId));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <AuthComponent />
      </div>
    );
  }

  return (
    <div className="flex w-screen h-screen">
      <div className="w-1/3 bg-gray-50 border-r border-gray-200 p-4 overflow-auto">
        <h1 className="text-xl font-bold mb-4">Wardrobe Configurator</h1>
        <Button onClick={() => setModalOpen(true)}>+ Add Panel</Button>
        <PanelList panels={panels} onRemovePanel={handleRemovePanel} />
        <PanelFormModal open={modalOpen} onClose={() => setModalOpen(false)} onSave={handleSavePanel} />
        <Button className="mt-4" onClick={() => supabase.auth.signOut()}>
          Logout
        </Button>
      </div>
      <div className="w-2/3 h-full bg-white">
        {/* Smplrspace viewer temporarily removed until stable */}
      </div>
    </div>
  );
};

export default App;


