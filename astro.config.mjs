// @ts-check
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  experimental: {
    fonts: [
      {
        provider: fontProviders.google(),
        name: "Prompt",
        cssVariable: "--font-prompt",
        weights: ["400", "700", "900"],
      },
    ],
  },

  image: {
    domains: ["images.ctfassets.net"],
  },

  integrations: [icon()],
});
