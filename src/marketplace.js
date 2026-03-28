import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

let supabase = null
try {
  if (SUPABASE_URL && SUPABASE_ANON_KEY &&
      !SUPABASE_URL.includes('YOUR_PROJECT') &&
      SUPABASE_ANON_KEY !== 'YOUR_SUPABASE_ANON_KEY') {
    supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  }
} catch (e) {
  console.warn('Supabase no configurado:', e.message)
}

// ─── Redirigir si ya tiene sesión ────────────────────────────
supabase?.auth.getSession().then(({ data: { session } }) => {
  if (session) window.location.href = '/marketplace-app.html'
})

// ─── Google OAuth ────────────────────────────────────────────
document.getElementById('btn-google')?.addEventListener('click', async () => {
  if (!supabase) { show('Supabase no está configurado.', 'error'); return }
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/marketplace-app.html` },
  })
  if (error) console.error('Google auth error:', error)
})

// ─── Magic link (email) ──────────────────────────────────────
const form   = document.getElementById('login-form')
const status = document.getElementById('login-status')

form?.addEventListener('submit', async (e) => {
  e.preventDefault()
  const email = form.email.value.trim()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    show('Ingresa un email válido.', 'error'); return
  }

  if (!supabase) { show('Supabase no está configurado.', 'error'); return }

  const btn = form.querySelector('button[type="submit"]')
  btn.disabled = true
  btn.textContent = 'Enviando enlace...'

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${window.location.origin}/marketplace-app.html` },
  })

  if (error) {
    show('Hubo un problema. Intenta de nuevo.', 'error')
  } else {
    show(`Enviamos un enlace a ${email}. Revisa tu bandeja.`, 'success')
    form.reset()
  }

  btn.disabled = false
  btn.textContent = 'Continuar con email →'
})

function show(msg, type) {
  status.textContent = msg
  status.className = `form-status ${type}`
}
