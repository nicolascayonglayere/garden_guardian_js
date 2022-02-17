import { createWebHistory, createRouter } from "vue-router";
import Home from "../components/Home.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
const Profile = () => import("../components/Profile.vue");

const routes = [
  {
    path: "/me",
    name: "home",
    component: Home,
    // meta: {
    //   requiresAuth: true,
    // },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/profile",
    name: "profile",
    // lazy-loaded
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory("/"),
  //base: process.env.VUE_APP_API_ROOT,
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = ["/login", "/register"];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem("user");

  // trying to access a restricted page + not logged in
  // redirect to login page
  if (authRequired && !loggedIn) {
    next("/login");
  } else {
    next();
  }
  // if (to.name === from.name) {
  //   return next();
  // }
  // next();
  // if (to.matched.some((record) => record.meta.requiresAuth)) {
  //   if (localStorage.getItem("user") == null) {
  //     next({
  //       path: "/login",
  //     });
  //   } else {
  //     next();
  //   }
  // } else {
  //   next();
  // }
});

export default router;
