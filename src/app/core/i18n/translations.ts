import { Translations } from './translations.model';

export const TRANSLATIONS: Record<string, Translations> = {

  'pt-BR': {

    navigation: [
      { label: 'Sobre', fragment: 'about' },
      { label: 'Projetos', fragment: 'projects' },
      { label: 'Experiência', fragment: 'experience' },
      { label: 'Contato', fragment: 'contact' },
      { label: 'Certificações', fragment: 'certifications' }
    ],

    notFound: { title: 'Página não encontrada', message: 'A página solicitada não existe.' },
    accessibility: { skipToContent: 'Pular para o conteúdo' },

    seo: {
      homeTitle: 'Daniel Bartholdy — Tech Lead e Business Analyst',
      homeDescription: 'Portfólio de Daniel Bartholdy, Tech Lead, Business Analyst e Product Manager focado em tecnologia, ERP, integrações e produtos digitais.',
      projectTitleSuffix: 'Projeto',
      certificationTitleSuffix: 'Certificação',
      keywords: 'Daniel Bartholdy, Tech Lead, Business Analyst, Product Manager, tecnologia, ERP, integrações',
      notFoundTitle: 'Página não encontrada',
      notFoundDescription: 'A página solicitada não existe.'
    },

    sections: {

      about: 'Sobre',

      experience: 'Experiência',

      featuredProject: 'Projeto em Destaque',

      selectedProjects: 'Projetos Selecionados',

      contact: 'Contato',

      certifications: 'Certificações'

    },

    resourceStates: {
      loading: 'Carregando...',
      error: 'Não foi possível carregar este conteúdo.',
      empty: 'Nenhum conteúdo disponível.'
    },

    assistant: {
      title: 'Assistente de IA do Daniel',
      iconAlt: 'Ícone do assistente de Daniel',
      online: 'Online',
      openLabel: 'Abrir o assistente de IA do Daniel',
      close: 'Fechar assistente',
      clear: 'Limpar conversa',
      welcome: 'Pergunte sobre a experiência, projetos e competências do Daniel.',
      thinking: 'Daniel está pensando...',
      copy: 'Copiar',
      copied: 'Copiado',
      error: 'Estou temporariamente indisponível. Tente novamente.',
      inputLabel: 'Mensagem para o assistente',
      placeholder: 'Digite sua pergunta...',
      send: 'Enviar mensagem',
      keyboardHint: 'Enter envia · Shift + Enter faz uma nova linha'
    },

    certifications: {

      loading: 'Carregando certificações...',

      error: 'Não foi possível carregar as certificações.',

      empty: 'Nenhuma certificação disponível.',

      issued: 'Emitido em',

      credential: 'Credencial',

      viewCredential: 'Ver credencial'

    },

    certificationDetails: {
      backToCertifications: 'Voltar às Certificações',
      description: 'Descrição',
      metadata: { issueDate: 'Data de emissão', expirationDate: 'Data de expiração', credentialId: 'ID da credencial', workload: 'Carga horária', institution: 'Instituição', type: 'Tipo', status: 'Status' },
      technologies: 'Tecnologias',
      credential: 'Credencial',
      institution: 'Instituição',
      repository: 'Repositório',
      notFound: 'Certificação não encontrada',
      requestNotFound: 'Não foi possível localizar a certificação solicitada.'
    },

    buttons: {

      home: 'Ir para a página inicial',

      primaryNavigation: 'Navegação principal',

      selectLanguage: 'Selecionar idioma',

      switchToDarkTheme: 'Mudar para o tema escuro',

      switchToLightTheme: 'Mudar para o tema claro',

      viewProjects: 'Ver Projetos',

      downloadResume: 'Baixar Currículo',

      viewDetails: 'Ver Detalhes',

      github: 'GitHub',

      contactMe: 'Entrar em Contato'

    },

    projectDetails: {

      overview: 'Visão Geral',

      challenge: 'Desafio',

      solution: 'Solução',

      technologies: 'Tecnologias',

      repository: 'Repositório',

      liveDemo: 'Demonstração',

      architecture: 'Arquitetura',

      features: 'Funcionalidades',

      results: 'Resultados',

      role: 'Papel',

      duration: 'Duração',

      status: 'Status',

      gallery: 'Galeria',

      backToProjects: 'Voltar aos Projetos',

      projectNotFound: 'Projeto não encontrado',

      requestProjectNotFound: 'Não foi possível localizar o projeto solicitado.'

    }

  },

  'en-US': {

    navigation: [
      { label: 'About', fragment: 'about' },
      { label: 'Projects', fragment: 'projects' },
      { label: 'Experience', fragment: 'experience' },
      { label: 'Contact', fragment: 'contact' },
      { label: 'Certifications', fragment: 'certifications' }
    ],

    notFound: { title: 'Page not found', message: 'The requested page does not exist.' },
    accessibility: { skipToContent: 'Skip to content' },

    seo: {
      homeTitle: 'Daniel Bartholdy — Tech Lead & Business Analyst',
      homeDescription: 'Portfolio of Daniel Bartholdy, Tech Lead, Business Analyst and Product Manager focused on technology, ERP, integrations and digital products.',
      projectTitleSuffix: 'Project',
      certificationTitleSuffix: 'Certification',
      keywords: 'Daniel Bartholdy, Tech Lead, Business Analyst, Product Manager, technology, ERP, integrations',
      notFoundTitle: 'Page not found',
      notFoundDescription: 'The requested page does not exist.'
    },

    sections: {

      about: 'About',

      experience: 'Experience',

      featuredProject: 'Featured Project',

      selectedProjects: 'Selected Projects',

      contact: 'Contact',

      certifications: 'Certifications'

    },

    resourceStates: {
      loading: 'Loading...',
      error: 'Could not load this content.',
      empty: 'No content available.'
    },

    assistant: {
      title: 'Daniel AI Assistant',
      iconAlt: "Daniel's assistant icon",
      online: 'Online',
      openLabel: "Ask Daniel's AI Assistant",
      close: 'Close assistant',
      clear: 'Clear conversation',
      welcome: "Ask about Daniel's experience, projects and skills.",
      thinking: 'Daniel is thinking...',
      copy: 'Copy',
      copied: 'Copied',
      error: "I'm temporarily unavailable. Please try again.",
      inputLabel: 'Message for the assistant',
      placeholder: 'Type your question...',
      send: 'Send message',
      keyboardHint: 'Enter sends · Shift + Enter creates a new line'
    },

    certifications: {

      loading: 'Loading certifications...',

      error: 'Could not load certifications.',

      empty: 'No certifications available.',

      issued: 'Issued',

      credential: 'Credential',

      viewCredential: 'View credential'

    },

    certificationDetails: {
      backToCertifications: 'Back to Certifications',
      description: 'Description',
      metadata: { issueDate: 'Issue date', expirationDate: 'Expiration date', credentialId: 'Credential ID', workload: 'Workload', institution: 'Institution', type: 'Type', status: 'Status' },
      technologies: 'Technologies',
      credential: 'Credential',
      institution: 'Institution',
      repository: 'Repository',
      notFound: 'Certification not found',
      requestNotFound: 'The requested certification could not be found.'
    },

    buttons: {

      home: 'Go to homepage',

      primaryNavigation: 'Primary navigation',

      selectLanguage: 'Select language',

      switchToDarkTheme: 'Switch to dark theme',

      switchToLightTheme: 'Switch to light theme',

      viewProjects: 'View Projects',

      downloadResume: 'Download Resume',

      viewDetails: 'View Details',

      github: 'GitHub',

      contactMe: 'Contact Me'

    },

    projectDetails: {

      overview: 'Overview',

      challenge: 'Challenge',

      solution: 'Solution',

      technologies: 'Technologies',

      repository: 'Repository',

      liveDemo: 'Live Demo',

      architecture: 'Architecture',

      features: 'Features',

      results: 'Results',

      role: 'Role',

      duration: 'Duration',

      status: 'Status',

      gallery: 'Gallery',

      backToProjects: 'Back to Projects',

      projectNotFound: 'Project not found',

      requestProjectNotFound: 'The requested project could not be found.'

    }

  },

  'es-ES': {

    navigation: [
      { label: 'Acerca de', fragment: 'about' },
      { label: 'Proyectos', fragment: 'projects' },
      { label: 'Experiencia', fragment: 'experience' },
      { label: 'Contacto', fragment: 'contact' },
      { label: 'Certificaciones', fragment: 'certifications' }
    ],

    notFound: { title: 'Página no encontrada', message: 'La página solicitada no existe.' },
    accessibility: { skipToContent: 'Saltar al contenido' },

    seo: {
      homeTitle: 'Daniel Bartholdy — Tech Lead y Business Analyst',
      homeDescription: 'Portafolio de Daniel Bartholdy, Tech Lead, Business Analyst y Product Manager enfocado en tecnología, ERP, integraciones y productos digitales.',
      projectTitleSuffix: 'Proyecto',
      certificationTitleSuffix: 'Certificación',
      keywords: 'Daniel Bartholdy, Tech Lead, Business Analyst, Product Manager, tecnología, ERP, integraciones',
      notFoundTitle: 'Página no encontrada',
      notFoundDescription: 'La página solicitada no existe.'
    },

    sections: {

      about: 'Acerca de',

      experience: 'Experiencia',

      featuredProject: 'Proyecto Destacado',

      selectedProjects: 'Proyectos Seleccionados',

      contact: 'Contacto',

      certifications: 'Certificaciones'

    },

    resourceStates: {
      loading: 'Cargando...',
      error: 'No se pudo cargar este contenido.',
      empty: 'No hay contenido disponible.'
    },

    assistant: {
      title: 'Asistente de IA de Daniel',
      iconAlt: 'Ícono del asistente de Daniel',
      online: 'En línea',
      openLabel: 'Abrir el asistente de IA de Daniel',
      close: 'Cerrar asistente',
      clear: 'Limpiar conversación',
      welcome: 'Pregunta sobre la experiencia, los proyectos y las habilidades de Daniel.',
      thinking: 'Daniel está pensando...',
      copy: 'Copiar',
      copied: 'Copiado',
      error: 'No estoy disponible temporalmente. Inténtalo de nuevo.',
      inputLabel: 'Mensaje para el asistente',
      placeholder: 'Escribe tu pregunta...',
      send: 'Enviar mensaje',
      keyboardHint: 'Enter envía · Shift + Enter crea una nueva línea'
    },

    certifications: {

      loading: 'Cargando certificaciones...',

      error: 'No se pudieron cargar las certificaciones.',

      empty: 'No hay certificaciones disponibles.',

      issued: 'Emitida',

      credential: 'Credencial',

      viewCredential: 'Ver credencial'

    },

    certificationDetails: {
      backToCertifications: 'Volver a las Certificaciones',
      description: 'Descripción',
      metadata: { issueDate: 'Fecha de emisión', expirationDate: 'Fecha de expiración', credentialId: 'ID de credencial', workload: 'Carga horaria', institution: 'Institución', type: 'Tipo', status: 'Estado' },
      technologies: 'Tecnologías',
      credential: 'Credencial',
      institution: 'Institución',
      repository: 'Repositorio',
      notFound: 'Certificación no encontrada',
      requestNotFound: 'No se pudo encontrar la certificación solicitada.'
    },

    buttons: {

      home: 'Ir a la página de inicio',

      primaryNavigation: 'Navegación principal',

      selectLanguage: 'Seleccionar idioma',

      switchToDarkTheme: 'Cambiar al tema oscuro',

      switchToLightTheme: 'Cambiar al tema claro',

      viewProjects: 'Ver Proyectos',

      downloadResume: 'Descargar CV',

      viewDetails: 'Ver Detalles',

      github: 'GitHub',

      contactMe: 'Contactarme'

    },

    projectDetails: {

      overview: 'Resumen',

      challenge: 'Desafío',

      solution: 'Solución',

      technologies: 'Tecnologías',

      repository: 'Repositorio',

      liveDemo: 'Demostración',

      architecture: 'Arquitectura',

      features: 'Características',

      results: 'Resultados',

      role: 'Rol',

      duration: 'Duración',

      status: 'Estado',

      gallery: 'Galería',

      backToProjects: 'Volver a los Proyectos',

      projectNotFound: 'Proyecto no encontrado',

      requestProjectNotFound: 'No se pudo encontrar el proyecto solicitado.'

    }

  }

};
