/* global React, SITE */
/* Deep-page components for wenhao-lu.com. No em dashes. */

const D = window.SITE;

/* ---------- HOME (summary) ---------- */
function HomePage({ go }) {
  return (
    <main className="page-anim" data-screen-label="01 Home">
      <section data-screen-label="about">
        <SectionHead num="01" title="about" aside="updated may 2026" />
        <div className="prose">
          {D.summary.map((p, i) => <p key={i}>{p}</p>)}
        </div>
        <div className="tag-row">
          {D.tags.map(t => <span className="tag" key={t}>{t}</span>)}
        </div>
      </section>

      <section data-screen-label="now">
        <SectionHead num="02" title="now" aside="things i'm building" />
        <div className="now-grid">
          {D.now.map(item => (
            <a className="now-card" href={item.href} target="_blank" rel="noopener" key={item.title}>
              <div className="now-kicker">{item.kicker}</div>
              <div className="now-title">{item.title}</div>
              <div className="now-desc">{item.desc}</div>
              <div className="now-stats">{item.stats.map(s => <span key={s}>{s}</span>)}</div>
              <div className="now-arrow">↗</div>
            </a>
          ))}
        </div>
      </section>

      <section data-screen-label="news">
        <SectionHead num="03" title="news" aside="the last few months" />
        <div className="news-list">
          {D.news.slice(0, 4).map((n, i) => (
            <div className="news-row" key={i}>
              <div className="news-date">{n.date}</div>
              <div className="news-text" dangerouslySetInnerHTML={{ __html: n.html }} />
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14 }}>
          <a className="more-link" href="#cv" onClick={(e) => { e.preventDefault(); go('cv'); }}>see full CV  ↗</a>
        </div>
      </section>

      <section data-screen-label="dig deeper">
        <SectionHead num="04" title="dig deeper" aside="six rooms in this house" />
        <div className="preview-grid">
          <PreviewCard go={go} to="research" k="research" title="publications" desc="3 papers, two under IEEE review, one in Diabetes" />
          <PreviewCard go={go} to="projects" k="projects" title="open source" desc="WorldModelLens, CIPHER, Graph2Proof, more" />
          <PreviewCard go={go} to="cv"       k="cv"       title="the long story" desc="Education, research, experience, awards" />
          <PreviewCard go={go} to="blog"     k="blog"     title="writing" desc="notes &amp; essays. mostly empty for now." />
          <PreviewCard go={go} to="reading"  k="reading"  title="reading &amp; listening" desc="books, podcasts, elsewhere" />
          <PreviewCard go={go} to="contact"  k="contact"  title="say hi" desc="linkedin, gmail, instagram" />
        </div>
      </section>
    </main>
  );
}

function PreviewCard({ go, to, k, title, desc }) {
  return (
    <a className="preview-card" href={'#' + to} onClick={(e) => { e.preventDefault(); go(to); }}>
      <div className="pv-key">{k}</div>
      <div className="pv-title" dangerouslySetInnerHTML={{ __html: title }} />
      <div className="pv-desc" dangerouslySetInnerHTML={{ __html: desc }} />
      <div className="pv-arrow">→</div>
    </a>
  );
}

/* ---------- RESEARCH / PUBLICATIONS ---------- */
function ResearchPage() {
  return (
    <main className="page-anim" data-screen-label="research">
      <PageHeader kicker="§ 02" title="publications" aside="peer reviewed &amp; under review" />
      <p className="page-intro">Research output across health equity, AI4Math, and mechanistic interpretability. My work tends to live at the intersection of math and policy: how do you measure the things we usually pretend are unmeasurable?</p>

      {D.publications.map((p, i) => (
        <article className="pub-card" key={i}>
          <div className="pub-tag">
            {p.abbr}
            <span className="pub-year">{p.year}</span>
          </div>
          <div>
            <h3 className="pub-title">{p.title}</h3>
            <p className="pub-authors">
              {p.authors.map((a, j) => (
                <React.Fragment key={a}>
                  {a.includes('Lu, Wenhao') ? <em>{a}</em> : a}
                  {j < p.authors.length - 1 ? ', ' : ''}
                </React.Fragment>
              ))}
            </p>
            <p className="pub-venue"><span className="badge">{p.abbr}</span>{p.venue}</p>
            <p className="pub-abstract">{p.abstract}</p>
            <div className="pub-tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div>
            {p.links && p.links.length > 0 && (
              <div className="pub-links">
                {p.links.map(l => <a key={l.label} href={l.href} target="_blank" rel="noopener">{l.label} ↗</a>)}
              </div>
            )}
          </div>
        </article>
      ))}
    </main>
  );
}

/* ---------- PROJECTS ---------- */
function ProjectsPage() {
  return (
    <main className="page-anim" data-screen-label="projects">
      <PageHeader kicker="§ 03" title="projects" aside="open source &amp; research code" />
      <p className="page-intro">Things I've built, in various states of polish. Most live on GitHub. The deeper ones are layered: motivation, novelty, impact, what surprised me.</p>

      {D.projects.map((p, i) => (
        <article className="pub-card" key={p.title}>
          <div className="pub-tag">
            {p.category}
            <span className="pub-year">{p.year}</span>
          </div>
          <div>
            <h3 className="pub-title">{p.title}</h3>
            <p className="pub-venue" style={{ marginBottom: 12, fontStyle: 'italic', color: 'var(--fg-2)', fontFamily: 'var(--body)', fontSize: 15, letterSpacing: 0, textTransform: 'none' }}>
              {p.tagline}
            </p>
            <p className="pub-abstract">{p.summary}</p>

            <details className="proj-details">
              <summary>read the long version</summary>
              <div className="proj-long">
                <h5>Motivation</h5>
                <p>{p.motivation}</p>
                <h5>Novelty</h5>
                <p>{p.novelty}</p>
                <h5>Impact</h5>
                <p>{p.impact}</p>
              </div>
            </details>

            <div className="pub-tags" style={{ marginTop: 10 }}>
              {p.tags.map(t => <span key={t}>{t}</span>)}
            </div>
            {p.links && p.links.length > 0 && (
              <div className="pub-links">
                {p.links.map(l => <a key={l.label} href={l.href} target="_blank" rel="noopener">{l.label} ↗</a>)}
              </div>
            )}
          </div>
        </article>
      ))}
    </main>
  );
}

/* ---------- CV ---------- */
function CVPage() {
  const cv = D.cv;
  return (
    <main className="page-anim" data-screen-label="cv">
      <PageHeader kicker="§ 04" title="cv" aside="last edited may 2026" />
      <p className="page-intro">{D.role}, currently in Millburn, NJ. Long form below. A printable PDF is on the way.</p>

      <div className="cv-section">
        <h3>Education</h3>
        {cv.education.map((e, i) => (
          <div className="cv-entry" key={i}>
            <div className="cv-when">{e.when}</div>
            <div>
              <h4 className="cv-where">{e.institution} <span className="cv-loc">{e.location}</span></h4>
              <p className="cv-role">{e.title}{e.score ? '. ' + e.score : ''}</p>
              {e.bullets && (
                <ul className="cv-bullets">
                  {e.bullets.map((b, j) => <li key={j} dangerouslySetInnerHTML={{ __html: b }} />)}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="cv-section">
        <h3>Research Experience</h3>
        {cv.research.map((e, i) => (
          <div className="cv-entry" key={i}>
            <div className="cv-when">{e.when}</div>
            <div>
              <h4 className="cv-where">{e.company} <span className="cv-loc">{e.location}</span></h4>
              <p className="cv-role" dangerouslySetInnerHTML={{ __html: e.position }} />
              <ul className="cv-bullets">
                {e.bullets.map((b, j) => <li key={j} dangerouslySetInnerHTML={{ __html: b }} />)}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="cv-section">
        <h3>Experience</h3>
        {cv.experience.map((e, i) => (
          <div className="cv-entry" key={i}>
            <div className="cv-when">{e.when}</div>
            <div>
              <h4 className="cv-where">{e.company} <span className="cv-loc">{e.location}</span></h4>
              <p className="cv-role" dangerouslySetInnerHTML={{ __html: e.position }} />
              <ul className="cv-bullets">
                {e.bullets.map((b, j) => <li key={j} dangerouslySetInnerHTML={{ __html: b }} />)}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="cv-section">
        <h3>Awards</h3>
        {cv.awards.map((a, i) => (
          <div className="cv-award" key={i}>
            <div className="cv-award-date">{a.date}</div>
            <div className="cv-award-title" dangerouslySetInnerHTML={{ __html: a.title }} />
            <div className="cv-award-by" dangerouslySetInnerHTML={{ __html: a.by }} />
          </div>
        ))}
      </div>

      <div className="cv-section">
        <h3>Skills</h3>
        {cv.skills.map((s, i) => (
          <div className="skill-row" key={i}>
            <div className="skill-name">{s.name}</div>
            <div className="skill-vals">{s.vals}</div>
          </div>
        ))}
      </div>
    </main>
  );
}

/* ---------- BLOG ---------- */
function BlogPage() {
  return (
    <main className="page-anim" data-screen-label="blog">
      <PageHeader kicker="§ 05" title="writing" aside="essays, notes, half thoughts" />
      <p className="page-intro">This is the place for the long-form stuff that doesn't fit anywhere else. Mostly empty right now.</p>

      {D.blog.length === 0 ? (
        <div className="blog-empty">
          <span className="big">nothing here yet</span>
          new posts will land in this section. likely topics: world-model interpretability, things I learned from olympiads, why high schoolers should ship.
        </div>
      ) : (
        <div>
          {D.blog.map((p, i) => (
            <a className="blog-row" key={i} href={p.href}>
              <div className="blog-date">{p.date}</div>
              <div>
                <h3 className="blog-title">{p.title}</h3>
                <p className="blog-summary">{p.summary}</p>
              </div>
              <div className="blog-len">{p.len}</div>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}

/* ---------- READING & LISTENING ---------- */
function ReadingPage() {
  const r = D.reading;
  return (
    <main className="page-anim" data-screen-label="reading">
      <PageHeader kicker="§ 06" title="reading & listening" aside="a living notebook" />
      <p className="page-intro">What I'm in the middle of, in order of how often I'd recommend them. Books beat podcasts beat tweets, but I do all three.</p>

      <div className="cv-section">
        <h3>Currently reading</h3>
        {r.books.map((b, i) => (
          <div className="cv-entry" key={i}>
            <div className="cv-when">book</div>
            <div>
              <h4 className="cv-where">{b.title}</h4>
              <p className="cv-role">{b.author}{b.note ? '. ' + b.note + '.' : ''}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="cv-section">
        <h3>Listening</h3>
        {r.listening.map((b, i) => (
          <div className="cv-entry" key={i}>
            <div className="cv-when">podcast</div>
            <div>
              <h4 className="cv-where">{b.title}</h4>
              <p className="cv-role" dangerouslySetInnerHTML={{ __html: b.author }} />
            </div>
          </div>
        ))}
      </div>

      <div className="cv-section">
        <h3>Elsewhere</h3>
        <ul className="cv-bullets">
          {r.elsewhere.map((x, i) => <li key={i}>{x}</li>)}
        </ul>
      </div>
    </main>
  );
}

/* ---------- CONTACT ---------- */
function ContactPage() {
  return (
    <main className="page-anim" data-screen-label="contact">
      <PageHeader kicker="§ 07" title="say hi" aside="best via linkedin" />
      <p className="page-intro">The fastest way to reach me is LinkedIn. Email works too. I read everything, I reply to most.</p>

      <div className="contact-card">
        <div>
          <h4>direct</h4>
          <p>
            <a href={`https://www.linkedin.com/in/${D.linkedin}`}>linkedin.com/in/{D.linkedin}</a><br/>
            <a href={`mailto:${D.email}`}>{D.email}</a><br/>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--muted)' }}>{D.phone}</span>
          </p>
        </div>
        <div>
          <h4>elsewhere</h4>
          <p>
            <a href={`https://github.com/${D.github}`}>github.com/{D.github}</a><br/>
            <a href={`https://scholar.google.com/citations?user=${D.scholar}`}>google scholar</a><br/>
            <a href={`https://instagram.com/${D.instagram}`}>instagram</a>
          </p>
        </div>
      </div>

      <p style={{ marginTop: 28, color: 'var(--muted)', fontSize: 14, maxWidth: 'var(--col)' }}>
        This site is a living notebook more than a finished product. Some things are polished, others are scaffolding. Last touched: <span style={{ fontFamily: 'var(--mono)' }}>{new Date().toISOString().slice(0,10)}</span>.
      </p>
    </main>
  );
}

/* ---------- shared bits ---------- */
function PageHeader({ kicker, title, aside }) {
  return (
    <div className="page-header">
      <div>
        <span className="page-kicker">{kicker}</span>
        <h1 className="page-title">{title}</h1>
      </div>
      <div className="page-aside">
        <div className="crumb">
          <a href="#home" onClick={(e) => { e.preventDefault(); window.location.hash = ''; }}>← back home</a>
        </div>
        {aside && <div style={{ marginTop: 4 }} dangerouslySetInnerHTML={{ __html: aside }} />}
      </div>
    </div>
  );
}

function SectionHead({ num, title, aside }) {
  return (
    <div className="section-head">
      <span className="section-num">§ {num}</span>
      <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }} />
      <span className="section-rule" />
      {aside && <span className="section-aside">{aside}</span>}
    </div>
  );
}

/* expose for app.jsx */
Object.assign(window, {
  HomePage, ResearchPage, ProjectsPage, CVPage, BlogPage, ReadingPage, ContactPage,
});
