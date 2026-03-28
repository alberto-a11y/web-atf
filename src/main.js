import { createClient } from '@supabase/supabase-js'

// ─── Supabase ────────────────────────────────────────────────
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

// ─── Nav scroll shadow ───────────────────────────────────────
const nav = document.getElementById('nav')
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 8
    ? '0 1px 12px rgba(0,0,0,0.06)'
    : 'none'
}, { passive: true })

// ─── Mobile menu toggle ──────────────────────────────────────
const hamburger = document.getElementById('nav-hamburger')
const mobileMenu = document.getElementById('mobile-menu')

hamburger?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('is-open')
  hamburger.setAttribute('aria-expanded', isOpen)
})

// Cerrar al hacer click en un link
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('is-open'))
})

// ─── Scroll reveal ───────────────────────────────────────────
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        revealObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
)

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el))

// ─── Contact form ─────────────────────────────────────────────
const form = document.getElementById('contact-form')
const submitBtn = document.getElementById('form-submit')
const statusEl = document.getElementById('form-status')

form?.addEventListener('submit', async (e) => {
  e.preventDefault()

  const data = Object.fromEntries(new FormData(form))

  // Validación básica
  if (!data.nombre?.trim() || !data.email?.trim()) {
    showStatus('Por favor completa nombre y email.', 'error')
    return
  }
  if (!isValidEmail(data.email)) {
    showStatus('Ingresa un email válido.', 'error')
    return
  }

  if (!supabase) {
    showStatus('Supabase no está configurado. Escríbenos a alberto@atfwines.com', 'error')
    return
  }

  submitBtn.disabled = true
  submitBtn.textContent = 'Enviando...'

  try {
    const { error } = await supabase
      .from('contactos')          // ← nombre de la tabla en Supabase
      .insert([{
        nombre:  data.nombre.trim(),
        email:   data.email.trim(),
        perfil:  data.perfil || null,
        mensaje: data.mensaje?.trim() || null,
      }])

    if (error) throw error

    showStatus('¡Mensaje enviado! Te contactaremos pronto.', 'success')
    form.reset()

  } catch (err) {
    console.error('Supabase error:', err)
    showStatus('Hubo un problema. Escríbenos a alberto@atfwines.com', 'error')
  } finally {
    submitBtn.disabled = false
    submitBtn.textContent = 'Enviar →'
  }
})

function showStatus(msg, type) {
  statusEl.textContent = msg
  statusEl.className = `form-status ${type}`
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
