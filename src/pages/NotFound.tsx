import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="px-6 max-w-prose mx-auto py-24 text-center">
      <p className="font-mono text-xs uppercase tracking-widest opacity-60">404</p>
      <h1 className="mt-4 font-serif text-4xl">Page not found</h1>
      <p className="mt-4 leading-relaxed">
        That page doesn't exist — or it used to and got composted into something else.
      </p>
      <p className="mt-8 font-mono text-sm">
        <Link to="/" className="underline decoration-accent dark:decoration-accent-dark">go home →</Link>
      </p>
    </section>
  );
}
