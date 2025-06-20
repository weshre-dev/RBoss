import { useI18n as useVueI18n } from "vue-i18n";
import { languages } from "@/i18n";

export function useLanguageSwitcher() {
  const { locale } = useVueI18n();

  const setLanguage = (lang: string) => {
    if (languages.includes(lang)) {
      locale.value = lang;
      localStorage.setItem("locale", lang);
    }
  };

  return {
    currentLanguage: locale,
    availableLanguages: languages,
    setLanguage,
  };
}
