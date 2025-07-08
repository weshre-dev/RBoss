<script setup lang="ts">
import { ref, onMounted } from "vue";
import VueSVG from "@/components/VueSVG.vue";
import SuccessMessage from "@/components/SuccessMessage.vue";
import { useContactForm, type ContactFormData } from "@/composables/useContactForm";
import { useComponentTranslation } from "@/i18n";

const t = useComponentTranslation("contact");

const titleRef = ref<HTMLElement>();
const formRowRef = ref<HTMLElement>();
const textareaRef = ref<HTMLTextAreaElement>();

const isVisible = ref(false);
const isVisible2 = ref(false);

const contactFormConfig = {
  onSuccess: (data: ContactFormData) => {
    console.log("Form submitted successfully:", data);
  },
  onError: (error: Error) => {
    console.error("Form submission error:", error);
  },
  accessKey: "583c4c93-d95e-4ae0-8b50-61bfd0171571",
};

const { formData, isSubmitting, isSuccess, serverError, handleChange, handleSubmit, handleInput } = useContactForm(contactFormConfig);

const handleTextareaInput = (e: Event) => {
  handleInput(e);
  if (textareaRef.value) {
    textareaRef.value.style.height = "auto";
    textareaRef.value.style.height = textareaRef.value.scrollHeight + "px";
  }
};

onMounted(() => {
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
    <h3 ref="titleRef" class="s-contact__title">{{ t("discuss") }}</h3>

    <div class="s-contact__content">
      <div class="s-contact__text">
        <p class="reset">
          {{ t("question") }}
        </p>
        <a href="mailto:info@rboss.eu">
          <figure class="text-text-primary">
            <VueSVG src="/svg/big-arrow.svg" />
          </figure>
          info@rboss.eu
        </a>
      </div>

      <div class="s-contact__form">
        <form @submit.prevent="handleSubmit">
          <div class="form-row form-row--half" ref="formRowRef">
            <label for="name" class="sr-only">{{ t("form.name") }}</label>
            <input
              type="text"
              :placeholder="t('form.name') + '*'"
              id="name"
              name="name"
              :value="formData.name"
              @input="(e) => handleChange('name', (e.target as HTMLInputElement).value)"
              :class="{ 'animate-from-bottom': isVisible2, 'opacity-0': !isVisible2 }"
              :disabled="isSubmitting"
              required
              minlength="2"
            />
          </div>
          <div class="form-row form-row--half" ref="formRowRef">
            <label for="name" class="sr-only">{{ t("form.company") }}</label>
            <input
              type="text"
              :placeholder="t('form.company') + '*'"
              id="company"
              name="company"
              :value="formData.company"
              @input="(e) => handleChange('company', (e.target as HTMLInputElement).value)"
              :class="{ 'animate-from-bottom': isVisible2, 'opacity-0': !isVisible2 }"
              :disabled="isSubmitting"
              required
              minlength="2"
            />
          </div>

          <div class="form-row">
            <label for="email" class="sr-only">{{ t("form.email") }}</label>
            <input
              type="email"
              :placeholder="t('form.email') + '*'"
              id="email"
              name="email"
              :value="formData.email"
              @input="(e) => handleChange('email', (e.target as HTMLInputElement).value)"
              :class="{ 'animate-from-bottom': isVisible2, 'opacity-0': !isVisible2 }"
              :disabled="isSubmitting"
              required
            />
          </div>
          <div class="form-row">
            <label for="subject" class="sr-only">{{ t("form.subject") }}</label>
            <input
              type="subject"
              :placeholder="t('form.subject') + '*'"
              id="subject"
              name="subject"
              :value="formData.subject"
              @input="(e) => handleChange('subject', (e.target as HTMLInputElement).value)"
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
            :value="formData.message"
            @input="(e) => {
              handleChange('message', (e.target as HTMLTextAreaElement).value);
              handleTextareaInput(e);
            }"
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

          <button type="submit" class="btn-primary ml-auto" :disabled="isSubmitting">
            <span>{{ isSubmitting ? t("form.sending") : t("form.submit") }}</span>
            <VueSVG src="/svg/plane.svg" />
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
.s-contact {
  padding-bottom: 80px;
  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 70px;
    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }

  &__text {
    p {
      max-width: 600px;
      @apply lg:text-neg-5-20 text-neg-5-16 font-light;
    }

    a {
      transition: color 0.2s ease;
      @apply flex items-center gap-20 mt-40 mb-30 text-neg-5-18 lg:text-neg-5-24 font-light;

      svg {
        animation: bounceLeftToRight 2.5s infinite;
        @apply w-[50px] lg:w-70;
      }

      &:hover {
        color: var(--red-color);
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
      @apply mb-50 md:mb-80;
      &--half {
        @apply lg:max-w-[50%];
      }
    }

    .policy-row {
      display: flex;
      align-items: flex-start;
      gap: 15px;
      @apply mb-40 sm:mb-60 lg:mb-80;

      .policy-label {
        @apply text-12 sm:text-14 lg:text-16;

        .link {
          text-decoration: underline;
          transition: color 0.2s ease;
          &:hover {
            color: var(--red-color);
          }
        }
      }
    }

    input,
    textarea {
      width: 100%;
      padding-bottom: 15px;
      background-color: transparent;
      color: var(--text-primary);
      border-bottom: 1px solid var(--text-primary);
      outline: none;
      &:focus {
        outline: none;
      }
      &::placeholder {
        color: var(--text-primary);
      }
      @apply text-neg-5-14 lg:text-neg-5-16 font-light;
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
        background-color: var(--red-color);
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
      transition: color 0.2s ease;
      &:hover {
        color: var(--red-color);
      }
    }
  }
}
</style>
