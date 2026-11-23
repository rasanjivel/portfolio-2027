import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { IMG } from '../data/content';

const ease = [0.76, 0, 0.24, 1];

// Séquence : titre -> la photo s'ouvre entre les mots -> elle passe plein écran -> le hero prend le relais
export default function Intro({ onDone }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = [setTimeout(() => setStep(1), 700), setTimeout(() => setStep(2), 2300), setTimeout(onDone, 3700)];
    return () => t.forEach(clearTimeout);
  }, [onDone]);
  const out = step >= 2;
  const txt = 'display text-center text-[clamp(2.5rem,6vw,5rem)] leading-[.88]';

  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-white">
      <motion.h1 className={txt} animate={{ opacity: out ? 0 : 1, y: out ? -40 : 0 }} transition={{ duration: 0.6 }}>
        MAMINIELA<br />Anthonio
      </motion.h1>
      <motion.div style={{ width: 224 }} animate={{ height: step >= 1 ? 176 : 0 }} transition={{ duration: 0.9, ease }}>
        <motion.div layout transition={{ duration: 1.1, ease }} className={out ? 'fixed inset-0 overflow-hidden' : 'h-full w-full overflow-hidden'}>
          <motion.img layout src={IMG.hero} alt="" className="h-full w-full object-cover" />
        </motion.div>
      </motion.div>
      <motion.p className={txt} animate={{ opacity: out ? 0 : 1, y: out ? 40 : 0 }} transition={{ duration: 0.6 }}>
        ©2027
      </motion.p>
    </div>
  );
}
