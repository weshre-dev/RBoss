<script setup lang="ts">
import bgHero from "@/assets/img/bg-hero.png?w=300;500;800;1000;1300;1500&format=webp&as=srcset";
import planeHero from "@/assets/img/plane.png?w=300;500;800;1000;1300;1500&format=webp&as=srcset";
import Slider from "./components/Slider.vue";
import Companies from "./components/Companies.vue";
import Team from "./components/Team.vue";
import Contact from "@/components/sections/Contact.vue";
import ParallaxImage from "@/components/ParallaxImage.vue";
import { useSEO } from "@/composables/useSEO";
import { usePageTranslation } from "@/i18n";
import { useBreakpoint } from "@/composables/useBreakpoints";
import { computed } from "vue";

const t = usePageTranslation();
const { isDesktop } = useBreakpoint();

const planeBaseTransform = computed(() => {
  if (isDesktop.value) {
    return "rotate(-20deg) translateX(30%) translateY(-50%)";
  } else {
    return "rotate(-20deg) translateX(30%) translateY(15%)";
  }
});

useSEO({
  title: "Home",
  description: "Your trusted partner for aviation support solutions",
  keywords: ["partner", "rboss", "logistic", "aviation"],
  url: "https://rboss.eu/",
  image: "/images/og-home.png",
});
</script>

<template>
  <main>
    <section class="s-hero reset">
      <div class="s-hero__content">
        <h1>
          {{ t("hero_title") }}
          <div class="line"></div>
        </h1>
        <h2>{{ t("hero_text") }}</h2>
      </div>
      <div class="decor-gradient"></div>
      <img :srcset="bgHero" alt="" role="presentation" />
    </section>

    <section class="s-about">
      <div class="hr-full hr-full--white"></div>
      <h3>{{ t("about") }}</h3>
      <p class="s-about__text reset">
        {{ t("about_text") }}
      </p>

      <ParallaxImage :srcset="planeHero" alt="" role="presentation" class="plane-image" :move-x="-100" :move-y="-30" :zoom="0.4" :base-transform="planeBaseTransform" />
    </section>

    <section class="s-solutions">
      <div class="hr-full"></div>
      <h3>Our solutions</h3>
      <h4>RBoss Group operates through its subsidiaries offering a full range of airport handling services&nbsp;:</h4>
    </section>

    <Slider />
    <Companies />
    <Team />
    <Contact />
  </main>
</template>

<style scoped lang="scss">
.decor-gradient {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 200px;
  background: linear-gradient(to bottom, transparent 0%, #212121 100%);
  z-index: 2;
}

.s-hero {
  position: relative;
  background-color: var(--bg-primary);
  max-width: 2050px;
  min-height: 100vh;
  margin-inline: auto;

  img {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    z-index: 1;
  }

  &__content {
    position: absolute;
    bottom: 20px;
    color: var(--text-tertiary);
    z-index: 3;

    h1,
    h2 {
      @apply px-20 md:px-60;
    }

    h2 {
      max-width: 800px;
      @apply 2xl:max-w-[1100px];
    }

    h1 {
      display: flex;
      align-items: center;
      gap: 30px;

      .line {
        width: 15%;
        height: 3px;
        background-color: var(--text-tertiary);
        @apply lg:w-[20%];
      }
    }
  }
}

.s-about {
  background-color: var(--bg-primary);
  color: var(--text-tertiary);
  padding-top: 65px;

  &__text {
    z-index: 2;
    @apply text-neg-5-16 font-light lg:max-w-[50%] lg:mt-160;
  }

  .plane-image {
    z-index: 1;
    max-width: 1800px;
    @apply pb-100 lg:pb-0;
  }
}
</style>
