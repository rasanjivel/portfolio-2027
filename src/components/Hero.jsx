import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { IMG } from '../data/content';
import VisitorCounter from './VisitorCounter';

// Textes du hero : modifie-les ici
const HERO = {
  tagline: 'Web developer & designer',
  reel: 'Speaker Reel (00:43)',
  video: '/video-portfolio.mp4',
};

const ease = [0.16, 1, 0.3, 1];

// Le masque a une marge haute (.14em) pour ne pas couper les accents (É)
const Line = ({ ready, delay, inner = '', children }) => (
  <div className="display -mt-[.14em] overflow-hidden pt-[.14em] text-[clamp(2.3rem,12.6vw,13rem)] text-white">
    <motion.div
      className={inner}
      initial={{ y: '105%' }}
      animate={ready ? { y: 0 } : {}}
      transition={{ duration: 1.1, delay, ease }}
    >
      {children}
    </motion.div>
  </div>
);

export default function Hero({ ready }) {
  const ref = useRef(null);
  const [d, setD] = useState({ W: window.innerWidth, H: window.innerHeight });
  useEffect(() => {
    const f = () => setD({ W: window.innerWidth, H: window.innerHeight });
    window.addEventListener('resize', f);
    return () => window.removeEventListener('resize', f);
  }, []);
  const { W, H } = d;
  const m = W < 768;
  const vref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  // Mobile : la vidéo reste en pause (on voit l'image) jusqu'au tap. Ordinateur : lecture auto, muette.
  useEffect(() => {
    const v = vref.current;
    if (!v) return;
    v.muted = true;
    if (m) { v.pause(); v.currentTime = 0; } else { v.play().catch(() => {}); }
  }, [m]);

  // Quand la vignette sort de l'écran, on met en pause (économie de batterie)
  useEffect(() => {
    const v = vref.current;
    if (!v) return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) v.pause();
      else if (!m) v.play().catch(() => {});
    });
    io.observe(v);
    return () => io.disconnect();
  }, [m]);

  const toggle = () => {
    const v = vref.current;
    if (!v) return;
    if (v.paused) { v.muted = false; v.play().catch(() => {}); } else { v.pause(); }
  };

  // Bouton son : les navigateurs interdisent le son automatique, il faut un clic
  const toggleSound = () => {
    const v = vref.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted && v.paused) v.play().catch(() => {});
  };
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  // La vignette "reel" grandit jusqu'au centre pendant que le hero s'efface
  const rw = useTransform(p, [0, 0.8], [W * (m ? 0.38 : 0.16), W * (m ? 0.92 : 0.58)]);
  const rh = useTransform(rw, (v) => (v * 9) / 16);
  const rx = useTransform(p, [0, 0.8], [W * (m ? 0.04 : 0.015), W * (m ? 0.04 : 0.21)]);
  // Mobile : la vignette part en haut à gauche (zone libre) pour ne plus couvrir le titre
  const ry = useTransform(p, [0, 0.8], [m ? 64 : H - W * 0.105, (H - W * (m ? 0.5175 : 0.326)) / 2]);
  const imgO = useTransform(p, [0.25, 0.7], [1, 0]);
  const imgS = useTransform(p, [0, 1], [1, 1.12]);
  const txtY = useTransform(p, [0, 0.5], ['0%', '-35%']);
  const txtO = useTransform(p, [0, 0.4], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative h-[240vh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <motion.img src={IMG.hero} alt="" style={{ opacity: imgO, scale: imgS }} className="absolute inset-0 h-full w-full object-cover" />

        {/* Léger dégradé en bas : le texte blanc reste lisible sur une photo claire */}
        <motion.div style={{ opacity: imgO }} className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-black/5 to-transparent" />

        {/* Compteur de visiteurs, en haut à droite, même style que les titres */}
        <motion.div style={{ opacity: txtO }} className="absolute right-4 top-16 z-10 text-right md:right-[1.2vw]">
          <VisitorCounter ready={ready} />
        </motion.div>

        <motion.div style={{ y: txtY, opacity: txtO }} className="absolute inset-x-0 bottom-0 px-4 pb-4 md:px-[1.2vw] md:pb-[2.4vw]">
          {/* Slogan collé au bord gauche de "Créer" */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7, ease }}
            className="mb-6 md:pl-[38%]"
          >
            <span className="mb-3 block h-px w-8 bg-white" />
            <p className="text-[clamp(12px,1vw,15px)] font-medium tracking-[0.04em] text-white">{HERO.tagline}</p>
          </motion.div>

          <Line ready={ready} delay={0.1} inner="md:pl-[38%]">Créer</Line>
          <Line ready={ready} delay={0.2} inner="flex justify-between"><span>Innover</span><span>et</span></Line>
          <Line ready={ready} delay={0.3} inner="flex justify-between md:pl-[38%]">
            <span>Inspirer</span>
            <a
              href="#about"
              aria-label="Descendre"
              onClick={(e) => {
                if (!window.lenis) return;
                e.preventDefault();
                window.lenis.scrollTo('#about');
              }}
              className="font-normal transition-opacity duration-300 hover:opacity-60"
            >
              ↓
            </a>
          </Line>
        </motion.div>

        <motion.div style={{ width: rw, height: rh, x: rx, y: ry }} className="absolute left-0 top-0 block overflow-hidden bg-black">
          <video
            ref={vref}
            src={HERO.video}
            poster={IMG.reel}
            autoPlay={!m}
            muted
            loop
            playsInline
            controls={!m}
            preload="metadata"
            aria-label={HERO.reel}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onVolumeChange={(e) => setMuted(e.currentTarget.muted)}
            onClick={m ? toggle : undefined}
            className="h-full w-full object-cover"
          />
          {m && !playing && (
            <button
              type="button"
              onClick={toggle}
              aria-label="Lire la vidéo"
              className="absolute inset-0 m-auto grid h-10 w-10 place-items-center rounded-full bg-white/90 text-[10px] text-black"
            >
              ▶
            </button>
          )}
          <span className="absolute left-2 top-2 text-[11px] font-medium text-white">{HERO.reel}</span>
          <button
            type="button"
            onClick={toggleSound}
            aria-label={muted ? 'Activer le son' : 'Couper le son'}
            className="absolute bottom-2 right-2 z-10 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-medium text-black md:bottom-auto md:top-2"
          >
            {muted ? 'Son off' : 'Son on'}
          </button>
        </motion.div>
      </div>
    </section>
  );
}