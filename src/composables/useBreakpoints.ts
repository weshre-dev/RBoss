import { ref, onMounted, onUnmounted, computed, watch, type Ref } from "vue";

// Interface pour les breakpoints
interface BreakpointConfig {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  "3xl": string;
}

// Fonction pour extraire la valeur numérique des breakpoints
const parseBreakpoint = (value: string): number => {
  return parseInt(value.replace("px", ""));
};

// Fonction pour récupérer la config Tailwind automatiquement
const getTailwindBreakpoints = async (): Promise<BreakpointConfig> => {
  try {
    // Tentative de récupération dynamique de la config Tailwind
    const configModule = await import("/tailwind.config.js");
    const config = configModule.default || configModule;

    if (config?.theme?.screens) {
      return config.theme.screens;
    }
  } catch (error) {
    console.warn("Could not load Tailwind config, using fallback breakpoints");
  }

  // Fallback avec vos valeurs actuelles
  return {
    sm: "550px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
    "3xl": "2050px",
  };
};

// Breakpoints par défaut (synchrones pour l'initialisation)
const DEFAULT_BREAKPOINTS: BreakpointConfig = {
  sm: "550px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
  "3xl": "2050px",
};

// Type interne (non exporté pour éviter les conflits)
type BreakpointSize = keyof BreakpointConfig;

class BreakpointManager {
  private breakpoints: BreakpointConfig = DEFAULT_BREAKPOINTS;
  private screenWidth = ref(0);
  private listeners: (() => void)[] = [];

  constructor() {
    this.init();
  }

  private async init() {
    // Charger les breakpoints Tailwind
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

  // Méthode pour vérifier si on est au-dessus d'un breakpoint (min-width)
  isAbove(breakpoint: BreakpointSize): boolean {
    const bpValue = parseBreakpoint(this.breakpoints[breakpoint]);
    return this.screenWidth.value >= bpValue;
  }

  // Méthode pour vérifier si on est en-dessous d'un breakpoint (max-width)
  isBelow(breakpoint: BreakpointSize): boolean {
    const bpValue = parseBreakpoint(this.breakpoints[breakpoint]);
    return this.screenWidth.value < bpValue;
  }

  // Méthode pour vérifier si on est entre deux breakpoints
  isBetween(min: BreakpointSize, max: BreakpointSize): boolean {
    const minValue = parseBreakpoint(this.breakpoints[min]);
    const maxValue = parseBreakpoint(this.breakpoints[max]);
    return this.screenWidth.value >= minValue && this.screenWidth.value < maxValue;
  }

  // Getters pour les breakpoints courants
  get currentBreakpoints() {
    return {
      isSm: this.isAbove("sm"),
      isMd: this.isAbove("md"),
      isLg: this.isAbove("lg"),
      isXl: this.isAbove("xl"),
      is2xl: this.isAbove("2xl"),
      is3xl: this.isAbove("3xl"),

      // Helpers pour mobile/desktop
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

// Instance singleton
let breakpointManager: BreakpointManager | null = null;

export const useBreakpoint = () => {
  if (!breakpointManager) {
    breakpointManager = new BreakpointManager();
  }

  onUnmounted(() => {
    // Note: On ne détruit pas le manager car il peut être utilisé par d'autres composants
  });

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
    // Méthodes de vérification
    isAbove,
    isBelow,
    isBetween,

    // Breakpoints réactifs
    breakpoints,

    // Largeur de l'écran
    screenWidth: breakpointManager.width,

    // Helpers couramment utilisés
    isMobile: computed(() => breakpointManager!.isBelow("lg")),
    isTablet: computed(() => breakpointManager!.isBetween("md", "lg")),
    isDesktop: computed(() => breakpointManager!.isAbove("lg")),
  };
};

// Composable pour gérer les classes CSS basées sur les breakpoints
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

// Export seulement des interfaces nécessaires
export type { BreakpointConfig };
