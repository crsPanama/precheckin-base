export default defineNuxtRouteMiddleware((to, from) => {
  if (from.fullPath.includes('success')) {
    return navigateTo('/');
  }
});
