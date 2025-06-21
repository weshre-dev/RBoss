<script setup lang="ts">
import VueSVG from "@/components/VueSVG.vue";

import team1 from "@/assets/img/SectionTeam/dummy.png?w=200;300&format=webp&as=srcset";
import team2 from "@/assets/img/SectionTeam/dummy.png?w=200;300&format=webp&as=srcset";

import { ref } from "vue";
import { useComponentTranslation } from "@/i18n";

const t = useComponentTranslation("team");

const activeIndex = ref<number | null>(null);

function activateInfo(index: number) {
  activeIndex.value = index;
}

const members = [
  {
    img: team1,
    title: "Ceo & Cofounder",
    name: "Reda Kezzou",
    text: "At RBoss Group, we deliver top-tier handling services at Liège Airport, combining operational excellence, safety, and innovation to support airlines, cargo operators, and airport stakeholders. With a focus on seamless service and strong partnerships, we ensure your operations run smoothly from ground to air.",
    mail: "reda.kezzou@rboss.eu",
    phone: "+32 468 36 10 24",
    linkedin: "Lien Linkedin profile",
  },
  {
    img: team2,
    title: "Title & Cofounder",
    name: "Alain Decors",
    text: "At RBoss Group, we deliver top-tier handling services at Liège Airport, combining operational excellence, safety, and innovation to support airlines, cargo operators, and airport stakeholders. With a focus on seamless service and strong partnerships, we ensure your operations run smoothly from ground to air.",
    mail: "alain.decors@rboss.eu",
    phone: "+32 456 12 34 56",
    linkedin: "Lien Linkedin profile",
  },
];
</script>

<template>
  <section class="s-team">
    <div class="hr-full hr-full--white"></div>
    <h3 class="pb-20">Meet who's behind</h3>

    <div class="s-team__members">
      <div class="s-team__member" v-for="(team, index) in members" :key="index">
        <div class="picture">
          <figure class="photo" :class="{ active: activeIndex === index }" @click="activateInfo(index)">
            <img :srcset="team.img" :alt="team.name + ' photo'" />
            <figure>
              <VueSVG src="/svg/arrow.svg" />
            </figure>
          </figure>
          <h4 class="reset">{{ team.name }}</h4>
          <h5>{{ team.title }}</h5>
        </div>

        <div class="s-team__infos" :class="{ active: activeIndex === index }">
          <p class="text">{{ team.text }}</p>
          <p class="contact reset">Contact me</p>
          <ul>
            <li>
              <figure><VueSVG src="/svg/email.svg" /></figure>
              {{ team.mail }}
            </li>
            <li>
              <figure><VueSVG src="/svg/phone.svg" /></figure>
              {{ team.phone }}
            </li>
            <li>
              <figure><VueSVG src="/svg/linkedin.svg" /></figure>
              <a :href="team.linkedin" target="_blank" rel="noopener">
                {{ team.linkedin }}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.s-team {
  background-color: var(--bg-secondary);
  color: var(--text-tertiary);
  @apply pt-45 md:pt-60 lg:pt-90 pb-100 md:pb-150 lg:pb-200;
  &__members {
    display: flex;
    justify-content: space-between;
    gap: 50px;
  }
  &__member {
    position: relative;
    display: flex;
    gap: 50px;
    .photo {
      position: relative;
      width: 345px;
      aspect-ratio: 343/439;
      overflow: hidden;
      z-index: 1;
      cursor: pointer;

      img {
        object-fit: cover;
      }

      figure {
        position: absolute;
        bottom: 0;
        right: 10px;
        transition: transform 0.3s ease;
      }

      &:hover,
      &.active {
        figure {
          transform: rotate(180deg);
        }
      }
    }
  }
  &__infos {
    position: absolute;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    opacity: 0;
    transition: opacity 0.3s ease 0.1s;
    pointer-events: none;

    &.active {
      position: relative;
      opacity: 1;
      pointer-events: all;
      z-index: 2;
    }

    .text {
      margin-top: 60px;
      margin-bottom: 50px;
      max-width: 380px;
    }
    .contact {
      @apply text-neg-5-16 font-medium;
    }
    ul {
      display: flex;
      flex-direction: column;
      @apply gap-y-20 mt-20;
      li {
        display: flex;
        align-items: center;
        gap: 15px;
        color: var(--text-tertiary);
        transition: color 0.2s ease;
        cursor: pointer;
        &:hover {
          color: var(--blue-color);
        }
      }
    }
  }
  h4 {
    @apply text-neg-5-24 font-medium mt-15;
  }
  h5 {
    @apply text-neg-5-16 font-light;
  }
}
</style>
