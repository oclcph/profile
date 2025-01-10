import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'; // 使用 import type 导入类型
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Articles from '../views/Articles.vue';
import MarkDownViewer from '../views/MarkDownViewer.vue';

const routes = [
  { path: '/', component: Home, meta: { title: '首页' } },
  { path: '/about', component: About, meta: { title: '关于' } },
  { path: '/articles', component: Articles, meta: { title: '文章' } },
  {
    path: '/articles/:file',
    name: 'article',
    component: MarkDownViewer,
    props: true,
  },
];

const router = createRouter({
  history: createWebHashHistory(), // 使用 Hash 模式
  routes,
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    console.log(from);
    if (to.name === 'article' && to.params.file) {
      // 动态修改meta.title
      to.meta.title = `${to.params.file}`;
    }
    // 设置页面标题
    if (to.meta.title) {
      document.title = to.meta.title as string;
    }
    next();
  }
);

export default router;
