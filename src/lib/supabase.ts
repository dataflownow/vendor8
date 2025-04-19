
import { createClient } from '@supabase/supabase-js';

// Get the Supabase URL and anon key from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a Supabase client if credentials are available
let supabaseClient;

if (supabaseUrl && supabaseAnonKey) {
  supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Create a mock client that returns appropriate responses
  supabaseClient = {
    auth: {
      signInWithOtp: async () => {
        console.warn('Supabase credentials not configured. Please connect to Supabase in the Lovable editor.');
        return { 
          error: { 
            message: 'Supabase not configured. Connect to Supabase in the Lovable editor.' 
          } 
        };
      }
    }
  };
  
  console.warn(
    'Supabase environment variables are missing. ' + 
    'To use authentication and database features, please connect your project to Supabase.'
  );
}

export const supabase = supabaseClient;
