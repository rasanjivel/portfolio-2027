import { useEffect, useState } from 'react';
import { NAV, FOOTER, SOCIALS } from '../data/content';

const go = (e, id) => {
  if (!window.lenis) return;
  e.preventDefault();
  window.lenis.scrollTo(id === 'top' ? 0 : `#${id}`);
};

export function Nav() {
  const [s, setS] = useState(false);
  useEffect(() => {
    const f = () => setS(window.scrollY > 80);
    f();
    window.addEventListener('scroll', f);
    return () => window.removeEventListener('scroll', f);
  }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-between px-4 py-3 text-[13px] font-medium text-white mix-blend-difference md:px-[1.2vw]">
      <a href="#top" onClick={(e) => go(e, 'top')}>{s ? '©RMA—' : 'MAMINIELA Anthonio'}</a>
      <nav className="absolute left-1/2 hidden -translate-x-1/2 gap-3 md:flex">
        {NAV.map(([n, id]) => (
          <a key={n} href={`#${id}`} onClick={(e) => go(e, id)}>{n}</a>
        ))}
      </nav>
      <a href="#contact" onClick={(e) => go(e, 'contact')}>contacts</a>
    </header>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="flex min-h-screen flex-col justify-end bg-[#161616] px-[1.2vw] pb-4 pt-[40vh] text-white">
      <div className="grid grid-cols-2 gap-y-8 border-t border-white/15 pt-4 text-[13px] md:grid-cols-3">
        {FOOTER.map(([h, items]) => (
          <div key={h}>
            <p className="mb-6 font-medium">{h}</p>
            <ul className="space-y-1 text-white/55">{items.map(([label, id]) => (
              <li key={label}>
                <a className="transition-colors hover:text-white" href={`#${id}`} onClick={(e) => go(e, id)}>{label}</a>
              </li>
            ))}</ul>
          </div>
        ))}
        <div>
          <p className="mb-6 font-medium">Réseaux sociaux</p>
          <ul className="space-y-1 text-white/55">
            {SOCIALS.map(([label, url]) => (
              <li key={label}>
                <a className="transition-colors hover:text-white" href={url} target="_blank" rel="noreferrer">{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-24 flex flex-col gap-3 text-[13px] text-white/55 md:flex-row md:justify-between">
        <span>New portfolio  2026-0227</span>
        <a href="#top" onClick={(e) => go(e, 'top')} className="transition-colors hover:text-white">Retour en haut ↑</a>
        <span>MAMINIELA Anthonio</span>
        <a href="tel:0339735371" className="transition-colors hover:text-white">033 97 353 71 -- 0386076202</a>
      </div>
    </footer>
  );
}
