<template>
  <Steps v-if="approvalNode" direction="vertical" :current="index == -1 ? -1 : index" :items="items">
  </Steps>
  <div v-else>未查询到信息</div>
</template>
<script setup lang='ts'>
import { Steps } from "ant-design-vue";
import { ApprovalNodeType } from "@/service/types.ts";

const props = defineProps<{
  approvalNode: ApprovalNodeType[] | null;
}>()
const index = props.approvalNode?.findIndex((item) => item.Activity === 1)
const items = props.approvalNode?.map(i => ({ title: i.NodeName, description: i.VerifyUsersName }))
</script>

<style scoped></style>