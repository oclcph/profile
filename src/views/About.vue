<script setup lang="ts">
import { ref } from 'vue';

const chineseName = ref('程芃幻');
const englishName = ref<string>('Cheng Penghuan');
const email = ref<string>('221830224@smail.nju.edu.cn');
const phone = ref<string>('13679201707');
const education = ref({
  university: '南京大学',
  location: '南京',
  degree: '软件工程大三本科生；软件学院',
  startDate: '2022.09',
  gpa: '4.418/5.0',
  rank: '72/219',
  majorCourses: [
    '数据结构与算法',
    '编译原理',
    '计算机操作系统',
    '机器学习',
    'C 语言程序设计基础',
    '计算系统基础',
    '计算机组成结构',
    'C++ 高级程序设计',
    '软件工程与计算',
    '人机交互系统',
    '互联网计算',
  ],
  otherCourses: ['微积分', '线性代数', '离散数学', '大学英语'],
});
const projects = ref([
  '协助师兄完成论文《Prototype-based Edge-end Collaborative Learning》，投稿至 INFOCOM 2025，负责边端协作训练方法在 Jetson Nano 和树莓派的实机实验部署。',
  '参与国家级大学生创新项目《自演进边端合作学习方法》，负责边缘多机合作学习方法的实现。',
  '参与张邵群老师指导项目《基于大数据和人工智能的超声诊断系统的开发与应用》，负责利用图像处理技术提取超声图像的关键特征，同时进行统计分析。',
]);
</script>

<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-4xl font-bold text-gray-800">{{ chineseName }}</h1>
        <h2 class="text-2xl font-semibold text-gray-600">{{ englishName }}</h2>
      </div>
      <div class="text-gray-700 text-right">
        <p class="text-blue-600 hover:underline">
          <a :href="`mailto:${email}`">{{ email }}</a>
        </p>
        <p class="text-lg">{{ phone }}</p>
      </div>
    </div>

    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-2 text-gray-800">教育背景</h2>
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-xl font-medium text-gray-700">
          {{ education.university }}
        </h3>
        <p class="text-gray-600">{{ education.location }}</p>
      </div>
      <div class="flex justify-between items-center mb-4">
        <p class="text-lg">{{ education.degree }}</p>
        <p class="text-lg text-gray-600">{{ education.startDate }} 至今</p>
      </div>
      <p class="text-gray-700">
        专业成绩: GPA {{ education.gpa }}（排名
        {{ education.rank }}，可以获得本校的保研名额）
      </p>
      <p class="text-gray-700">
        主修课程: {{ education.majorCourses.join(', ') }}
      </p>
      <p class="text-gray-700">
        其它课程: {{ education.otherCourses.join(', ') }}
      </p>
    </div>

    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-2 text-gray-800">技能特长</h2>
      <ul class="list-disc list-inside text-gray-700">
        <li>
          语言能力: 大学英语 CET-4 获得 564 分，CET-6 获得 469
          分，能够熟练地用英文进行交流和读写。
        </li>
        <li>
          计算机能力: 熟练掌握 C/C++、Java、Python 等编程语言，CCF CSP 认证 215
          分（全国前 20%）。
        </li>
        <li>
          数学能力: 《微积分I》88 分，《微积分II》86 分，《线性代数》94
          分，《离散数学》96 分，数学能力较强。
        </li>
        <li>
          团队能力: 具有良好的沟通能力和奉献精神，多次组队参加比赛、项目等。
        </li>
      </ul>
    </div>

    <div>
      <h2 class="text-2xl font-semibold mb-2 text-gray-800">荣誉证书</h2>
      <ul class="list-disc list-inside text-gray-700">
        <li>
          比赛项目: 2024 年 C4 网络技术挑战赛华东赛区二等奖，2024
          年美国大学生数学建模竞赛 S 奖，2024
          年全国大学生数学建模竞赛赛区一等奖。
        </li>
        <li>奖学金: 2023 学年人民奖学金一等奖。</li>
      </ul>
    </div>

    <div class="mt-8">
      <h2 class="text-2xl font-semibold mb-2 text-gray-800">项目经验</h2>
      <ul class="list-disc list-inside">
        <li
          v-for="(project, index) in projects"
          :key="index"
          class="text-gray-700 mb-1"
        >
          {{ project }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
