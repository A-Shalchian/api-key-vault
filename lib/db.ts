import { getSupabaseServer } from './supabase';

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
}

export interface ApiKey {
  id: number;
  user_id: string;
  name: string;
  encrypted_key: string;
  created_at: string;
}

// Define database schema for type safety
export interface Database {
  public: {
    Tables: {
      users: {
        Row: User;
        Insert: Omit<User, 'created_at'>;
        Update: Partial<Omit<User, 'id' | 'created_at'>>;
      };
      api_keys: {
        Row: ApiKey;
        Insert: Omit<ApiKey, 'id' | 'created_at'>;
        Update: Partial<Omit<ApiKey, 'id' | 'user_id' | 'created_at'>>;
      };
    };
  };
}

export const db = {
  users: {
    // Create a new user
    async create(data: { id: string; email: string; first_name: string; last_name: string }) {
      const supabase = getSupabaseServer();
      const { data: user, error } = await supabase
        .from('users')
        .insert(data)
        .select()
        .single<User>();

      if (error) throw error;
      if (!user) throw new Error('Failed to create user');
      return user;
    },

    // Get user by ID
    async getById(id: string) {
      const supabase = getSupabaseServer();
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', id)
        .single<User>();

      if (error) throw error;
      if (!data) throw new Error('User not found');
      return data;
    },

    // Get user by email
    async getByEmail(email: string) {
      const supabase = getSupabaseServer();
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single<User>();

      if (error) throw error;
      if (!data) throw new Error('User not found');
      return data;
    },

    // Update user
    async update(id: string, updateData: Partial<Pick<User, 'first_name' | 'last_name' | 'email'>>) {
      const supabase = getSupabaseServer();
      const { data: user, error } = await supabase
        .from('users')
        .update(updateData)
        .eq('id', id)
        .select()
        .single<User>();

      if (error) throw error;
      if (!user) throw new Error('Failed to update user');
      return user;
    },

    // Delete user
    async delete(id: string) {
      const supabase = getSupabaseServer();
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);

      if (error) throw error;
    },
  },

  apiKeys: {
    // Create a new API key
    async create(data: { user_id: string; name: string; encrypted_key: string }) {
      const supabase = getSupabaseServer();
      const { data: apiKey, error } = await supabase
        .from('api_keys')
        .insert(data)
        .select()
        .single<ApiKey>();

      if (error) throw error;
      if (!apiKey) throw new Error('Failed to create API key');
      return apiKey;
    },

    // Get all keys for a user
    async getByUserId(userId: string) {
      const supabase = getSupabaseServer();
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .returns<ApiKey[]>();

      if (error) throw error;
      return data || [];
    },

    // Get a specific key by name and user ID
    async getByName(userId: string, name: string): Promise<ApiKey | null> {
      const supabase = getSupabaseServer();
      const { data, error } = await supabase
        .from('api_keys')
        .select('*')
        .eq('user_id', userId)
        .eq('name', name)
        .single<ApiKey>();

      if (error) {
        if (error.code === 'PGRST116') return null; // Not found
        throw error;
      }
      if (!data) return null;
      return data;
    },

    // Update an existing key
    async update(id: number, updateData: { encrypted_key: string }) {
      const supabase = getSupabaseServer();
      const { data: apiKey, error } = await supabase
        .from('api_keys')
        .update(updateData)
        .eq('id', id)
        .select()
        .single<ApiKey>();

      if (error) throw error;
      if (!apiKey) throw new Error('Failed to update API key');
      return apiKey;
    },

    // Delete a key
    async delete(id: number, userId: string) {
      const supabase = getSupabaseServer();
      const { error } = await supabase
        .from('api_keys')
        .delete()
        .eq('id', id)
        .eq('user_id', userId); // Extra safety check

      if (error) throw error;
    },
  },
};
