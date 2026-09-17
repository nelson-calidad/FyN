import { lazy, Suspense, useEffect, useState } from 'react';
import { Cake, Heart, Sparkles } from 'lucide-react';
import { MotionConfig } from 'motion/react';
import Anniversary from './components/Anniversary';
import './anniversary.css';

const Birthday = lazy(() => import('./BirthdayApp'));
const tabs = [
  { id: 'aniversario', label: 'Un año', icon: Sparkles },
  { id: 'cumple', label: 'Feliz cumple', icon: Cake },
  { id: 'meses', label: 'Meses', icon: Heart },
];
const readTab = () => tabs.some(t => t.id === location.hash.slice(1)) ? location.hash.slice(1) : 'aniversario';
export default function App() {
  const [tab, setTab] = useState(readTab);
  useEffect(() => {
    const sync = () => { setTab(readTab()); window.scrollTo(0, 0); };
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);
  useEffect(() => { document.title = `${tabs.find(t => t.id === tab)?.label} · Flor & Toti`; }, [tab]);
  return <MotionConfig reducedMotion="user"><div className="love-site">
    <a className="skip-link" href="#contenido">Ir al contenido</a>
    <header className="site-header">
      <a href="#aniversario" className="wordmark">f<span>&</span>t<span className="wordmark-dot">.</span></a>
      <nav aria-label="Nuestros capítulos" className="chapter-nav">
        {tabs.map(({ id, label, icon: Icon }) => <a key={id} href={`#${id}`} aria-current={tab === id ? 'page' : undefined}><Icon size={15}/><span>{label}</span>{id === 'aniversario' && <span className="nav-dot"/>}</a>)}
      </nav>
      <span className="header-note">Una historia. Mil razones. <Heart size={13}/></span>
    </header>
    <main id="contenido" tabIndex={-1}>
      {tab === 'aniversario' && <Anniversary/>}
      {tab === 'cumple' && <Suspense fallback={<p className="loading-chapter">Abriendo tu regalo…</p>}><Birthday/></Suspense>}
      {tab === 'meses' && <iframe className="months-frame" title="Flor y Toti: nuestros cinco meses" src={`${import.meta.env.BASE_URL}meses/index.html`} allow="autoplay; encrypted-media; fullscreen"/>}
    </main>
  </div></MotionConfig>;
}
