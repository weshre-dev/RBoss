<script setup lang="ts">
import { useLanguageSwitcher } from "@/composables/useLanguageSwitcher";

const { setLanguage, currentLanguage } = useLanguageSwitcher();

const toggleLanguage = () => {
  setLanguage(currentLanguage.value === "en" ? "fr" : "en");
};
</script>

<template>
  <header class="flex justify-center gap-40 text-20 py-20">
    <router-link to="/">Home</router-link>
    <router-link to="/typography">Typography</router-link>
    <router-link to="/admin">Admin</router-link>
    <button @click="toggleLanguage">Switch to {{ currentLanguage === "en" ? "Français" : "English" }}</button>
  </header>
</template>

<style scoped lang="scss">
header {
  @apply font-fira;
  a {
    color: var(--text-secondary);
    position: relative;
    transition: color 0.2s ease;
    &::after {
      position: absolute;
      content: "";
      bottom: 0px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--text-primary);
      scale: 0;
      transition: scale 0.2s ease;
    }
  }
  a:hover {
    color: var(--text-primary);
    &::after {
      scale: 1;
    }
  }
}
</style>
