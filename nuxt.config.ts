// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['crs_layer'],
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@vee-validate/nuxt',
    'nuxt-directus',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@formkit/nuxt',
  ],
  i18n: {
    vueI18n: './i18n.config.ts',
  },
});
