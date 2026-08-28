export interface Translations {

  navigation: {
    label: string;
    fragment: string;
  }[];

  notFound: {
    title: string;
    message: string;
  };

  accessibility: {
    skipToContent: string;
  };

  seo: {
    homeTitle: string;
    homeDescription: string;
    projectTitleSuffix: string;
    certificationTitleSuffix: string;
    keywords: string;
    notFoundTitle: string;
    notFoundDescription: string;
  };

  sections: {
    about: string;
    experience: string;
    featuredProject: string;
    selectedProjects: string;
    contact: string;
    certifications: string;
  };

  resourceStates: {
    loading: string;
    error: string;
    empty: string;
  };

  assistant: {
    title: string;
    iconAlt: string;
    online: string;
    openLabel: string;
    close: string;
    clear: string;
    welcome: string;
    thinking: string;
    copy: string;
    copied: string;
    error: string;
    inputLabel: string;
    placeholder: string;
    send: string;
    keyboardHint: string;
  };

  certifications: {
    loading: string;
    error: string;
    empty: string;
    issued: string;
    credential: string;
    viewCredential: string;
  };

  certificationDetails: {
    backToCertifications: string;
    description: string;
    metadata: {
      issueDate: string;
      expirationDate: string;
      credentialId: string;
      workload: string;
      institution: string;
      type: string;
      status: string;
    };
    technologies: string;
    credential: string;
    institution: string;
    repository: string;
    notFound: string;
    requestNotFound: string;
  };

  buttons: {
    home: string;
    primaryNavigation: string;
    selectLanguage: string;
    switchToDarkTheme: string;
    switchToLightTheme: string;
    viewProjects: string;
    downloadResume: string;
    viewDetails: string;
    github: string;
    contactMe: string;
  };

  projectDetails: {

    overview: string;

    challenge: string;

    solution: string;

    technologies: string;

    repository: string;

    liveDemo: string;

    architecture: string;

    features: string;

    results: string;

    role: string;

    duration: string;

    status: string;

    gallery: string;

    backToProjects: string;

    projectNotFound: string;

    requestProjectNotFound: string

  };

}
