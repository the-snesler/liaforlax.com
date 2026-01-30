// @ts-check
import { defineConfig, envField, fontProviders } from "astro/config";
import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
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

  env: {
    schema: {
      GOOGLE_APPS_SCRIPT_URL: envField.string({context: "server", access: "secret"}),
    }
  },

  integrations: [icon()],
});
