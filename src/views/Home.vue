<template>
  <div>
    <h1>我的文章</h1>
    <MarkdownResolver :content="markdownContent" />
  </div>
</template>

<script setup lang="ts">
import MarkdownResolver from '../components/MarkDownResolver.vue'
import { ref, onMounted } from 'vue';

const markdownContent = ref<string>('')
const fetchContent = async () => {
  const res = await fetch("/profile/AI.md")
  markdownContent.value = await res.text()
  console.log(res)
  console.log("Markdown content:", markdownContent.value);  // 调试输出

}

onMounted(async () => {
  await fetchContent()
})
</script>

<style>
/* 添加样式（可选） */
</style>
