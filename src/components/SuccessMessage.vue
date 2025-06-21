<script setup lang="ts">
interface Props {
  show: boolean;
  message?: string;
}

withDefaults(defineProps<Props>(), {
  message: "Thank you, your message has been sent successfully. We will get back to you within 48 hours. See you soon.",
});
</script>

<template>
  <div v-if="show" class="animate-from-bottom absolute -bottom-30 right-0 ml-auto max-w-[270px] text-14 z-[3] bg-[#5774148a] backdrop-blur-sm p-15 rounded-[10px]">
    {{ message }}
  </div>
</template>
