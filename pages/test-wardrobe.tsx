import { useState } from 'react';
import WardrobeSVG from '@/components/WardrobeSVG';
import { generateWardrobePanels } from '@/utils/generateWardrobePanels';

const TestWardrobe = () => {
  const [selectedPanelId, setSelectedPanelId] = useState<string | undefined>();

  const panels = generateWardrobePanels({
    totalWidth: 3000,
    totalHeight: 2400,
    bayCount: 3,
    shelvesPerBay: 2,
    panelThickness: 18,
    backThickness: 8,
    fillerSize: 50,
  });

  return (
    <div className="w-full h-screen p-4 bg-white">
      <h1 className="text-xl font-bold mb-4">Test Wardrobe Layout</h1>
      <div className="border rounded shadow overflow-auto h-[85vh]">
        <WardrobeSVG
          panels={panels}
          selectedPanelId={selectedPanelId}
          onSelectPanel={setSelectedPanelId}
        />
      </div>
      {selectedPanelId && (
        <div className="mt-4 text-sm text-gray-700">
          Selected Panel ID: <strong>{selectedPanelId}</strong>
        </div>
      )}
    </div>
  );
};

export default TestWardrobe;
