import React, { useState } from 'react';
import { Square, RectangleVertical as Rectangle, Circle, Plus, Minus, Save } from 'lucide-react';

interface RoomDimensions {
  width: number;
  length: number;
  shape: 'square' | 'rectangle';
}

const SimpleRoomBuilder: React.FC = () => {
  const [dimensions, setDimensions] = useState<RoomDimensions>({
    width: 3000,
    length: 3000,
    shape: 'square'
  });

  const incrementSize = (dimension: 'width' | 'length', amount: number) => {
    setDimensions(prev => ({
      ...prev,
      [dimension]: Math.min(10000, Math.max(1000, prev[dimension] + amount))
    }));
    
    if (dimensions.shape === 'square') {
      setDimensions(prev => ({
        ...prev,
        length: prev.width
      }));
    }
  };

  const setShape = (shape: 'square' | 'rectangle') => {
    setDimensions(prev => ({
      ...prev,
      shape,
      length: shape === 'square' ? prev.width : prev.length
    }));
  };

  const saveDesign = () => {
    const design = {
      dimensions,
      timestamp: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(design, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'room-design.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Room Designer</h1>
      
      <div className="space-y-6">
        {/* Shape Selection */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Room Shape</label>
          <div className="flex gap-3">
            <button
              onClick={() => setShape('square')}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 ${
                dimensions.shape === 'square'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Square className="w-5 h-5" />
              <span>Square</span>
            </button>
            <button
              onClick={() => setShape('rectangle')}
              className={`flex-1 py-3 px-4 rounded-lg flex items-center justify-center gap-2 ${
                dimensions.shape === 'rectangle'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <Rectangle className="w-5 h-5" />
              <span>Rectangle</span>
            </button>
          </div>
        </div>

        {/* Width Control */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Width</label>
          <div className="flex items-center gap-3">
            <button
              onClick={() => incrementSize('width', -500)}
              className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600"
            >
              <Minus className="w-5 h-5" />
            </button>
            <div className="flex-1 text-center text-lg font-medium">
              {(dimensions.width / 1000).toFixed(1)}m
            </div>
            <button
              onClick={() => incrementSize('width', 500)}
              className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Length Control (only for rectangle) */}
        {dimensions.shape === 'rectangle' && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Length</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => incrementSize('length', -500)}
                className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600"
              >
                <Minus className="w-5 h-5" />
              </button>
              <div className="flex-1 text-center text-lg font-medium">
                {(dimensions.length / 1000).toFixed(1)}m
              </div>
              <button
                onClick={() => incrementSize('length', 500)}
                className="p-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Room Preview */}
        <div className="relative aspect-square w-full bg-gray-50 rounded-lg border-2 border-gray-200 p-4">
          <div
            className="bg-blue-100 border-2 border-blue-300 rounded-lg"
            style={{
              width: `${(dimensions.width / 10000) * 100}%`,
              height: `${(dimensions.length / 10000) * 100}%`,
              maxWidth: '100%',
              maxHeight: '100%',
              margin: 'auto',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-6 text-sm font-medium text-gray-600">
              {(dimensions.width / 1000).toFixed(1)}m
            </div>
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 text-sm font-medium text-gray-600">
              {(dimensions.length / 1000).toFixed(1)}m
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={saveDesign}
          className="w-full py-3 px-4 bg-green-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-green-600"
        >
          <Save className="w-5 h-5" />
          <span>Save Design</span>
        </button>
      </div>
    </div>
  );
};

export default SimpleRoomBuilder;