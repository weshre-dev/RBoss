<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import VueSVG from "@/components/VueSVG.vue";
import { useComponentTranslation } from "@/i18n";

const t = useComponentTranslation("companies");

const gridRef = ref<HTMLElement | null>(null);
const itemRefs = ref<HTMLElement[]>([]);
const itemsWithRightNeighbor = ref<Set<number>>(new Set());

const items = [
  {
    text: "At RBoss Group, we deliver top-tier handling services at Liège Airport, combining operational excellence, safety, and innovation to support airlines, cargo operators, and airport stakeholders. With a focus on seamless service and strong partnerships, we ensure your operations run smoothly from ground to air.",
    svg: "/svg/companies/rb-dev.svg",
    link: "#",
  },
  {
    text: "At RBoss Group, we deliver top-tier handling services at Liège Airport, combining operational excellence, safety, and innovation to support airlines, cargo operators, and airport stakeholders. With a focus on seamless service and strong partnerships, we ensure your operations run smoothly from ground to air.",
    svg: "/svg/companies/rb-belgium.svg",
    link: "#",
  },
  {
    text: "At RBoss Group, we deliver top-tier handling services at Liège Airport, combining operational excellence, safety, and innovation to support airlines, cargo operators, and airport stakeholders. With a focus on seamless service and strong partnerships, we ensure your operations run smoothly from ground to air.",
    svg: "/svg/companies/rb-lux.svg",
    link: "#",
  },
  {
    text: "At RBoss Group, we deliver top-tier handling services at Liège Airport, combining operational excellence, safety, and innovation to support airlines, cargo operators, and airport stakeholders. With a focus on seamless service and strong partnerships, we ensure your operations run smoothly from ground to air.",
    svg: "/svg/companies/rb-algeria.svg",
    link: "#",
  },
];

function updateRightBorders() {
  itemsWithRightNeighbor.value.clear();

  nextTick(() => {
    const els = itemRefs.value;
    for (let i = 0; i < els.length - 1; i++) {
      const current = els[i];
      const next = els[i + 1];
      if (!current || !next) continue;

      const topCurrent = current.getBoundingClientRect().top;
      const topNext = next.getBoundingClientRect().top;

      if (topCurrent === topNext) {
        itemsWithRightNeighbor.value.add(i);
      }
    }
  });
}

onMounted(() => {
  window.addEventListener("resize", updateRightBorders);
  updateRightBorders();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateRightBorders);
});
</script>

<template>
  <section class="s-companies">
    <div class="hr-full"></div>
    <h3>The Company</h3>
    <h4>RBoss group serves as the parent company to different subsidiaries. These subsidiaries, offer the various services detailled above.{{ "\n" }}Here are the 4 structures that compose RBoss group&nbsp;:</h4>

    <div class="s-companies__grid" ref="gridRef">
      <div v-for="(item, index) in items" :key="index" class="item" :class="{ 'has-right-neighbor': itemsWithRightNeighbor.has(index) }" ref="itemRefs">
        <figure class="mb-20">
          <VueSVG :src="item.svg" />
        </figure>
        <p>{{ item.text }}</p>
        <a :href="item.link" class="btn-primary ml-auto mt-37 lg:mt-77 w-fit">Learn more</a>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.s-companies {
  @apply mb-40 sm:mb-80 lg:mb-150;
  h4 {
    margin-bottom: 90px;
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 56px 30px;
    @apply lg:justify-start;
  }

  .item {
    // @apply md:pr-35;
    figure {
      justify-content: start;
    }

    &.has-right-neighbor {
      position: relative;
      padding-right: 35px;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        height: 90%;
        width: 1px;
        background-color: var(--text-secondary);
        transform: translateY(80px);
      }
    }

    p {
      display: flex;
      max-width: 350px;
      @apply max-w-270 sm:max-w-450 lg:max-w-270;
    }
  }
}
</style>
