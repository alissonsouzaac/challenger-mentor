import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xs: '320px',
      s: '375px',
      sm: '480px',
      m: '640px',
      l: '1024px',
      xl: '1360px',
      1400: '1400px',
    },
    spacing: {
      m: '65%',
      l: '75%',
    },
    // colors: {
    //   // Primary colors
    //   // 'marine-blue': 'hsl(213, 96%, 18%)',
    //   // 'purplish-blue': 'hsl(243, 100%, 62%)',
    //   // 'pastel-blue': 'hsl(228, 100%, 84%)',
    //   // 'light-blue': 'hsl(206, 94%, 87%)',
    //   // 'strawberry-red': 'hsl(354, 84%, 57%)',
    //   // Neutral colors
    //   'cool-gray': 'hsl(231, 11%, 63%)',
    //   'light-gray': 'hsl(229, 24%, 87%)',
    //   'magnolia': 'hsl(217, 100%, 97%)',
    //   'alabaster': 'hsl(231, 100%, 99%)',
    //   'white': 'hsl(0, 0%, 100%)',
    // },
    // fontFamily: {
    //   'ubuntu': ['Ubuntu', 'sans-serif'],
    // },
    // fontSize: {
    //   'body': '16px',
    // },
    // fontWeight: {
    //   'normal': '400',
    //   'medium': '500',
    //   'bold': '700',
    // },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "layout-mobile": "url(./assets/images/bg-sidebar-mobile.svg)",
        "layout-desktop": "url(./assets/images/bg-sidebar-desktop.svg)",
      },
    },
  },
  plugins: [],
};
export default config;
