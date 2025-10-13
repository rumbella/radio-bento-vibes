import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ofpcfutxhhbseoqqpfuz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mcGNmdXR4aGhic2VvcXFwZnV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyOTQ4MDQsImV4cCI6MjA3NTg3MDgwNH0.XVTTarUx25V-O6RvlUgT4NKmU_O5aIDRlLbf-mULaZ0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);