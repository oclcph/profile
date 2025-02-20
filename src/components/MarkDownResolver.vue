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
const emit = defineEmits(['load-complete', 'update-headers']);

const headers = ref<{ level: number; title: string; id: string }[]>([]);

// 处理代码
function processCode(text: string): string {
  // 处理行内代码
  const inlineCodeRegex = /`(.+?)`/g;
  return text.replace(inlineCodeRegex, (_, codeText) => {
    return `<code class="hljs">${codeText}</code>`;
  });
}

// 处理斜体
function processItalic(text: string): string {
  const italicRegex = /(\*([^*]+)\*|_([^_]+)_)/g; // 处理 *斜体* 和 _斜体_
  return text.replace(italicRegex, (_, __, italicText1, italicText2) => {
    const italicText = italicText1 || italicText2; // 获取斜体文本
    return `<em>${italicText}</em>`;
  });
}

// 处理段内黑体
function processBold(text: string): string {
  const boldRegex = /\*\*(.+?)\*\*/g;
  return text.replace(boldRegex, (_, boldText) => {
    return `<span style="font-weight: bold; color: black;">${boldText}</span>`;
  });
}

// 处理高光
function processHighlight(text: string): string {
  const highlightRegex = /==(.+?)==/g; // 匹配 ==高光==
  return text.replace(highlightRegex, (_, highlightText) => {
    return `<mark>${highlightText}</mark>`; // 使用 <mark> 标签来高亮文本
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
  // 先处理块级公式
  const withBlockFormulas = processBlockFormulas(text);
  // 再处理行内公式
  const withInlineFormulas = processInlineFormulas(withBlockFormulas);
  // 在处理段内黑体
  const withBold = processBold(withInlineFormulas);
  // 处理斜体
  const withItalic = processItalic(withBold);
  // 处理行内代码
  const withInlineCode = processCode(withItalic);
  // 处理高光
  const withHighlight = processHighlight(withInlineCode);

  return `<p>${withHighlight}</p>`;
}

function processText(text: string): string {
  const withInlineFormulas = processInlineFormulas(text);
  const withBold = processBold(withInlineFormulas);
  const withItalic = processItalic(withBold);
  const withInlineCode = processCode(withItalic);
  const withHighlight = processHighlight(withInlineCode);
  return `${withHighlight}`;
}

// 自定义 Markdown 渲染器
renderer.heading = ({ tokens, depth }) => {
  const title = tokens[0].raw;
  const highlight = processHighlight(title);
  return `<h${depth} id=${title.toLowerCase().replace(/\s+/g, '-')}>${highlight}</h${depth}>`;
  // return "1"
};

renderer.paragraph = (text) => {
  return processPara(text.text);
};

renderer.text = (text) => {
  // console.log(text.text);
  return processText(text.text);
};

renderer.code = ({ text, lang, escaped }) => {
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

// 生成目录
function generateClickableTableOfContents(
  text: string
): { level: number; title: string; id: string }[] {
  const headerRegex = /^(#{1,6})\s+(.*)$/gm; // 匹配 Markdown 标题
  const headers: { level: number; title: string; id: string }[] = [];

  let match;
  while ((match = headerRegex.exec(text)) !== null) {
    const level = match[1].length; // 标题级别
    const title = match[2].trim(); // 标题文本
    const id = title.toLowerCase().replace(/\s+/g, '-'); // 生成 ID
    headers.push({ level, title, id });
  }

  return headers; // 返回章节信息数组
}

// 使用 watchEffect 来观察 content 属性的变化
watchEffect(() => {
  const cleanedContent = props.content.replace(/^---\s*\n(.*?)\n---\s*\n/s, '');
  headers.value = generateClickableTableOfContents(cleanedContent);
  emit('update-headers', headers.value);
  renderedMarkdown.value = marked(cleanedContent, { renderer }) as string; // 渲染 Markdown 为 HTML
  // console.log(renderedMarkdown.value, cleanedContent);
  emit('load-complete');
});
</script>

<style scoped>
.toc-container {
  position: sticky; /* 使目录悬浮 */
  top: 20px; /* 距离顶部的距离 */
  width: 200px; /* 目录宽度 */
  margin-right: 20px; /* 目录与内容之间的间距 */
  background: #f9f9f9; /* 背景色 */
  padding: 10px; /* 内边距 */
  border: 1px solid #ddd; /* 边框 */
  border-radius: 5px; /* 圆角 */
}
</style>
