import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Infinity as InfinityIcon,
  MessageCircle,
  Music2,
  Pause,
  Play,
  RotateCw,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';

const base = import.meta.env.BASE_URL;
// Fecha de inicio de la relación: 20 de Septiembre de 2025
const RELATIONSHIP_START = new Date('2025-09-20T00:00:00-03:00');

interface Milestone {
  id: string;
  date: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  location?: string;
}

interface GalleryItem {
  id: number;
  image: string;
  title: string;
  place: string;
  hiddenNote: string;
  aspect?: 'tall' | 'wide' | 'square';
}

interface LoveReason {
  id: number;
  category: 'Razón' | 'Detalle' | 'Promesa' | 'Recuerdo';
  quote: string;
  highlight: string;
  emoji: string;
}

const MILESTONES: Milestone[] = [
  {
    id: 'm1',
    date: '20 de Septiembre, 2025',
    tag: 'EL INICIO DE TODO',
    title: 'Cuando empezó nuestra historia',
    description: 'El día en que nuestras vidas se encontraron y todo comenzó a sentirse en el lugar correcto. Desde ese momento, cada día tiene más luz.',
    image: 'memories/yala.jpeg',
    location: 'Jujuy, Argentina',
  },
  {
    id: 'm2',
    date: 'Nuestra primera foto juntos',
    tag: 'DONDE HUBO MAGIA',
    title: 'Lagunas de Yala',
    description: 'Esa caminata, el aire fresco, tu sonrisa tímida y esa certeza silenciosa de que quería seguir caminando a tu lado para siempre.',
    image: 'memories/yala.jpeg',
    location: 'Lagunas de Yala',
  },
  {
    id: 'm3',
    date: 'Nuestro primer gran viaje',
    tag: 'AVENTURA DE A DOS',
    title: 'Ruta, mates y Córdoba',
    description: 'Kilómetros de ruta, cantar canciones a todo volumen, cebarnos mates y descubrir que con vos cualquier viaje es el mejor destino.',
    image: 'memories/cordoba.jpeg',
    location: 'Córdoba',
  },
  {
    id: 'm4',
    date: 'Detalles que enamoran',
    tag: 'TU SONRISA',
    title: 'Las flores y tu alegría',
    description: 'Verte sonreír cuando te sorprendo con un ramo es de las cosas más lindas del mundo. Me guardo esa carita feliz en el corazón.',
    image: 'memories/flores.jpeg',
    location: 'Momentos nuestros',
  },
  {
    id: 'm5',
    date: 'Un logro inolvidable',
    tag: 'ORGULLO TOTAL',
    title: 'Tu título en Hemoterapia',
    description: 'Verte recibirte, cumplir tus sueños con tanta dedicación y amor por lo que hacés. Te admiro tanto, Flor. Siempre a tu lado.',
    image: 'memories/hemoterapia.jpeg',
    location: 'Facultad de Medicina',
  },
  {
    id: 'm6',
    date: 'La magia de lo cotidiano',
    tag: 'NUESTROS DÍAS',
    title: 'Pelis, charlas y mates',
    description: 'No necesitamos nada extravagante. Un mate calentito, una peli en el sillón, tu mano en la mía y la calma de estar juntos.',
    image: 'memories/cine.jpeg',
    location: 'Nuestro rincón favorito',
  },
];

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 1,
    image: 'memories/yala.jpeg',
    title: 'Donde empezó la magia',
    place: 'Yala',
    hiddenNote: 'Nuestra primera foto. Si tuviera que volver a ese día, te volvería a mirar exactamente de la misma manera.',
    aspect: 'tall',
  },
  {
    id: 2,
    image: 'memories/cordoba.jpeg',
    title: 'Ruta compartida',
    place: 'Córdoba',
    hiddenNote: 'El primer viaje juntos. Descubrí que tu risa en la ruta es mi banda sonora favorita.',
    aspect: 'square',
  },
  {
    id: 3,
    image: 'memories/flores.jpeg',
    title: 'Tu sonrisa radiante',
    place: 'Sorpresa',
    hiddenNote: 'Ninguna flor es tan hermosa como la carita que pusiste cuando te las di.',
    aspect: 'tall',
  },
  {
    id: 4,
    image: 'memories/hemoterapia.jpeg',
    title: 'Tu gran sueño cumplido',
    place: 'Graduación',
    hiddenNote: 'Qué orgullo inmenso verte triunfar. Sos inteligente, dedicada y brillante en todo lo que te proponés.',
    aspect: 'square',
  },
  {
    id: 5,
    image: 'memories/cine.jpeg',
    title: 'Salida de a dos',
    place: 'Cine & Mimos',
    hiddenNote: 'Tener tu mano agarrada en la oscuridad del cine hace que cualquier película sea inolvidable.',
    aspect: 'wide',
  },
  {
    id: 6,
    image: 'meses/img/foto1.jpeg',
    title: 'Complicidad pura',
    place: 'Selfie de los dos',
    hiddenNote: 'De todas las coincidencias del universo, haberte encontrado a vos es mi más grande fortuna.',
    aspect: 'tall',
  },
];

