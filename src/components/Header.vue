<script setup lang="ts">
import { useLanguageSwitcher } from "@/composables/useLanguageSwitcher";
import VueSVG from "@/components/VueSVG.vue";

const { setLanguage, currentLanguage } = useLanguageSwitcher();

const toggleLanguage = () => {
  setLanguage(currentLanguage.value === "en" ? "fr" : "en");
};
</script>

<template>
  <header class="header full-w">
    <div class="header__content">
      <nav>
        <figure class="mr-30">
          <VueSVG src="/svg/logo-rb-white.svg" />
        </figure>
        <router-link to="/">Solutions</router-link>
        <router-link to="/typography">Company</router-link>
        <router-link to="/admin">About us</router-link>
        <button class="btn-lang" @click="toggleLanguage">Switch to {{ currentLanguage === "en" ? "Français" : "English" }}</button>
      </nav>
      <button class="btn-contact">Contact us</button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: absolute !important;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  margin-inline: auto;
  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    @apply pt-43 px-20 md:px-30;
    nav {
      @apply flex items-center gap-21 text-20;
    }
  }

  a {
    display: flex;
    height: fit-content;
    line-height: 1.5;
    color: var(--text-tertiary);
    position: relative;
    transition: color 0.2s ease;
    @apply text-neg-5-16 font-light;

    &::after {
      position: absolute;
      content: "";
      bottom: 0px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: var(--text-tertiary);
      scale: 0;
      transition: scale 0.2s ease;
    }
  }
  a:hover {
    &::after {
      scale: 1;
    }
  }
  .btn-lang {
    display: flex;
    height: fit-content;
    line-height: 1.5;
    color: var(--text-tertiary);
    @apply text-neg-5-16 font-light;
  }

  .btn-contact {
    background-color: #ffffffbb;

    @apply text-neg-5-16 font-light px-32 py-12 rounded-full;
  }
}
</style>
