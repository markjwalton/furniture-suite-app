import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

function AddFillerPanel() {
  const [fillerLabel, setFillerLabel] = useState('');
  const [boardType, setBoardType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from('filler_panels').insert({
      filler_label: fillerLabel,
      filler_type: 'side_filler', // Default type for now
      original_width_mm: 100,
      original_height_mm: 2400,
      board_type: boardType,
      edge_banding: { top: false, bottom: true, left: true, right: false },
      scribe_needed: false,
      extra_scribe_mm: 50,
      fitting_offset_mm: 4,
    });

    setIsSubmitting(false);

    if (error) {
      console.error('Error adding filler panel:', error);
    } else {
      alert('Filler panel added successfully!');
      setFillerLabel('');
      setBoardType('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
      <div>
        <label className="block text-gray-700">Filler Label</label>
        <input
          type="text"
          value={fillerLabel}
          onChange={(e) => setFillerLabel(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700">Board Type</label>
        <input
          type="text"
          value={boardType}
          onChange={(e) => setBoardType(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : 'Add Filler Panel'}
      </button>
    </form>
  );
}

export default AddFillerPanel;
