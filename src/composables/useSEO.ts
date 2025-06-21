import { useHead } from "@unhead/vue";
import { computed } from "vue";

interface SEOOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  siteName?: string;
  locale?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export const useSEO = (options: SEOOptions = {}) => {
  const defaultSEO = {
    siteName: "RBoss Group",
    locale: "fr_FR",
    type: "website" as const,
    image: "/images/og-default.jpg",
    url: "https://votre-site.com",
  };

  const seoData = computed(() => ({
    ...defaultSEO,
    ...options,
  }));

  useHead({
    title: computed(() => (seoData.value.title ? `${seoData.value.title} | ${seoData.value.siteName}` : seoData.value.siteName)),

    meta: computed(() => [
      {
        name: "description",
        content: seoData.value.description || "",
      },

      ...(seoData.value.keywords
        ? [
            {
              name: "keywords",
              content: seoData.value.keywords.join(", "),
            },
          ]
        : []),

      ...(seoData.value.author
        ? [
            {
              name: "author",
              content: seoData.value.author,
            },
          ]
        : []),

      {
        property: "og:title",
        content: seoData.value.title || seoData.value.siteName,
      },
      {
        property: "og:description",
        content: seoData.value.description || "",
      },
      {
        property: "og:type",
        content: seoData.value.type,
      },
      {
        property: "og:url",
        content: seoData.value.url,
      },
      {
        property: "og:image",
        content: seoData.value.image,
      },
      {
        property: "og:site_name",
        content: seoData.value.siteName,
      },
      {
        property: "og:locale",
        content: seoData.value.locale,
      },

      {
        name: "twitter:card",
        content: "summary_large_image",
      },
      {
        name: "twitter:title",
        content: seoData.value.title || seoData.value.siteName,
      },
      {
        name: "twitter:description",
        content: seoData.value.description || "",
      },
      {
        name: "twitter:image",
        content: seoData.value.image,
      },

      ...(seoData.value.type === "article" && seoData.value.publishedTime
        ? [
            {
              property: "article:published_time",
              content: seoData.value.publishedTime,
            },
          ]
        : []),

      ...(seoData.value.type === "article" && seoData.value.modifiedTime
        ? [
            {
              property: "article:modified_time",
              content: seoData.value.modifiedTime,
            },
          ]
        : []),

      ...(seoData.value.type === "article" && seoData.value.author
        ? [
            {
              property: "article:author",
              content: seoData.value.author,
            },
          ]
        : []),
    ]),

    link: computed(() => [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "canonical",
        href: seoData.value.url,
      },
    ]),
  });

  return {
    updateSEO: (newOptions: Partial<SEOOptions>) => {
      Object.assign(options, newOptions);
    },
  };
};
