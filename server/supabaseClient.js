import { createClient } from "@supabase/supabase-js";

const { SUPABASE_KEY, SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } = process.env;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
export const supabaseService = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY
);

export default supabase;
