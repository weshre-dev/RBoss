<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";

// Props avec valeurs par défaut
interface Props {
  src?: string;
  srcset?: string;
  alt?: string;
  moveX?: number;
  moveY?: number;
  zoom?: number;
  baseTransform?: string;
  containerSelector?: string;
  triggerOffset?: number;
  smoothness?: number;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  src: "",
  srcset: "",
  alt: "",
  moveX: -100,
  moveY: -30,
  zoom: 0.2,
  baseTransform: "",
  containerSelector: "",
  triggerOffset: 0,
  smoothness: 0.1,
  disabled: false,
});

const imageElement = ref<HTMLImageElement>();

let ticking = false;

const getContainer = (): HTMLElement | null => {
  if (props.containerSelector) {
    return document.querySelector(props.containerSelector);
  }
  return imageElement.value?.closest("section") || null;
};

const updateParallax = () => {
  if (props.disabled || !imageElement.value) return;

  const container = getContainer();
  if (!container) return;

  const scrollTop = window.pageYOffset;
  const containerTop = container.offsetTop;
  const containerHeight = container.offsetHeight;
  const windowHeight = window.innerHeight;

  const containerBottom = containerTop + containerHeight;
  const isVisible = scrollTop + windowHeight > containerTop + props.triggerOffset && scrollTop < containerBottom;

  if (isVisible) {
    const scrollProgress = Math.max(0, Math.min(1, (scrollTop + windowHeight - containerTop - props.triggerOffset) / (containerHeight + windowHeight)));

    const moveX = scrollProgress * props.moveX;
    const moveY = scrollProgress * props.moveY;
    const scale = 0.8 + scrollProgress * props.zoom;

    const parallaxTransform = `translateX(${moveX}px) translateY(${moveY}px) scale(${scale})`;
    const finalTransform = props.baseTransform ? `${props.baseTransform} ${parallaxTransform}` : parallaxTransform;

    imageElement.value.style.transform = finalTransform;
  }
};

const imageStyles = computed(() => ({
  willChange: props.disabled ? "auto" : "transform",
  transition: `transform ${props.smoothness}s ease-out`,
  transform: props.baseTransform || "none",
}));

const requestTick = () => {
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
};

const handleScroll = () => {
  requestTick();
  ticking = false;
};

onMounted(() => {
  if (!props.disabled) {
    if (imageElement.value && props.baseTransform) {
      imageElement.value.style.transform = props.baseTransform;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateParallax);

    setTimeout(() => {
      updateParallax();
    }, 100);
  }
});

onUnmounted(() => {
  if (!props.disabled) {
    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", updateParallax);
  }
});

defineExpose({
  updateParallax,
  imageElement,
});
</script>

<template>
  <img ref="imageElement" :src="src" :srcset="srcset" :alt="alt" :style="imageStyles" v-bind="$attrs" />
</template>

<style scoped>
img {
  display: block;
  max-width: 100%;
  height: auto;
}
</style>
