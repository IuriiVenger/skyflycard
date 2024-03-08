import { nextui } from '@nextui-org/react';

import type { Config } from 'tailwindcss';

const defaultTheme = require('tailwindcss/defaultTheme');

const lightBlueGradient = 'linear-gradient(125deg, #71A9ED 0%, #436CB6 100%)';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: '480px',
      'sm-height': { raw: '(min-height: 640px)' },
      'md-height': { raw: '(min-height: 768px)' },
      ...defaultTheme.screens,
    },
    extend: {
      backgroundImage: {
        'light-blue-gradient': lightBlueGradient,
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      themes: {
        light: {
          colors: {
            success: {
              DEFAULT: '#367A53',
            },
          },
        },
      },
    }),
  ],
};
export default config;
