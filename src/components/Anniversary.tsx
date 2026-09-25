import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Dices,
  Film,
  Gift,
  Heart,
  HelpCircle,
  Image as ImageIcon,
  Infinity as InfinityIcon,
  Maximize2,
  MessageCircle,
  Music2,
  Pause,
  Play,
  RotateCw,
  Sparkles,
  Trophy,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';

const base = import.meta.env.BASE_URL;
// Fecha de inicio de la relación: 20 de Septiembre de 2025
const RELATIONSHIP_START = new Date('2025-09-20T00:00:00-03:00');

// Las 51 fotos de aventuras organizadas con sus historias reales
const ALL_PHOTOS = [
  {
    id: 1,
    image: 'aventuras/foto1.jpeg',
    title: 'Serranía del Hornocal',
    tag: 'EL HORNOCAL · 4350 M',
    caption: 'Hechos bolsa por el viento que nos liquidó, pero con un sol hermoso y la mejor compañía en los 14 Colores.',
  },
  {
    id: 2,
    image: 'aventuras/foto2.jpeg',
    title: 'En la cima del Hornocal',
    tag: 'A 4350 M.S.N.M.',
    caption: 'De la mano junto a la bandera argentina, desafiando la altura y el viento pero felices de haber llegado.',
  },
  {
    id: 3,
    image: 'aventuras/foto3.jpeg',
    title: 'Jueguito de los 80 con IA',
    tag: 'LOOK RETRO',
    caption: 'Un juego divertido que hicimos con inteligencia artificial: la modifiqué con onda retro ochentera y te la mandé.',
  },
  {
    id: 4,
    image: 'aventuras/foto4.jpeg',
    title: 'Ceremonia de la Pachamama',
    tag: 'RITUAL FAMILIAR',
    caption: 'En casa con Duque. La primera vez que Flor estuvo presente y que mi familia sumó a alguien tan especial al ritual.',
  },
  {
    id: 5,
    image: 'aventuras/foto5.jpeg',
    title: 'Festejando en El Poso',
    tag: 'CENA ÍNTIMA',
    caption: 'Una noche hermosa saliendo de la rutina: comimos riquísimo y festejamos juntos con esa luz tan linda.',
  },
  {
    id: 6,
    image: 'aventuras/foto6.jpeg',
    title: 'Brindis en El Poso',
    tag: 'NOCHE ESPECIAL',
    caption: 'Frente a vos compartiendo la cena, un trago y la alegría de festejar cada pasito que damos.',
  },
  {
    id: 7,
    image: 'aventuras/foto7.jpeg',
    title: 'Recital de Emanero',
    tag: 'FIESTA & CONFETI',
    caption: 'Gané unas entradas en el laburo y nos fuimos a disfrutar a puro canto y lluvia de papelitos.',
  },
  {
    id: 8,
    image: 'aventuras/foto8.jpeg',
    title: 'Duque al atardecer',
    tag: 'NUESTRO COMPAÑERO',
    caption: 'El consentido de la casa posando como un modelo en el banco de la plaza con el sol cayendo.',
  },
  {
    id: 9,
    image: 'aventuras/foto9.jpeg',
    title: 'Duque modo Mundial',
    tag: 'HINCHA N°1',
    caption: 'Viendo el partido de la Selección Argentina con piluso y camiseta de Messi, listo para alentar.',
  },
  {
    id: 10,
    image: 'aventuras/foto10.jpeg',
    title: 'Mirador de Purmamarca',
    tag: 'CERRO DE 7 COLORES',
    caption: 'Flor con su suéter abrigado y esa sonrisa que ilumina cualquier paisaje quebradeño.',
  },
  {
    id: 11,
    image: 'aventuras/foto11.jpeg',
    title: 'Salto en las Salinas Grandes',
    tag: 'SALINAS GRANDES',
    caption: 'Desafiando la gravedad sobre los piletones de agua turquesa en el infinito blanco de la puna.',
  },
  {
    id: 12,
    image: 'aventuras/foto12.jpeg',
    title: 'Caminando en el salar',
    tag: 'SALINAS GRANDES',
    caption: 'De la mano junto al agua celeste, compartiendo el silencio y la paz inmensa de las salinas.',
  },
  {
    id: 13,
    image: 'aventuras/foto13.jpeg',
    title: 'Abrazo en Purmamarca',
    tag: 'COLORES DE JUJUY',
    caption: 'Fundidos en un abrazo con el cerro y todo el pueblo a nuestros pies.',
  },
  {
    id: 14,
    image: 'aventuras/foto14.jpeg',
    title: 'El Toro en las Salinas',
    tag: 'FOTO DIVERTIDA',
    caption: 'Jugando con la perspectiva y el vino Toro en pleno salar. Nuestras clásicas fotos con risas.',
  },
  {
    id: 15,
    image: 'aventuras/foto15.jpeg',
    title: 'Alegría pura en el salar',
    tag: 'LIBERTAD & RISAS',
    caption: 'Flor corriendo con los brazos abiertos sobre el salar infinito, llena de energía y felicidad.',
  },
  {
    id: 16,
    image: 'aventuras/foto16.jpeg',
    title: 'Mate en las Salinas',
    tag: 'SALINAS GRANDES',
    caption: 'El mate infaltable con nosotros en medio de la inmensidad blanca y el cielo azul profundo.',
  },
  {
    id: 17,
    image: 'aventuras/foto17.jpeg',
    title: '¡Ataque de dinosaurio!',
    tag: 'FOTO DIVERTIDA',
    caption: 'Jugando con el dinosaurio en las Salinas Grandes, poniéndole humor y risas a cada parada.',
  },
  {
    id: 18,
    image: 'aventuras/foto18.jpeg',
    title: 'Salinas Grandes, Jujuy',
    tag: 'RECUERDO EN EL SALAR',
    caption: 'Sonrisas compartidas junto al cartel artesanal en uno de los lugares más imponentes de nuestra provincia.',
  },
  {
    id: 19,
    image: 'aventuras/foto19.jpeg',
    title: 'Escapando del dino',
    tag: 'RISAS EN LA PUNA',
    caption: 'Corriendo a los saltos en la sal, haciéndonos los asustados. Nunca faltan nuestras fotos locas.',
  },
  {
    id: 20,
    image: 'aventuras/foto20.jpeg',
    title: 'Abrazo salinero',
    tag: 'SALINAS & MATES',
    caption: 'Abrazados al fondo con el mate de testigo de este viaje inolvidable.',
  },
  {
    id: 21,
    image: 'aventuras/foto21.jpeg',
    title: 'Cuesta de Lipán',
    tag: 'RUTAS JUJEÑAS',
    caption: 'Los caracoles serpenteantes entre los cerros dorados, el camino que nos llevó a las alturas.',
  },
  {
    id: 22,
    image: 'aventuras/foto22.jpeg',
    title: 'Cuesta de Lipán',
    tag: 'CAMINO A LAS SALINAS',
    caption: 'Yendo a las Salinas Grandes por las curvas de la Cuesta de Lipán. Subiendo entre los cerros con un sol hermoso y nosotros dos disfrutando el viaje.',
  },
  {
    id: 23,
    image: 'aventuras/foto23.jpeg',
    title: 'Tarde de paz en el dique',
    tag: 'EL DIQUE',
    caption: 'Sentados sobre las piedras a la orilla del agua, con los pescadores a lo lejos y una tranquilidad impagable.',
  },
  {
    id: 24,
    image: 'aventuras/foto24.jpeg',
    title: 'Termas de Reyes con frío y neblina',
    tag: 'TERMAS DE REYES',
    caption: 'Hacía muchísimo frío y estaba todo con neblina, pero fue re lindo. Nos acordamos de la segunda vez que nos vimos, que estuvo así también.',
  },
  {
    id: 25,
    image: 'aventuras/foto25.jpeg',
    title: 'Ñoquis como una nube',
    tag: 'COCINADO CON AMOR',
    caption: 'Flor cocinó unos ñoquis caseros que eran tan livianitos que parecían una nube... ¡me comí tres platos!',
  },
  {
    id: 26,
    image: 'aventuras/foto26.jpeg',
    title: 'Lomito en el auto',
    tag: 'ANÉCDOTA DIVERTIDA',
    caption: 'Sándwich del carrito cerca de Chango Más. Estaba riquísimo y me reía sacándole foto porque Flor no suele comer con la mano y acá le tocó entrarle de una.',
  },
  {
    id: 27,
    image: 'aventuras/foto27.jpeg',
    title: 'Beso al atardecer',
    tag: 'NUESTROS CERROS',
    caption: 'Con el termo en mano y la inmensidad de los cerros de fondo, un beso dulce cerrando la tarde.',
  },
  {
    id: 28,
    image: 'aventuras/foto28.jpeg',
    title: 'Almuerzo familiar',
    tag: 'MOMENTOS EN FAMILIA',
    caption: 'Compartiendo lindos momentos, risas y la alegría de estar rodeados de quienes más queremos.',
  },
  {
    id: 29,
    image: 'aventuras/foto29.jpeg',
    title: 'Flor hermosa en Lobo',
    tag: 'NOCHE EN EL BAR',
    caption: 'Flor radiante y sonriente esperando la comida en la cancha de Lobo.',
  },
  {
    id: 30,
    image: 'aventuras/foto30.jpeg',
    title: 'Alta milanga en la cancha de Lobo',
    tag: 'CANCHA DE LOBO',
    caption: 'Cenando en la terraza de Lobo, disfrutando una alta milanga con papas fritas y gaseosa bien fría.',
  },
  {
    id: 31,
    image: 'aventuras/foto31.jpeg',
    title: 'Paseo en lancha en La Ciénaga',
    tag: 'DIQUE LA CIÉNAGA',
    caption: 'Paseo en lancha en el dique con Yani y Tigu (la hermana de Flor y mi amigo). Mates, tortillas y una tarde hermosa navegando juntos.',
  },
  {
    id: 32,
    image: 'aventuras/foto32.jpeg',
    title: 'Mi chica hermosa en el bote',
    tag: 'TAN LINDA',
    caption: 'En el bote del dique. La vi tan hermosa, tan linda y radiante con su chaleco que le saqué esta foto que me encanta.',
  },
  {
    id: 33,
    image: 'aventuras/foto33.jpeg',
    title: 'Pizzas caseras en casa',
    tag: 'NOCHES EN CASA',
    caption: 'Compartiendo una pizza recién horneada en la mesa, disfrutando la simpleza de comer algo rico juntos.',
  },
  {
    id: 34,
    image: 'aventuras/foto34.jpeg',
    title: 'Atardecer en el dique',
    tag: 'MATES & ATARDECER',
    caption: 'Mates y charla en el pasto del dique mientras el sol caía y el cielo se teñía de colores suaves.',
  },
  {
    id: 35,
    image: 'aventuras/foto35.jpeg',
    title: 'Parada del Tren Solar',
    tag: 'QUEBRADA DE HUMAHUACA',
    caption: 'Cuando nos fuimos en el tren solar y paramos antes de Tilcara entre los árboles y cerros. Flor se veía simplemente hermosa.',
  },
  {
    id: 36,
    image: 'aventuras/foto36.jpeg',
    title: 'Nuestra primera tarde de skincare',
    tag: 'CUIDÁNDONOS',
    caption: 'El día que hicimos skincare juntos por primera vez. Me hizo tan feliz compartir eso con ella, verla reír y hacer cosas que la hacen feliz.',
  },
  {
    id: 37,
    image: 'aventuras/foto37.jpeg',
    title: 'Esperando el Tren Solar',
    tag: 'ESTACIÓN VOLCÁN',
    caption: 'En la confitería con el termo y el mate listo, con la emoción previa antes de subirnos a viajar por la Quebrada.',
  },
  {
    id: 38,
    image: 'aventuras/foto38.jpeg',
    title: 'Cena con arte quebradeño',
    tag: 'TILCARA / QUEBRADA',
    caption: 'Sonrisas compartidas cenando frente a las esculturas rústicas de la Quebrada.',
  },
  {
    id: 39,
    image: 'aventuras/foto39.jpeg',
    title: 'Adentro del Tren Solar',
    tag: 'VIAJE EN TREN',
    caption: 'Recorriendo los paisajes de Jujuy sentados juntos con los ventanales panorámicos y el corazón contento.',
  },
  {
    id: 40,
    image: 'aventuras/foto40.jpeg',
    title: 'Abrazo en Estación Volcán',
    tag: 'ANDÉN DE VOLCÁN',
    caption: 'Abrazados junto al cartel histórico de Volcán, un punto de partida para una gran aventura juntos.',
  },
  {
    id: 41,
    image: 'aventuras/foto41.jpeg',
    title: 'Paseo por la iglesia histórica',
    tag: 'QUEBRADA MÁGICA',
    caption: 'Mates y sol frente a la iglesia colonial con los cerros y palmeras de fondo, disfrutando cada pueblito de Jujuy.',
  },
  {
    id: 42,
    image: 'aventuras/foto42.jpeg',
    title: 'Noche de peña y baile',
    tag: 'FIESTA & LUCES',
    caption: 'Abrazados de la mano bajo las luces de colores y banderines, compartiendo la alegría y la música que nos une.',
  },
  {
    id: 43,
    image: 'aventuras/foto43.jpeg',
    title: 'La belleza de lo cotidiano',
    tag: 'EN CASA',
    caption: 'Una selfie sencilla en casa, sonriendo con el alma y disfrutando el regalo más grande: tenernos.',
  },
  {
    id: 44,
    image: 'aventuras/foto44.jpeg',
    title: 'Carnaval con pintura y harina',
    tag: 'CARNAVAL JUJEÑO',
    caption: 'Llenos de pintura, espuma y harina festejando el carnaval a pura risa y baile con el piluso.',
  },
  {
    id: 45,
    image: 'aventuras/foto45.jpeg',
    title: 'Carnaval en la Quebrada',
    tag: 'ALEGRÍA CARNAVALERA',
    caption: 'En medio de la multitud y la fiesta quebradiza con la cara pintada y el sol bien arriba. Una fiesta inolvidable.',
  },
  {
    id: 46,
    image: 'aventuras/foto46.jpeg',
    title: 'Beso carnavalero',
    tag: 'NOCHE DE FIESTA',
    caption: 'Un beso tierno en medio del baile y la música del carnaval, con el termo y el piluso puestos.',
  },
  {
    id: 47,
    image: 'aventuras/foto47.jpeg',
    title: 'Ramo de girasoles para Flor',
    tag: 'DETALLE DE AMOR',
    caption: 'Ver tu sonrisa iluminada con ese ramo hermoso de girasoles. Verte sonreír así es mi felicidad absoluta.',
  },
  {
    id: 48,
    image: 'aventuras/foto48.jpeg',
    title: 'Noche en las fuentes de agua',
    tag: 'LUCES & AGUA',
    caption: 'Sentados junto a las aguas danzantes iluminadas en la noche, disfrutando la calma y nuestro paseo.',
  },
  {
    id: 49,
    image: 'aventuras/foto49.jpeg',
    title: 'Flor con sus flores',
    tag: 'RADIANTE',
    caption: 'Parada en el caminito de piedra, hermosa de pies a cabeza con su ramo en mano y esa sonrisa que enamora.',
  },
  {
    id: 50,
    image: 'aventuras/foto50.jpeg',
    title: 'Abrazo en el puente',
    tag: 'VISTA PANORÁMICA',
    caption: 'En el puente peatonal con la ciudad de fondo, abrazados bajo el cielo azul inmenso.',
  },
  {
    id: 51,
    image: 'aventuras/foto51.jpeg',
    title: 'Río de montaña y relax',
    tag: 'AGUAS CRISTALINAS',
    caption: 'Refrescándonos en las aguas transparentes del río entre las piedras con un trago en mano y sol pleno. La gloria misma.',
  },
];

