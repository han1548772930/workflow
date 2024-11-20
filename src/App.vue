<template>
  <div style="width: 100%;height: 100vh">
    <ConfigProvider :locale="zhCN">
      <WorkflowEditor />
    </ConfigProvider>
  </div>
</template>

<script setup lang="ts">
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import WorkflowEditor from '@/components/WorkflowEditor/index.vue';
</script>
<style scoped></style>