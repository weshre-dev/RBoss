<script setup lang="ts">
import Header from "@/components/sections/Header.vue";
import Footer from "@/components/sections/Footer.vue";
</script>

<template>
  <div class="page">
    <Header />
    <router-view />
    <Footer />
  </div>
</template>
