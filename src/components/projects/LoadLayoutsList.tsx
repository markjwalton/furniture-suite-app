// src/components/LoadLayoutsList.tsx
import React, { useEffect, useState } from 'react';
import { loadLayouts } from '../api/supabaseClient';
import { useUser } from '../hooks/useUser';

type Layout = {
  id: string;
  project_name: string;
  layout_data: object;
};

type Props = {
  onLoad: (layoutData: object) => void;
};

const LoadLayoutsList: React.FC<Props> = ({ onLoad }) => {
  const { user } = useUser();
  const [layouts, setLayouts] = useState<Layout[]>([]);

  useEffect(() => {
    const fetchLayouts = async () => {
      if (!user) return;
      const { data, error } = await loadLayouts(user.id);
      if (!error && data) setLayouts(data);
    };

    fetchLayouts();
  }, [user]);

  return (
    <div>
      <h3>Saved Layouts</h3>
      <ul>
        {layouts.map(layout => (
          <li key={layout.id}>
            {layout.project_name}
            <button onClick={() => onLoad(layout.layout_data)}>Load</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoadLayoutsList;
