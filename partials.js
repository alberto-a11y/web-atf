const SVG_INSTAGRAM = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">
  <rect x="3" y="3" width="18" height="18" rx="4" />
  <circle cx="12" cy="12" r="3.5" />
  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
</svg>`;

const SVG_LINKEDIN = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
</svg>`;

const SVG_LINKEDIN_FILLED = `<svg class="fab-rail__icon" viewBox="0 0 24 24" aria-hidden="true">
  <path fill="currentColor" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
</svg>`;

const SVG_WHATSAPP = `<svg class="fab-rail__icon" viewBox="0 0 24 24" aria-hidden="true">
  <path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
</svg>`;

function renderHeader() {
  return `<header class="header">
  <div class="container header__inner">
    <a class="logo" href="index.html">ATF <span class="logo__wines">Wines</span></a>
    <div class="header__tools">
      <a class="header__icon" href="https://www.instagram.com/atfwines/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
        ${SVG_INSTAGRAM}
      </a>
      <a class="header__icon" href="https://www.linkedin.com/company/atf-wines/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
        ${SVG_LINKEDIN}
      </a>
      <button type="button" class="menu-btn" aria-controls="nav" aria-expanded="false" aria-label="Abrir menú">
        <span class="menu-btn__bar" aria-hidden="true"></span>
        <span class="menu-btn__bar" aria-hidden="true"></span>
        <span class="menu-btn__bar" aria-hidden="true"></span>
      </button>
    </div>
  </div>
</header>`;
}

function renderFabRail(modifier) {
  const cls = modifier ? `fab-rail ${modifier}` : "fab-rail";
  return `<aside class="${cls}" aria-label="Contacto y redes">
  <a class="fab-rail__btn" href="https://wa.me/message/2H26QZXMAV6DM1" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
    ${SVG_WHATSAPP}
  </a>
  <a class="fab-rail__btn" href="https://www.linkedin.com/company/atf-wines/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
    ${SVG_LINKEDIN_FILLED}
  </a>
</aside>`;
}

function renderFooter() {
  return `<footer class="footer" data-story>
  <div class="container footer__inner">
    <span class="footer__brand">ATF Wines</span>
    <span class="footer__legal">© <span id="y"></span> ATF Wines.</span>
  </div>
</footer>`;
}

function renderSiteDock(currentPage) {
  const cur = (page) => currentPage === page ? ' aria-current="page"' : "";
  return `<nav class="site-dock" aria-label="Acceso rápido">
  <a href="index.html" class="site-dock__link"${cur("home")}>Inicio</a>
  <a href="index.html#ejes" class="site-dock__link">Marketplace</a>
  <a href="tactiq.html" class="site-dock__link"${cur("tactiq")}>Tactiq</a>
  <a href="index.html#contacto" class="site-dock__link">Conversar</a>
</nav>`;
}

function inject(id, html) {
  const el = document.getElementById(id);
  if (!el) return;
  el.outerHTML = html;
}

export function initPartials() {
  const isHome = document.body.classList.contains("page-home");
  const isTactiq = document.body.classList.contains("page-tactiq");
  if (!isHome && !isTactiq) return;

  const currentPage = isHome ? "home" : "tactiq";
  const fabModifier = isTactiq ? "fab-rail--page" : "";

  inject("site-header", renderHeader());
  inject("site-fab-rail", renderFabRail(fabModifier));
  inject("site-footer", renderFooter());
  inject("site-dock", renderSiteDock(currentPage));
}
