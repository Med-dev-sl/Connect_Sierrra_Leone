import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Admin credentials
    const adminEmail = 'admin@connectsl.com'
    const adminPassword = 'ConnectSL2024!'
    const adminName = 'Admin'

    // Check if admin already exists
    const { data: existingUsers } = await supabase.auth.admin.listUsers()
    const adminExists = existingUsers?.users?.find(u => u.email === adminEmail)

    if (adminExists) {
      // Check if user profile and role exist
      const { data: profile } = await supabase
        .from('users')
        .select('id')
        .eq('id', adminExists.id)
        .maybeSingle()

      if (!profile) {
        // Create user profile
        await supabase.from('users').insert({
          id: adminExists.id,
          email: adminEmail,
          name: adminName,
          role: 'admin',
          is_active: true,
        })
      }

      // Check if admin role exists
      const { data: roleExists } = await supabase
        .from('user_roles')
        .select('id')
        .eq('user_id', adminExists.id)
        .maybeSingle()

      if (!roleExists) {
        await supabase.from('user_roles').insert({
          user_id: adminExists.id,
          role: 'admin',
        })
      }

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Admin account already exists and is configured',
          credentials: {
            email: adminEmail,
            password: adminPassword,
          }
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Create admin user
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email: adminEmail,
      password: adminPassword,
      email_confirm: true,
      user_metadata: {
        name: adminName,
      },
    })

    if (createError) {
      throw createError
    }

    if (!newUser.user) {
      throw new Error('Failed to create admin user')
    }

    // Create user profile
    const { error: profileError } = await supabase.from('users').insert({
      id: newUser.user.id,
      email: adminEmail,
      name: adminName,
      role: 'admin',
      is_active: true,
    })

    if (profileError) {
      console.error('Profile error:', profileError)
    }

    // Assign admin role
    const { error: roleError } = await supabase.from('user_roles').insert({
      user_id: newUser.user.id,
      role: 'admin',
    })

    if (roleError) {
      console.error('Role error:', roleError)
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Admin account created successfully',
        credentials: {
          email: adminEmail,
          password: adminPassword,
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error: unknown) {
    console.error('Error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
