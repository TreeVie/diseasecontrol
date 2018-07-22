import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

const route = new VueRouter({
    routes: [
        {
            path: "/",
            component: () =>
                import(/* webpackChunkName: "layout" */ "../components/demo/index.vue"), //{ template: "<div><p>Hello Router</p></div>" },
            children: [
                {
                    path: "/demo",
                    component: () =>
                        import(/* webpackChunkName: "layout" */ "../components/demo/index.vue")
                }
            ]
        }
    ],
    mode: "history"
});

export default route;
