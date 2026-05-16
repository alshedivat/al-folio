/* global React, ReactDOM, SITE,
          HomePage, ResearchPage, ProjectsPage, CVPage, BlogPage, ReadingPage, ContactPage,
          TweaksPanel, useTweaks, TweakSection, TweakColor, TweakRadio, TweakToggle, TweakSelect */
const { useState, useEffect } = React;
const D = window.SITE;

/* ---------- nav config ---------- */
const NAV = [
  { id: 'home',     label: 'home'     },
  { id: 'research', label: 'research' },
  { id: 'projects', label: 'projects' },
  { id: 'cv',       label: 'cv'       },
  { sep: true },
  { id: 'blog',     label: 'blog'     },
  { id: 'reading',  label: 'reading'  },
  { id: 'contact',  label: 'contact'  },
];

const PAGES = {
  home:     HomePage,
  research: ResearchPage,
  projects: ProjectsPage,
  cv:       CVPage,
  blog:     BlogPage,
  reading:  ReadingPage,
  contact:  ContactPage,
};

/* ---------- accent derivation ---------- */
const ACCENT_SOFT = {
  '#b06a2a': '#e8c69a',  /* amber */
  '#3a5a8a': '#c4d2e6',  /* ink   */
  '#5a7a4a': '#c8d6b8',  /* sage  */
  '#9a3a3a': '#dfb4b0',  /* rouge */
};
const hexToRgba = (hex, a) => {
  const h = hex.replace('#', '');
  const r = parseInt(h.substr(0,2), 16), g = parseInt(h.substr(2,2), 16), b = parseInt(h.substr(4,2), 16);
  return `rgba(${r},${g},${b},${a})`;
};

/* ---------- font config ---------- */
const NAME_FONTS = {
  'bodoni':   "'Bodoni Moda', 'Didot', 'Times New Roman', serif",
  'newsread': "'Newsreader', 'Source Serif 4', Georgia, serif",
  'instr':    "'Instrument Serif', Georgia, 'Times New Roman', serif",
  'corm':     "'Cormorant Garamond', Georgia, serif",
  'libre':    "'Libre Caslon Display', 'Times New Roman', serif",
};
const NAME_FONT_LABEL = {
  'bodoni': 'Bodoni',
  'newsread': 'Newsreader',
  'instr': 'Instrument',
  'corm': 'Cormorant',
  'libre': 'Caslon',
};

