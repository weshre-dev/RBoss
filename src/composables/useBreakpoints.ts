import { ref, computed, watch, type Ref } from "vue";

interface BreakpointConfig {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
}

const parseBreakpoint = (value: string): number => {
  return parseInt(value.replace("px", ""));
};

const getTailwindBreakpoints = async (): Promise<BreakpointConfig> => {
  try {
    const configModule = await import("/tailwind.config.js");
    const config = configModule.default || configModule;

    if (config?.theme?.screens) {
      return config.theme.screens;
    }
  } catch (error) {
    console.warn("Could not load Tailwind config, using fallback breakpoints");
  }

  return {
    sm: "550px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
    "3xl": "2050px",
  };
};

const DEFAULT_BREAKPOINTS: BreakpointConfig = {
  sm: "550px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
  "3xl": "2050px",
};

type BreakpointSize = keyof BreakpointConfig;

class BreakpointManager {
  private breakpoints: BreakpointConfig = DEFAULT_BREAKPOINTS;
  private screenWidth = ref(0);

  constructor() {
    this.init();
  }

  private async init() {
    this.breakpoints = await getTailwindBreakpoints();

    if (typeof window !== "undefined") {
      this.screenWidth.value = window.innerWidth;
      this.handleResize = this.handleResize.bind(this);
      window.addEventListener("resize", this.handleResize);
    }
  }

  private handleResize() {
    this.screenWidth.value = window.innerWidth;
  }

  isAbove(breakpoint: BreakpointSize): boolean {
    const bpValue = parseBreakpoint(this.breakpoints[breakpoint]);
    return this.screenWidth.value >= bpValue;
  }

  isBelow(breakpoint: BreakpointSize): boolean {
    const bpValue = parseBreakpoint(this.breakpoints[breakpoint]);
    return this.screenWidth.value < bpValue;
  }

  isBetween(min: BreakpointSize, max: BreakpointSize): boolean {
    const minValue = parseBreakpoint(this.breakpoints[min]);
    const maxValue = parseBreakpoint(this.breakpoints[max]);
    return this.screenWidth.value >= minValue && this.screenWidth.value < maxValue;
  }

  get currentBreakpoints() {
    return {
      isSm: this.isAbove("sm"),
      isMd: this.isAbove("md"),
      isLg: this.isAbove("lg"),
      isXl: this.isAbove("xl"),
      is2xl: this.isAbove("2xl"),
      is3xl: this.isAbove("3xl"),

      isMobile: this.isBelow("lg"),
      isTablet: this.isBetween("md", "lg"),
      isDesktop: this.isAbove("lg"),
    };
  }

  get width() {
    return this.screenWidth;
  }

  destroy() {
    if (typeof window !== "undefined") {
      window.removeEventListener("resize", this.handleResize);
    }
  }
}

let breakpointManager: BreakpointManager | null = null;

export const useBreakpoint = () => {
  if (!breakpointManager) {
    breakpointManager = new BreakpointManager();
  }

  const isAbove = (breakpoint: BreakpointSize) => {
    return computed(() => breakpointManager!.isAbove(breakpoint));
  };

  const isBelow = (breakpoint: BreakpointSize) => {
    return computed(() => breakpointManager!.isBelow(breakpoint));
  };

  const isBetween = (min: BreakpointSize, max: BreakpointSize) => {
    return computed(() => breakpointManager!.isBetween(min, max));
  };

  const breakpoints = computed(() => breakpointManager!.currentBreakpoints);

  return {
    isAbove,
    isBelow,
    isBetween,

    breakpoints,

    screenWidth: breakpointManager.width,

    isMobile: computed(() => breakpointManager!.isBelow("lg")),
    isTablet: computed(() => breakpointManager!.isBetween("md", "lg")),
    isDesktop: computed(() => breakpointManager!.isAbove("lg")),
  };
};

export const useBreakpointClass = (elementRef: Ref<HTMLElement | undefined>, breakpoint: BreakpointSize = "lg", className: string = "is-mobile", mode: "above" | "below" = "below") => {
  const { isAbove, isBelow } = useBreakpoint();

  const shouldAddClass = mode === "below" ? isBelow(breakpoint) : isAbove(breakpoint);

  watch(
    shouldAddClass,
    (newValue) => {
      if (elementRef.value) {
        if (newValue) {
          elementRef.value.classList.add(className);
        } else {
          elementRef.value.classList.remove(className);
        }
      }
    },
    { immediate: true }
  );

  return {
    shouldAddClass,
  };
};

export type { BreakpointConfig };
