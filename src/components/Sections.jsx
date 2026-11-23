import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { IMG, ABOUT, CLIENTS, TALKS, KEYNOTE, PRESS } from '../data/content';

const pad = 'px-4 md:px-[1.2vw]';
const Tag = ({ children }) => <span className="text-[13px] font-medium">{children}</span>;
const Lead = 'text-[clamp(1.9rem,3.7vw,3.7rem)] leading-[1.04] tracking-[-0.035em]';

/* ------------------------------------------------------------------ */
/*  Texte dont les mots s'allument au scroll                           */
/* ------------------------------------------------------------------ */

function Word({ p, r, children, scatter, index }) {
  const reducedMotion = useReducedMotion();
  const animate = scatter && !reducedMotion;

  const opacity = useTransform(p, r, reducedMotion ? [1, 1] : [0.16, 1]);
  const x = useTransform(p, r, animate ? [`${Math.sin((index + 1) * 12.9898) * 22}vw`, '0vw'] : ['0vw', '0vw']);
  const y = useTransform(p, r, animate ? [`${Math.cos((index + 1) * 78.233) * 12}vh`, '0vh'] : ['0vh', '0vh']);
  const scale = useTransform(p, r, animate ? [0.6 + ((index * 37) % 11) / 10, 1] : [1, 1]);

  return (
    <>
      {/* inline-block seulement si le mot doit bouger (x / y / scale) ;
          sinon un simple <span> inline : le navigateur mesure et espace
          les mots comme un texte normal, sans chevauchement */}
      <motion.span
        style={animate ? { opacity, x, y, scale } : { opacity }}
        className={animate ? 'inline-block' : 'inline'}
      >
        {children}
      </motion.span>
      {/* vrai espace entre les mots */}
      {' '}
    </>
  );
}

function ScrollWords({ text, className = '', scatter = false }) {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] });
  const words = text.trim().split(/\s+/);

  return (
    <p ref={ref} className={`${className} [word-spacing:0.12em]`}>
      {words.map((w, i) => (
        <Word key={i} p={p} r={[i / words.length, (i + 1) / words.length]} scatter={scatter} index={i}>
          {w}
        </Word>
      ))}
    </p>
  );
}

/* ------------------------------------------------------------------ */
/*  About                                                              */
/* ------------------------------------------------------------------ */

