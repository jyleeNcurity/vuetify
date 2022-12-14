// import Vue from "vue";
// import Vuex from "vuex";
// import router from "../router";
// import createPersistedState from "vuex-persistedstate";

// Vue.use(Vuex);

// export default new Vuex.Store({
//   // plugins: [
//   //   createPersistedState({
//   //     storage: window.sessionStorage, // store를 session storage 에 유지 => 동기화
//   //   }),
//   // ],
//   state: {
//     // accessToken: "",
//     // user: "",
//   },
//   getters: {},
//   mutations: {
//     SET_TOKEN(state, payload) {
//       console.log(payload);
//       if (payload._status.status === 200) {
//         // state.accessToken = payload.access_token;
//         // state.user = payload.oit.name;
//         $cookies.set("token", payload.access_token, { expires: "0" });
//         $cookies.set("user", payload.oit.name, { expires: "0" });
//         router.replace({ name: "mainPage" });
//       } else {
//         alert("잘못된 인증입니다.");
//       }
//     },
//   },
//   actions: {
//     LOGIN(context, payload) {
//       fetch(`/v2/apis/auth/logins`, {
//         method: "post",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       })
//         .then((response) => response.json())
//         .then((json) => {
//           context.commit("SET_TOKEN", json);
//         });
//     },
//   },
//   modules: {},
// });
