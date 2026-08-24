export interface Translations {

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
