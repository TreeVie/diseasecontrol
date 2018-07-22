import Vue from "vue";
import router from "./route";
import App from "./App.vue";
import "./assets/style/reset.css"

new Vue({
    el: "#union",
    router,
    components: {
        App
    },
    template: "<App />"
});
