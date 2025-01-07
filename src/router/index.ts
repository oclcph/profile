import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Articles from '../views/Articles.vue'
import MarkDownViewer from "../views/MarkDownViewer.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/articles', component: Articles },
    { path: '/articles/:file', name: 'article', component: MarkDownViewer, props: true}
];


const router = createRouter({
    history: createWebHashHistory(), // 使用 Hash 模式
    routes,
})

export default router
