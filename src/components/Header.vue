<script setup lang="ts">
import { useLanguageSwitcher } from "@/composables/useLanguageSwitcher";
import VueSVG from "@/components/VueSVG.vue";
import { ref } from "vue";

const { setLanguage, currentLanguage } = useLanguageSwitcher();
const languageMenu = ref(false);

const switchLanguage = (value: string) => {
  setLanguage((currentLanguage.value = value));
  languageMenu.value = false;
};

const toggleLanguageMenu = () => {
  languageMenu.value = !languageMenu.value;
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
        <div class="menu-lang">
          <button class="btn-lang" @click="toggleLanguageMenu">
            {{ currentLanguage === "en" ? "EN" : "FR" }}
            <VueSVG src="/svg/chevron-down.svg" />
          </button>
          <ul :class="languageMenu ? 'active' : ''">
            <li><button @click="switchLanguage('en')">English</button></li>
            <li><button @click="switchLanguage('fr')">Français</button></li>
          </ul>
        </div>
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

  .menu-lang {
    position: relative;
    ul {
      position: absolute;
      color: var(--text-tertiary);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
      &.active {
        opacity: 1;
        cursor: pointer;
        pointer-events: all;
      }
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
    align-items: center;
    height: fit-content;
    line-height: 1.5;
    color: var(--text-tertiary);
    @apply text-neg-5-16 font-light gap-3;
    .vue-svg-container {
      transform: translateY(2px);
    }
  }

  .btn-contact {
    background-color: #ffffffbb;

    @apply text-neg-5-14 font-light px-32 py-12 rounded-full;
  }
}
</style>
