import { supabase } from './supabase/client';
import type { Database } from './supabase/client';

// ========== Supabase ==========

export const supabaseClient = supabase;

/**
 * A simple wrapper for a Supabase select query with error handling.
 * @param table The table to query.
 * @returns The data from the table, or null if an error occurred.
 */
export async function getFromSupabase<T extends keyof Database['public']['Tables']>(
  table: T,
  options?: {
    select?: string;
  }
) {
  try {
    const { data, error } = await supabaseClient.from(table).select(options?.select || '*');
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error(`Error fetching from Supabase table "${String(table)}":`, error);
    return null;
  }
}

// Submit to Supabase
export async function submitToSupabase(formData: { name: string; email: string; phone: string }) {
  const { data, error } = await supabase.from('leads').insert([formData]);
  return { data, error };
} 