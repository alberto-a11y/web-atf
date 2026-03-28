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

// Nav scroll
const nav = document.getElementById('nav')
window.addEventListener('scroll', () => {
  nav.style.boxShadow = window.scrollY > 8
    ? '0 1px 12px rgba(0,0,0,0.06)' : 'none'
}, { passive: true })

// Mobile menu
const hamburger = document.getElementById('nav-hamburger')
const mobileMenu = document.getElementById('mobile-menu')
hamburger?.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('is-open')
  hamburger.setAttribute('aria-expanded', isOpen)
})
mobileMenu?.querySelectorAll('a').forEach(l =>
  l.addEventListener('click', () => mobileMenu.classList.remove('is-open'))
)

// Scroll reveal
const observer = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target) }
  }),
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
)
document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el))

// Demo form → tabla 'demos' en Supabase
const form   = document.getElementById('demo-form')
const btn    = document.getElementById('demo-submit')
const status = document.getElementById('demo-status')

form?.addEventListener('submit', async (e) => {
  e.preventDefault()
  const data = Object.fromEntries(new FormData(form))

  if (!data.nombre?.trim() || !data.email?.trim()) {
    show('Por favor completa nombre y email.', 'error'); return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    show('Ingresa un email válido.', 'error'); return
  }

  if (!supabase) {
    show('Supabase no está configurado. Escríbenos a hola@atfwines.com', 'error')
    return
  }

  btn.disabled = true
  btn.textContent = 'Enviando...'

  try {
    const { error } = await supabase.from('demos').insert([{
      nombre:  data.nombre.trim(),
      email:   data.email.trim(),
      empresa: data.empresa?.trim() || null,
      mensaje: data.mensaje?.trim() || null,
    }])
    if (error) throw error
    show('¡Demo solicitada! Te contactaremos en 24 h.', 'success')
    form.reset()
  } catch (err) {
    console.error(err)
    show('Hubo un problema. Escríbenos a hola@atfwines.com', 'error')
  } finally {
    btn.disabled = false
    btn.textContent = 'Agendar demo →'
  }
})

function show(msg, type) {
  status.textContent = msg
  status.className = `form-status ${type}`
}
