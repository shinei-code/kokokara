// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,  // SPA
  srcDir: 'src/',  // ソースディレクトリ
  alias: {
    "./runtimeConfig": "./runtimeConfig.browser"
  },
  vite: {
    define: {
      "window.global": {}
    }
  },
  css: [
    'vuetify/lib/styles/main.sass',
    '@/assets/style/app.scss'
  ],
  build: {
    transpile: ['vuetify'],
  },
  hooks: {
    'vite:extendConfig': (config) => {
      config.plugins!.push(vuetify())
    },
  },
  modules: ["@nuxtjs/google-fonts"],
  googleFonts: {
    families: {
      Comfortaa: true,
      Murecho: [900],
    },
  },
  runtimeConfig: {
    apiSecret: process.env.GOOGLE_MAPS_API_KEY,
  }
})