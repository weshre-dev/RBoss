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
  moveX: -100, // Mouvement horizontal (négatif = gauche)
  moveY: -30, // Mouvement vertical (négatif = haut)
  zoom: 0.2, // Intensité du zoom
  baseTransform: "", // Transform CSS de base à préserver
  containerSelector: "", // Sélecteur du container parent (optionnel)
  triggerOffset: 0, // Offset pour déclencher l'animation
  smoothness: 0.1, // Fluidité de l'animation (0.1 = fluide)
  disabled: false, // Désactiver l'effet (utile pour mobile)
});

// Refs
const imageElement = ref<HTMLImageElement>();
const containerElement = ref<HTMLElement>();

// Variables pour l'optimisation
let ticking = false;

// Container calculé (parent ou sélecteur custom)
const getContainer = (): HTMLElement | null => {
  if (props.containerSelector) {
    return document.querySelector(props.containerSelector);
  }
  return imageElement.value?.closest("section") || null;
};

// Fonction principale de parallax
const updateParallax = () => {
  if (props.disabled || !imageElement.value) return;

  const container = getContainer();
  if (!container) return;

  const scrollTop = window.pageYOffset;
  const containerTop = container.offsetTop;
  const containerHeight = container.offsetHeight;
  const windowHeight = window.innerHeight;

  // Vérifier si le container est visible
  const containerBottom = containerTop + containerHeight;
  const isVisible = scrollTop + windowHeight > containerTop + props.triggerOffset && scrollTop < containerBottom;

  if (isVisible) {
    // Calculer le pourcentage de progression
    const scrollProgress = Math.max(0, Math.min(1, (scrollTop + windowHeight - containerTop - props.triggerOffset) / (containerHeight + windowHeight)));

    // Calculs de transformation
    const moveX = scrollProgress * props.moveX;
    const moveY = scrollProgress * props.moveY;
    const scale = 0.8 + scrollProgress * props.zoom;

    // Construire la transformation complète
    const parallaxTransform = `translateX(${moveX}px) translateY(${moveY}px) scale(${scale})`;
    const finalTransform = props.baseTransform ? `${props.baseTransform} ${parallaxTransform}` : parallaxTransform;

    // Appliquer la transformation
    imageElement.value.style.transform = finalTransform;
  }
};

// Style CSS calculé pour l'optimisation
const imageStyles = computed(() => ({
  willChange: props.disabled ? "auto" : "transform",
  transition: `transform ${props.smoothness}s ease-out`,
  // Appliquer le transform de base en CSS pour éviter le "reset"
  transform: props.baseTransform || "none",
}));

// Optimisation avec requestAnimationFrame
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

// Lifecycle
onMounted(() => {
  if (!props.disabled) {
    // Appliquer le transform de base immédiatement
    if (imageElement.value && props.baseTransform) {
      imageElement.value.style.transform = props.baseTransform;
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateParallax);

    // Petite attente pour être sûr que tout est chargé
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

// Exposer la fonction pour un contrôle manuel si besoin
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
