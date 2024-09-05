import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'custom-background': '#0D0714',
        'custom-background2': '#1D1825',
        'custom-background3': '#9E78CF',
        'custom-background4': '#15101C',
      },
    },
  },
  plugins: [],
};
export default config;
