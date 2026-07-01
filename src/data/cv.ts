// Datos del CV — bilingüe (ES / EN). Edita aquí para actualizar tu contenido.

export type SkillGroup = { label: string; items: string[] }
export type Job = {
  role: string
  company: string
  location: string
  dates: string
  bullets: string[]
}
export type Edu = {
  degree: string
  school: string
  location: string
  dates: string
}

export type ContactLabels = {
  email: string
  linkedin: string
  whatsapp: string
  location: string
}

export type LangData = {
  role: string
  loc: string
  exp: string
  resumen: string
  skillGroups: SkillGroup[]
  jobs: Job[]
  edu: Edu
  certs: string[]
  langsLine: string
  certsLabel: string
  langsLabel: string
  downloadLabel: string
  contactLabels: ContactLabels
}

export type Lang = 'es' | 'en'

export const CONTACT = {
  email: 'escg19@gmail.com',
  linkedin: 'linkedin.com/in/escontreras',
  linkedinUrl: 'https://linkedin.com/in/escontreras',
  whatsapp: '+57 350 291 5526',
  whatsappUrl: 'https://wa.me/573502915526',
  location: 'Cúcuta, Colombia',
  name: 'Edgar Contreras',
  cvFile: 'Edgar_Contreras_CV.pdf'
}

export const TABS = [
  {
    id: 'resumen',
    es: 'resumen',
    en: 'summary',
    cmd: { es: 'cat resumen.md', en: 'cat summary.md' }
  },
  {
    id: 'skills',
    es: 'habilidades',
    en: 'skills',
    cmd: { es: 'ls -la skills/', en: 'ls -la skills/' }
  },
  {
    id: 'exp',
    es: 'experiencia',
    en: 'experience',
    cmd: {
      es: 'git log --oneline experiencia',
      en: 'git log --oneline experience'
    }
  },
  {
    id: 'edu',
    es: 'educación',
    en: 'education',
    cmd: { es: 'cat educacion.md', en: 'cat education.md' }
  },
  {
    id: 'contact',
    es: 'contacto',
    en: 'contact',
    cmd: { es: 'cat contacto.txt', en: 'cat contact.txt' }
  }
] as const

