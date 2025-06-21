import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import "./assets/styles/index.scss";
import { i18n } from "@/i18n";

import { createHead } from "@unhead/vue/client";

const app = createApp(App);
const head = createHead();

app.use(head);

app.use(createPinia());

app.use(router);
app.use(i18n);
app.mount("#app");
