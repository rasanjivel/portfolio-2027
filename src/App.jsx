import { useCallback, useEffect, useState } from 'react';
import Lenis from 'lenis';
import Intro from './components/Intro';
import Hero from './components/Hero';
import Talks from './components/Talks';
import Footer from './components/Footer';
import ScrollLine from './components/ScrollLine';
import { Nav } from './components/Chrome';
import { About, Clients, Reel, Press, Books } from './components/Sections';

export default function App() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [ready, setReady] = useState(reduce);
  const done = useCallback(() => setReady(true), []);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08 });
    window.lenis = lenis;
    let id;
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = ready ? '' : 'hidden';
    window.lenis?.[ready ? 'start' : 'stop']();
  }, [ready]);

  return (
    <>
      {!ready && <Intro onDone={done} />}
      <Nav />
      <ScrollLine />
      <main>
        <Hero ready={ready} />
        <About />
        <Clients />
        <Talks />
        <Reel />
        <Press />
        <Books />
      </main>
      <Footer />
    </>
  );
}