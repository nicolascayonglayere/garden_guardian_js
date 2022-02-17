import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import BootstrapVue from "bootstrap-vue-3";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap/dist/bootstrap-vue-3.css";
import store from "./store/index";
import { FontAwesomeIcon } from "./plugins/font-awesome";

const myApp = createApp(App);
myApp.component("font-awesome-icon", FontAwesomeIcon);
// myApp.use(BootstrapVue);
// myApp.use(base);
myApp.use(router);
myApp.use(store);

myApp.mount("#app");

// Vue.config.productionTip = false;
// Vue.use(BootstrapVue);

// new Vue({
//   store,
//   router,
//   render: (h) => h(App),
// }).$mount("#app");

// import { createApp } from 'vue'
// import App from './App.vue'

// createApp(App).mount('#app')
