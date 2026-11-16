import Image from "next/image";
import ParticleField from "@/components/ParticleField";
import RevealObserver from "@/components/RevealObserver";
import { ArrowIcon, GitHubIcon, LinkedInIcon } from "@/components/Icons";
import {
  courses,
  education,
  experience,
  profile,
  projects,
  skills,
} from "@/content/profile";
import portrait from "@/public/images/portrait.jpg";

const nav = [
  { id: "about", label: "about" },
  { id: "experience", label: "experience" },
  { id: "projects", label: "projects" },
  { id: "skills", label: "skills" },
  { id: "contact", label: "contact" },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function formatMonth(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

function SectionHeading({ id, index, title }: { id: string; index: string; title: string }) {
  return (
    <h2 id={id} className="section-heading reveal">
      <span className="section-index">{index}</span>
      {title}
    </h2>
  );
}

export default function Home() {
  const year = new Date().getFullYear();

  return (
    <>
      <ParticleField />
      <RevealObserver />

      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <header className="site-header">
        <a className="logo" href="#top" aria-label="Back to top">
          <span className="bracket">[</span>mg<span className="bracket">]</span>
        </a>
        <nav aria-label="Sections">
          <ul>
            {nav.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="main">
        <section id="top" className="hero" aria-labelledby="hero-title">
          <p className="hero-kicker">
            <span className="accent">&gt;</span> hello, I&apos;m
          </p>
          <h1 id="hero-title" className="hero-title">
            {profile.name.toLowerCase()}
          </h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-tagline">{profile.tagline}</p>
          <nav className="hero-links" aria-label="Quick links">
            {nav.slice(0, 3).map((item) => (
              <a key={item.id} href={`#${item.id}`} className="bracket-link">
                <span aria-hidden="true">[</span>
                <span className="bracket-label">{item.label}</span>
                <span aria-hidden="true">]</span>
              </a>
            ))}
          </nav>
          <a className="scroll-cue" href="#about" aria-label="Scroll to about">
            <span />
          </a>
        </section>

        <section id="about" className="section" aria-labelledby="about-title">
          <div className="card about reveal">
            <div className="about-text">
              <h2 id="about-title" className="section-heading">
                <span className="section-index">01</span>about me
              </h2>
              {profile.about.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              <ul className="facts">
                <li>
                  <strong>{year - profile.startedYear}+</strong> years building for the web
                </li>
                <li>
                  <strong>ad tech → fintech</strong> domain background
                </li>
                <li>
                  <strong>AI-driven</strong> engineering advocate
                </li>
              </ul>
            </div>
            <div className="about-photo">
              <Image
                src={portrait}
                alt={`Portrait of ${profile.name}`}
                sizes="(max-width: 760px) 220px, 300px"
                placeholder="blur"
                priority
              />
            </div>
          </div>
        </section>

        <section id="experience" className="section" aria-labelledby="experience-title">
          <SectionHeading id="experience-title" index="02" title="experience" />
          <ol className="timeline">
            {experience.map((role) => (
              <li key={`${role.company}-${role.start}`} className="timeline-item reveal">
                <div className="card">
                  <div className="role-head">
                    <div>
                      <h3>{role.title}</h3>
                      <p className="company">{role.company}</p>
                    </div>
                    <p className="dates">
                      <time dateTime={role.start}>{formatMonth(role.start)}</time>
                      {" – "}
                      {role.end ? <time dateTime={role.end}>{formatMonth(role.end)}</time> : "Present"}
                    </p>
                  </div>
                  <ul className="points">
                    {role.points.map((point) => (
                      <li key={point.slice(0, 32)}>{point}</li>
                    ))}
                  </ul>
                  {role.tech && (
                    <ul className="tags" aria-label="Technologies">
                      {role.tech.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <h3 className="subheading reveal">education</h3>
          <ul className="edu-list">
            {education.map((e) => (
              <li key={e.school} className="card edu reveal">
                <div>
                  <h4>{e.degree}</h4>
                  <p className="company">{e.school}</p>
                </div>
                <p className="dates">
                  {e.start.slice(0, 4)} – {e.end.slice(0, 4)}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section id="projects" className="section" aria-labelledby="projects-title">
          <SectionHeading id="projects-title" index="03" title="selected work" />
          <p className="section-lead reveal">
            Highlights from client and company projects. The code is private, so here&apos;s
            what they do and how I contributed.
          </p>
          <ul className="project-grid">
            {projects.map((project, i) => (
              <li
                key={project.name}
                className="card project reveal"
                style={{ "--delay": `${(i % 2) * 120}ms` } as React.CSSProperties}
              >
                <p className="project-context">{project.context}</p>
                <h3>{project.name}</h3>
                <p className="project-summary">{project.summary}</p>
                <ul className="points">
                  {project.points.map((point) => (
                    <li key={point.slice(0, 32)}>{point}</li>
                  ))}
                </ul>
                <ul className="tags" aria-label="Technologies">
                  {project.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                {project.link && (
                  <a className="project-link" href={project.link.href} target="_blank" rel="noreferrer">
                    {project.link.label}
                    <ArrowIcon className="icon-sm" />
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section id="skills" className="section" aria-labelledby="skills-title">
          <SectionHeading id="skills-title" index="04" title="skills" />
          <div className="skill-grid">
            {skills.map((group, i) => (
              <div
                key={group.name}
                className="card skill-group reveal"
                style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}
              >
                <h3>{group.name}</h3>
                <ul className="tags">
                  {group.items.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h3 className="subheading reveal">courses</h3>
          <ul className="edu-list">
            {courses.map((c) => (
              <li key={c.name} className="card edu reveal">
                <h4>{c.name}</h4>
                <p className="dates">
                  <time dateTime={c.date}>{formatMonth(c.date)}</time>
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" className="section contact" aria-labelledby="contact-title">
          <div className="card contact-card reveal">
            <h2 id="contact-title" className="section-heading">
              <span className="section-index">05</span>let&apos;s talk
            </h2>
            <p>
              Open to interesting projects and conversations about web apps and AI-driven
              engineering. The quickest way to reach me is LinkedIn.
            </p>
            <div className="contact-links">
              <a className="button primary" href={profile.links.linkedin} target="_blank" rel="noreferrer">
                <LinkedInIcon className="icon" />
                LinkedIn
              </a>
              <a className="button" href={profile.links.github} target="_blank" rel="noreferrer">
                <GitHubIcon className="icon" />
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>
          © {year} {profile.name}
        </p>
        <p>
          Built with Next.js ·{" "}
          <a href="https://github.com/marcin15g/marcin15g.github.io" target="_blank" rel="noreferrer">
            source
          </a>
        </p>
      </footer>
    </>
  );
}
