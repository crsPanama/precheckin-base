<script setup lang="ts">
import { type Languages } from 'crs_layer/types/languages';

const activeLanguage = ref<Languages>('en-US');
const { setLocale, locale } = useI18n();
const { setSelectedLanguage, selectedLanguage } = useLanguages();
const changeLanguage = (language: Languages) => {
  activeLanguage.value = language;

  switch (language) {
    case 'en-US':
      setLocale('en');
      break;
    case 'es-ES':
      setLocale('es');
      break;
  }

  setSelectedLanguage(language);
};

// onMounted(() => {
//   activeLanguage.value = selectedLanguage.value;
// });
</script>
<template>
  <ul class="flex items-center text-black">
    <li class="mr-1" :class="{ 'font-bold': activeLanguage === 'en-US' }">
      <button @click="changeLanguage('en-US')">EN</button>
    </li>
    <span>|</span>
    <li class="ml-1" :class="{ 'font-bold': activeLanguage === 'es-ES' }">
      <button @click="changeLanguage('es-ES')">ES</button>
    </li>
    <div class="w-[25px] ml-2 mb-1">
      <img :src="`/img/${locale.toUpperCase()}.png`" alt="" />
    </div>
  </ul>
</template>

<style scoped></style>
