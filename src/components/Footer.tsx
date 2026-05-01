import { site } from "../data/site";

export function Footer() {
  return (
    <footer className="px-6 py-10 max-w-5xl mx-auto font-mono text-xs flex flex-wrap gap-x-6 gap-y-2 opacity-70">
      <span>© {new Date().getFullYear()} {site.name}</span>
      {site.socials.github && (
        <a href={site.socials.github} target="_blank" rel="noreferrer" className="hover:text-accent dark:hover:text-accent-dark">
          github
        </a>
      )}
      {site.socials.linkedin && (
        <a href={site.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-accent dark:hover:text-accent-dark">
          linkedin
        </a>
      )}
      <a href={`mailto:${site.email}`} className="hover:text-accent dark:hover:text-accent-dark">
        {site.email}
      </a>
    </footer>
  );
}