/* ---------- hash router ---------- */
function useHashRoute() {
  const get = () => {
    const h = (window.location.hash || '').replace(/^#/, '').trim();
    return PAGES[h] ? h : 'home';
  };
  const [route, setRoute] = useState(get());
  useEffect(() => {
    const onChange = () => {
      setRoute(get());
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  const go = (id) => { window.location.hash = (id === 'home' ? '' : id); };
  return [route, go];
}

/* ---------- app ---------- */
function App() {
  const [t, setTweak] = useTweaks(/*EDITMODE-BEGIN*/{
    "accent": "#b06a2a",
    "nameFont": "bodoni",
    "body": "serif",
    "density": "comfortable",
    "showPhoto": true,
    "italicLast": true
  }/*EDITMODE-END*/);

  const [route, go] = useHashRoute();

  /* apply tokens */
  useEffect(() => {
    const hex = t.accent || '#b06a2a';
    const soft = ACCENT_SOFT[hex] || hexToRgba(hex, 0.35);
    document.documentElement.style.setProperty('--accent', hex);
    document.documentElement.style.setProperty('--accent-soft', soft);
    document.documentElement.style.setProperty('--accent-tint', hexToRgba(hex, 0.08));
    document.documentElement.dataset.density = t.density;
    document.documentElement.dataset.body = t.body;
    document.documentElement.style.setProperty('--display', NAME_FONTS[t.nameFont] || NAME_FONTS.bodoni);
  }, [t.accent, t.density, t.body, t.nameFont]);

  const Page = PAGES[route] || HomePage;

  return (
    <div className="shell">
      <Topbar route={route} go={go} />
      <Hero showPhoto={t.showPhoto} italicLast={t.italicLast} compact={route !== 'home'} />
      {route === 'home' && <MetaStrip />}

      <Page go={go} />

      <Footer />
      <Tweaks t={t} setTweak={setTweak} />
    </div>
  );
}

function Topbar({ route, go }) {
  return (
    <nav className="topbar">
      <a className="brand-mark" href="#home" onClick={(e) => { e.preventDefault(); go('home'); }}>
        <span className="slash">/</span>wl
      </a>
      <span className="nav-group">
        {NAV.map((item, i) =>
          item.sep
            ? <span className="nav-sep" key={'sep'+i}>|</span>
            : <a className={`nav-link ${route === item.id ? 'active' : ''}`}
                 key={item.id}
                 href={'#' + (item.id === 'home' ? '' : item.id)}
                 onClick={(e) => { e.preventDefault(); go(item.id); }}>
                {item.label}
              </a>
        )}
      </span>
      <span className="topbar-spacer" />
      <span className="topbar-meta">millburn, nj · est. 2007</span>
    </nav>
  );
}

function Hero({ showPhoto, italicLast, compact }) {
  return (
    <header className={`hero ${showPhoto ? '' : 'no-photo'} ${compact ? 'hero-compact' : ''}`}>
      <div className={`hero-photo ${showPhoto ? '' : 'hidden'}`}>
        <img src="assets/pfp.png" alt="Wenhao Lu" />
      </div>
      <div className="hero-info">
        <h1 className="hero-name">
          <span className="last">Wenhao</span>
          <span className={italicLast ? 'accent' : 'last'}>Lu</span>
          {!compact && <span className="pronounce">{D.pronounce}</span>}
        </h1>
        <div className="hero-role">
          <span className="dot" />
          <span>{D.role}</span>
          <span className="pipe">|</span>
          <span className="hero-affil">{D.affil}</span>
        </div>
      </div>
    </header>
  );
}

function MetaStrip() {
  return (
    <div className="meta-strip">
      <span className="meta-item"><span className="meta-key">loc</span> {D.location}</span>
      <span className="meta-item"><span className="meta-key">mail</span> <a href={`mailto:${D.email}`}>{D.email}</a></span>
      <span className="meta-item"><span className="meta-key">scholar</span> <a href={`https://scholar.google.com/citations?user=${D.scholar}`}>profile</a></span>
      <span className="meta-item"><span className="meta-key">git</span> <a href={`https://github.com/${D.github}`}>{D.github}</a></span>
      <span className="meta-item"><span className="meta-key">in</span> <a href={`https://www.linkedin.com/in/${D.linkedin}`}>{D.linkedin}</a></span>
    </div>
  );
}

function Footer() {
  return (
    <footer className="foot">
      <div>
        <a href={`https://github.com/${D.github}`}>github</a>
        <a href={`https://scholar.google.com/citations?user=${D.scholar}`}>scholar</a>
        <a href={`https://www.linkedin.com/in/${D.linkedin}`}>linkedin</a>
        <a href={`https://instagram.com/${D.instagram}`}>instagram</a>
      </div>
      <div className="foot-right">© 2026 · powered by curiosity &amp; black coffee</div>
    </footer>
  );
}

function Tweaks({ t, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Accent">
        <TweakColor
          label="color"
          value={t.accent}
          options={['#b06a2a', '#3a5a8a', '#5a7a4a', '#9a3a3a']}
          onChange={v => setTweak('accent', v)}
        />
      </TweakSection>
      <TweakSection label="Type">
        <TweakSelect
          label="name font"
          value={t.nameFont}
          options={Object.keys(NAME_FONT_LABEL).map(v => ({ value: v, label: NAME_FONT_LABEL[v] }))}
          onChange={v => setTweak('nameFont', v)}
        />
        <TweakRadio
          label="body"
          value={t.body}
          options={[
            { value: 'serif', label: 'Serif' },
            { value: 'sans',  label: 'Sans' },
          ]}
          onChange={v => setTweak('body', v)}
        />
        <TweakToggle
          label="italicize 'Lu'"
          value={t.italicLast}
          onChange={v => setTweak('italicLast', v)}
        />
      </TweakSection>
      <TweakSection label="Layout">
        <TweakRadio
          label="density"
          value={t.density}
          options={[
            { value: 'compact',     label: 'Tight' },
            { value: 'comfortable', label: 'Comfy' },
            { value: 'spacious',    label: 'Airy' },
          ]}
          onChange={v => setTweak('density', v)}
        />
        <TweakToggle
          label="show photo"
          value={t.showPhoto}
          onChange={v => setTweak('showPhoto', v)}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
