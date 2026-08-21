import { LocaleCode } from '../../core/i18n/locale.types';

export interface ContactLink {
  label: string;
  value: string;
  url: string;
  icon: 'email' | 'linkedin' | 'github';
}

export interface ContactData {
  title: string;
  description: string;
  location: string;
  availability: string;
  links: ContactLink[];
}

export const contactsByLocale: Record<LocaleCode, ContactData> = {
  'pt-BR': {
    title: 'Contato',
    description:
      'Estou aberto a novas oportunidades — backend, tech lead ou analista de negócios, remoto ou híbrido. Sinta-se livre para entrar em contato através de qualquer um dos canais abaixo.',
    location: 'Caxias do Sul, RS — Brasil (Remoto)',
    availability: 'Aberto para trabalhar',
    links: [
      {
        label: 'LinkedIn',
        value: 'linkedin.com/in/daniel-bartholdy',
        url: 'https://linkedin.com/in/daniel-bartholdy',
        icon: 'linkedin'
      },
      {
        label: 'GitHub',
        value: 'github.com/dhbart',
        url: 'https://github.com/dhbart',
        icon: 'github'
      }
    ] as ContactLink[]
  },

  'en-US': {
    title: 'Contact',
    description:
      "I'm currently open to new opportunities — backend, tech lead or business analyst roles, remote or hybrid. Feel free to reach out through any of the channels below.",
    location: 'Caxias do Sul, RS — Brazil (Remote-ready)',
    availability: 'Open to work',
    links: [
      {
        label: 'LinkedIn',
        value: 'linkedin.com/in/daniel-bartholdy',
        url: 'https://linkedin.com/in/daniel-bartholdy',
        icon: 'linkedin'
      },
      {
        label: 'GitHub',
        value: 'github.com/dhbart',
        url: 'https://github.com/dhbart',
        icon: 'github'
      }
    ] as ContactLink[]
  },

  'es-ES': {
    title: 'Contacto',
    description:
      'Actualmente estoy abierto a nuevas oportunidades — funciones de backend, tech lead o analista de negocios, remoto o híbrido. Siéntete libre de ponerte en contacto a través de cualquiera de los canales a continuación.',
    location: 'Caxias do Sul, RS — Brasil (Remoto)',
    availability: 'Abierto para trabajar',
    links: [
      {
        label: 'LinkedIn',
        value: 'linkedin.com/in/daniel-bartholdy',
        url: 'https://linkedin.com/in/daniel-bartholdy',
        icon: 'linkedin'
      },
      {
        label: 'GitHub',
        value: 'github.com/dhbart',
        url: 'https://github.com/dhbart',
        icon: 'github'
      }
    ] as ContactLink[]
  }
};
