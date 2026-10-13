export const LANGUAGES = {
    en: 'EN',
    es: 'ES',
} as const;

export type Lang = keyof typeof LANGUAGES;
export const DEFAULT_LANG: Lang = 'en';

export const ui = {
    en: {
        'site.description': 'Welcome to my portfolio! Here you can find information about me, my projects, and how to contact me.',
        'nav.home': 'Home',
        'nav.projects': 'Projects',
        'nav.about': 'About',
        'nav.experience': 'Experience',
        'nav.menu': 'Open menu',
        'nav.language': 'Language',
        'hero.greeting': 'Hi,',
        'hero.greetingEnd': 'here',
        'hero.title1': 'SOFT|WARE',
        'hero.title2': 'ENGINEER',
        'hero.subtitle1': 'Software engineer passionate about building solutions.',
        'hero.subtitle2': 'I work with APIs, data and web technologies to design, optimize and scale systems.',
        'hero.viewProjects': 'View Projects',
        'hero.resume': 'Resume.pdf',
        'hero.photoAlt': 'Portrait of Samuel Castro',
        'projects.title': 'Projects',
        'projects.viewProject': 'View project',
        'projects.more': 'More Projects',
        'projects.moreSub': 'Check out my lab experiments',
        'about.title': 'About Me',
        'experience.title': 'Experience Log',
        'experience.present': 'PRESENT',
        'experience.statusOk': 'STATUS: [EXEC_OK]',
        'experience.statusArchived': 'STATUS: [ARCHIVED]',
        'experience.role': 'ROLE:',
        'experience.tracing': 'TRACING ACTIVE',
        'footer.credits': 'Built and designed by Samuel Castro.',
        'footer.rights': 'All rights reserved.',
    },
    es: {
        'site.description': '¡Bienvenido a mi portafolio! Aquí encontrarás información sobre mí, mis proyectos y cómo contactarme.',
        'nav.home': 'Inicio',
        'nav.projects': 'Proyectos',
        'nav.about': 'Sobre mí',
        'nav.experience': 'Experiencia',
        'nav.menu': 'Abrir menú',
        'nav.language': 'Idioma',
        'hero.greeting': 'Hola, soy',
        'hero.greetingEnd': '',
        'hero.title1': 'INGE|NIERO',
        'hero.title2': 'DE SOFTWARE',
        'hero.subtitle1': 'Ingeniero de software apasionado por construir soluciones.',
        'hero.subtitle2': 'Trabajo con APIs, datos y tecnologías web para diseñar, optimizar y escalar sistemas.',
        'hero.viewProjects': 'Ver Proyectos',
        'hero.resume': 'CV.pdf',
        'hero.photoAlt': 'Retrato de Samuel Castro',
        'projects.title': 'Proyectos',
        'projects.viewProject': 'Ver proyecto',
        'projects.more': 'Más Proyectos',
        'projects.moreSub': 'Mira mis experimentos de laboratorio',
        'about.title': 'Sobre Mí',
        'experience.title': 'Registro de Experiencia',
        'experience.present': 'ACTUAL',
        'experience.statusOk': 'ESTADO: [EXEC_OK]',
        'experience.statusArchived': 'ESTADO: [ARCHIVADO]',
        'experience.role': 'ROL:',
        'experience.tracing': 'TRAZA ACTIVA',
        'footer.credits': 'Diseñado y desarrollado por Samuel Castro.',
        'footer.rights': 'Todos los derechos reservados.',
    },
} as const;

export type UiKey = keyof (typeof ui)[typeof DEFAULT_LANG];

export function useTranslations(lang: Lang) {
    return (key: UiKey): string => ui[lang][key] ?? ui[DEFAULT_LANG][key];
}

/** URL de la misma página en otro idioma: "/" para el idioma por defecto, "/es/" para el resto. */
export function getLangUrl(lang: Lang): string {
    return lang === DEFAULT_LANG ? '/' : `/${lang}/`;
}
