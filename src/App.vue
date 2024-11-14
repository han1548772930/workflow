<template>
  <ConfigProvider :locale="zhCN">
    <Main />
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import Main from './pages/index.vue';

</script>
<style scoped></style>