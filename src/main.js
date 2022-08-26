import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import "vfonts/Lato.css";
import naive from "naive-ui";
import VueGtag from "vue-gtag";
const app = createApp(App);
const apiRoot = "https://preserve.virgil246.com"
app.use(createPinia());
app.use(router);
app.use(naive);
app.use(VueGtag, {
    config:{id:"G-B1G7LLY53C"}
});
app.mount("#app");
export default apiRoot;
