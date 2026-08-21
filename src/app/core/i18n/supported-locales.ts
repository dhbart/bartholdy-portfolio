import { SupportedLocale } from './locale.types';

export const SUPPORTED_LOCALES: readonly SupportedLocale[] = [

  {
    code: 'pt-BR',
    emoji: '🇧🇷',
    name: 'Português'
  },

  {
    code: 'en-US',
    emoji: '🇺🇸',
    name: 'English'
  },

  {
    code: 'es-ES',
    emoji: '🇪🇸',
    name: 'Español'
  }

] as const;
