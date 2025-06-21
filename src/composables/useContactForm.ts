import { ref, reactive, readonly, type Ref } from "vue";

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  policy: boolean;
}

export interface UseContactFormConfig {
  onSuccess?: (data: ContactFormData) => void;
  onError?: (error: Error) => void;
  apiEndpoint?: string;
  accessKey?: string;
}

export interface UseContactFormReturn {
  formData: ContactFormData;
  isSubmitting: Readonly<Ref<boolean>>;
  isSuccess: Readonly<Ref<boolean>>;
  serverError: Readonly<Ref<string | null>>;
  handleChange: (field: keyof ContactFormData, value: string | boolean) => void;
  handleSubmit: (e: Event) => Promise<void>;
  handleInvalid: (e: Event, fieldName: string) => void;
  handleInput: (e: Event) => void;
  resetForm: () => void;
}

export const useContactForm = (config: UseContactFormConfig = {}): UseContactFormReturn => {
  const formData = reactive<ContactFormData>({
    name: "",
    email: "",
    message: "",
    policy: false,
  });

  const isSubmitting = ref(false);
  const isSuccess = ref(false);
  const serverError = ref<string | null>(null);

  const handleChange = (field: keyof ContactFormData, value: string | boolean) => {
    formData[field] = value as never;
    if (serverError.value) {
      serverError.value = null;
    }
  };

  const resetForm = () => {
    Object.assign(formData, {
      name: "",
      email: "",
      message: "",
      policy: false,
    });
    serverError.value = null;
    isSuccess.value = false;
  };

  const handleInvalid = (e: Event, fieldName: string) => {
    e.preventDefault();
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;

    switch (fieldName) {
      case "name":
        if (target.validity.valueMissing) {
          target.setCustomValidity("Please enter your name");
        } else if (target.validity.tooShort) {
          target.setCustomValidity("Name must be at least 2 characters long");
        }
        break;
      case "email":
        if (target.validity.valueMissing) {
          target.setCustomValidity("Please enter your email");
        } else if (target.validity.typeMismatch) {
          target.setCustomValidity("Please enter a valid email address");
        }
        break;
      case "message":
        if (target.validity.valueMissing) {
          target.setCustomValidity("Please enter your message");
        } else if (target.validity.tooShort) {
          target.setCustomValidity("Message must be at least 10 characters long");
        }
        break;
    }
  };

  const handleInput = (e: Event) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    target.setCustomValidity("");
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (!formData.policy) {
      serverError.value = "Please accept the privacy policy";
      return;
    }

    isSubmitting.value = true;
    serverError.value = null;

    try {
      const endpoint = config.apiEndpoint || "https://api.web3forms.com/submit";
      const payload = config.accessKey
        ? {
            ...formData,
            access_key: config.accessKey,
            from_name: formData.name,
            email: formData.email,
            message: formData.message,
          }
        : formData;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Error sending message");
      }

      isSuccess.value = true;
      config.onSuccess?.(formData);

      setTimeout(() => {
        resetForm();
      }, 5000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Error sending message";
      serverError.value = errorMessage;
      config.onError?.(error as Error);
    } finally {
      isSubmitting.value = false;
    }
  };

  return {
    formData,
    isSubmitting: readonly(isSubmitting),
    isSuccess: readonly(isSuccess),
    serverError: readonly(serverError),
    handleChange,
    handleSubmit,
    handleInvalid,
    handleInput,
    resetForm,
  };
};
