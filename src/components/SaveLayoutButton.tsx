// src/components/SaveLayoutButton.tsx
import React from 'react';
import { saveLayout } from '../api/supabaseClient';
import { useUser } from '../hooks/useUser';

type Props = {
  layoutData: object;
};

const SaveLayoutButton: React.FC<Props> = ({ layoutData }) => {
  const { user } = useUser();

  const handleSave = async () => {
    if (!user) {
      alert('User not logged in');
      return;
    }

    const projectName = prompt('Enter a project name');
    if (!projectName) return;

    const { data, error } = await saveLayout(user.id, projectName, layoutData);
    if (error) {
      alert('Error saving layout');
    } else {
      alert(`Layout "${data.project_name}" saved successfully!`);
    }
  };

  return <button onClick={handleSave}>Save Layout</button>;
};

export default SaveLayoutButton;
