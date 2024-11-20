<script setup lang="ts">
import useNodeStore from "@/store/modules/node.ts";
import { computed } from "vue";

const nodeStore = useNodeStore();
const selectNodeId = computed(() => nodeStore.selectedNode);
const selectNode = nodeStore.getNode(selectNodeId.value!)!;
const materialUi = nodeStore.materialUis[selectNode?.nodeType]!;



materialUi.handleConfirm = () => {

  nodeStore.selectedNode = undefined;
}





</script>

<template>
  <div>

  </div>
</template>

<style scoped></style>