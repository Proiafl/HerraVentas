import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://dtjbtpmxqijsjdsgixdn.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0amJ0cG14cWlqc2pkc2dpeGRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM5NTU2MjQsImV4cCI6MjA4OTUzMTYyNH0.M7d-SkMoXSgEoVGLDMRhweG986cbMmTwiAw9u24E5eg';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// URL base para invocar Edge Functions
export const FUNCTIONS_URL = `${SUPABASE_URL}/functions/v1`;
