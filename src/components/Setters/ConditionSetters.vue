<script setup lang="ts">
import ExpressionGroup from "@/components/ExpressionInput/ExpressionGroup.vue";

import { ExpressionGroupType, ExpressionNodeType, IExpressionGroup } from "@/interfaces";
import { createUuid } from "@/utils/create-uuid";
import { ref } from "vue";

const rootExpression = ref({
  id: "root",
  nodeType: ExpressionNodeType.Group,
  groupType: ExpressionGroupType.And,
  children: [
    {
      id: createUuid(),
      nodeType: ExpressionNodeType.Expression,
    },
  ],
});
function handleExpressionChange(exp: IExpressionGroup) {
  rootExpression.value = exp;
  console.log(rootExpression.value);

}
</script>

<template>
  <ExpressionGroup :value="rootExpression" root :onChange="handleExpressionChange"></ExpressionGroup>
</template>

<style scoped></style>