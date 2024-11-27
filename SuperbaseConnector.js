import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yhsegxujlwfyqdrgobwg.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inloc2VneHVqbHdmeXFkcmdvYndnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE0ODgxMjIsImV4cCI6MjA0NzA2NDEyMn0.2j0W40l9teHvOcHOqgkkl47meXU0nStfeO8442KPXlc'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase