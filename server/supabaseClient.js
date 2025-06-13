import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: './server/.env.production' }); // 👈 hard-coded path just to debug

console.log("SUPABASE_URL (fallback test):", process.env.SUPABASE_URL);
// ✅ Ensure environment variables are present
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing Supabase environment variables.');
}





const supabase = createClient(supabaseUrl, supabaseKey);
export const supabaseService = createClient(supabaseUrl, supabaseServiceKey);

export default supabase;
