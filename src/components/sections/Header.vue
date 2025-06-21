<script setup lang="ts">
import { useLanguageSwitcher } from "@/composables/useLanguageSwitcher";
import VueSVG from "@/components/VueSVG.vue";
import { useBreakpoint } from "@/composables/useBreakpoints";
import { useBurgerMenuStore } from "@/stores/useBurgerMenuStore";

const { isMobile } = useBreakpoint();
const { setLanguage, currentLanguage } = useLanguageSwitcher();

const burgerStore = useBurgerMenuStore();

const switchLanguage = (value: string) => {
  setLanguage((currentLanguage.value = value));
  burgerStore.languageMenuOpen = false;
};
</script>

<template>
  <header class="header" :class="isMobile ? 'is-mobile' : 'full-w'">
    <div class="header__content">
      <nav class="nav-desktop">
        <figure class="mr-30">
          <VueSVG src="/svg/logo-rb-white.svg" />
        </figure>
        <router-link to="/">Solutions</router-link>
        <router-link to="/typography">Company</router-link>
        <router-link to="/admin">About us</router-link>
        <div class="menu-lang">
          <button class="btn-lang" @click="burgerStore.toggleLanguageMenu" :class="burgerStore.languageMenuOpen ? 'active' : ''">
            {{ currentLanguage === "en" ? "EN" : "FR" }}
            <VueSVG src="/svg/chevron-down.svg" />
          </button>
          <ul :class="burgerStore.languageMenuOpen ? 'active' : ''">
            <li><button @click="switchLanguage('en')">English</button></li>
            <li><button @click="switchLanguage('fr')">Français</button></li>
          </ul>
        </div>
      </nav>
      <button class="btn-contact">Contact us</button>

      <nav class="nav-mobile">
        <figure class="mr-30">
          <VueSVG src="/svg/logo-rb-white.svg" />
        </figure>
      </nav>

      <button class="btn-burger" title="menu" name="menu" @click="burgerStore.toggleMenu">
        <VueSVG src="/svg/burger.svg" />
      </button>
    </div>

    <Teleport to=".modal">
      <div class="burger-menu" :class="burgerStore.isOpen ? 'active' : ''">
        <button class="btn-close" @click="burgerStore.closeMenu" title="close-menu">
          <VueSVG src="/svg/closeX.svg" />
        </button>
        <router-link to="/" @click="burgerStore.closeMenu">Solutions</router-link>
        <router-link to="/typography" @click="burgerStore.closeMenu">Company</router-link>
        <router-link to="/admin" @click="burgerStore.closeMenu">About us</router-link>
        <div class="menu-lang">
          <button class="btn-lang" @click="burgerStore.toggleLanguageMenu" :class="burgerStore.languageMenuOpen ? 'active' : ''">
            <VueSVG src="/svg/chevron-down.svg" />
            {{ currentLanguage === "en" ? "EN" : "FR" }}
          </button>
          <ul :class="burgerStore.languageMenuOpen ? 'active' : ''">
            <li><button @click="switchLanguage('en')">English</button></li>
            <li><button @click="switchLanguage('fr')">Français</button></li>
          </ul>
        </div>
        <button class="btn-contact btn-contact--mobile">Contact us</button>
      </div>
    </Teleport>
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
    @apply pt-43 lg:px-30;

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

    &:hover::after {
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
      transition: transform 0.2s ease;
    }
    &.active .vue-svg-container {
      transform: rotate(180deg);
    }
  }

  .btn-contact {
    background-color: #ffffffbb;
    @apply text-neg-5-14 font-light px-32 py-12 rounded-full;
  }

  .btn-burger {
    display: none;
    color: var(--text-tertiary);
  }

  .nav-mobile {
    display: none;
  }

  &.is-mobile {
    .btn-contact {
      display: none;

      &--mobile {
        display: block;
        margin-top: auto;
        margin-bottom: 60px;
      }
    }

    .btn-burger {
      display: block;
    }

    .nav-desktop {
      display: none;
    }

    .nav-mobile {
      display: block;
    }
  }
}

.burger-menu {
  position: fixed;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
  min-height: 100vh;
  opacity: 0;
  transform: translateY(100vh);
  transition: opacity 0.5s ease, transform 0.3s ease;
  z-index: 1000;
  color: var(--text-tertiary);
  @apply px-20 md:px-60;

  &.active {
    opacity: 1;
    transform: translateY(0);
  }

  .btn-close {
    color: var(--text-tertiary);
    transform: scale(1.6);
    padding-block: 40px;
  }

  a {
    @apply text-neg-5-24 font-light;
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
      transition: transform 0.2s ease;
    }
    &.active .vue-svg-container {
      transform: rotate(180deg);
    }
  }

  .menu-lang {
    position: relative;

    ul {
      position: absolute;
      right: 0;
      padding-top: 5px;
      color: var(--text-tertiary);
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;

      &.active {
        opacity: 1;
        cursor: pointer;
        pointer-events: all;
      }

      li {
        text-align: right;
      }
    }
  }

  .btn-contact {
    background-color: #ffffffbb;
    color: var(--text-primary);
    @apply text-neg-5-14 font-light px-32 py-12 rounded-full mt-auto mb-40;
  }
}

:global(body.menu-open) {
  overflow: hidden;
}
</style>
