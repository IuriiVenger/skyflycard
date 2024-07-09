import { nextui } from '@nextui-org/react';

import type { Config } from 'tailwindcss';

const defaultTheme = require('tailwindcss/defaultTheme');

const lightBlueGradient = 'linear-gradient(125deg, #71A9ED 0%, #436CB6 100%)';
const lightLavanderGradient = 'linear-gradient(32.49deg, rgba(255, 255, 255, 1) 0.15%, rgba(183, 182, 255, 0.2) 100%)';
export const tenantMainColor = '#3F3BE1';
export const tenantMainColorLight = '#EEF2FF';
export const tenantSecondaryColor = '#9A99E6';

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
      'max-xs': { max: '479px' },
      'max-sm': { max: '639px' },
      'max-md': { max: '767px' },
      'max-lg': { max: '1023px' },
      'max-xl': { max: '1279px' },
      'max-2xl': { max: '1535px' },
      'sm-height': { raw: '(min-height: 640px)' },
      'md-height': { raw: '(min-height: 768px)' },
      'sm-only': { min: '640px', max: '767px' },
      'md-only': { min: '768px', max: '1023px' },
      ...defaultTheme.screens,
    },
    extend: {
      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      backgroundImage: {
        'light-blue-gradient': lightBlueGradient,
        'light-lavander-gradient': lightLavanderGradient,
      },
      colors: {
        'tenant-main': tenantMainColor,
        'tenant-main-light': tenantMainColorLight,
        'tenant-secondary': tenantSecondaryColor,
        indigo: {
          50: '#EEEEFF',
        },
      },
      fontSize: {
        '2.5xl': [
          '1.75rem',
          {
            lineHeight: '2.25rem',
            fontWeight: 500,
          },
        ],
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      layout: {
        radius: {
          small: '0.25rem',
        },
      },
      themes: {
        light: {
          colors: {
            primary: {
              DEFAULT: tenantMainColor,
            },
            secondary: {
              DEFAULT: tenantMainColorLight,
            },
          },
        },
      },
    }),
  ],
};
export default config;
