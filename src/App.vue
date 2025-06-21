<script setup lang="ts">
import { useBurgerMenuStore } from "@/stores/useBurgerMenuStore";

const burgerStore = useBurgerMenuStore();

const handleOverlayClick = () => {
  if (burgerStore.isOpen) {
    burgerStore.closeMenu();
  }
};
</script>

<template>
  <router-view />
  <div class="modal"></div>
  <div class="modal-overlay" @click="handleOverlayClick"></div>
</template>