const REASONS: LoveReason[] = [
  {
    id: 1,
    category: 'Razón',
    quote: 'Por cómo me mirás cuando te reís con ganas y cómo hacés que cualquier lugar se sienta como en casa.',
    highlight: 'Tu calidez y tu alegría',
    emoji: '✨',
  },
  {
    id: 2,
    category: 'Detalle',
    quote: 'Por los mates que compartimos, las charlas eternas y la paz inexplicable que me da tener tu abrazo.',
    highlight: 'Nuestros mates y abrazos',
    emoji: '🧉',
  },
  {
    id: 3,
    category: 'Razón',
    quote: 'Porque con vos puedo ser completamente yo, sin filtros, sintiéndome querido, respetado y feliz.',
    highlight: 'La libertad de ser nosotros',
    emoji: '🤍',
  },
  {
    id: 4,
    category: 'Recuerdo',
    quote: 'Por la forma en que cuidás a los que amás y la pasión que le ponés a tu vocación de salud cada día.',
    highlight: 'Tu corazón noble y generoso',
    emoji: '🌸',
  },
  {
    id: 5,
    category: 'Promesa',
    quote: 'Te prometo seguir cuidándote, hacerte reír cuando lo necesites y construir a tu lado un futuro lleno de sueños.',
    highlight: 'Elegirte hoy y siempre',
    emoji: '💍',
  },
  {
    id: 6,
    category: 'Razón',
    quote: 'Porque te amo hasta la palmera y después al cielo, ida y vuelta... y te volvería a elegir mil vidas más.',
    highlight: 'Un amor infinito',
    emoji: '♾️',
  },
];

// Helper para calcular tiempo transcurrido exacto
function calculateElapsedTime(startDate: Date, currentDate: Date) {
  let years = currentDate.getFullYear() - startDate.getFullYear();
  let months = currentDate.getMonth() - startDate.getMonth();
  let days = currentDate.getDate() - startDate.getDate();
  let hours = currentDate.getHours() - startDate.getHours();
  let minutes = currentDate.getMinutes() - startDate.getMinutes();
  let seconds = currentDate.getSeconds() - startDate.getSeconds();

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    const prevMonthLastDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    days += prevMonthLastDay;
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds),
  };
}

