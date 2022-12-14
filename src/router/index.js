import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";

Vue.use(VueRouter);

const requireAuth = () => (to, from, next) => {
  const myHeaders = new Headers();
  const TOKEN = $cookies.get("token");
  myHeaders.append("Authorization", `Bearer ${TOKEN}`);
  fetch(`/v2/apis/auth/logins/validation`, {
    method: "get",
    headers: myHeaders,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("err");
      }
      return response.json();
    })
    .then((json) => {
      console.log(json);
      next();
    })
    .catch(() => {
      next("/");
    });
};

// loginPage 접속 시 validation절차 진행  why? 로그인 성공시 loginPage로 다시 되돌아가는 것을 막기 위하여

const requireAuthLogin = () => (to, from, next) => {
  const myHeaders = new Headers();
  const TOKEN = $cookies.get("token");

  myHeaders.append("Authorization", `Bearer ${TOKEN}`);
  fetch(`/v2/apis/auth/logins/validation`, {
    method: "get",
    headers: myHeaders,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("err");
      }
      return response.json();
    })
    .then((json) => {
      console.log(json);
      next({ name: "mainPage" });
    })
    .catch(() => {
      next();
    });
};

const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/login",
    name: "loginPage",
    component: () => import("../views/LoginView.vue"),
    beforeEnter: requireAuthLogin(),
  },

  {
    path: "/main",
    name: "mainPage",
    redirect: "/warning",
    component: () => import("../views/MainView.vue"),
    children: [
      {
        path: "/warning",
        name: "warningPage",
        component: () => import("../views/WarningPageView.vue"),
        beforeEnter: requireAuth(),
      },
      {
        path: "/program",
        name: "programPage",
        component: () => import("../views/ProgramView.vue"),
        beforeEnter: requireAuth(),
      },

      {
        path: "/relation",
        name: "relationPage",
        component: () => import("../views/RelationView.vue"),
        beforeEnter: requireAuth(),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
