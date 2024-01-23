// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  extends: ['../../../../laragon/www/crs-layer'],
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@vee-validate/nuxt',
    'nuxt-directus',
    '@pinia/nuxt',
    '@nuxt/test-utils/module',
    '@nuxtjs/i18n',
  ],
  i18n: {
    vueI18n: './i18n.config.ts',
  },
});
