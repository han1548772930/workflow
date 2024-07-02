<template>
  <div class="title" v-if="node">
    <span v-if="node.nodeType === NodeType.start" class="title-text">{{ "promoter" }}</span>
    <NodeTitleEditor v-else :value="node.name ?? ''" :on-change="onNameChange" />
  </div>
</template>

<script setup lang="ts">

import { IWorkFlowNode, NodeType } from "@/interfaces";
import NodeTitleEditor from "@/components/SettingsPanel/NodeTitleEditor.vue";
import { toRefs } from "vue";


const props = defineProps<{
  node: IWorkFlowNode,
  onNameChange: (name?: string) => void
}>()
const { node, onNameChange } = toRefs(props)

</script>

<style scoped>
.title {
  font-weight: normal;
}

.title-text {
  margin-right: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>