import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    },
    // 添加更多路由...
]

const router = createRouter({
    history: createWebHashHistory(), // 使用 Hash 模式
    routes,
})

export default router
