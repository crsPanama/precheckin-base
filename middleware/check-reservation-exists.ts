export default defineNuxtRouteMiddleware(async () => {
  const { state } = usePrecheckin();
  if (!state.value.reservation.Res) {
    return await navigateTo('/');
  }
});
