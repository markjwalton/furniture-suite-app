// FILE: /src/App.tsx

import { useState } from "react";
import WardrobeSVG from "./components/WardrobeSVG";
import PanelSidebar from "./components/PanelSidebar";
import { Panel } from "./components/WardrobeSVG";

function App() {
  const [panels, setPanels] = useState<Panel[]>([]);
  const [selectedPanelId, setSelectedPanelId] = useState<string | undefined>();
  const [currentX, setCurrentX] = useState<number>(50);
  const bayWidth = 900;
  const panelThickness = 18;
  const totalHeight = 2400;
  const fillerSize = 50;

  const selectedPanel = panels.find((p) => p.id === selectedPanelId);

  const applyPositionFromFloor = (panel: Panel): Panel => {
    if (typeof panel.positionFromFloor === "number") {
      return {
        ...panel,
        y: totalHeight - panel.positionFromFloor - panel.height,
      };
    }
    return panel;
  };

  const handleUpdatePanel = (updated: Panel) => {
    const patched = applyPositionFromFloor(updated);
    setPanels((prev) => prev.map((p) => (p.id === patched.id ? patched : p)));
  };

  const handleDeletePanel = (panelId: string) => {
    setPanels((prev) => prev.filter((p) => p.id !== panelId));
  };

  const addMainTallPanel = (side: "start" | "end") => {
    const usableHeight = totalHeight - 100;
    const x = side === "start" ? 50 : currentX;
    const id = `panel-main-${side}`;
    const panel: Panel = applyPositionFromFloor({
      id,
      label: `Main Tall ${side === "start" ? "Left" : "Right"}`,
      type: `main-${side}`,
      width: panelThickness,
      height: usableHeight,
      x,
      positionFromFloor: 50,
      grainDirection: 'vertical',
      color: '#B0C4DE',
    });
    setPanels((prev) =>
      side === "start" ? [panel, ...prev] : [...prev, panel]
    );
    if (side === "end") setCurrentX((prev) => prev + panelThickness);
  };

  const addFillers = () => {
    const wardrobeLeft = 50;
    const wardrobeRight = currentX;
    const wardrobeWidth = wardrobeRight - wardrobeLeft;
    const wallWidth = wardrobeWidth + fillerSize * 2;

    const fillerPanels: Panel[] = [
      applyPositionFromFloor({
        id: 'filler-left',
        label: 'Left Filler',
        type: 'filler-left',
        width: fillerSize,
        height: totalHeight - 100,
        x: wardrobeLeft - fillerSize,
        positionFromFloor: 0,
        color: '#aaa',
      }),
      applyPositionFromFloor({
        id: 'filler-right',
        label: 'Right Filler',
        type: 'filler-right',
        width: fillerSize,
        height: totalHeight - 100,
        x: wardrobeRight,
        positionFromFloor: 0,
        color: '#aaa',
      }),
      applyPositionFromFloor({
        id: 'filler-top',
        label: 'Top Filler',
        type: 'filler-top',
        width: wallWidth,
        height: panelThickness,
        x: wardrobeLeft - fillerSize,
        positionFromFloor: totalHeight - 50,
        color: '#aaa',
      }),
      applyPositionFromFloor({
        id: 'filler-bottom',
        label: 'Bottom Filler',
        type: 'filler-bottom',
        width: wallWidth,
        height: panelThickness,
        x: wardrobeLeft - fillerSize,
        positionFromFloor: 0,
        color: '#aaa',
      }),
    ];
    setPanels((prev) => [...prev, ...fillerPanels]);
  };

  const addBay = () => {
    const bayIndex = panels.filter((p) => p.type === 'bottom').length;
    const baseX = currentX;
    const topY = 50;
    const usableHeight = totalHeight - 100;

    const basePanel: Panel = applyPositionFromFloor({
      id: `panel-base-${bayIndex}`,
      label: `Base ${bayIndex + 1}`,
      type: 'bottom',
      width: bayWidth,
      height: panelThickness,
      x: baseX,
      positionFromFloor: 50,
      color: '#D3D3D3',
    });

    const topPanel: Panel = applyPositionFromFloor({
      id: `panel-top-${bayIndex}`,
      label: `Top ${bayIndex + 1}`,
      type: 'top',
      width: bayWidth - 40,
      height: panelThickness,
      x: baseX + 20,
      positionFromFloor: totalHeight - 50 - panelThickness,
      color: '#D3D3D3',
    });

    const backPanel: Panel = applyPositionFromFloor({
      id: `panel-back-${bayIndex}`,
      label: `Back ${bayIndex + 1}`,
      type: 'back',
      width: bayWidth + 16,
      height: usableHeight,
      x: baseX - 8,
      positionFromFloor: 50,
      color: '#E0E0E0',
      backInsetLeft: 8,
      backInsetRight: 8,
    });

    const intermediatePanel: Panel = applyPositionFromFloor({
      id: `panel-intermediate-${bayIndex}`,
      label: `Intermediate ${bayIndex + 1}`,
      type: 'intermediate',
      width: panelThickness,
      height: usableHeight,
      x: baseX + bayWidth,
      positionFromFloor: 50,
      color: '#B0C4DE',
    });

    setPanels((prev) => [...prev, basePanel, topPanel, backPanel, intermediatePanel]);
    setCurrentX(baseX + bayWidth + panelThickness);
  };

  const addShelfToBay = (bayIndex: number) => {
    const base = panels.find((p) => p.id === `panel-base-${bayIndex}`);
    const top = panels.find((p) => p.id === `panel-top-${bayIndex}`);
    if (!base || !top) return;

    const shelfCount = panels.filter((p) =>
      p.type === 'shelf' && p.id.startsWith(`panel-shelf-${bayIndex}`)
    ).length;

    const verticalSpace = base.y - (top.y + top.height);
    const shelfGap = verticalSpace / (shelfCount + 2);
    const shelfY = top.y + top.height + shelfGap * (shelfCount + 1);

    const newShelf: Panel = applyPositionFromFloor({
      id: `panel-shelf-${bayIndex}-${shelfCount}`,
      label: `Shelf ${bayIndex + 1}-${shelfCount + 1}`,
      type: 'shelf',
      width: base.width,
      height: panelThickness,
      x: base.x,
      positionFromFloor: totalHeight - shelfY - panelThickness,
      color: '#F4A261',
    });

    setPanels((prev) => [...prev, newShelf]);
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 p-4 bg-white">
        <h1 className="text-xl font-bold mb-4">Dynamic Wardrobe Builder</h1>
        <div className="mb-4 flex gap-2 flex-wrap">
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => addMainTallPanel("start")}>➕ Main Tall Start</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={addBay}>➕ Add Bay</button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded" onClick={() => addMainTallPanel("end")}>➕ Main Tall End</button>
          <button className="px-4 py-2 bg-yellow-600 text-black rounded" onClick={addFillers}>➕ Add Fillers</button>
          {[0, 1, 2].map((index) => (
            <button key={index} className="px-4 py-2 bg-green-600 text-white rounded" onClick={() => addShelfToBay(index)}>
              ➕ Shelf Bay {index + 1}
            </button>
          ))}
        </div>
        <div className="border rounded shadow overflow-auto h-[80vh]">
          <WardrobeSVG
            panels={panels}
            selectedPanelId={selectedPanelId}
            onSelectPanel={setSelectedPanelId}
          />
        </div>
      </div>

      {selectedPanel && (
        <PanelSidebar
          panel={selectedPanel}
          onUpdate={handleUpdatePanel}
          onDelete={handleDeletePanel}
        />
      )}
    </div>
  );
}

export default App;


