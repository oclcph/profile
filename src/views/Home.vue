<template>
    <div>
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
h1 {
  color: #2c3e50;
  font-size: 2em;
  margin-bottom: 10px;
}

h2 {
  color: #34495e;
  font-size: 1.5em;
  margin-bottom: 8px;
}

strong {
  color: #e74c3c;
}

ul {
  list-style-type: disc;
  margin-left: 20px;
}

li {
  margin-bottom: 10px;
}

blockquote {
  margin: 10px 0;
  padding: 10px;
  border-left: 5px solid #3498db;
  background-color: #ecf6fd;
}
</style>
