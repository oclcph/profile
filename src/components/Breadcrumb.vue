<template>
  <nav class="bg-gray-100 py-2 px-4">
    <ol class="flex space-x-2">
      <li
        v-for="(item, index) in breadcrumbs"
        :key="index"
        class="flex items-center"
      >
        <router-link
          :to="item.path"
          class="text-blue-500 hover:underline"
          v-if="index < breadcrumbs.length - 1"
        >
          {{ item.name }}
        </router-link>
        <span v-else class="text-gray-700">{{ item.name }}</span>
        <span v-if="index < breadcrumbs.length - 1" class="mx-2">→</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// 计算面包屑路径
const route = useRoute();
const router = useRouter();

const breadcrumbs = computed(() => {
  const paths = route.path.split('/').filter(Boolean);
  const fullPaths = paths.map((_, i) => '/' + paths.slice(0, i + 1).join('/'));
  const crumbs = fullPaths.map((path) => {
    // 使用 router.resolve 获取当前路由的解析结果
    const route = router.resolve(path);
    // 查找路由记录中对应的 meta.title，优先使用该值
    const title =
      route.matched?.[0]?.meta?.title || router.currentRoute.value.meta.title;
    return {
      name: title,
      path: path,
    };
  });
  return [{ path: '/', name: '首页' }, ...crumbs];
});
</script>

<style scoped>
/* 可选样式调整 */
nav {
  font-size: 0.875rem;
  z-index: 100;
}
</style>