export function About() {
  return (
    <section id="about" className={`${pad} overflow-x-clip pb-[16vh] pt-[22vh] md:grid md:grid-cols-12`}>
      <span className="hidden text-2xl md:block">→</span>
      <div className="relative md:col-span-10 md:col-start-3">
        <span className="mb-6 block text-[13px] md:absolute md:left-0 md:top-2 md:mb-0"><Tag>(About)</Tag></span>
        <ScrollWords text={ABOUT} className={`${Lead} md:indent-[14%]`} scatter />
        <a href="#speaking" className="ulink mt-16 inline-block text-[13px]">Aperçus de design</a>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Clients / Expertise                                                */
/* ------------------------------------------------------------------ */

export function Clients() {
  return (
    <section id="expertise" className={`${pad} pb-[18vh]`}>
      <div className="mb-10 flex flex-col items-center gap-4 text-center md:grid md:grid-cols-12 md:items-start md:text-left">
        <span className="md:col-span-2"><Tag>(02)</Tag></span>
        <h2 className={`${Lead} text-[clamp(1.5rem,2.4vw,2.4rem)] md:col-span-8`}>
          Mes domaines d’expertise<br />et services
        </h2>
        <a href="#contact" className="ulink text-[13px] md:col-span-2 md:justify-self-end">Contact</a>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:gap-[.7vw]">
        {CLIENTS.map(([n, c], i) => (
          <motion.div
            key={n}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.8, delay: (i % 4) * 0.08 }}
            className={`flex aspect-[4/3] items-center justify-center border border-neutral-200 px-2 text-center text-[clamp(1rem,1.6vw,1.6rem)] transition-colors hover:bg-neutral-100 ${c}`}
          >
            {n}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Talks                                                              */
/* ------------------------------------------------------------------ */

function TalkCard({ i, p, t, d }) {
  const x = useTransform(p, [0.05, 0.6], [`${-i * 92}%`, '0%']);
  const y = useTransform(p, [0, 0.4], ['35%', '0%']);

  return (
    <motion.a
      href="#speaking"
      style={{ x, y }}
      className="flex h-[44vh] flex-col justify-between border border-neutral-200 bg-white p-[1vw] transition-colors hover:bg-neutral-100"
    >
      <span className="text-3xl font-extrabold">{i + 1}</span>
      <div>
        <h3 className="display text-[clamp(1.6rem,3vw,3.1rem)] leading-[.9]">{t}</h3>
        <p className="mt-4 text-[12px]">{d}</p>
      </div>
    </motion.a>
  );
}

export function Talks() {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const big = 'display block text-[clamp(3rem,13.2vw,14rem)]';

  return (
    <section ref={ref} className="relative h-[260vh]">
      <div className={`${pad} sticky top-0 flex h-screen flex-col justify-between overflow-hidden pb-[1.2vw] pt-[7vh]`}>
        <h2 className={big}>MES DOMAINES D’EXPERTISE (03)</h2>
        <div className="grid grid-cols-3 gap-[.7vw]">
          {TALKS.map(([t, d], i) => <TalkCard key={t} i={i} p={p} t={t} d={d} />)}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Carrousel coverflow piloté par le scroll                           */
/* ------------------------------------------------------------------ */

function Panel({ i, active, src }) {
  const tf = useTransform(active, (a) => {
    const dd = i - a;
    const s = Math.sign(dd);
    const m = Math.abs(dd);
    const W = window.innerWidth;
    const k = W < 768 ? 0.5 : 0.27;
    const x = s * (Math.min(m, 1) * W * k + Math.max(m - 1, 0) * W * 0.04);
    return `translate(-50%,-50%) translateX(${x}px) rotateY(${-s * Math.min(m, 1) * 68}deg)`;
  });
  const z = useTransform(active, (a) => 100 - Math.round(Math.abs(i - a) * 10));
  const br = useTransform(active, (a) => `brightness(${1 - Math.min(Math.abs(i - a), 1) * 0.45})`);

  return (
    <motion.img
      src={src}
      alt=""
      style={{ transform: tf, zIndex: z, filter: br }}
      className="absolute left-1/2 top-1/2 h-[52vw] max-h-[75%] w-[78vw] object-contain md:h-[30vw] md:w-[46vw]"
    />
  );
}

export function Reel() {
  const ref = useRef(null);
  const n = 9;
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const active = useTransform(p, [0.05, 0.95], [0, n - 1]);
  const mx = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });
  const my = useSpring(useMotionValue(0), { stiffness: 220, damping: 22 });
  const over = useMotionValue(0);

  const move = (e) => {
    const b = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - b.left);
    my.set(e.clientY - b.top);
  };

  return (
    <section ref={ref} id="speaking" className="relative h-[320vh]">
      <div className={`${pad} sticky top-0 flex h-svh flex-col pb-4 pt-[6vh]`}>
        <div
          onMouseMove={move}
          onMouseEnter={() => over.set(1)}
          onMouseLeave={() => over.set(0)}
          className="relative flex-1 overflow-hidden bg-neutral-200 md:cursor-none"
          style={{ perspective: 1400 }}
        >
          {Array.from({ length: n }, (_, i) => (
            <Panel key={i} i={i} active={active} src={IMG.carousel[i % IMG.carousel.length]} />
          ))}

          <motion.span
            style={{ x: mx, y: my, opacity: over }}
            className="pointer-events-none absolute left-0 top-0 z-[200] -ml-10 -mt-10 hidden h-20 w-20 items-center justify-center rounded-full bg-[#161616] text-center text-[12px] font-medium leading-tight text-white md:flex"
          >
            Aperçus<br />Design
          </motion.span>

          <span className="absolute bottom-3 right-3 rounded-full bg-[#161616] px-3 py-1.5 text-[12px] font-medium text-white md:hidden">
            Aperçus
          </span>
        </div>

        <div className="mt-5 flex flex-col gap-3 text-[13px] md:grid md:grid-cols-12 md:items-start">
          <span className="md:col-span-3"><Tag>(Expériences)</Tag></span>
          <p className="max-w-sm leading-snug md:col-span-4">{KEYNOTE}</p>
          <a href="#contact" className="ulink self-start md:col-span-5 md:self-auto md:justify-self-end">Contact</a>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Press / Expérience                                                 */
/* ------------------------------------------------------------------ */

const EXPERIENCE =
  'De 2025 à 2026, j’ai enrichi mon expérience à travers différents projets, tout en développant mes compétences en développement web et en design.';

export function Press() {
  return (
    <section id="media" className={`${pad} pb-[16vh] pt-[22vh]`}>
      <div className="mb-12 flex flex-col gap-4 md:grid md:grid-cols-12 md:items-start">
        <span className="md:col-span-2"><Tag>(2025-2026)</Tag></span>
        <ScrollWords text={EXPERIENCE} className={`${Lead} md:col-span-8 md:indent-[14%]`} />
        <a href="#media" className="ulink self-start text-[13px] md:col-span-2 md:self-auto md:justify-self-end">Expérience</a>
      </div>

      <div className="grid grid-cols-2 gap-[.7vw] md:grid-cols-4">
        {PRESS.map((a) => (
          <a key={a.t} href="#media" className="group block">
            <div className="relative aspect-[3/4] overflow-hidden bg-neutral-200">
              <img
                src={a.img}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute left-2 top-2 rounded-full bg-white px-2 py-0.5 text-[11px] font-medium">{a.tag}</span>
              {a.tag === 'TV' && (
                <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 scale-75 items-center justify-center rounded-full bg-[#161616] text-[11px] text-white opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                  Watch
                </span>
              )}
            </div>
            <p className="mt-2 text-[13px] leading-tight">{a.t}</p>
            <p className="text-[13px] text-neutral-400">{a.s}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Books → « À votre service »                                        */
/* ------------------------------------------------------------------ */

// Ton texte : modifie-le ici
const SERVICE =
  'Je suis à votre service pour vos nouveaux projets : sites web, applications et interfaces animées, du design jusqu’au code.';

export function Books() {
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // La photo monte très légèrement pendant le scroll (sans être recadrée)
  const imgY = useTransform(p, [0, 1], [30, -30]);
  const big = 'display block text-[clamp(3rem,12.5vw,13rem)]';

  return (
    <section id="books" ref={ref} className={`${pad} pb-[22vh] pt-[10vh]`}>
      <h2>
        <span className={big}>À votre</span>
        <span className={`${big} text-right`}>service</span>
      </h2>

      <div className="mt-[1.2vw] grid grid-cols-12 gap-[.7vw]">
        <div className="col-span-12 md:col-span-4">
          <motion.img
            src={IMG.me || IMG.hero}
            alt="Portrait"
            style={{ y: imgY }}
            className="block h-auto w-full"
          />
        </div>

        <div className="relative col-span-12 md:col-span-7 md:col-start-6">
          <span className="mb-4 block md:absolute md:left-0 md:top-1 md:mb-0"><Tag>(Contact)</Tag></span>
          <ScrollWords text={SERVICE} className={`${Lead} pt-2 md:pt-[20vh] md:indent-[16%]`} />
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); window.lenis?.scrollTo('#contact'); }}
            className="ulink mt-12 inline-block text-[13px]"
          >
            Démarrer un projet
          </a>
        </div>
      </div>
    </section>
  );
}