<template>
  <Select :style="{ minWidth: '100px' }" :options="options" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Select } from 'ant-design-vue';
import { OperatorType } from '../../interfaces';



const options = computed(() => [
  { value: OperatorType.Eq, label: "等于" },
  { value: OperatorType.Ne, label: "不等于" },
  { value: OperatorType.Gt, label: "大于" },
  { value: OperatorType.Lt, label: "小于" },
  { value: OperatorType.Le, label: "小于等于" },
  { value: OperatorType.Ge, label: "大于等于" },
  { value: OperatorType.Like, label: "包含" },
  { value: OperatorType.LikeStart, label: "开头包含" },
  { value: OperatorType.LikeEnd, label: "结尾包含" },
  { value: OperatorType.NotEmpty, label: "不为空" },
  { value: OperatorType.Empty, label: "为空" },
]);
</script>