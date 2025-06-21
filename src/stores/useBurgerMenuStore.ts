import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useBurgerMenuStore = defineStore("burgerMenu", () => {
  const isOpen = ref(false);
  const languageMenuOpen = ref(false);

  const openMenu = () => {
    isOpen.value = true;
  };

  const closeMenu = () => {
    isOpen.value = false;
    languageMenuOpen.value = false;
  };

  const toggleMenu = () => {
    isOpen.value = !isOpen.value;
    if (!isOpen.value) {
      languageMenuOpen.value = false;
    }
  };

  const toggleLanguageMenu = () => {
    languageMenuOpen.value = !languageMenuOpen.value;
  };

  watch(isOpen, (newValue) => {
    const overlay = document.querySelector(".modal-overlay");
    const body = document.body;

    if (overlay && body) {
      if (newValue) {
        overlay.classList.add("active");
        body.classList.add("menu-open");
      } else {
        overlay.classList.remove("active");
        body.classList.remove("menu-open");
      }
    }
  });

  return {
    isOpen,
    languageMenuOpen,
    openMenu,
    closeMenu,
    toggleMenu,
    toggleLanguageMenu,
  };
});
