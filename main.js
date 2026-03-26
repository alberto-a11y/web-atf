import { getSupabaseClient } from "./supabaseClient.js";

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function initYear() {
  const y = document.getElementById("y");
  if (y) y.textContent = String(new Date().getFullYear());
}

function initMenu() {
  const btn = document.querySelector(".menu-btn");
  const nav = document.getElementById("nav");
  if (!btn || !nav) return;

  function closeMenu() {
    btn.setAttribute("aria-expanded", "false");
    nav.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function openMenu() {
    btn.setAttribute("aria-expanded", "true");
    nav.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  btn.addEventListener("click", () => {
    const open = btn.getAttribute("aria-expanded") === "true";
    if (open) closeMenu();
    else openMenu();
  });

  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", closeMenu);
  });

  window.addEventListener(
    "resize",
    () => {
      if (window.matchMedia("(min-width: 769px)").matches) closeMenu();
    },
    { passive: true }
  );
}

function initHeroQuoteRotation() {
  const heroQuoteEl = document.getElementById("hero-quote-rotate");
  if (!heroQuoteEl || prefersReducedMotion) return;

  const heroQuoteTails = [
    "nosotros ayudamos a que llegue al mercado que la merece.",
    "nosotros potenciamos ese mensaje en cada eslabón hasta el mercado.",
    "nosotros potenciamos ese mensaje y lo llevamos hasta el consumidor.",
  ];

  let hqIndex = 0;
  const hqIntervalMs = 5500;
  const hqFadeMs = 520;

  window.setInterval(() => {
    heroQuoteEl.classList.add("hero-quote-rotate--hide");
    window.setTimeout(() => {
      hqIndex = (hqIndex + 1) % heroQuoteTails.length;
      heroQuoteEl.textContent = heroQuoteTails[hqIndex];
      heroQuoteEl.classList.remove("hero-quote-rotate--hide");
    }, hqFadeMs);
  }, hqIntervalMs);
}

function initExportAssistantBanner() {
  const exportAssistantEl = document.querySelector(".tactiq-banner__bottom[data-export-assistant]");
  if (!exportAssistantEl) return;

  if (prefersReducedMotion) {
    exportAssistantEl.classList.add("is-visible");
    exportAssistantEl.classList.remove("is-hidden");
    return;
  }

  window.setTimeout(() => {
    exportAssistantEl.classList.add("is-visible");
    exportAssistantEl.classList.remove("is-hidden");
  }, 2400);
}

function initScrollStorytelling() {
  if (prefersReducedMotion) return;

  const blocks = document.querySelectorAll("[data-story],[data-story-stagger]");
  if (!blocks.length) return;

  document.documentElement.classList.add("js-story-scroll");

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-story-visible");
        io.unobserve(entry.target);
      });
    },
    { root: null, rootMargin: "0px 0px -7% 0px", threshold: 0.04 }
  );

  blocks.forEach((el) => io.observe(el));
}

function initHomeSectionSnap() {
  if (!document.body.classList.contains("page-home")) return;
  if (window.matchMedia("(max-width: 900px)").matches) return;

  const sections = Array.from(
    document.querySelectorAll(".hero-text, .platform-section, .contact-cta")
  );
  if (sections.length < 2) return;

  const minWheelDelta = 8;
  const transitionMs = 760;
  let locked = false;

  const getActiveIndex = () => {
    const probeY = window.scrollY + window.innerHeight * 0.35;
    let activeIdx = 0;

    for (let i = 0; i < sections.length; i += 1) {
      if (probeY >= sections[i].offsetTop) activeIdx = i;
    }

    return activeIdx;
  };

  const goToSection = (nextIndex) => {
    const bounded = Math.max(0, Math.min(nextIndex, sections.length - 1));
    const headerOffset = Number.parseInt(
      getComputedStyle(document.documentElement).getPropertyValue("--header-h"),
      10
    ) || 0;
    // Mantiene una "zona de aire" superior en secciones internas
    // para que el encuadre del snap se vea equilibrado y consistente.
    const sectionTopInset = bounded > 0 ? Math.round(window.innerHeight * 0.06) : 0;
    const targetTop = Math.max(0, sections[bounded].offsetTop - headerOffset - sectionTopInset);

    locked = true;
    window.scrollTo({ top: targetTop, behavior: "smooth" });

    window.setTimeout(() => {
      locked = false;
    }, transitionMs);
  };

  window.addEventListener(
    "wheel",
    (event) => {
      if (locked) {
        event.preventDefault();
        return;
      }

      if (Math.abs(event.deltaY) < minWheelDelta) return;
      if (document.body.style.overflow === "hidden") return;

      const current = getActiveIndex();
      const next = event.deltaY > 0 ? current + 1 : current - 1;

      if (next === current || next < 0 || next >= sections.length) return;

      event.preventDefault();
      goToSection(next);
    },
    { passive: false }
  );
}

function initSupabaseDemoForm() {
  const form = document.querySelector(".tactiq-form");
  if (!form) return;

  const submitBtn = form.querySelector('button[type="submit"]');
  const baseSubmitText = submitBtn ? submitBtn.textContent : "Enviar";

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const supabase = getSupabaseClient();
    if (!supabase) {
      window.alert(
        "Falta configurar Supabase. Define VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY en un .env local."
      );
      return;
    }

    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || "").trim(),
      surname: String(formData.get("surname") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
      source_page: window.location.pathname || "tactiq.html",
    };

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";
    }

    const { error } = await supabase.from("demo_requests").insert(payload);

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = baseSubmitText;
    }

    if (error) {
      console.error("Supabase insert error:", error);
      window.alert("No se pudo enviar. Revisa la configuración de Supabase y permisos de la tabla.");
      return;
    }

    form.reset();
    window.alert("Gracias. Tu solicitud fue enviada.");
  });
}

initYear();
initMenu();
initHeroQuoteRotation();
initExportAssistantBanner();
initSupabaseDemoForm();
initScrollStorytelling();
