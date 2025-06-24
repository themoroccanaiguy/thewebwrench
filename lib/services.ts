import { supabase } from './supabase/client';
import type { Database } from './supabase/types';

// ========== Supabase ==========

// Export the typed Supabase client
export const supabaseClient = supabase;

/**
 * A simple wrapper for a Supabase select query with error handling.
 * @param table The table to query.
 * @returns The data from the table, or null if an error occurred.
 */
export async function getFromSupabase<T extends keyof Database['public']['Tables']>(
  table: T,
  options: {
    select?: string;
  } = {}
): Promise<Database['public']['Tables'][T]['Row'][] | null> {
  try {
    const { data, error } = await supabaseClient
      .from(table)
      .select(options?.select || '*')
      .returns<Database['public']['Tables'][T]['Row'][]>();
      
    if (error) {
      throw error;
    }
    return data;
  } catch (error) {
    console.error(`Error fetching from Supabase table "${String(table)}":`, error);
    return null;
  }
}

/**
 * Insert data into any table with proper typing
 */
export async function insertIntoTable<T extends keyof Database['public']['Tables']>(
  table: T,
  values: Database['public']['Tables'][T]['Insert']
) {
  try {
    const { data, error } = await supabaseClient
      .from(table)
      .insert(values)
      .select()
      .single();
      
    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error(`Error inserting into table "${String(table)}":`, error);
    return { data: null, error };
  }
}

// Submit to Supabase
export async function submitToSupabase(formData: { name: string; email: string; phone: string }) {
  return insertIntoTable('leads', formData);
}