export const CV: Record<Lang, LangData> = {
  es: {
    role: 'Front-End Lead',
    loc: 'Cúcuta, Colombia',
    exp: '5 años de experiencia',
    resumen:
      'Ingeniero en Informática con 5 años de experiencia especializada en el ecosistema JavaScript/TypeScript (React, Next.js, React Native). Como Tech Lead Front-End, me enfoco en la arquitectura de soluciones escalables y la optimización del ciclo de vida de desarrollo (SDLC) mediante la integración de Inteligencia Artificial Generativa. Experto en potenciar la productividad técnica con flujos de trabajo avanzados en Claude Projects y herramientas de IA para la estandarización de código, reduciendo tiempos de entrega y garantizando la calidad del software.',
    skillGroups: [
      {
        label: 'frameworks & librerías',
        items: [
          'React.js',
          'React Native (Expo)',
          'Next.js',
          'NativeWind',
          'Tailwind CSS',
          'Redux',
          'Zustand',
          'TanStack Query',
          'Zod'
        ]
      },
      {
        label: 'ingeniería de software',
        items: [
          'TypeScript',
          'JavaScript (ES6+)',
          'Micro-Frontends',
          'CI/CD',
          'Jest'
        ]
      },
      {
        label: 'ia & productividad',
        items: [
          'Claude Projects',
          'Claude Code',
          'Claude Design',
          'Windsurf',
          'Cursor',
          'Prompt Engineering',
          'Automatización'
        ]
      },
      {
        label: 'herramientas & cloud',
        items: [
          'Git / GitHub',
          'App Store Connect',
          'Google Play Console',
          'Agora SDK',
          'Firebase'
        ]
      }
    ],
    jobs: [
      {
        role: 'Tech Lead Front-End',
        company: 'Livehappy',
        location: 'Bogotá, Colombia',
        dates: 'Nov 2024 — Presente',
        bullets: [
          'Liderazgo en el desarrollo de aplicaciones móviles para clientes y operadores con React Native (Expo Go) y TypeScript.',
          'Gestión de despliegue y lanzamiento en App Store y Google Play, asegurando estabilidad y rendimiento.',
          'Diseño y construcción del portal administrativo y una PWA estratégica para el incremento de ventas.',
          'Optimización de la productividad con IA: flujos en Claude Projects y Claude Code, reduciendo los tiempos de desarrollo un 25%.'
        ]
      },
      {
        role: 'Desarrollador de Software',
        company: 'Grupo Centria',
        location: 'Panamá (Remoto)',
        dates: 'Nov 2022 — Nov 2024',
        bullets: [
          'Desarrollo de una plataforma innovadora de guest posting con IA para automatizar la generación de artículos.',
          'Creación de una librería de UI personalizada para estandarizar componentes y reducir tiempos de desarrollo.',
          'Implementación de un sistema de videollamadas en tiempo real integrando el SDK de Agora.'
        ]
      },
      {
        role: 'Desarrollador de Software (Freelance)',
        company: 'Independiente',
        location: 'San Cristóbal, Venezuela',
        dates: 'Ago 2020 — Nov 2022',
        bullets: [
          'Diseño y desarrollo de sitios web personalizados de alto rendimiento con JavaScript, React y C++.',
          'Consultoría técnica en gestión de dominios, configuración de servidores e infraestructura web.'
        ]
      }
    ],
    edu: {
      degree: 'Ingeniería en Informática',
      school: 'Universidad Nacional Experimental del Táchira (UNET)',
      location: 'San Cristóbal, Venezuela',
      dates: '2014 — 2023'
    },
    certs: [
      'Escuela de Desarrollo Web — Platzi (2019)',
      'Configuración e Instalación de Redes — CISCO / UNET (2018)'
    ],
    langsLine: 'Español: Nativo · Inglés: B1 (Competencia profesional)',
    certsLabel: 'certificaciones',
    langsLabel: 'idiomas',
    downloadLabel: 'Descargar CV (PDF)',
    contactLabels: {
      email: 'correo',
      linkedin: 'linkedin',
      whatsapp: 'whatsapp',
      location: 'ubicación'
    }
  },
  en: {
    role: 'Front-End Lead',
    loc: 'Cúcuta, Colombia',
    exp: '5 years of experience',
    resumen:
      'Computer Engineer with 5 years of experience specialized in the JavaScript/TypeScript ecosystem (React, Next.js, React Native). As a Front-End Tech Lead, I focus on architecting scalable solutions and optimizing the software development life cycle (SDLC) through Generative AI integration. Expert in boosting technical productivity with advanced workflows in Claude Projects and AI tools for code standardization, reducing delivery times while ensuring software quality.',
    skillGroups: [
      {
        label: 'frameworks & libraries',
        items: [
          'React.js',
          'React Native (Expo)',
          'Next.js',
          'NativeWind',
          'Tailwind CSS',
          'Redux',
          'Zustand',
          'TanStack Query',
          'Zod'
        ]
      },
      {
        label: 'software engineering',
        items: [
          'TypeScript',
          'JavaScript (ES6+)',
          'Micro-Frontends',
          'CI/CD',
          'Jest'
        ]
      },
      {
        label: 'ai & productivity',
        items: [
          'Claude Projects',
          'Claude Code',
          'Claude Design',
          'Windsurf',
          'Cursor',
          'Prompt Engineering',
          'Automation'
        ]
      },
      {
        label: 'tools & cloud',
        items: [
          'Git / GitHub',
          'App Store Connect',
          'Google Play Console',
          'Agora SDK',
          'Firebase'
        ]
      }
    ],
    jobs: [
      {
        role: 'Front-End Tech Lead',
        company: 'Livehappy',
        location: 'Bogotá, Colombia',
        dates: 'Nov 2024 — Present',
        bullets: [
          'Led mobile app development for clients and operators using React Native (Expo Go) and TypeScript.',
          'Managed deployment and release on the App Store and Google Play, ensuring stability and performance.',
          'Designed and built the admin portal and a strategic PWA to drive sales growth.',
          'Boosted productivity with AI: workflows in Claude Projects and Claude Code, cutting development time by 25%.'
        ]
      },
      {
        role: 'Software Developer',
        company: 'Grupo Centria',
        location: 'Panama (Remote)',
        dates: 'Nov 2022 — Nov 2024',
        bullets: [
          'Built an innovative guest-posting platform using AI to automate article generation.',
          'Created a custom UI library to standardize design components and reduce development time.',
          'Implemented a real-time video-call system integrating the Agora SDK.'
        ]
      },
      {
        role: 'Software Developer (Freelance)',
        company: 'Independent',
        location: 'San Cristóbal, Venezuela',
        dates: 'Aug 2020 — Nov 2022',
        bullets: [
          'Designed and developed high-performance custom websites with JavaScript, React and C++.',
          'Technical consulting on domain management, server configuration and web infrastructure.'
        ]
      }
    ],
    edu: {
      degree: 'Computer Engineering',
      school: 'Universidad Nacional Experimental del Táchira (UNET)',
      location: 'San Cristóbal, Venezuela',
      dates: '2014 — 2023'
    },
    certs: [
      'Web Development School — Platzi (2019)',
      'Network Setup & Installation — CISCO / UNET (2018)'
    ],
    langsLine: 'Spanish: Native · English: B1 (Full professional proficiency)',
    certsLabel: 'certifications',
    langsLabel: 'languages',
    downloadLabel: 'Download CV (PDF)',
    contactLabels: {
      email: 'email',
      linkedin: 'linkedin',
      whatsapp: 'whatsapp',
      location: 'location'
    }
  }
}
