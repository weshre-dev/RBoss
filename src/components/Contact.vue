<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import { useI18n as useVueI18n } from "vue-i18n";
import { usePageTranslation } from "@/i18n";
import VueSVG from "@/components/VueSVG.vue";

// Composition API setup
const { t } = useVueI18n();

// Refs pour les éléments DOM
const titleRef = ref<HTMLElement>();
const formRowRef = ref<HTMLElement>();
const textareaRef = ref<HTMLTextAreaElement>();

// État réactif du formulaire
const formData = reactive({
  name: "",
  email: "",
  message: "",
  policy: false,
});

// États de soumission et d'erreur
const isSubmitting = ref(false);
const isSuccess = ref(false);
const serverError = ref("");

// États de visibilité pour les animations
const isVisible = ref(false);
const isVisible2 = ref(false);

// Gestionnaires d'événements
const handleChange = (field: keyof typeof formData, value: string | boolean) => {
  formData[field] = value as never;
};

const handleSubmit = async (event: Event) => {
  event.preventDefault();

  if (!formData.policy) {
    serverError.value = t("form.privacy_required");
    return;
  }

  isSubmitting.value = true;
  serverError.value = "";

  try {
    // Logique de soumission du formulaire
    // await submitForm(formData)

    isSuccess.value = true;

    // Reset du formulaire après succès
    Object.assign(formData, {
      name: "",
      email: "",
      message: "",
      policy: false,
    });
  } catch (error) {
    serverError.value = t("form.error_generic");
  } finally {
    isSubmitting.value = false;
  }
};

const handleInvalid = (event: Event, field: string) => {
  event.preventDefault();
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;

  if (field === "email" && target.validity.typeMismatch) {
    target.setCustomValidity(t("form.email_invalid"));
  } else if (target.validity.tooShort) {
    target.setCustomValidity(t("form.too_short"));
  } else if (target.validity.valueMissing) {
    target.setCustomValidity(t("form.required"));
  }
};

const handleInputValidation = (event: Event) => {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement;
  target.setCustomValidity("");
};

const handleTextareaInput = () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = "auto";
    textareaRef.value.style.height = textareaRef.value.scrollHeight + "px";
  }
};

// Intersection Observer ou logique d'animation à implémenter
// Pour l'exemple, on active les animations au montage
import { onMounted } from "vue";

onMounted(() => {
  // Simuler l'intersection observer
  setTimeout(() => {
    isVisible.value = true;
  }, 100);

  setTimeout(() => {
    isVisible2.value = true;
  }, 200);
});
</script>

