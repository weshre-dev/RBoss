<script setup lang="ts">
import { ref, computed } from "vue";
import { usePageTranslation } from "@/i18n";
import VueSVG from "@/components/VueSVG.vue";
import slider1 from "@/assets/img/HomeSlider/slider-1.png?w=150;350;700&format=webp&as=srcset";
import slider2 from "@/assets/img/HomeSlider/slider-2.png?w=150;350;700&format=webp&as=srcset";
import slider3 from "@/assets/img/HomeSlider/slider-3.png?w=150;350;700&format=webp&as=srcset";
import slider4 from "@/assets/img/HomeSlider/slider-4.png?w=150;350;700&format=webp&as=srcset";
import slider5 from "@/assets/img/HomeSlider/slider-5.png?w=150;350;700&format=webp&as=srcset";

import { useComponentTranslation } from "@/i18n";

const t = useComponentTranslation("slider");

const currentSlideIndex = ref(0);

const slides = [
  {
    id: 1,
    title: "Handling",
    image: slider1,
    text: "At RBoss Group, we deliver top-tier handling services at Liège Airport, combining operational excellence, safety, and innovation to support airlines, cargo operators, and airport stakeholders. With a focus on seamless service and strong partnerships, we ensure your operations run smoothly from ground to air.",
  },
  {
    id: 2,
    title: "Logistics",
    image: slider2,
    text: "Texte du slide 2 Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam dolore tempora eius reiciendis, ab, consequuntur, quas id sequi commodi molestiae inventore ad beatae soluta repellendus obcaecati? Accusantium nisi dolor quaerat.",
  },
  {
    id: 3,
    title: "E-commerce",
    image: slider3,
    text: "Texte du slide 3 Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam est voluptatem sit aliquid vel quas qui dolorum accusantium sed aperiam recusandae voluptatibus ut, illo nobis ab itaque. Est, nulla fuga.",
  },
  {
    id: 4,
    title: "Maintenance",
    image: slider4,
    text: "Texte du slide 4 Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum minus ut totam facere quasi eos aliquid modi. Cumque nihil sequi, iste odio asperiores placeat corrupti, laudantium suscipit, minus ipsam quis.",
  },
  {
    id: 5,
    title: "Crew transportation",
    image: slider5,
    text: "Texte du slide 5 Lorem ipsum dolor, sit amet consectetur adipisicing elit. In, dolorem atque maxime esse unde odio eius tempora culpa dolorum suscipit itaque, nihil perspiciatis cumque quo nulla corrupti est repellendus magnam.",
  },
];

const goToSlide = (index: number) => {
  currentSlideIndex.value = index;
};

const getSlideClass = (index: number) => {
  const diff = index - currentSlideIndex.value;
  const totalSlides = slides.length;

  let normalizedDiff = diff;
  if (Math.abs(diff) > totalSlides / 2) {
    normalizedDiff = diff > 0 ? diff - totalSlides : diff + totalSlides;
  }

  switch (normalizedDiff) {
    case 0:
      return "slide--1";
    case -1:
      return "slide--2";
    case 1:
      return "slide--3";
    case -2:
      return "slide--4";
    case 2:
      return "slide--5";
    default:
      return "slide--hidden";
  }
};

const orderedSlides = computed(() => {
  return slides.map((slide, index) => ({
    ...slide,
    originalIndex: index,
    slideClass: getSlideClass(index),
    // isVisible: Math.abs(index - currentSlideIndex.value) <= 2 || Math.abs(index - currentSlideIndex.value) >= slides.length - 2,
  }));
});

const touchStartX = ref(0);
const touchStartY = ref(0);
const isSwiping = ref(false);

const goToPrevSlide = () => {
  const newIndex = currentSlideIndex.value === 0 ? slides.length - 1 : currentSlideIndex.value - 1;
  goToSlide(newIndex);
};

const goToNextSlide = () => {
  const newIndex = currentSlideIndex.value === slides.length - 1 ? 0 : currentSlideIndex.value + 1;
  goToSlide(newIndex);
};

const handleSlideClick = (slideData: any) => {
  if (slideData.originalIndex !== currentSlideIndex.value) {
    goToSlide(slideData.originalIndex);
  }
};
</script>

