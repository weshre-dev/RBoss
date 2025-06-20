<script setup lang="ts">
import { ref, onMounted, watch } from "vue";

interface Props {
  src: string;
  class?: string;
  preserveAspectRatio?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  class: "",
  preserveAspectRatio: true,
});

const container = ref<HTMLDivElement | null>(null);

async function injectSVG(): Promise<void> {
  if (!container.value) return;

  try {
    container.value.innerHTML = "";
    const response = await fetch(props.src);

    if (!response.ok) throw new Error(`Failed to load SVG: ${response.status}`);

    const svgText = await response.text();
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
    const originalSvg = svgDoc.documentElement;

    const width = originalSvg.getAttribute("width");
    const height = originalSvg.getAttribute("height");
    const viewBox = originalSvg.getAttribute("viewBox");

    const svgElement = originalSvg.cloneNode(true) as SVGSVGElement;

    if (!props.class) {
      if (width && height) {
        container.value.style.width = width.includes("%") ? width : `${width}px`;
        container.value.style.height = height.includes("%") ? height : `${height}px`;
        svgElement.setAttribute("width", "100%");
        svgElement.setAttribute("height", "100%");
      } else if (viewBox) {
        const [, , vbWidth, vbHeight] = viewBox.split(" ").map(Number);
        if (vbWidth && vbHeight) {
          const aspectRatio = vbWidth / vbHeight;
          container.value.style.width = "25px";
          container.value.style.height = `${25 / aspectRatio}px`;
          svgElement.setAttribute("width", "100%");
          svgElement.setAttribute("height", "100%");
        }
      } else {
        container.value.style.width = "25px";
        container.value.style.height = "25px";
      }
    } else {
      props.class.split(" ").forEach((className: string) => {
        if (className) svgElement.classList.add(className);
      });
      svgElement.setAttribute("width", "100%");
      svgElement.setAttribute("height", "100%");
    }

    if (props.preserveAspectRatio && viewBox) {
      svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");
    }

    container.value.innerHTML = "";
    container.value.appendChild(svgElement);
  } catch (error) {
    console.error("Error injecting SVG:", error);
    container.value.innerHTML = `<div class="svg-error">SVG</div>`;
  }
}

onMounted(() => {
  injectSVG();
});

watch(
  () => props.src,
  () => {
    injectSVG();
  }
);

watch(
  () => props.class,
  () => {
    injectSVG();
  }
);
</script>

<template>
  <div ref="container" class="vue-svg-container"></div>
</template>

<style>
.vue-svg-container {
  display: flex;
  align-items: center;
}
.svg-error {
  display: flex;
  align-items: center;
  color: rgb(182, 0, 0);
  font-size: 12px;
}
</style>
