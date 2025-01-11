<template>
  <div class="markdown-content">
    <div v-html="renderedMarkdown"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { marked } from 'marked';
import katex from 'katex';
import hljs from 'highlight.js'; // 导入 highlight.js ，用于代码高亮
import 'highlight.js/styles/default.css';

// 接收 markdown 字符串作为 prop
const props = defineProps<{
  content: string; // markdown 内容
}>();

const renderedMarkdown = ref<string>('');
const renderer = new marked.Renderer();
const emit = defineEmits(['load-complete']);

// 处理代码
function processCode(text: string): string {
  // 处理行内代码
  const inlineCodeRegex = /`(.+?)`/g;
  return text.replace(inlineCodeRegex, (_, codeText) => {
    return `<code class="hljs">${codeText}</code>`;
  });
}

// 处理段内黑体
function processBold(text: string): string {
  const boldRegex = /\*\*(.+?)\*\*/g;
  return text.replace(boldRegex, (_, boldText) => {
    return `<strong>${boldText}</strong>`;
  });
}

// 替换行内公式 $...$
function processInlineFormulas(content: string): string {
  // 处理行内公式 $...$
  const inlineFormulaRegex = /\$(.+?)\$/g;
  content = content.replace(inlineFormulaRegex, (_, formula) => {
    return katex.renderToString(formula, {
      throwOnError: false,
      output: 'mathml', // 输出 MathML 格式
    });
  });
  return content;
}

// 替换块级公式 $$...$$
function processBlockFormulas(content: string): string {
  const blockFormulaRegex = /\$\$([\s\S]+?)\$\$/g;
  return content.replace(blockFormulaRegex, (_, formula) => {
    return `<p>${katex.renderToString(formula, { displayMode: true, throwOnError: false, output: 'mathml' })}</p>`;
  });
}

function processPara(text: string): string {
  const withBlockFormulas = processBlockFormulas(text);
  // 再处理行内公式
  const withInlineFormulas = processInlineFormulas(withBlockFormulas);
  // 在处理段内黑体
  const withBold = processBold(withInlineFormulas);
  // 处理行内代码
  const withInlineCode = processCode(withBold);

  return `<p>${withInlineCode}</p>`;
}

function processText(text: string): string {
  const withInlineFormulas = processInlineFormulas(text);
  const withBold = processBold(withInlineFormulas);
  const withInlineCode = processCode(withBold);
  return `${withInlineCode}`;
}

// 自定义 Markdown 渲染器
renderer.paragraph = (text) => {
  return processPara(text.text);
};

renderer.text = (text) => {
  // console.log(text.text);
  return processText(text.text);
};

renderer.code = ({ text, lang, escaped }) => {
  console.log(text);
  // 处理代码块
  if (escaped) {
    return text;
  }
  let validLanguage;
  if (lang) validLanguage = hljs.getLanguage(lang) ? lang : 'plaintext';
  else validLanguage = 'plaintext';
  const highlighted = hljs.highlight(text, { language: validLanguage }).value;
  return `<pre><code class="hljs ${validLanguage}">${highlighted}</code></pre>`;
};

// 使用 watchEffect 来观察 content 属性的变化
watchEffect(() => {
  renderedMarkdown.value = marked(props.content, { renderer }) as string; // 渲染 Markdown 为 HTML
  // console.log(renderedMarkdown.value);
  emit('load-complete');
});
</script>

<style scoped></style>
