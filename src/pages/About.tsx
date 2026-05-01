import { about } from "../data/about";
import { site } from "../data/site";

export default function About() {
  return (
    <div className="px-6 max-w-prose mx-auto py-16">
      <header>
        <h1 className="font-serif text-4xl">About</h1>
      </header>

      <section className="mt-8 space-y-4 text-lg leading-relaxed">
        <p>{about.intro}</p>
        {about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl">Skills</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          {about.skills.map((g) => (
            <div key={g.group}>
              <dt className="font-mono text-[10px] uppercase tracking-widest opacity-60">{g.group}</dt>
              <dd className="mt-1">{g.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl">Résumé</h2>
        <p className="mt-4">
          <a
            href="/resume.pdf"
            className="underline decoration-accent dark:decoration-accent-dark font-mono text-sm"
          >
            Download résumé (PDF) →
          </a>
        </p>
      </section>

      <section className="mt-12">
        <h2 className="font-serif text-2xl">Contact</h2>
        <ul className="mt-4 font-mono text-sm space-y-1">
          <li>
            <a href={`mailto:${site.email}`} className="underline decoration-accent dark:decoration-accent-dark">
              {site.email}
            </a>
          </li>
          {site.socials.github && (
            <li>
              <a href={site.socials.github} target="_blank" rel="noreferrer" className="underline decoration-accent dark:decoration-accent-dark">
                github · {site.handle}
              </a>
            </li>
          )}
          {site.socials.linkedin && (
            <li>
              <a href={site.socials.linkedin} target="_blank" rel="noreferrer" className="underline decoration-accent dark:decoration-accent-dark">
                linkedin
              </a>
            </li>
          )}
        </ul>
      </section>
    </div>
  );
}