<template>
  <section class="s-slider full-w">
    <div class="s-slider__buttons">
      <button class="btn-primary" v-for="(slide, index) in slides" :key="slide.id" :class="{ active: index === currentSlideIndex }" @click="goToSlide(index)">
        <VueSVG src="/svg/plane.svg" />
        {{ slide.title }}
      </button>
    </div>
    <div class="s-slider__content">
      <div v-for="slideData in orderedSlides" :key="slideData.id" :class="['slide', slideData.slideClass]" v-show="slideData" @click="handleSlideClick(slideData)">
        <div :class="['bg', `bg--${slideData.id}`]">
          <img :srcset="slideData.image" alt="" role="presentation" />
        </div>
        <p class="reset" :class="{ active: slideData.originalIndex === currentSlideIndex }">
          {{ slideData.text }}
        </p>
      </div>
      <div class="s-slider__height"></div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.s-slider {
  position: relative;
  width: 100%;
  background-color: white;
  @apply px-20 md:px-60 lg:px-0 mt-40 lg:mt-150;

  &__height {
    width: 100%;
    aspect-ratio: 363/416;
    background-color: white;
    z-index: -1;
    @screen sm {
      aspect-ratio: 995/592;
    }
    @screen lg {
      max-width: 65%;
      margin-bottom: 160px;
    }
  }

  &__buttons {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    @apply gap-10 lg:gap-20 sm:justify-center;
  }

  &__content {
    position: relative;
    width: 100%;
    height: 100%;
    margin-top: 50px;
  }

  .slide {
    position: absolute;
    display: flex;
    aspect-ratio: 363/416;
    border-radius: 20px;
    top: 0;
    left: 50%;
    overflow: hidden;
    transition: all 0.5s ease;
    cursor: pointer;
    @screen sm {
      aspect-ratio: 995/592;
    }

    p {
      position: relative;
      color: white;
      padding: 30px;
      margin-top: auto;
      max-width: 650px;
      z-index: 7;
      pointer-events: none;
      line-height: 1.5;
      @apply text-neg-5-16 font-medium;

      &::before {
        position: absolute;
        content: "";
        width: 200%;
        height: calc(100% + 20px);
        top: -20px;
        left: 0px;
        background: linear-gradient(to bottom, #21212100, #21212199);
        z-index: -1;
        opacity: 0;
        transition: opacity 0.3s ease 0.3s;
      }

      &.active::before {
        opacity: 1;
      }
    }

    &--1 {
      width: 100%;
      max-width: 100%;
      z-index: 5;
      transform: translateX(-50%);
      cursor: default;
      @apply shadow-2xl lg:max-w-[65%];

      p {
        opacity: 1;
        transition: opacity 0.3s ease 0.5s;
      }
    }

    &--2,
    &--3 {
      width: 100%;
      max-width: 50%;
      z-index: 4;
      @apply shadow-md;

      &:hover {
        transform: scale(1.02);
        @apply shadow-lg;
      }

      p {
        opacity: 0;
        transition: opacity 0.3s ease;
      }
    }
    &--2 {
      transform: translate(-85%, 15%);
      &:hover {
        transform: translate(-85%, 15%) scale(1.02);
      }
    }
    &--3 {
      transform: translate(-15%, 15%);
      &:hover {
        transform: translate(-15%, 15%) scale(1.02);
      }
    }

    &--4,
    &--5 {
      width: 100%;
      max-width: 35%;
      z-index: 3;
      @apply shadow-sm;

      &:hover {
        transform: scale(1.05);
        @apply shadow-md;
      }

      p {
        opacity: 0;
        transition: opacity 0.3s ease;
      }
    }
    &--4 {
      left: 0;
      transform: translate(0%, 45%);
      &:hover {
        transform: translate(0%, 45%) scale(1.05);
      }
    }
    &--5 {
      left: unset;
      right: 0;
      transform: translate(0%, 45%);
      &:hover {
        transform: translate(0%, 45%) scale(1.05);
      }
    }

    &--hidden {
      width: 100%;
      max-width: 65%;
      z-index: 10;
      top: 0;
      left: unset;
      right: 0;
      transform: translate(100%, 45%) scale(0);
      pointer-events: none;
    }
  }

  .bg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

// Media queries pour le responsive mobile
@media (max-width: 768px) {
  .s-slider {
    &__content {
      margin-top: 30px;
    }

    .slide {
      &--2,
      &--3 {
        max-width: 45%;
      }

      &--4,
      &--5 {
        max-width: 30%;
      }
    }
  }
}
</style>
