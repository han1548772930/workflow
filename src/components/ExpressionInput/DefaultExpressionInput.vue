<template>
  <Space>
    <Select v-model:value="selectedValue" :options="options" />
    <OperatorSelect />
    <Input />
  </Space>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Select, Input, Space } from 'ant-design-vue';
import OperatorSelect from './OperatorSelect.vue';
import { ExpressionInputProps } from '@/interfaces';

// const props = defineProps<ExpressionInputProps>();

const selectedValue = ref('xxx');
const options = [
  { value: 'xxx', label: '物料' },
  { value: 'yyy', label: '物料2' },
];
</script>