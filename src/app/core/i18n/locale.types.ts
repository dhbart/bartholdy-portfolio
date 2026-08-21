export type LocaleCode =
  | 'pt-BR'
  | 'en-US'
  | 'es-ES';

export interface SupportedLocale {

  code: LocaleCode;

  emoji: string;

  name: string;

}
