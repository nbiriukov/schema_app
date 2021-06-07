import Vue from "vue";
import Vuelidate from "vuelidate";
import VuelidateErrorExtractor from "vuelidate-error-extractor";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

Vue.config.productionTip = false;

Vue.use(Vuelidate);
Vue.use(VuelidateErrorExtractor, {
  messages: { required: "The field is required" },
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
