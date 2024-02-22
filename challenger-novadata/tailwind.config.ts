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
    },
    spacing: {
      m: '65%',
      l: '75%',
    },
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
