import { LocaleCode } from '../../../core/i18n/locale.types';


export interface NavigationData {
  label: string;
  route: string;
}

export const navigationByLocale: Record<LocaleCode, NavigationData[]> = {
  'pt-BR':  [
    {
        label: 'Sobre',
        route: '#about'
    },
    {
        label: 'Projetos',
        route: '#projects'
    },
    {
        label: 'Experiência',
        route: '#experience'
    },
    {
        label: 'Contato',
        route: '#contact'
    },
    {
        label: 'Certificações',
        route: '#certifications'
    }
  ],

  'en-US': [
    {
        label: 'About',
        route: '#about'
    },
    {
        label: 'Projects',
        route: '#projects'
    },
    {
        label: 'Experience',
        route: '#experience'
    },
    {
        label: 'Contact',
        route: '#contact'
    },
    {
        label: 'Certification',
        route: '#certifications'
    }
  ]
,

  'es-ES':  [
    {
        label: 'Acerca de',
        route: '#about'
    },
    {
        label: 'Proyectos',
        route: '#projects'
    },
    {
        label: 'Experiencia',
        route: '#experience'
    },
    {
        label: 'Contacto',
        route: '#contact'
    },
    {
        label: 'Certificaciones',
        route: '#certifications'
    }
  ]
};
