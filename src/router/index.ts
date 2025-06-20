import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";
import Typography from "@/pages/Typography.vue";
import LayoutBase from "@/layouts/LayoutBase.vue";
// import LayoutAdmin from "@/layouts/LayoutAdmin.vue";
import Page404 from "@/pages/Page404.vue";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    {
      path: "/",
      component: LayoutBase,
      children: [
        {
          path: "",
          name: "home",
          component: Home,
        },
        {
          path: "/typography",
          name: "typography",
          component: Typography,
        },
        {
          path: ":pathMatch(.*)*",
          name: "ViewNotFound",
          component: Page404,
        },
      ],
    },
    // {
    //   path: "/admin",
    //   component: LayoutAdmin,
    //   children: [
    //     {
    //       path: "",
    //       name: "Admin",
    //       component: Admin,
    //     },
    //   ]
    // }
  ],
});

export default router;
