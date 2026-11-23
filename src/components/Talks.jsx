import { useEffect, useRef, useState } from 'react';
import { cubicBezier, motion, useScroll, useTransform } from 'framer-motion';
import { TALKS } from '../data/content';

const inOut = cubicBezier(0.65, 0, 0.35, 1);
const out = cubicBezier(0.16, 1, 0.3, 1);
const BG = ['#ffffff', '#f4f4f4', '#ececec'];
const LINES = [
  ['Mes', ''],
  ['Domaines', 'ml-[12%] md:ml-[26%]'],
  ['D’expertise', 'md:ml-[4%]'],
  ['(03)', 'ml-[18%] md:ml-[35%]'],
];

// Chaque ligne du titre monte depuis un masque quand la section entre à l'écran
function TitleLine({ enter, i, cls, children }) {
  const y = useTransform(enter, [i * 0.1, 0.55 + i * 0.1], ['105%', '0%'], { ease: out });
  return (
    <div className={`display -mt-[.1em] overflow-hidden pt-[.1em] text-[clamp(3rem,13.2vw,14rem)] ${cls}`}>
      <motion.span style={{ y }} className="block">{children}</motion.span>
    </div>
  );
}

// Les cartes montent une par une (pile décalée), puis la pile s'ouvre en 3 colonnes
function Card({ i, p, d, t, s }) {
  const { W, H } = d;
  const mobile = W < 768;
  const pad = mobile ? 16 : W * 0.012, g = W * 0.007, Wi = W - 2 * pad, cw = (Wi - 2 * g) / 3;
  const off = mobile ? 24 : Math.min(34, W * 0.022);
  const sL = mobile ? pad + i * off : pad + Wi * 0.26 + i * off;
  const eL = mobile ? pad + i * off : pad + i * (cw + g);
  const sW = mobile ? Wi * 0.8 : Wi * 0.44;
  const eW = mobile ? Wi * 0.8 : cw;
  const r0 = 0.04 + i * 0.09;
  const y = useTransform(p, [r0, r0 + 0.22], [H * 1.05, 0], { ease: out });
  const left = useTransform(p, [0.58, 0.88], [sL, eL], { ease: inOut });
  const width = useTransform(p, [0.58, 0.88], [sW, eW], { ease: inOut });
  const height = useTransform(p, [0.58, 0.88], [H * (mobile ? 0.5 : 0.78), H * (mobile ? 0.5 : 0.46)], { ease: inOut });
  // Mobile : la carte du dessus part sur le côté pour révéler la suivante (3, puis 2 ; la 1 reste)
  const a = i === 2 ? 0.55 : 0.72;
  const go = mobile && i > 0;
  const x = useTransform(p, [a, a + 0.15], [0, go ? W * 1.1 : 0], { ease: inOut });
  const rotate = useTransform(p, [a, a + 0.15], [0, go ? 8 : 0], { ease: inOut });
  const opacity = useTransform(p, [a + 0.08, a + 0.15], [1, go ? 0 : 1]);
  return (
    <motion.a
      href="#speaking"
      onClick={(e) => {
        if (!window.lenis) return;
        e.preventDefault();
        window.lenis.scrollTo('#speaking');
      }}
      id={['talk-web-development', 'talk-ui-ux-design', 'talk-visual-identity'][i]}
      style={{ y, x, rotate, opacity, left, width, height, bottom: pad, backgroundColor: BG[i] }}
      whileHover={{ backgroundColor: '#e2e2e2' }}
      className="absolute flex flex-col justify-between border border-neutral-200 p-3 shadow-[0_0_40px_rgba(0,0,0,.05)] md:p-[1vw]"
    >
      <span className="text-[clamp(1.6rem,2.4vw,2.6rem)] font-extrabold leading-none">{i + 1}</span>
      <div>
        <h3 className="display text-[clamp(1.6rem,3vw,3.1rem)] leading-[.9]">{t}</h3>
        <p className="mt-4 text-[12px]">{s}</p>
      </div>
    </motion.a>
  );
}

export default function Talks() {
  const ref = useRef(null);
  const [d, setD] = useState({ W: window.innerWidth, H: window.innerHeight });
  useEffect(() => {
    const f = () => setD({ W: window.innerWidth, H: window.innerHeight });
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, []);
  const { W, H } = d;
  const { scrollYProgress: enter } = useScroll({ target: ref, offset: ['start end', 'start start'] });
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // Le titre remonte pour que "Talks(3)" se pose juste au-dessus des cartes
  const fs = Math.min(Math.max(W * 0.132, 48), 224);
  const padTop = H * 0.07;
  const cardsTop = H - (W < 768 ? 16 : W * 0.012) - H * (W < 768 ? 0.5 : 0.46);
  const yEnd = Math.min(0, cardsTop - 16 - (padTop + fs * 0.86 * 4));
  const titleY = useTransform(p, [0.15, 0.88], [0, yEnd], { ease: inOut });

  return (
    <section ref={ref} className="relative h-[420vh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.h2 style={{ y: titleY, paddingTop: padTop }} className="absolute inset-x-0 top-0 px-4 md:px-[1.2vw]">
          {LINES.map(([w, cls], i) => <TitleLine key={w} enter={enter} i={i} cls={cls}>{w}</TitleLine>)}
        </motion.h2>
        {TALKS.map(([t, s], i) => <Card key={t} i={i} p={p} d={d} t={t} s={s} />)}
      </div>
    </section>
  );
}