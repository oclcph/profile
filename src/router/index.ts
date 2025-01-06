import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import MarkDownResolver from "../components/MarkDownResolver.vue";

const articles = ['AI.md']

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    ...articles.map(article => ({
        path: `/articles/${article.replace('.md', '')}`, // 生成路由路径
        component: MarkDownResolver,
        props: { contentPath: article }, // 传递文件名
    })),
];


const router = createRouter({
    history: createWebHashHistory(), // 使用 Hash 模式
    routes,
})

export default router
