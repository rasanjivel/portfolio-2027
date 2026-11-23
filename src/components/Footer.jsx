import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FOOTER, CONTACT, SOCIALS } from '../data/content';

// Texte du statut : modifie-le ici
const AVAILABLE = 'Disponible pour de nouveaux projets';

const ease = [0.16, 1, 0.3, 1];
const colTitle = 'mb-6 font-medium';
const list = 'space-y-1.5 text-white/55';
const link = 'inline-block transition-all duration-300 hover:translate-x-1 hover:text-white';
const pill = 'inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-2.5 text-[13px] transition-colors duration-300 hover:bg-white hover:text-black';

// Défilement fluide ; les liens "talk-..." mènent à la section Expertise
const jump = (e, id) => {
  e.preventDefault();
  if (id === 'top') { window.lenis?.scrollTo(0); return; }
  const el = document.getElementById(id) || (id.startsWith('talk-') && document.getElementById('expertise'));
  if (el) window.lenis?.scrollTo(el);
};

// Heure locale (Antananarivo), mise à jour toute seule
const clock = () => new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Indian/Antananarivo' }).format(new Date());
function useClock() {
  const [t, setT] = useState(clock);
  useEffect(() => {
    const id = setInterval(() => setT(clock()), 20000);
    return () => clearInterval(id);
  }, []);
  return t;
}

// Ligne qui monte depuis un masque quand elle entre à l'écran
const Reveal = ({ children, delay = 0, className = '' }) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span
      className="block"
      initial={{ y: '105%' }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </motion.span>
  </span>
);

export default function Footer() {
  const time = useClock();
  const tel = CONTACT.phone.replace(/[^\d+]/g, '');
  const tel2 = CONTACT.phone2?.replace(/[^\d+]/g, '');
  const socials = SOCIALS.filter(([, url]) => url);
  const whatsapp = socials.find(([n]) => n.toLowerCase() === 'whatsapp');

  return (
    <footer id="contact" className="flex min-h-svh flex-col justify-between bg-[#161616] px-4 pb-4 pt-[16vh] text-white md:px-[1.2vw]">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 text-[13px]">
          <span className="text-white/55">(Contact)</span>
          <p className="flex items-center gap-2 text-white/80">
            <i className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
            {AVAILABLE}
          </p>
        </div>

        <h2 className="mt-10 text-[clamp(1.6rem,3.2vw,3.2rem)] font-medium leading-[1.05] tracking-[-0.035em] text-white/70">
          <Reveal>Un projet en tête ?</Reveal>
          <Reveal delay={0.1}>Travaillons ensemble.</Reveal>
        </h2>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {CONTACT.email && <a href={`mailto:${CONTACT.email}`} className={pill}>{CONTACT.email} <span aria-hidden="true">→</span></a>}
          {CONTACT.phone && <a href={`tel:${tel}`} className={pill} aria-label={`Appeler ${CONTACT.phone}`}>{CONTACT.phone}</a>}
          {CONTACT.phone2 && <a href={`tel:${tel2}`} className={pill} aria-label={`Appeler ${CONTACT.phone2}`}>{CONTACT.phone2}</a>}
          {whatsapp && <a href={whatsapp[1]} target="_blank" rel="noopener noreferrer" className={pill}>WhatsApp <span aria-hidden="true">↗</span></a>}
        </div>
      </div>

      <div className="mt-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-5%' }}
          transition={{ duration: 0.9, ease }}
          className="grid grid-cols-2 gap-x-4 gap-y-8 border-t border-white/15 pt-4 text-[13px] md:grid-cols-4"
        >
          {FOOTER.map(([h, items]) => (
            <div key={h}>
              <p className={colTitle}>{h}</p>
              <ul className={list}>
                {items.map(([label, id]) => (
                  <li key={label}><a className={link} href={`#${id}`} onClick={(e) => jump(e, id)}>{label}</a></li>
                ))}
              </ul>
            </div>
          ))}

          {socials.length > 0 && (
            <div>
              <p className={colTitle}>Réseaux sociaux</p>
              <ul className={list}>
                {socials.map(([label, url]) => (
                  <li key={label}>
                    <a className={`${link} group`} href={url} target="_blank" rel="noopener noreferrer">
                      {label}{' '}
                      <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {CONTACT.location && (
            <div>
              <p className={colTitle}>Basé à</p>
              <p className="text-white/55">{CONTACT.location}</p>
              <p className="mt-1.5 tabular-nums text-white/55">Il est {time} (GMT+3)</p>
            </div>
          )}
        </motion.div>

        <div className="mt-16 flex flex-col gap-2 text-[13px] text-white/55 md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} Anthonio Maminiela</span>
          <a href="#top" onClick={(e) => jump(e, 'top')} className="group transition-colors hover:text-white">
            Retour en haut <span aria-hidden="true" className="inline-block transition-transform duration-300 group-hover:-translate-y-1">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}