// Fotos para el fondo de la portada con transición suave (Ken Burns)
const HERO_PHOTOS = [
  'aventuras/foto1.jpeg',
  'aventuras/foto2.jpeg',
  'aventuras/foto4.jpeg',
  'aventuras/foto10.jpeg',
  'aventuras/foto13.jpeg',
  'aventuras/foto21.jpeg',
];

interface Milestone {
  id: string;
  date: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  location?: string;
}

interface VideoMemory {
  id: number;
  videoSrc: string;
  title: string;
  caption: string;
  tag: string;
}

interface CollageCard {
  id: number;
  photoIndex: number;
  image: string;
  title: string;
  place: string;
  hiddenNote: string;
}

interface TriviaQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface LoveCoupon {
  id: number;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  terms: string;
  whatsappText: string;
}

interface LoveReason {
  id: number;
  category: 'Razón' | 'Detalle' | 'Promesa' | 'Recuerdo';
  quote: string;
  highlight: string;
  emoji: string;
  photo: string;
}

const MILESTONES: Milestone[] = [
  {
    id: 'm1',
    date: 'Antes de ser novios',
    tag: 'EL INICIO DE TODO',
    title: 'Cuando nos íbamos conociendo',
    description: 'Nuestra primera foto juntos. Todavía no éramos novios, recién nos íbamos conociendo y compartiendo las primeras charlas. Desde ese día todo empezó a cambiar para mejor.',
    image: 'memories/yala.jpeg',
    location: 'Lagunas de Yala, Jujuy',
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
    description: 'Verte recibirte, cumplir tus metas con tanta dedicación y amor por lo que hacés. Te admiro tanto, Flor. Siempre a tu lado.',
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

const VIDEO_MEMORIES: VideoMemory[] = [
  {
    id: 1,
    videoSrc: 'videos/video1.mp4',
    title: 'Risas que guardo para siempre',
    caption: 'Verte reír en movimiento es mi recordatorio favorito de que la vida con vos es hermosa.',
    tag: 'REEL DE LOS DOS · 01',
  },
  {
    id: 2,
    videoSrc: 'videos/video2.mp4',
    title: 'Aventuras y complicidad',
    caption: 'Esa manera tan tuya de acompañarme, de hacer divertido cualquier momento.',
    tag: 'REEL DE LOS DOS · 02',
  },
  {
    id: 3,
    videoSrc: 'videos/video3.mp4',
    title: 'Nuestra magia cotidiana',
    caption: 'Los instantes más simples son los que más rápido se vuelven recuerdos eternos.',
    tag: 'REEL DE LOS DOS · 03',
  },
];

// Las 51 fotos reales como tarjetas interactivas 3D con armonía visual total
const ALL_COLLAGE_CARDS: CollageCard[] = ALL_PHOTOS.map((photo, index) => {
  return {
    id: photo.id,
    photoIndex: index,
    image: photo.image,
    title: photo.title,
    place: photo.tag,
    hiddenNote: photo.caption,
  };
});

const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  {
    id: 1,
    question: '¿Qué comió Flor con las manos por primera vez en el auto cerca de Chango Más?',
    options: [
      'Un súper lomito del carrito (¡y Toti le sacó foto riéndose!)',
      'Una pizza de muzzarella al molde',
      'Un cuarto de helado de dulce de leche',
    ],
    correctIndex: 0,
    explanation: '¡El lomito del carrito! Flor siempre se cuida con la comida pero conmigo me acompaña en todo. Verte comer con la mano fue un momento único y hermoso.',
  },
  {
    id: 2,
    question: '¿Quién cocinó unos ñoquis caseros que fueron como una nube de tan livianitos?',
    options: [
      'Toti probando ser chef italiano',
      'Flor (Lihue), la mejor cocinera del universo (¡Toti se bajó 3 platos!)',
      'Pedimos delivery a una casa de pastas',
    ],
    correctIndex: 1,
    explanation: '¡Flor! Esos ñoquis estaban tan suaves y livianitos que parecían una nube en el paladar... ¡imposible no comerse tres platos enteros!',
  },
  {
    id: 3,
    question: '¿A qué recital fuimos a cantar a todo pulmón bajo el confeti gracias a unas entradas ganadas en la chamba?',
    options: [
      'Recital de Emanero',
      'Show de Miranda',
      'Festival de Los Tekis',
    ],
    correctIndex: 0,
    explanation: '¡Emanero! Gané esas entradas en la chamba y la pasamos increíble cantando entre la multitud bajo una lluvia mágica de papelitos.',
  },
  {
    id: 4,
    question: '¿Cómo se lookeó la Duque para ver y alentar a la Selección en el Mundial?',
    options: [
      'De smoking y moñito',
      'Con la camiseta argentina y piluso albiceleste',
      'Con un buzo verde agua',
    ],
    correctIndex: 1,
    explanation: '¡Camiseta y piluso de la Selección! Duque es el hincha n°1 de nuestra familia y no se pierde ningún partido.',
  },
  {
    id: 5,
    question: '¿Qué actividad artística e inédita hicimos juntos por primera vez en la Quebrada?',
    options: [
      'Hacer stickers / stinker personalizados juntos',
      'Pintar un cuadro al óleo',
      'Tirarnos en tirolesa',
    ],
    correctIndex: 0,
    explanation: '¡Hicimos stickers juntos por primera vez! Me hizo tan feliz verte concentrada, contenta y compartiendo algo tan creativo de a dos.',
  },
  {
    id: 6,
    question: 'Cuando tenemos una discusión y Flor se queda muda... ¿qué es lo que siempre hacemos?',
    options: [
      'Toti se enoja y no nos hablamos en tres días',
      'Lo hablamos desde el corazón, nos arreglamos y salimos más unidos',
      'Tiramos una moneda a ver quién tiene la culpa',
    ],
    correctIndex: 1,
    explanation: '¡Lo hablamos y lo superamos juntos! A veces me enojo cuando te quedás calladita jaja, pero siempre lo hablamos desde el corazón, nos arreglamos y salimos más fuertes. Es hermoso construir esto juntos.',
  },
];

const LOVE_COUPONS: LoveCoupon[] = [
  {
    id: 1,
    icon: '💆‍♀️',
    title: 'Vale por un masaje relajante de pies por Toti',
    subtitle: 'RELAX TOTAL',
    description: 'Válido para cuando llegues cansada de la guardia o después de un día largo. 30 minutos de mimos garantizados.',
    terms: 'Vencimiento: Sin límite de fecha · Canjeable ilimitadas veces',
    whatsappText: '¡Hola mi amor! Canjeo mi cupón de aniversario: Vale por un masaje relajante de pies por Toti 💆‍♀️♡ ¡Prepará los aceites!',
  },
  {
    id: 2,
    icon: '🍝',
    title: 'Vale por una noche de tus pastas favoritas',
    subtitle: 'NOCHE GOURMET',
    description: 'Un platazo de pastas delicioso (o los famosos ñoquis nube), copita de vino y Toti se encarga de lavar todos los platos.',
    terms: 'Vencimiento: Sin vencimiento · Flor solo se sienta a disfrutar',
    whatsappText: '¡Hola Toti! Vengo a canjear mi cupón oficial: Vale por una noche de pastas favoritas 🍝 ¡Y acordate que vos lavás los platos!',
  },
  {
    id: 3,
    icon: '🎲',
    title: 'Vale por una tarde maratónica de juegos de mesa',
    subtitle: 'DIVERSIÓN DE A DOS',
    description: 'Flor elige el juego de mesa, pone la música y elige merienda con mates y risas garantizadas.',
    terms: 'Prohibido picarse si alguien pierde',
    whatsappText: '¡Hola amor! Canjeo mi cupón de juegos de mesa 🎲 Hoy me toca ganar a mí, andá preparando los mates!',
  },
  {
    id: 4,
    icon: '🥪',
    title: 'Vale por una salida al carrito o comida sin culpa',
    subtitle: 'PERMITIDO ESPECIAL',
    description: 'Válido para comer un súper lomito con la mano cerca de Chango Más o donde quieras, sin contar calorías.',
    terms: 'Obligatorio comer con la mano y reírse mucho',
    whatsappText: '¡Hola Toti! Canjeo mi cupón del lomito del carrito 🥪 Hoy rompemos la dieta juntos!',
  },
  {
    id: 5,
    icon: '🫂',
    title: 'Vale por un abrazo infinito anti-mudez',
    subtitle: 'AMOR INCONDICIONAL',
    description: 'Válido para esos momentos en los que cueste hablar. Un abrazo apretado hasta que vuelva la sonrisa y el corazón se calme.',
    terms: 'Cura garantizada para cualquier momento difícil',
    whatsappText: '¡Hola mi vida! Canjeo mi cupón de abrazo infinito anti-mudez 🫂 Te amo muchísimo.',
  },
  {
    id: 6,
    icon: '🚗',
    title: 'Vale por un viaje sorpresa a cualquier cerro de Jujuy',
    subtitle: 'NUEVA AVENTURA',
    description: 'Vos elegís el destino: Purmamarca, Salinas, Reyes o donde se te ocurra. Cargamos el termo y partimos.',
    terms: 'Incluye fotos locas y besos con viento',
    whatsappText: '¡Hola mi amor! Canjeo mi cupón de viaje sorpresa por Jujuy 🚗 ¿Cuándo salimos?',
  },
];

const REASONS: LoveReason[] = [
  {
    id: 1,
    category: 'Razón',
    quote: 'Por tu risa hermosa que ilumina todo, por las tardes de juegos de mesa y porque amo con el alma cada vez que jugamos juntos.',
    highlight: 'Tu risa tan linda y nuestros juegos',
    emoji: '🎲',
    photo: 'aventuras/foto47.jpeg',
  },
  {
    id: 2,
    category: 'Detalle',
    quote: 'Por tu amor por las pastas y ese tono verde agua tan tuyo. Te gusta cuidarte con la comida, pero conmigo te sumás y me acompañás en absolutamente todo.',
    highlight: 'Tu dulzura y tu compañía incondicional',
    emoji: '🍝',
    photo: 'aventuras/foto25.jpeg',
  },
  {
    id: 3,
    category: 'Promesa',
    quote: 'Aunque a veces nos enojemos o te quedes callada cuando discutimos, siempre lo hablamos con el corazón, lo superamos y salimos más unidos que nunca.',
    highlight: 'Superar cada obstáculo juntos',
    emoji: '🤍',
    photo: 'aventuras/foto22.jpeg',
  },
  {
    id: 4,
    category: 'Recuerdo',
    quote: 'Nuestra primera foto en Yala cuando recién nos íbamos conociendo y todavía no éramos novios. Ya en ese momento supe que eras la indicada.',
    highlight: 'Aquel primer día en Yala',
    emoji: '✨',
    photo: 'memories/yala.jpeg',
  },
  {
    id: 5,
    category: 'Promesa',
    quote: 'Sos la persona más hermosa del mundo, por dentro y por fuera. Mi sueño más grande es seguir caminando a tu lado y compartir muchísimo tiempo con vos.',
    highlight: 'Querer una vida entera juntos',
    emoji: '💍',
    photo: 'aventuras/foto50.jpeg',
  },
  {
    id: 6,
    category: 'Razón',
    quote: 'Porque te amo hasta la palmera y después al cielo, ida y vuelta... y te volvería a elegir en cada una de mis vidas.',
    highlight: 'Un amor infinito',
    emoji: '♾️',
    photo: 'aventuras/foto51.jpeg',
  },
];

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [heartsTriggered, setHeartsTriggered] = useState(false);

  // Slideshow dinámico de fotos en la portada
  const [heroPhotoIdx, setHeroPhotoIdx] = useState(0);

  // Modal de álbum completo de 51 fotos
  const [albumOpen, setAlbumOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Pasaje de diapositivas interactivo (Slideshow central)
  const [slideIndex, setSlideIndex] = useState(0);
  const [isAutoSlide, setIsAutoSlide] = useState(true);

  const audioRef = useRef<HTMLAudioElement>(null);

  // Actualizar contador cada segundo
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Rotar fotos de fondo en la portada cada 5 segundos
  useEffect(() => {
    const heroTimer = setInterval(() => {
      setHeroPhotoIdx(prev => (prev + 1) % HERO_PHOTOS.length);
    }, 5000);
    return () => clearInterval(heroTimer);
  }, []);

  // Pasaje de fotos automático para el carrusel de aventuras
  useEffect(() => {
    if (!isAutoSlide) return;
    const slideTimer = setInterval(() => {
      setSlideIndex(prev => (prev + 1) % ALL_PHOTOS.length);
    }, 3500);
    return () => clearInterval(slideTimer);
  }, [isAutoSlide]);

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
      } catch (err) {
        console.error('Audio play error:', err);
      }
    }
  };

  const wasMusicPlayingBeforeVideoRef = useRef(false);

  const handleVideoPlay = () => {
    if (audioRef.current && !audioRef.current.paused) {
      wasMusicPlayingBeforeVideoRef.current = true;
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoPauseOrEnded = () => {
    if (wasMusicPlayingBeforeVideoRef.current && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        wasMusicPlayingBeforeVideoRef.current = false;
      }).catch(err => console.error('Error reanudando audio:', err));
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

  const openAlbumAt = (index: number) => {
    setCurrentPhotoIndex(index);
    setAlbumOpen(true);
  };

  const nextPhoto = () => {
    setCurrentPhotoIndex(prev => (prev + 1) % ALL_PHOTOS.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex(prev => (prev - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length);
  };

  // Estado para el collage dinámico de tarjetas 3D
  const [visibleCollageCount, setVisibleCollageCount] = useState<number>(12);

  // Estado para el mini-juego interactivo (Trivia & Cupones)
  const [gameTab, setGameTab] = useState<'trivia' | 'coupons'>('trivia');
  const [triviaIndex, setTriviaIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [triviaAnswers, setTriviaAnswers] = useState<Record<number, number>>({});
  const [triviaFinished, setTriviaFinished] = useState<boolean>(false);

  const handleSelectOption = (optionIndex: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(optionIndex);
    setTriviaAnswers(prev => ({ ...prev, [triviaIndex]: optionIndex }));
    if (optionIndex === TRIVIA_QUESTIONS[triviaIndex].correctIndex) {
      triggerHearts();
    }
  };

  const nextTriviaQuestion = () => {
    if (triviaIndex < TRIVIA_QUESTIONS.length - 1) {
      setTriviaIndex(prev => prev + 1);
      setSelectedOption(null);
    } else {
      setTriviaFinished(true);
      triggerHearts();
    }
  };

  const restartTrivia = () => {
    setTriviaIndex(0);
    setSelectedOption(null);
    setTriviaAnswers({});
    setTriviaFinished(false);
  };

  const correctTriviaCount = Object.entries(triviaAnswers).filter(
    ([qIdx, ansIdx]) => TRIVIA_QUESTIONS[Number(qIdx)]?.correctIndex === ansIdx
  ).length;

  const whatsappMessage = encodeURIComponent(
    '¡Mi amor! Me encantó toda la sorpresa de aniversario con nuestros videos, el collage y todas nuestras fotos... Gracias por recordar cada detalle, te amo con todo mi corazón ❤️✨'
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
      />

      {/* =========================================================
          SECCIÓN 1: LA PORTADA (Ken Burns Slideshow + Impacto Emocional)
      ========================================================= */}
      <section className="section-hero">
        <div className="hero-bg-wrapper">
          <AnimatePresence mode="sync">
            <motion.img
              key={heroPhotoIdx}
              src={`${base}${HERO_PHOTOS[heroPhotoIdx]}`}
              alt="Flor y Toti"
              className="hero-bg-img"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />
          </AnimatePresence>
          <div className="hero-overlay-gradient" />
        </div>

        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          {/* Polaroid Flotante Interactiva de Entrada */}
          <motion.div
            className="hero-polaroid-preview"
            initial={{ opacity: 0, rotate: -6, scale: 0.9 }}
            animate={{ opacity: 1, rotate: -3, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            onClick={() => openAlbumAt(0)}
          >
            <img src={`${base}aventuras/foto1.jpeg`} alt="Flor & Toti" />
            <span>nuestro primer año ♡</span>
          </motion.div>

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
            Un año de risas, mates compartidos, 51 recuerdos inolvidables y la certeza infinita de elegirte todos los días.
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
            onClick={() => document.getElementById('collage-destacado')?.scrollIntoView({ behavior: 'smooth' })}
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
          CINTA CONTINUA DE FOTOS (TICKER FOTOGRÁFICO DE AVENTURAS)
      ========================================================= */}
      <div className="photo-tape-ticker" aria-hidden="true">
        <div className="photo-tape-track">
          {ALL_PHOTOS.slice(0, 16).map((photo, i) => (
            <div key={i} className="photo-tape-item" onClick={() => openAlbumAt(i)}>
              <img src={`${base}${photo.image}`} alt="" loading="lazy" />
            </div>
          ))}
          {ALL_PHOTOS.slice(0, 16).map((photo, i) => (
            <div key={`dup-${i}`} className="photo-tape-item" onClick={() => openAlbumAt(i)}>
              <img src={`${base}${photo.image}`} alt="" loading="lazy" />
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================
          SECCIÓN 2: EL MEJOR COLLAGE & PASAJE DE FOTOS (SLIDESHOW LUXE)
      ========================================================= */}
      <section id="collage-destacado" className="section-gallery">
        <div className="section-header-editorial">
          <span className="editorial-tag">CAPÍTULO I</span>
          <h2 className="editorial-title">
            Collage de instantes <em className="editorial-italic">únicos</em>
          </h2>
          <p className="editorial-lead">
            Tocá cualquier tarjeta para girarla y leer su dedicatoria secreta, o tocala en "Ver en grande" para apreciarla en pantalla completa.
          </p>
        </div>

        {/* Mosaico interactivo 3D con todas las fotos */}
        <div className="gallery-mosaic-grid">
          {ALL_COLLAGE_CARDS.slice(0, visibleCollageCount).map((item) => {
            const isFlipped = !!flippedCards[item.id];
            return (
              <div
                key={item.id}
                className="mosaic-card-wrapper"
                onClick={() => toggleCardFlip(item.id)}
              >
                <div className={`mosaic-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
                  <div className="mosaic-card-front">
                    <img
                      src={`${base}${item.image}`}
                      alt={item.title}
                      className="mosaic-img"
                      loading="lazy"
                    />

                    {/* Botón directo para ver en grande */}
                    <button
                      type="button"
                      className="mosaic-expand-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        openAlbumAt(item.photoIndex);
                      }}
                      title="Ver foto en grande"
                      aria-label="Ver foto en tamaño completo"
                    >
                      <Maximize2 size={12} />
                      <span>Ver en grande</span>
                    </button>

                    <div className="mosaic-front-overlay">
                      <span className="mosaic-place">{item.place}</span>
                      <h4 className="mosaic-title">{item.title}</h4>
                      <span className="mosaic-flip-hint">
                        <RotateCw size={12} /> Tocá para girar
                      </span>
                    </div>
                  </div>

                  <div className="mosaic-card-back">
                    <div className="mosaic-back-content">
                      <Heart size={20} className="back-heart-icon" />
                      <span className="back-tag">{item.place}</span>
                      <p className="back-note">"{item.hiddenNote}"</p>

                      <button
                        type="button"
                        className="back-zoom-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          openAlbumAt(item.photoIndex);
                        }}
                      >
                        <Maximize2 size={12} />
                        <span>Ver foto en grande</span>
                      </button>

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

        {/* Controles de expansión del collage */}
        <div className="collage-expand-controls">
          <span className="collage-count-pill">
            Mostrando {Math.min(visibleCollageCount, ALL_COLLAGE_CARDS.length)} de {ALL_COLLAGE_CARDS.length} recuerdos en tarjetas 3D
          </span>
          <div className="collage-btn-row">
            {visibleCollageCount < ALL_COLLAGE_CARDS.length ? (
              <>
                <button
                  type="button"
                  className="collage-action-btn primary"
                  onClick={() => setVisibleCollageCount(prev => Math.min(prev + 12, ALL_COLLAGE_CARDS.length))}
                >
                  <Sparkles size={14} />
                  <span>Cargar 12 fotos más</span>
                </button>
                <button
                  type="button"
                  className="collage-action-btn secondary"
                  onClick={() => setVisibleCollageCount(ALL_COLLAGE_CARDS.length)}
                >
                  <span>Ver todas las 51 tarjetas</span>
                </button>
              </>
            ) : (
              <button
                type="button"
                className="collage-action-btn secondary"
                onClick={() => setVisibleCollageCount(12)}
              >
                <span>Mostrar menos fotos (12)</span>
              </button>
            )}
          </div>
        </div>

        {/* Pasaje de fotos cinemático interactivo (Slideshow Showcase) */}
        <div className="slideshow-showcase-card">
          <div className="slideshow-header">
            <div className="slideshow-badge">
              <Camera size={13} />
              <span>PASAJE DE FOTOS EN VIVO</span>
            </div>
            <span className="slideshow-counter">
              {slideIndex + 1} de {ALL_PHOTOS.length}
            </span>
          </div>

          <div
            className="slideshow-stage"
            onMouseEnter={() => setIsAutoSlide(false)}
            onMouseLeave={() => setIsAutoSlide(true)}
            onTouchStart={() => setIsAutoSlide(false)}
            onTouchEnd={() => setIsAutoSlide(true)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={slideIndex}
                src={`${base}${ALL_PHOTOS[slideIndex].image}`}
                alt={ALL_PHOTOS[slideIndex].title}
                className="slideshow-current-img"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.45 }}
                onClick={() => openAlbumAt(slideIndex)}
              />
            </AnimatePresence>

            <button
              className="slideshow-arrow left-arrow"
              onClick={() => setSlideIndex(prev => (prev - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length)}
              aria-label="Foto anterior"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              className="slideshow-arrow right-arrow"
              onClick={() => setSlideIndex(prev => (prev + 1) % ALL_PHOTOS.length)}
              aria-label="Siguiente foto"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          <div className="slideshow-footer">
            <div className="slideshow-caption-box">
              <h4>{ALL_PHOTOS[slideIndex].title}</h4>
              <p>{ALL_PHOTOS[slideIndex].caption}</p>
            </div>
            <button className="slideshow-expand-btn" onClick={() => openAlbumAt(slideIndex)}>
              <Maximize2 size={14} />
              <span>Ver en grande</span>
            </button>
          </div>
        </div>

        {/* Botón para abrir el visor completo de las 51 fotos */}
        <div className="album-cta-banner">
          <div className="album-cta-text">
            <ImageIcon size={22} className="album-icon" />
            <div>
              <h4>Álbum Completo de Nuestras 51 Aventuras</h4>
              <p>Todas nuestras fotos organizadas en alta resolución</p>
            </div>
          </div>
          <button className="open-full-album-btn" onClick={() => openAlbumAt(0)}>
            <span>Abrir Álbum (51 Fotos)</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </section>

      {/* =========================================================
          SECCIÓN 3: NUESTROS REELS EN VIDEO (MOMENTOS VIVOS)
      ========================================================= */}
      <section className="section-video-reels">
        <div className="section-header-editorial">
          <span className="editorial-tag">
            <Film size={12} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 4 }} />
            VIDEOS & AVENTURAS
          </span>
          <h2 className="editorial-title">
            Momentos en <em className="editorial-italic">movimiento</em>
          </h2>
          <p className="editorial-lead">
            Nuestras risas, gestos y recuerdos grabados en vivo para volver a vivirlos una y otra vez.
          </p>
        </div>

        <div className="video-reels-grid">
          {VIDEO_MEMORIES.map((vid, i) => (
            <motion.div
              key={vid.id}
              className="video-reel-card"
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="video-player-container">
                <video
                  src={`${base}${vid.videoSrc}`}
                  className="reel-video-element"
                  playsInline
                  loop
                  controls
                  preload="metadata"
                  onPlay={handleVideoPlay}
                  onPause={handleVideoPauseOrEnded}
                  onEnded={handleVideoPauseOrEnded}
                />
              </div>
              <div className="video-reel-info">
                <span className="video-reel-tag">{vid.tag}</span>
                <h3 className="video-reel-title">{vid.title}</h3>
                <p className="video-reel-desc">{vid.caption}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* =========================================================
          SECCIÓN 4: LÍNEA DE TIEMPO DE NUESTROS HITOS
      ========================================================= */}
      <section id="linea-de-tiempo" className="section-timeline">
        <div className="section-header-editorial">
          <span className="editorial-tag">CAPÍTULO II</span>
          <h2 className="editorial-title">
            Nuestros hitos <em className="editorial-italic">inolvidables</em>
          </h2>
          <p className="editorial-lead">
            Los pasos que fuimos dando juntos, desde aquel primer día en Yala hasta este hermoso presente.
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
                <div className="timeline-dot-marker">
                  <span className="dot-inner" />
                </div>

                <div className="timeline-card">
                  <div className="timeline-card-image-wrap" onClick={() => openAlbumAt(index)}>
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
                {/* Mini foto polaroid temática para cada razón */}
                <div className="reason-photo-thumb-wrap" onClick={() => openAlbumAt(activeReasonIndex * 8)}>
                  <img
                    src={`${base}${REASONS[activeReasonIndex].photo}`}
                    alt="Recuerdo con Flor"
                    className="reason-photo-thumb"
                  />
                  <span className="reason-photo-heart">♥</span>
                </div>

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
          SECCIÓN 5: CAPÍTULO IV · EL JUEGO DE NOSOTROS DOS (TRIVIA & CUPONES)
      ========================================================= */}
      <section id="juego-de-pareja" className="section-game">
        <div className="section-header-editorial">
          <span className="editorial-tag">CAPÍTULO IV</span>
          <h2 className="editorial-title">
            El juego de mesa de <em className="editorial-italic">nosotros dos</em>
          </h2>
          <p className="editorial-lead">
            Porque amo con el alma cuando jugamos juntos y nos reímos de nuestras locuras. ¿Cuánto conocés de nuestras aventuras?
          </p>
        </div>

        {/* Selector de modo de juego */}
        <div className="game-tabs-bar">
          <button
            type="button"
            className={`game-tab-btn ${gameTab === 'trivia' ? 'is-active' : ''}`}
            onClick={() => setGameTab('trivia')}
          >
            <Dices size={16} />
            <span>Trivia de Pareja</span>
          </button>
          <button
            type="button"
            className={`game-tab-btn ${gameTab === 'coupons' ? 'is-active' : ''}`}
            onClick={() => setGameTab('coupons')}
          >
            <Gift size={16} />
            <span>Cupones de Amor</span>
          </button>
        </div>

        {gameTab === 'trivia' ? (
          <div className="trivia-card-container">
            {!triviaFinished ? (
              <div className="trivia-interactive-box">
                <div className="trivia-progress-header">
                  <span className="trivia-step-pill">
                    Pregunta {triviaIndex + 1} de {TRIVIA_QUESTIONS.length}
                  </span>
                  <div className="trivia-progress-track">
                    <div
                      className="trivia-progress-fill"
                      style={{
                        width: `${((triviaIndex + 1) / TRIVIA_QUESTIONS.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <h3 className="trivia-question-text">
                  {TRIVIA_QUESTIONS[triviaIndex].question}
                </h3>

                <div className="trivia-options-list">
                  {TRIVIA_QUESTIONS[triviaIndex].options.map((opt, optIdx) => {
                    const isSelected = selectedOption === optIdx;
                    const isCorrect = optIdx === TRIVIA_QUESTIONS[triviaIndex].correctIndex;
                    let optionStatusClass = '';
                    if (selectedOption !== null) {
                      if (isCorrect) optionStatusClass = 'is-correct';
                      else if (isSelected) optionStatusClass = 'is-wrong';
                    }

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        className={`trivia-option-btn ${optionStatusClass}`}
                        onClick={() => handleSelectOption(optIdx)}
                        disabled={selectedOption !== null}
                      >
                        <span className="option-letter">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="option-label">{opt}</span>
                        {selectedOption !== null && isCorrect && (
                          <CheckCircle2 size={16} className="correct-icon" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {selectedOption !== null && (
                  <motion.div
                    className={`trivia-feedback-box ${
                      selectedOption === TRIVIA_QUESTIONS[triviaIndex].correctIndex
                        ? 'feedback-correct'
                        : 'feedback-wrong'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <p className="feedback-message">
                      {selectedOption === TRIVIA_QUESTIONS[triviaIndex].correctIndex
                        ? '🎉 ¡Exacto, mi amor!'
                        : '💡 ¡Casi! La historia real fue:'}
                    </p>
                    <p className="feedback-explanation">
                      {TRIVIA_QUESTIONS[triviaIndex].explanation}
                    </p>

                    <button
                      type="button"
                      className="trivia-next-btn"
                      onClick={nextTriviaQuestion}
                    >
                      <span>
                        {triviaIndex < TRIVIA_QUESTIONS.length - 1
                          ? 'Siguiente pregunta'
                          : 'Ver resultado final'}
                      </span>
                      <ArrowRight size={15} />
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <motion.div
                className="trivia-results-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <div className="trivia-trophy-icon">
                  <Trophy size={48} />
                </div>
                <span className="results-badge">¡DESAFÍO COMPLETADO!</span>
                <h3 className="results-title">
                  Acertaste {correctTriviaCount} de {TRIVIA_QUESTIONS.length} preguntas
                </h3>
                <p className="results-desc">
                  Flor hermosa (Lihue), sos la mujer de mi vida. Me encanta recordar cada viaje, cada anécdota, los ñoquis livianitos, el lomito con la mano y cómo nos arreglamos hablando desde el corazón. ¡Te amo con el alma!
                </p>

                <div className="results-actions">
                  <button
                    type="button"
                    className="trivia-btn-restart"
                    onClick={restartTrivia}
                  >
                    <RotateCw size={15} />
                    <span>Jugar otra vez</span>
                  </button>
                  <button
                    type="button"
                    className="trivia-btn-coupons"
                    onClick={() => setGameTab('coupons')}
                  >
                    <Gift size={15} />
                    <span>Ver mis Cupones de Amor</span>
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="coupons-grid">
            {LOVE_COUPONS.map((coupon) => (
              <div key={coupon.id} className="coupon-ticket-card">
                <div className="coupon-ticket-notch notch-left" />
                <div className="coupon-ticket-notch notch-right" />
                <div className="coupon-header">
                  <span className="coupon-icon">{coupon.icon}</span>
                  <span className="coupon-subtitle">{coupon.subtitle}</span>
                </div>
                <h4 className="coupon-title">{coupon.title}</h4>
                <p className="coupon-desc">{coupon.description}</p>
                <span className="coupon-terms">{coupon.terms}</span>

                <a
                  href={`https://wa.me/5493884043875?text=${encodeURIComponent(coupon.whatsappText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="coupon-redeem-btn"
                  onClick={triggerHearts}
                >
                  <MessageCircle size={15} />
                  <span>Canjear por WhatsApp a Toti</span>
                </a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* =========================================================
          SECCIÓN 6: CAPÍTULO V · EL CIERRE (Nuestra Canción y Mensaje Final)
      ========================================================= */}
      <section className="section-letter-closing">
        <div className="letter-wrapper">
          <div className="letter-wax-seal">
            <Heart size={22} className="seal-heart" />
          </div>

          <div className="letter-inner-paper">
            <span className="letter-date-heading">20 DE SEPTIEMBRE DE 2026</span>
            <h2 className="letter-recipient">Para mi Flor Lihue hermosa,</h2>

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
            href={`https://wa.me/5493884043875?text=${whatsappMessage}`}
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

      {/* =========================================================
          MODAL INTERACTIVO DE ÁLBUM COMPLETO (51 FOTOGRAFÍAS)
      ========================================================= */}
      <AnimatePresence>
        {albumOpen && (
          <motion.div
            className="album-fullscreen-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="album-modal-backdrop" onClick={() => setAlbumOpen(false)} />

            <div className="album-modal-container" role="dialog" aria-modal="true" aria-label="Foto en grande">
              <div className="album-modal-header">
                <button
                  className="album-close-btn"
                  onClick={() => setAlbumOpen(false)}
                  aria-label="Cerrar álbum"
                >
                  <X size={18} />
                  <span>Salir</span>
                </button>
              </div>

              <div className="album-modal-stage">
                <div className="album-photo-frame">
                  <motion.img
                    key={currentPhotoIndex}
                    src={`${base}${ALL_PHOTOS[currentPhotoIndex].image}`}
                    alt={ALL_PHOTOS[currentPhotoIndex].title}
                    className="album-modal-img"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>



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
