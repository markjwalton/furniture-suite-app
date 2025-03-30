import { supabase } from './supabaseClient'

export interface Panel {
  id?: string;
  project_id: string;
  name: string;
  width: number;
  height: number;
  material?: string;
  grain_direction?: string;
  edge_banding?: string;
}

// Create
export const createPanel = async (panel: Panel) => {
  const { data, error } = await supabase
    .from('panels')
    .insert([panel])
    .select();

  if (error) throw error;
  return data;
};

// Read
export const getPanelsByProject = async (project_id: string) => {
  const { data, error } = await supabase
    .from('panels')
    .select('*')
    .eq('project_id', project_id)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// Update
export const updatePanel = async (id: string, updates: Partial<Panel>) => {
  const { data, error } = await supabase
    .from('panels')
    .update({ ...updates, updated_at: new Date() })
    .eq('id', id)
    .select();

  if (error) throw error;
  return data;
};

// Delete
export const deletePanel = async (id: string) => {
  const { error } = await supabase
    .from('panels')
    .delete()
    .eq('id', id);

  if (error) throw error;
};
