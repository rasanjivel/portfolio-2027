import { useEffect, useState } from 'react';
import { animate, motion } from 'framer-motion';

// Compteur public (CounterAPI v1, sans clé). Change ces 2 valeurs pour avoir TON compteur.
const NAMESPACE = 'portfolio-anthonio-7k2q';
const NAME = 'visites';
const API = `https://api.counterapi.dev/v1/${NAMESPACE}/${NAME}`;
const FLAG = 'portfolio-visited';

const ease = [0.16, 1, 0.3, 1];

export default function VisitorCounter({ ready = true, tone = 'light', className = '' }) {
  const [count, setCount] = useState(null);
  const [shown, setShown] = useState(0);

  // 1 visite = 1 navigateur : on incrémente une seule fois, puis on ne fait que lire.
  // En local (localhost) on ne compte jamais, pour ne pas fausser le chiffre.
  useEffect(() => {
    const live = !/^(localhost|127\.0\.0\.1)$/.test(window.location.hostname);
    let seen = false;
    try { seen = localStorage.getItem(FLAG) === '1'; } catch { /* stockage bloqué */ }
    const url = live && !seen ? `${API}/up` : API;
    const ctrl = new AbortController();

    fetch(url, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        const n = d.count ?? d.value ?? d.data?.up_count;
        if (typeof n !== 'number') return;
        setCount(n);
        if (live && !seen) { try { localStorage.setItem(FLAG, '1'); } catch { /* ignore */ } }
      })
      .catch(() => { if (!live) setCount(128); }); // valeur de démonstration en local
    return () => ctrl.abort();
  }, []);

  // Le chiffre monte de 0 jusqu'à la valeur
  useEffect(() => {
    if (count == null || !ready) return undefined;
    const c = animate(0, count, { duration: 1.8, ease, onUpdate: (v) => setShown(Math.round(v)) });
    return () => c.stop();
  }, [count, ready]);

  if (count == null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={ready ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 1, ease }}
      className={`${tone === 'light' ? 'text-white' : 'text-[#1a1a1a]'} ${className}`}
    >
      <span className="block text-[13px] font-medium">(Visiteurs)</span>
      <span className="display mt-1 block text-[clamp(2.2rem,4.2vw,4.5rem)] tabular-nums">{shown.toLocaleString('fr-FR')}</span>
      <span className="mt-2 flex items-center gap-1.5 text-[12px] opacity-80 md:justify-end">
        <i className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
        ont vu mon portfolio
      </span>
    </motion.div>
  );
}