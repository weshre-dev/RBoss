<script setup lang="ts">
import { useI18n as useVueI18n } from "vue-i18n";
import { usePageTranslation } from "@/i18n";
import VueSVG from "@/components/VueSVG.vue";
import bgHero from "@/assets/img/bg-hero.png?w=300;500;800;1000;1300;1500&format=webp&as=srcset";
import planeHero from "@/assets/img/plane.png?w=300;500;800;1000;1300;1500&format=webp&as=srcset";
import Slider from "./components/Slider.vue";
import Companies from "./components/Companies.vue";
</script>

<template>
  <main>
    <section class="s-hero reset">
      <div class="s-hero__content">
        <h1>
          RBoss Group
          <div class="line"></div>
        </h1>
        <h2>Your trusted partner for aviation support solutions</h2>
      </div>
      <div class="decor-gradient"></div>
      <img :srcset="bgHero" alt="" role="presentation" />
    </section>

    <section class="s-about">
      <div class="hr-full hr-full--white"></div>
      <h3>About us</h3>
      <p class="s-about__text reset">
        At RBoss Group, we deliver top-tier handling services at Liège Airport, combining operational excellence, safety, and innovation to support airlines, cargo operators, and airport stakeholders. With a focus on seamless service and strong
        partnerships, we ensure your operations run smoothly from ground to air.{{ "\n\n" }}The group serves as the parent company to different subsidiaries. Through its subsidiaries, RBoss Group offers a wide range of services, from customs support
        to manpower solutions, making it a one-stop solution for all handling requirements at LGG.
      </p>
      <img :srcset="planeHero" alt="" role="presentation" />
    </section>

    <section class="s-solutions">
      <div class="hr-full"></div>
      <h3>Our solutions</h3>
      <h4>RBoss Group operates through its subsidiaries offering a full range of airport handling services&nbsp;:</h4>
    </section>

    <Slider />

    <Companies />
  </main>
</template>

<style scoped lang="scss">
.decor-gradient {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 97px;
  background: linear-gradient(to bottom, transparent 0%, transparent 50%, #212121 100%);
  z-index: 2;
}
.s-hero {
  position: relative;
  background-color: var(--bg-primary);
  max-width: 2050px;
  min-height: 100vh;
  margin-inline: auto;
  @screen lg {
    min-height: 135vh;
  }
  img {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    z-index: 1;
  }

  &__content {
    position: absolute;
    bottom: 97px;
    color: var(--text-tertiary);
    z-index: 3;

    h1,
    h2 {
      @apply px-20 md:px-60;
    }
    h2 {
      max-width: 800px;
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
    @apply text-neg-5-16 font-light lg:max-w-[50%]  lg:mt-160;
  }

  img {
    max-width: 1800px;
    padding-bottom: 100px;
    @apply rotate-[-20deg] translate-x-[20%] lg:translate-y-[-50%];
  }
}
</style>
