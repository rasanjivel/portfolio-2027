import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const clamp = (v) => Math.min(Math.max(v, 0), 1);

// Barre de progression noire en haut de l'écran (mobile uniquement), comme un téléchargement :
// elle se remplit pendant que tu scrolles, avec un reflet qui avance.
export default function ScrollLine() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 });
  const width = useTransform(progress, (v) => `${clamp(v) * 100}%`);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-x-0 top-0 z-[55] md:hidden">
      <div className="h-[3px] w-full bg-black/10">
        <motion.div style={{ width }} className="relative h-full overflow-hidden bg-black">
          {/* Reflet qui traverse la barre en boucle */}
          <motion.span
            animate={{ x: ['-100%', '250%'] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-white/60 to-transparent"
          />
        </motion.div>
      </div>
    </div>
  );
}