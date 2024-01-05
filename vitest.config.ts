import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
  },
  // plugins: [vue()],
  // test: {
  //   globals: true,
  //   environment: 'jsdom',
  // },
});
