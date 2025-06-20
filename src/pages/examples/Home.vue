<script setup lang="ts">
import { useI18n as useVueI18n } from "vue-i18n";
import { usePageTranslation } from "@/i18n";
import VueSVG from "@/components/VueSVG.vue";
import hugo from "@/assets/img/hugo.jpg?w=100;200;300&format=webp&as=srcset";
import julien from "@/assets/img/julien.png?w=100;200;300&format=webp&as=srcset";
import Slider from "@/components/Slider.vue";

const t = usePageTranslation();
</script>

<template>
  <main>
    <section class="reset">
      <div class="bg-blue-400 p-8 text-center page-padding">
        <h1 class="text-4xl font-bold">{{ t("title") }}</h1>
        <p class="mt-20 text-custom-red whitespace-pre-line">Si vous voyez du bleu et du texte blanc, ça marche !{{ "\n" }}(et si moi j'ai une couleur vibrante rouge dégueulasse c'est normal)</p>
      </div>
    </section>
    <section class="flex justify-center items-center gap-30 py-30">
      <VueSVG src="/vite.svg" />
      <figure class="test-color"><VueSVG src="/svg/ws-logo.svg" /></figure>
      <figure class="test-fill"><VueSVG src="/svg/home.svg" class="w-50 h-50" /></figure>
    </section>
    <section class="flex flex-wrap gap-80 justify-center">
      <figure class="h-100 w-100 md:h-200 md:w-200 lg:w-300 lg:h-300 clip-heart overflow-hidden">
        <img class="w-full h-full object-cover" :srcset="hugo" alt="hugo" loading="lazy" sizes="(max-width: 768px) 100px, (max-width: 1024px) 200px, 300px" />
      </figure>
      <figure class="h-100 w-100 md:h-200 md:w-200 lg:w-300 lg:h-300 clip-heart overflow-hidden">
        <img class="w-full h-full object-cover" :srcset="julien" alt="julien" loading="lazy" sizes="(max-width: 768px) 100px, (max-width: 1024px) 200px, 300px" />
      </figure>
    </section>
    <Slider />
  </main>
</template>

<style scoped lang="scss">
.test-color {
  width: fit-content;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    @apply text-custom-blue;
  }
}

.test-fill {
  width: fit-content;
  cursor: pointer;
  @apply text-custom-red;
}
.test-fill :deep(svg path) {
  fill: transparent;
  stroke: currentColor;
  transition: fill 0.3s ease;
}

.test-fill:hover :deep(svg path) {
  fill: currentColor;
}
</style>
