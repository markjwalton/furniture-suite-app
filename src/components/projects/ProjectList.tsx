import React, { useEffect, useState } from 'react';
import { getProjects, createProject } from '../services/projectService';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleCreateProject = async () => {
    try {
      const newProject = await createProject({ name: 'New Project', description: 'Description here' });
      setProjects([...(newProject || []), ...projects]);
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div>
      <button onClick={handleCreateProject}>Add Project</button>
      <ul>
        {projects.map((proj: any) => (
          <li key={proj.id}>{proj.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
