<template>
  <div>
    <ul>
      <li
        v-for="(file, index) in fileList"
        :key="index"
        @click="navigateToArticle(file)"
      >
        {{ file }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const fileList = ref<string[]>([]);

onMounted(async () => {
  const response = await fetch('/profile/fileList.json');
  fileList.value = (await response.json()).files;
  console.log(fileList.value);
});

const router = useRouter();

const navigateToArticle = (file: string) => {
  // 在这里触发导航事件，例如使用 Vue Router 的 $router.push
  // 你需要根据你的路由配置来调整这里的代码
  router.push({ name: 'article', params: { file } });
};
</script>

<style>
/* 添加样式（可选） */
</style>
