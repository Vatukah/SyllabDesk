export default async function refresh_token(token, supabase) {
  const { data, error } = await supabase.auth.refreshSession({
    refresh_token: token,
  });

  if (error) {
    return { data: null, error: error };
  }

  return { data: data, error: null };
}
