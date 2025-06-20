import { createI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { computed } from "vue";

const messages: Record<string, any> = {};
const files = import.meta.glob("./content/*/*.json", { eager: true });
export const languages: string[] = [];

for (const [path, mod] of Object.entries(files)) {
  const match = path.match(/\.\/content\/([^/]+)\/([^/]+)\.json$/);
  if (!match) continue;

  const [, locale, page] = match;
  if (!messages[locale]) messages[locale] = {};

  if (!languages.includes(locale)) languages.push(locale);
  messages[locale][page.toLowerCase()] = (mod as any).default;
}

const defaultLocale = "en";

export const namespaces = Object.keys(messages[defaultLocale] || {});

export const i18n = createI18n({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: "en",
  messages,
  globalInjection: true,
});

export function usePageTranslation() {
  const route = useRoute();
  const page = computed(() => {
    const segments = route.path.split("/").filter(Boolean);
    return segments.length > 0 ? segments[0] : "home";
  });

  const t = (key: string, ...args: any[]) => {
    const ns = page.value.toLowerCase();
    return i18n.global.t(`${ns}.${key}`, ...args);
  };

  return t;
}

export function useComponentTranslation(component: string) {
  const t = (key: string, ...args: any[]) => {
    return i18n.global.t(`${component.toLowerCase()}.${key}`, ...args);
  };

  return t;
}
