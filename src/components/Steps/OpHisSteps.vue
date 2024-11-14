<template>
  <Steps v-if="opHisData" direction="vertical" :current="index == -1 ? -1 : index" :items="items">
  </Steps>
  <div v-else>未查询到信息</div>
</template>
<script setup lang='ts'>
import { Steps } from "ant-design-vue";
import { ApprovalOpHis } from "@/service/types.ts";

const props = defineProps<{
  opHisData: ApprovalOpHis[] | null;
}>()
const index = props.opHisData?.findIndex((item) => item.Activity === 1)
const items = props.opHisData?.map(i => ({ title: i.CreateDate, description: `${i.NodeName}  ${i.Content ?? ""}\r\n ${i.Remark ?? ""}` }))
</script>

<style scoped></style>