<template>
  <section id="contact" class="s-contact">
    <div class="hr-full"></div>
    <h3 ref="titleRef" class="s-contact__title">Meet us, partner with us</h3>

    <div class="s-contact__content">
      <div class="s-contact__text">
        <p class="reset">
          If you have a question, need support, or just want to say hello, feel free to drop us an email below. But if you're reaching out about a new project, go ahead and fill out the form and we'll get back to you with details on how we can bring
          your idea to life.
        </p>
        <a href="mailto:info@rboss.eu">
          <figure class="text-text-primary">
            <VueSVG src="/svg/big-arrow.svg" />
          </figure>
          info@rboss.eu
        </a>
      </div>

      <div class="s-contact__form">
        <form @submit="handleSubmit">
          <div class="form-row" ref="formRowRef">
            <label for="name" class="sr-only">{{ t("form.name") }}</label>
            <input
              type="text"
              :placeholder="t('form.name') + '*'"
              id="name"
              name="name"
              v-model="formData.name"
              @invalid="(e) => handleInvalid(e, 'name')"
              @input="handleInputValidation"
              :class="{ 'animate-from-bottom': isVisible2, 'opacity-0': !isVisible2 }"
              :disabled="isSubmitting"
              required
              minlength="2"
            />
            <label for="email" class="sr-only">{{ t("form.email") }}</label>
            <input
              type="email"
              :placeholder="t('form.email') + '*'"
              id="email"
              name="email"
              v-model="formData.email"
              @invalid="(e) => handleInvalid(e, 'email')"
              @input="handleInputValidation"
              :class="{ 'animate-from-bottom': isVisible2, 'opacity-0': !isVisible2 }"
              :disabled="isSubmitting"
              required
            />
          </div>

          <label for="message" class="sr-only">{{ t("form.message") }}</label>
          <textarea
            :class="{ 'animate-from-bottom--px': isVisible2, 'opacity-0': !isVisible2 }"
            name="message"
            id="message"
            :placeholder="t('form.message') + '*'"
            ref="textareaRef"
            v-model="formData.message"
            @invalid="(e) => handleInvalid(e, 'message')"
            @input="
              (e) => {
                handleInputValidation(e);
                handleTextareaInput();
              }
            "
            rows="1"
            :disabled="isSubmitting"
            required
            minlength="10"
          />

          <div class="relative flex gap-10 items-center mb-4">
            <SuccessMessage :show="isSuccess" />
            <div v-if="serverError" class="animate-from-bottom absolute -bottom-30 right-0 ml-auto max-w-[270px] text-14 z-[3] bg-[#b2291189] backdrop-blur-sm p-15 rounded-[10px]">
              {{ serverError }}
            </div>
          </div>

          <button type="submit" class="btn-primary" :disabled="isSubmitting">
            <span>{{ isSubmitting ? "sending.." : "submit" }}</span>
            <VueSVG src="/svg/plane.svg" />
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.s-contact {
  .separator {
    display: flex;
    width: 100%;
    background-color: var(--text-primary);
    height: 2px;
    @apply mb-40 sm:mb-60 lg:mb-120;
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }

  &__text {
    p {
      @apply lg:text-neg-5-20 text-neg-5-16;
    }

    a {
      transition: color 0.2s ease;
      @apply flex items-center gap-20 mt-40 mb-30 underline text-16 lg:text-[24px];

      svg {
        animation: bounceLeftToRight 2.5s infinite;
        @apply w-[18px] sm:w-[50px] lg:w-70;
      }

      &:hover {
        color: var(--blue-color);
      }
    }

    li {
      @apply text-16 lg:text-[24px];
    }
  }

  &__form {
    position: relative;

    .form-row {
      display: flex;
      width: 100%;
      gap: 35px;
      @apply mb-80 sm:mb-120 lg:mb-150;
    }

    input,
    textarea {
      font-weight: 500;
      width: 100%;
      padding-bottom: 15px;
      background-color: transparent;
      color: var(--text-primary);
      border-bottom: 1px solid var(--text-primary);
      outline: none;
      &:focus {
        outline: none;
      }
      @apply text-12 sm:text-16 lg:text-[24px];
    }

    #policy {
      appearance: none;
      -webkit-appearance: none;
      position: relative;
      width: 30px;
      height: 30px;
      background-color: transparent;
      border: 2px solid var(--text-primary);
      cursor: pointer;
      @apply w-20 h-20 sm:w-30 sm:h-30 rounded-[5px] sm:rounded-[8px];

      &::after {
        position: absolute;
        content: "";
        background-color: var(--blue-color);
        opacity: 0;
        scale: 0;
        transition: opacity 0.2s ease, scale 0.2s ease;
        @apply sm:w-[calc(100%-12px)] sm:h-[calc(100%-12px)] w-[calc(100%-8px)] h-[calc(100%-8px)] top-4 sm:top-6 left-4 sm:left-6 rounded-[2px] sm:rounded-[5px];
      }

      &:checked::after {
        opacity: 1;
        scale: 1;
      }
    }

    textarea {
      display: flex;
      overflow: hidden;
      resize: none;
      @apply mb-40 sm:mb-60 lg:mb-80;
    }

    .link {
      text-decoration: underline;
      transition: color 0.2s ease;
      &:hover {
        color: var(--blue-color);
      }
    }
  }
}
</style>
