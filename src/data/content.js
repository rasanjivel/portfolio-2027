// Tout le contenu est ici : remplace les textes et les chemins d'images par les tiens.
export const IMG = {
  hero: '/images/hero.jpeg',
  me: '/images/image.jpeg',
  reel: '/images/reel.svg',
  carousel: ['c1', 'c2', 'c3', 'c4', 'c5'].map((n) => `/images/${n}.${['c2', 'c3','c1', 'c4','c5'].includes(n) ? 'jpg' : 'svg'}`),
};
export const NAV = [['Expertise', 'expertise'], ['Portfolio', 'speaking'], ['Expérience', 'media'], ['Disponibilité', 'books'], ['À propos', 'about']];
export const ABOUT = "Anthonio Maminiela, développeur\u00a0\u00a0\u00a0Web\u00a0\u00a0et designer passionné \u00a0\u00a0\u00a0par \u00a0la création d'expériences numériques modernes, intuitives et créatives. J'aime transformer\u00a0\u00a0\u00a0les \u00a0   idées en projets concrets, alliant design, innovation\u00a0\u00a0\u00a0et technologie.";
export const CLIENTS = [
  ['Développement Web', 'font-bold tracking-tight'],
  ['UI/UX Design', 'font-black tracking-tight'],
  ['Identité Visuelle', 'font-serif font-semibold'],
  ['Design Graphique', 'font-medium tracking-wide'],
  ['Logo & Branding', 'italic font-bold'],
  ['Refonte de Sites Web', 'font-black tracking-tight'],
  ['Maquettage & Prototypage', 'font-medium tracking-tight'],
  ['Portfolio & Site Vitrine', 'font-serif font-medium'],
];
export const TALKS = [
  ['WEB DEVELOPMENT', 'Concevoir des expériences web modernes, performantes et adaptées à tous les écrans.'],
  ['UI/UX & DESIGN', 'Imaginer des interfaces intuitives, esthétiques et pensées pour l’expérience utilisateur.'],
  ['VISUAL IDENTITY', 'Créer des identités visuelles fortes qui donnent une personnalité unique à chaque marque.'],
];
export const KEYNOTE = 'Durant toute la période\u00a0\u00a0\u00a02025 – 2026, j’ai eu l’occasion de développer mes compétences, d’explorer de nouvelles idées\u00a0\u00a0\u00a0et de participer à différents projets dans le domaine du développement web\u00a0\u00a0\u00a0et du design. Chaque expérience m’a permis d’apprendre, de relever de nouveaux défis\u00a0\u00a0\u00a0et de faire évoluer ma créativité ainsi que mon savoir-faire.';

// Expérience (affichée par la fonction Press() de Sections.jsx)
export const PRESS = [
  { tag: 'Déc. 2024', t: '1ère Hackathon', s: 'INSI · Création site web', d: 'Site web pour mettre en valeur Madagasikara, travail en équipe.', img: '/images/image1.jpeg' },
  { tag: 'Nov. 2024', t: '2ème Hackathon', s: 'INSI · Création site web et mobile', d: 'Conception web et mobile multiplateforme en environnement collaboratif.', img: '/images/hackathon.jpeg' },
  { tag: 'Oct. 2025', t: 'DevFest', s: 'Création site web', d: 'Un site web sur le thème de l’IA.', img: '/images/devfest.jpg' },
  { tag: 'Déc. 2025', t: 'Creative Hub', s: 'Junior Web Developer', d: 'Intégration d’interfaces responsives et maintenance de solutions CMS.', img: '/images/création_hub.jpg' },
];

export const BOOKS = "Dive into Sunny's world of big ideas and bold action—books that challenge convention and spark creative courage.";
export const FOOTER = [
  ['Navigation', [
    ['Accueil', 'top'],
    ['Expertise', 'expertise'],
    ['Expérience', 'media'],
    ['Services', 'books'],
    ['À propos', 'about'],
    ['Contact', 'contact'],
  ]],
  ['Expertises', [
    ['Développement Web', 'talk-web-development'],
    ['UI/UX & Design', 'talk-ui-ux-design'],
    ['Identité Visuelle', 'talk-visual-identity'],
  ]],
];

// Tes coordonnées (affichées dans le footer). Laisse '' pour masquer une ligne.
export const CONTACT = {
  phone: '033 97 353 71',
  phone2: '038 60 762 02',
  email: 'maminielaa@gmail.com',
  location: 'Antananarivo, Madagascar',
};

export const SOCIALS = [
  ['Instagram', 'https://www.instagram.com/maminielaanthonio/'],
  ['GitHub', 'https://github.com/Anthonio-rma'],
  ['Facebook', 'https://www.facebook.com/mamisoa.razakandrainy.9'],
];