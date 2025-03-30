import { supabase } from '../supabaseClient';

export const getProjects = async () => {
  const { data, error } = await supabase.from('projects').select('*');
  if (error) throw error;
  return data;
};

export const createProject = async (project: { name: string; description?: string }) => {
  const { data, error } = await supabase.from('projects').insert([project]).select('*');
  if (error) throw error;
  return data?.[0];
};

export const updateProject = async (id: number, updates: object) => {
  const { data, error } = await supabase.from('projects').update(updates).eq('id', id).select('*');
  if (error) throw error;
  return data?.[0];
};

export const deleteProject = async (id: number) => {
  const { error } = await supabase.from('projects').delete().eq('id', id);
  if (error) throw error;
  return true;
};
