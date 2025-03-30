import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient';

function AddFurnitureItem() {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState('');
  const [actualWidth, setActualWidth] = useState(0);
  const [actualHeight, setActualHeight] = useState(0);
  const [actualDepth, setActualDepth] = useState(0);

  useEffect(() => {
    async function fetchTemplates() {
      const { data, error } = await supabase.from('furniture_templates').select('*');
      if (!error) setTemplates(data);
    }
    fetchTemplates();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('furniture_items').insert({
      project_id: null, // replace with valid project_id if available
      template_id: selectedTemplateId,
      actual_width_mm: actualWidth,
      actual_height_mm: actualHeight,
      actual_depth_mm: actualDepth,
    });

    if (error) {
      console.error('Error adding furniture:', error);
    } else {
      alert('Furniture item added successfully!');
      setActualWidth(0);
      setActualHeight(0);
      setActualDepth(0);
      setSelectedTemplateId('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <div>
        <label className="block text-gray-700 font-medium mb-1">
          Furniture Template
        </label>
        <select
          value={selectedTemplateId}
          onChange={(e) => setSelectedTemplateId(e.target.value)}
          className="w-full border rounded p-2"
          required
        >
          <option value="">Select template</option>
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.furniture_type}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Width (mm)
          </label>
          <input
            type="number"
            value={actualWidth}
            onChange={(e) => setActualWidth(Number(e.target.value))}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Height (mm)
          </label>
          <input
            type="number"
            value={actualHeight}
            onChange={(e) => setActualHeight(Number(e.target.value))}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Depth (mm)
          </label>
          <input
            type="number"
            value={actualDepth}
            onChange={(e) => setActualDepth(Number(e.target.value))}
            className="w-full border rounded p-2"
            required
          />
        </div>
      </div>

      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
        Add Furniture Item
      </button>
    </form>
  );
}

export default AddFurnitureItem;