export default function Anniversary() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [activeReasonIndex, setActiveReasonIndex] = useState(0);
  const [selectedGalleryModal, setSelectedGalleryModal] = useState<GalleryItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [heartsTriggered, setHeartsTriggered] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Actualizar contador cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeElapsed = calculateElapsedTime(RELATIONSHIP_START, currentDate);

  const toggleMusic = async () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setAudioError(false);
      } catch (err) {
        console.error('Audio play error:', err);
        setAudioError(true);
      }
    }
  };

  const toggleCardFlip = (id: number) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const nextReason = () => {
    setActiveReasonIndex(prev => (prev + 1) % REASONS.length);
  };

  const prevReason = () => {
    setActiveReasonIndex(prev => (prev - 1 + REASONS.length) % REASONS.length);
  };

  const triggerHearts = () => {
    setHeartsTriggered(true);
    setTimeout(() => setHeartsTriggered(false), 3500);
  };

  const whatsappMessage = encodeURIComponent(
    '¡Mi amor! Me encantó toda la sorpresa de aniversario... Gracias por recordar cada detalle, te amo con todo mi corazón ❤️✨'
  );

  return (
    <div className="anniversary-story">
      {/* Reproductor Flotante Minimalista */}
      <div className="floating-music-pill">
        <button
          onClick={toggleMusic}
          className={`music-btn ${isPlaying ? 'is-active' : ''}`}
          aria-label={isPlaying ? 'Pausar música de fondo' : 'Reproducir La Correcta'}
        >
          {isPlaying ? (
            <div className="equalizer-bars">
              <span className="bar bar-1" />
              <span className="bar bar-2" />
              <span className="bar bar-3" />
            </div>
          ) : (
            <Music2 size={16} />
          )}
          <span className="song-title">La Correcta · Morat</span>
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>

      <audio
        ref={audioRef}
        src={`${base}la-correcta.mp3`}
        preload="auto"
        loop
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setAudioError(true)}
      />

      {/* =========================================================
          SECCIÓN 1: LA PORTADA (El Impacto Emocional)
      ========================================================= */}
      <section className="section-hero">
        <div className="hero-bg-wrapper">
          <img
            src={`${base}memories/yala.jpeg`}
            alt="Flor y Toti en Yala"
            className="hero-bg-img"
          />
          <div className="hero-overlay-gradient" />
        </div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <div className="hero-eyebrow">
            <span className="star-sparkle">✦</span>
            <span>NUESTRA HISTORIA DE AMOR</span>
            <span className="star-sparkle">✦</span>
          </div>

          <h1 className="hero-title">
            Feliz Aniversario,
            <br />
            <em className="hero-title-italic">mi vida hermosa</em>
          </h1>

          <p className="hero-subtitle">
            Un año de miradas cómplices, mates compartidos y la felicidad infinita de elegirte todos los días.
          </p>

          {/* Contador en tiempo real ultra-elegante */}
          <div className="hero-counter-box">
            <span className="counter-label">LLEVAMOS EXACTAMENTE:</span>
            <div className="counter-grid">
              <div className="counter-item">
                <span className="counter-num">{timeElapsed.years}</span>
                <span className="counter-unit">{timeElapsed.years === 1 ? 'AÑO' : 'AÑOS'}</span>
              </div>
              <div className="counter-divider">·</div>
              <div className="counter-item">
                <span className="counter-num">{timeElapsed.months}</span>
                <span className="counter-unit">{timeElapsed.months === 1 ? 'MES' : 'MESES'}</span>
              </div>
              <div className="counter-divider">·</div>
              <div className="counter-item">
                <span className="counter-num">{timeElapsed.days}</span>
                <span className="counter-unit">{timeElapsed.days === 1 ? 'DÍA' : 'DÍAS'}</span>
              </div>
              <div className="counter-divider">·</div>
              <div className="counter-item">
                <span className="counter-num">{String(timeElapsed.hours).padStart(2, '0')}</span>
                <span className="counter-unit">HS</span>
              </div>
              <div className="counter-divider">·</div>
              <div className="counter-item">
                <span className="counter-num">{String(timeElapsed.minutes).padStart(2, '0')}</span>
                <span className="counter-unit">MIN</span>
              </div>
              <div className="counter-divider">·</div>
              <div className="counter-item">
                <span className="counter-num highlight-sec">{String(timeElapsed.seconds).padStart(2, '0')}</span>
                <span className="counter-unit">SEG</span>
              </div>
            </div>
            <p className="counter-footer-text">amándote y construyendo nuestro propio universo.</p>
          </div>

          <button
            className="hero-scroll-btn"
            onClick={() => document.getElementById('linea-de-tiempo')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Deslizá para revivirlo</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            >
              <ArrowDown size={15} />
            </motion.div>
          </button>
        </motion.div>
      </section>

      {/* =========================================================
          SECCIÓN 2: LÍNEA DE TIEMPO DE NUESTROS HITOS
      ========================================================= */}
      <section id="linea-de-tiempo" className="section-timeline">
        <div className="section-header-editorial">
          <span className="editorial-tag">CAPÍTULO I</span>
          <h2 className="editorial-title">
            Nuestros hitos <em className="editorial-italic">inolvidables</em>
          </h2>
          <p className="editorial-lead">
            Los pasos que fuimos dando juntos, desde aquel primer día hasta este hermoso presente.
          </p>
        </div>

        <div className="timeline-container">
          <div className="timeline-vertical-spine" />

          <div className="timeline-nodes-list">
            {MILESTONES.map((milestone, index) => (
              <motion.article
                key={milestone.id}
                className="timeline-item"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
              >
                {/* Marcador central */}
                <div className="timeline-dot-marker">
                  <span className="dot-inner" />
                </div>

                {/* Tarjeta de hito */}
                <div className="timeline-card">
                  <div className="timeline-card-image-wrap">
                    <img
                      src={`${base}${milestone.image}`}
                      alt={milestone.title}
                      className="timeline-card-img"
                      loading="lazy"
                    />
                    {milestone.location && (
                      <span className="timeline-location-badge">📍 {milestone.location}</span>
                    )}
                  </div>

                  <div className="timeline-card-body">
                    <div className="timeline-card-meta">
                      <span className="timeline-tag">{milestone.tag}</span>
                      <span className="timeline-date">{milestone.date}</span>
                    </div>
                    <h3 className="timeline-card-title">{milestone.title}</h3>
                    <p className="timeline-card-desc">{milestone.description}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          SECCIÓN 3: NUESTROS MOMENTOS FAVORITOS (Galería Íntima)
      ========================================================= */}
      <section className="section-gallery">
        <div className="section-header-editorial">
          <span className="editorial-tag">CAPÍTULO II</span>
          <h2 className="editorial-title">
            Instantes que guardo en el <em className="editorial-italic">alma</em>
          </h2>
          <p className="editorial-lead">
            Tocá cualquier foto para darla vuelta y descubrir la dedicatoria oculta detrás de cada recuerdo.
          </p>
        </div>

        <div className="gallery-mosaic-grid">
          {GALLERY_ITEMS.map((item) => {
            const isFlipped = !!flippedCards[item.id];
            return (
              <div
                key={item.id}
                className={`mosaic-card-wrapper aspect-${item.aspect || 'square'}`}
                onClick={() => toggleCardFlip(item.id)}
              >
                <div className={`mosaic-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
                  {/* Frente: Foto con marco editorial */}
                  <div className="mosaic-card-front">
                    <img
                      src={`${base}${item.image}`}
                      alt={item.title}
                      className="mosaic-img"
                      loading="lazy"
                    />
                    <div className="mosaic-front-overlay">
                      <span className="mosaic-place">{item.place}</span>
                      <h4 className="mosaic-title">{item.title}</h4>
                      <span className="mosaic-flip-hint">
                        <RotateCw size={12} /> Tocá para girar
                      </span>
                    </div>
                  </div>

                  {/* Dorso: Dedicatoria oculta íntima */}
                  <div className="mosaic-card-back">
                    <div className="mosaic-back-content">
                      <Heart size={20} className="back-heart-icon" />
                      <span className="back-tag">{item.place}</span>
                      <p className="back-note">"{item.hiddenNote}"</p>
                      <span className="back-return-hint">
                        <RotateCw size={11} /> Volver a ver foto
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          SECCIÓN 4: "LO QUE AMO DE TI" (El Espacio de Dedicatorias)
      ========================================================= */}
      <section className="section-reasons">
        <div className="section-header-editorial">
          <span className="editorial-tag">CAPÍTULO III</span>
          <h2 className="editorial-title">
            Lo que amo <em className="editorial-italic">de vos</em>
          </h2>
          <p className="editorial-lead">
            Razones, certezas y promesas que reafirmo cada día que pasa a tu lado.
          </p>
        </div>

        <div className="reasons-carousel-container">
          <div className="reasons-card-deck">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeReasonIndex}
                className="reason-interactive-card"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                <div className="reason-card-badge">
                  <span className="reason-emoji">{REASONS[activeReasonIndex].emoji}</span>
                  <span className="reason-category">{REASONS[activeReasonIndex].category}</span>
                </div>

                <p className="reason-quote">"{REASONS[activeReasonIndex].quote}"</p>

                <div className="reason-highlight-box">
                  <Heart size={14} className="highlight-heart" />
                  <span>{REASONS[activeReasonIndex].highlight}</span>
                </div>

                <div className="reason-counter-footer">
                  <span>
                    {String(activeReasonIndex + 1).padStart(2, '0')} / {String(REASONS.length).padStart(2, '0')}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controles del carrusel */}
          <div className="reasons-nav-controls">
            <button
              onClick={prevReason}
              className="carousel-btn"
              aria-label="Razón anterior"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="carousel-dots">
              {REASONS.map((_, i) => (
                <button
                  key={i}
                  className={`dot-indicator ${i === activeReasonIndex ? 'active' : ''}`}
                  onClick={() => setActiveReasonIndex(i)}
                  aria-label={`Ir a la razón ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextReason}
              className="carousel-btn"
              aria-label="Siguiente razón"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECCIÓN 5: EL CIERRE (Nuestra Canción y Mensaje Final)
      ========================================================= */}
      <section className="section-letter-closing">
        <div className="letter-wrapper">
          <div className="letter-wax-seal">
            <Heart size={22} className="seal-heart" />
          </div>

          <div className="letter-inner-paper">
            <span className="letter-date-heading">20 DE SEPTIEMBRE DE 2026</span>
            <h2 className="letter-recipient">Para mi Flor hermosa,</h2>

            <div className="letter-paragraphs">
              <p>
                Si tuviera que elegir un solo momento favorito de este primer año, no podría. Porque mi momento favorito es cualquier instante en el que vos estés conmigo.
              </p>
              <p>
                Amo cómo te brillan los ojos cuando hablás de tus pasiones, admiro tu fortaleza, tu ternura inmensa y la manera tan tuya de iluminar todo lo que tocás. Con vos aprendí que el amor verdadero no es complicado: es un mate compartido en silencio, es una mirada cómplice y la certeza de que nunca más caminamos solos.
              </p>
              <p>
                Gracias por este primer año maravilloso. Gracias por elegirme, por cuidarme y por ser mi hogar en el mundo.
              </p>
              <blockquote className="letter-blockquote">
                "Te amo de aquí hasta la palmera y después al cielo, ida y vuelta... siempre."
              </blockquote>
            </div>

            <div className="letter-signature-block">
              <span className="letter-closing-word">Con todo mi amor,</span>
              <span className="letter-sign-name">Toti</span>
            </div>
          </div>
        </div>

        {/* Reproductor Integrado Final */}
        <div className="final-song-player-card">
          <div className="song-card-artwork">
            <div className={`spinning-disc ${isPlaying ? 'is-playing' : ''}`}>
              <div className="disc-center">
                <Heart size={16} />
              </div>
            </div>
          </div>
          <div className="song-card-info">
            <span className="song-tagline">NUESTRA CANCIÓN</span>
            <h4 className="song-name">La Correcta</h4>
            <p className="song-artist">Morat y Nabalez</p>
          </div>
          <button
            className="song-toggle-btn"
            onClick={toggleMusic}
            aria-label={isPlaying ? 'Pausar canción' : 'Escuchar canción'}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
        </div>

        {/* Botón interactivo de WhatsApp directo */}
        <div className="final-cta-container">
          <a
            href={`https://api.whatsapp.com/send?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whatsapp-love-btn"
            onClick={triggerHearts}
          >
            <MessageCircle size={20} />
            <span>Contame qué sentiste al verlo 💌</span>
          </a>

          <p className="final-confidential-note">
            Hecho con amor infinito exclusivamente para vos · Flor & Toti
          </p>
        </div>
      </section>

      {/* Lluvia de corazones festiva */}
      {heartsTriggered && (
        <div className="floating-hearts-layer" aria-hidden="true">
          {Array.from({ length: 28 }, (_, i) => (
            <span
              key={i}
              className="rising-heart"
              style={{
                left: `${(i * 37) % 95}%`,
                animationDelay: `${(i % 7) * 0.15}s`,
                fontSize: `${18 + (i % 4) * 8}px`,
              }}
            >
              ♥
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
