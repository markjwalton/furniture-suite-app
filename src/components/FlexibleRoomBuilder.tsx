import React, { useState, useCallback, useEffect } from 'react';
import { Ruler, Grid2X2, Trash2, Save } from 'lucide-react';

type Point = { x: number; y: number };
type Measurement = { start: Point; end: Point; length: number };

const FlexibleRoomBuilder: React.FC = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [measurements, setMeasurements] = useState<Measurement[]>([]);
  const [showGrid, setShowGrid] = useState(true);
  const [measuring, setMeasuring] = useState(false);
  const [measureStart, setMeasureStart] = useState<Point | null>(null);
  const [svgSize, setSvgSize] = useState({ width: 800, height: 600 });
  
  const gridSize = 20;

  useEffect(() => {
    const updateSize = () => {
      const container = document.querySelector('.room-builder-container');
      if (!container) return;

      const width = container.clientWidth;
      setSvgSize({
        width,
        height: width * 0.75
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const snapToGrid = (point: Point): Point => ({
    x: Math.round(point.x / gridSize) * gridSize,
    y: Math.round(point.y / gridSize) * gridSize
  });

  const getPointFromEvent = (e: React.TouchEvent<SVGSVGElement> | React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const handleInteraction = useCallback((e: React.TouchEvent<SVGSVGElement> | React.MouseEvent<SVGSVGElement>) => {
    e.preventDefault();
    if ('button' in e && e.button !== 0) return;

    const point = getPointFromEvent(e);
    const snappedPoint = showGrid ? snapToGrid(point) : point;

    if (measuring) {
      if (!measureStart) {
        setMeasureStart(snappedPoint);
      } else {
        const length = Math.sqrt(
          Math.pow(snappedPoint.x - measureStart.x, 2) + 
          Math.pow(snappedPoint.y - measureStart.y, 2)
        );
        setMeasurements(prev => [...prev, {
          start: measureStart,
          end: snappedPoint,
          length: Math.round(length)
        }]);
        setMeasureStart(null);
        setMeasuring(false);
      }
    } else {
      setPoints(prev => [...prev, snappedPoint]);
    }
  }, [measuring, measureStart, showGrid]);

  const clearAll = () => {
    setPoints([]);
    setMeasurements([]);
    setMeasureStart(null);
    setMeasuring(false);
  };

  const saveDesign = () => {
    const design = {
      points,
      measurements,
      svgSize
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
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Room Designer</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowGrid(!showGrid)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 active:bg-gray-300 transition-colors"
            title={showGrid ? "Hide Grid" : "Show Grid"}
          >
            <Grid2X2 className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => {
              setMeasuring(!measuring);
              setMeasureStart(null);
            }}
            className={`p-2 rounded-lg transition-colors ${
              measuring 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-100 hover:bg-gray-200 active:bg-gray-300'
            }`}
            title="Measure Distance"
          >
            <Ruler className="w-5 h-5" />
          </button>
          <button
            onClick={clearAll}
            className="p-2 rounded-lg bg-red-100 hover:bg-red-200 active:bg-red-300 transition-colors"
            title="Clear All"
          >
            <Trash2 className="w-5 h-5 text-red-600" />
          </button>
          <button
            onClick={saveDesign}
            className="p-2 rounded-lg bg-green-100 hover:bg-green-200 active:bg-green-300 transition-colors"
            title="Save Design"
          >
            <Save className="w-5 h-5 text-green-600" />
          </button>
        </div>
      </div>

      <div className="room-builder-container relative border rounded-lg shadow-lg bg-white overflow-hidden">
        <svg
          width={svgSize.width}
          height={svgSize.height}
          onTouchStart={handleInteraction}
          onClick={handleInteraction}
          className="touch-none"
        >
          {showGrid && (
            <g>
              {Array.from({ length: Math.ceil(svgSize.width / gridSize) }).map((_, i) => (
                <line
                  key={`v${i}`}
                  x1={i * gridSize}
                  y1={0}
                  x2={i * gridSize}
                  y2={svgSize.height}
                  stroke="#f0f0f0"
                  strokeWidth={1}
                />
              ))}
              {Array.from({ length: Math.ceil(svgSize.height / gridSize) }).map((_, i) => (
                <line
                  key={`h${i}`}
                  x1={0}
                  y1={i * gridSize}
                  x2={svgSize.width}
                  y2={i * gridSize}
                  stroke="#f0f0f0"
                  strokeWidth={1}
                />
              ))}
            </g>
          )}

          {points.length > 1 && (
            <polygon
              points={points.map(p => `${p.x},${p.y}`).join(' ')}
              fill="#e5e7eb"
              stroke="#374151"
              strokeWidth={2}
              fillRule="evenodd"
            />
          )}

          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={4}
              fill="#2563eb"
              stroke="#ffffff"
              strokeWidth={2}
            />
          ))}

          {measurements.map((m, i) => (
            <g key={i}>
              <line
                x1={m.start.x}
                y1={m.start.y}
                x2={m.end.x}
                y2={m.end.y}
                stroke="#ef4444"
                strokeWidth={1}
                strokeDasharray="4"
              />
              <text
                x={(m.start.x + m.end.x) / 2}
                y={(m.start.y + m.end.y) / 2}
                fill="#ef4444"
                fontSize={12}
                textAnchor="middle"
                dy="-5"
              >
                {m.length}mm
              </text>
            </g>
          ))}

          {measuring && measureStart && (
            <circle
              cx={measureStart.x}
              cy={measureStart.y}
              r={4}
              fill="#ef4444"
            />
          )}
        </svg>
      </div>

      <div className="text-sm text-gray-600">
        {measuring ? (
          <p>Click to set measurement points</p>
        ) : (
          <p>Click to add points and create your room shape</p>
        )}
      </div>
    </div>
  );
};

export default FlexibleRoomBuilder;