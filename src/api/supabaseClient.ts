// src/api/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Save a new wardrobe layout
export const saveLayout = async (userId: string, projectName: string, layoutData: object) => {
  const { data, error } = await supabase
    .from('wardrobe_layouts')
    .insert([{ user_id: userId, project_name: projectName, layout_data: layoutData }])
    .single();

  return { data, error };
};

// Load saved layouts for a user
export const loadLayouts = async (userId: string) => {
  const { data, error } = await supabase
    .from('wardrobe_layouts')
    .select('*')
    .eq('user_id', userId);

  return { data, error };
};
