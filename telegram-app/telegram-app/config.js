// ===== Astra Parth Configuration =====

const CONFIG = {
  SUPABASE_URL: "https://urwuqeujgqrsjjvzfzir.supabase.co",

  SUPABASE_ANON_KEY:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyd3VxZXVqZ3Fyc2pqdnpmemlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1MzUzNDMsImV4cCI6MjEwNjExMTM0M30.OzqEyvkR8UDD4vWpILiD0ay3rF-7zo_IDSjgv5PiqO8",

  EDGE_FUNCTION:
    "https://urwuqeujgqrsjjvzfzir.supabase.co/functions/v1/super-endpoint"
};

// Supabase Client
const supabase = window.supabase.createClient(
  CONFIG.SUPABASE_URL,
  CONFIG.SUPABASE_ANON_KEY
);
