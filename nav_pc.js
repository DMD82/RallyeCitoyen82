// ============================================================
// NAV.JS v2 — Navigation inter-pages
// Rallye Citoyen 2026 — dmd82.fr
// ============================================================

const NAV_PAGES = [
  { href: 'index.html',              icon: '🏠', label: 'Accueil',       id: 'index'              },
  { href: 'fil-rouge.html',          icon: '📋', label: 'Fil Rouge',     id: 'fil-rouge'          },
  { href: 'bonus-malus.html',        icon: '⚖️', label: 'Bonus / Malus', id: 'bonus-malus'        },
  { href: 'resultats.html',          icon: '📊', label: 'Résultats',     id: 'resultats'          },
  { href: 'classement.html',         icon: '🏆', label: 'Classement',    id: 'classement'         },
  { href: 'passages.html',           icon: '📍', label: 'Passages',      id: 'passages'           },
  { href: 'accueil-equipes.html',    icon: '👥', label: 'Accueil Éq.',   id: 'accueil-equipes'    },
  { href: 'accueil-partenaires.html',icon: '🤝', label: 'Accueil Part.', id: 'accueil-partenaires'},
  { href: 'admin.html',              icon: '⚙️', label: 'Admin',         id: 'admin'              },
];

function getCurrentPage() {
  const file = window.location.pathname.split('/').pop() || 'index.html';
  return file.replace('.html', '') || 'index';
}

function injectNav() {
  const currentPage = getCurrentPage();

  const style = document.createElement('style');
  style.textContent = `
    .gn-wrap {
      background: #1a2744;
      position: sticky; top: 0; z-index: 200;
      box-shadow: 0 2px 16px rgba(0,0,0,0.3);
    }
    .gn-top {
      display: flex; align-items: center; gap: 8px;
      padding: 8px 16px; max-width: 1200px; margin: 0 auto;
      border-bottom: 1px solid rgba(255,255,255,0.07);
    }
    .gn-logo { width: 30px; height: 30px; object-fit: contain; flex-shrink: 0; filter: drop-shadow(0 2px 6px rgba(0,0,0,0.3)); }
    .gn-brand { flex: 1; min-width: 0; }
    .gn-brand-sup { font-family: 'IBM Plex Mono', monospace; font-size: 9px; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: rgba(255,255,255,0.3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .gn-brand-title { font-family: 'Libre Baskerville', serif; font-weight: 700; font-size: 13px; color: #ffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .gn-date { font-family: 'IBM Plex Mono', monospace; font-size: 10px; font-weight: 600; letter-spacing: .06em; background: #b8932a; color: #1a2744; padding: 3px 10px; border-radius: 20px; white-space: nowrap; flex-shrink: 0; }
    .gn-ham { display: none; flex-direction: column; gap: 4px; background: none; border: 1px solid rgba(255,255,255,0.18); border-radius: 6px; padding: 6px 7px; cursor: pointer; flex-shrink: 0; transition: border-color .15s; }
    .gn-ham:hover { border-color: rgba(255,255,255,0.45); }
    .gn-ham span { display: block; width: 18px; height: 2px; background: rgba(255,255,255,0.65); border-radius: 1px; transition: all .22s; }
    .gn-ham.open span:nth-child(1) { transform: rotate(45deg) translate(4px,4px); }
    .gn-ham.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    .gn-ham.open span:nth-child(3) { transform: rotate(-45deg) translate(4px,-4px); }
    .gn-bar { display: flex; overflow-x: auto; scrollbar-width: none; max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .gn-bar::-webkit-scrollbar { display: none; }
    .gn-a { display: flex; align-items: center; gap: 5px; padding: 8px 10px; font-family: 'IBM Plex Mono', monospace; font-size: 10px; font-weight: 600; letter-spacing: .03em; text-transform: uppercase; color: rgba(255,255,255,0.4); text-decoration: none; border-bottom: 2px solid transparent; white-space: nowrap; flex-shrink: 0; transition: color .15s, border-color .15s; overflow: visible; }
    .gn-a:hover { color: rgba(255,255,255,0.75); }
    .gn-a.active { color: #ffffff; border-bottom-color: #b8932a; }
    .gn-a-icon { font-size: 13px; }
    .gn-mob { display: none; flex-direction: column; background: #13172a; max-height: 0; overflow: hidden; transition: max-height .3s ease; }
    .gn-mob.open { max-height: 500px; }
    .gn-mob-a { display: flex; align-items: center; gap: 12px; padding: 13px 20px; font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 600; letter-spacing: .05em; text-transform: uppercase; color: rgba(255,255,255,0.45); text-decoration: none; border-bottom: 1px solid rgba(255,255,255,0.05); transition: background .15s, color .15s; }
    .gn-mob-a:last-child { border-bottom: none; }
    .gn-mob-a:hover { background: rgba(255,255,255,0.04); color: rgba(255,255,255,0.8); }
    .gn-mob-a.active { color: #b8932a; background: rgba(184,147,42,0.07); }
    .gn-mob-icon { font-size: 16px; }
    @media (max-width: 860px) {
      .gn-ham { display: flex; }
      .gn-bar { display: none; }
      .gn-mob { display: flex; }
      .gn-date { display: none; }
    }
  `;
  document.head.appendChild(style);

  const barLinks = NAV_PAGES.map(p => {
    const active = currentPage === p.id;
    return `<a href="${p.href}" class="gn-a${active ? ' active' : ''}"><span class="gn-a-icon">${p.icon}</span>${p.label}</a>`;
  }).join('');

  const mobLinks = NAV_PAGES.map(p => {
    const active = currentPage === p.id;
    return `<a href="${p.href}" class="gn-mob-a${active ? ' active' : ''}"><span class="gn-mob-icon">${p.icon}</span>${p.label}</a>`;
  }).join('');

  const wrap = document.createElement('div');
  wrap.className = 'gn-wrap';
  wrap.innerHTML = `
    <div class="gn-top">
      <img src="LogoRC2026.png" class="gn-logo" alt="" onerror="this.style.display='none'">
      <div class="gn-brand">
        <div class="gn-brand-sup">DMD 82 · PC Organisation</div>
        <div class="gn-brand-title">Rallye Citoyen 2026</div>
      </div>
      <span class="gn-date">12 mai 2026</span>
      <button class="gn-ham" id="gnHam" onclick="gnToggle()" aria-label="Navigation">
        <span></span><span></span><span></span>
      </button>
    </div>
    <nav class="gn-bar">${barLinks}</nav>
    <div class="gn-mob" id="gnMob">${mobLinks}</div>
  `;

  document.body.insertBefore(wrap, document.body.firstChild);
}

function gnToggle() {
  document.getElementById('gnHam').classList.toggle('open');
  document.getElementById('gnMob').classList.toggle('open');
}

document.addEventListener('click', e => {
  const ham = document.getElementById('gnHam');
  const mob = document.getElementById('gnMob');
  if (!ham || !mob) return;
  if (!ham.contains(e.target) && !mob.contains(e.target)) {
    ham.classList.remove('open');
    mob.classList.remove('open');
  }
});

document.addEventListener('DOMContentLoaded', injectNav);
