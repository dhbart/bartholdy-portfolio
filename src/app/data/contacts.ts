export interface ContactLink {
  label: string;
  value: string;
  url: string;
  icon: 'email' | 'linkedin' | 'github';
}

export const contacts = {
  title: 'Contact',

  description:
    "I'm currently open to new opportunities — backend, tech lead or business analyst roles, remote or hybrid. Feel free to reach out through any of the channels below.",

  location: 'Caxias do Sul, RS — Brazil (Remote-ready)',

  availability: 'Open to work',

  links: [
   /*  {
      label: 'Email',
      value: 'dhbart88@gmail.com',
      url: 'mailto:dhbart88@gmail.com',
      icon: 'email'
    }, */
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
};
