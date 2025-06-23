import { supabase } from './client';
import type { Database } from './client';

type TableName = keyof Database['public']['Tables'];

export async function insertData<T extends TableName>(
  table: T,
  data: Database['public']['Tables'][T]['Insert']
) {
  const { data: result, error } = await supabase
    .from(table)
    .insert(data)
    .select();

  if (error) {
    console.error(`Error inserting into ${table}:`, error);
    throw error;
  }

  return result;
}

export async function updateData<T extends TableName>(
  table: T,
  updates: Database['public']['Tables'][T]['Update'],
  column: keyof Database['public']['Tables'][T]['Row'],
  value: any
) {
  const { data, error } = await supabase
    .from(table)
    .update(updates)
    .eq(column as string, value)
    .select();

  if (error) {
    console.error(`Error updating ${table}:`, error);
    throw error;
  }

  return data;
}

export async function deleteData<T extends TableName>(
  table: T,
  column: keyof Database['public']['Tables'][T]['Row'],
  value: any
) {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq(column as string, value);

  if (error) {
    console.error(`Error deleting from ${table}:`, error);
    throw error;
  }

  return true;
}

export async function fetchData<T extends TableName>(
  table: T,
  columns: string = '*'
) {
  const { data, error } = await supabase
    .from(table)
    .select(columns);

  if (error) {
    console.error(`Error fetching from ${table}:`, error);
    throw error;
  }

  return data;
}
