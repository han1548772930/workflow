<template>
  <div class="node-wrap start">
    <div class="node-wrap-box" @click="handleClick" v-once="true">
      <div class="node-title start-node-title" style="background-color:rgb(87, 106, 149)">
        {{ material?.label }}
      </div>
      <div class="node-content">
        {{ defaultConfig?.content }}
        <RightArrow class="arrow" />
      </div>
      <!--      <ErrorTip v-if="startNode?.id" :nodeId="startNode.id"/>-->
    </div>
    <AddButton v-if="startNode?.id" :nodeId="startNode?.id" />
    <ChildNode v-if="startNode?.childNode" :node="startNode?.childNode" />
    <EndNode />
  </div>
</template>

<script setup lang="ts">
import useNodeStore from "@/store/modules/node.ts";
// import ErrorTip from "@/components/nodes/ErrorTip.vue";
import ChildNode from "@/components/nodes/ChildNode.vue";
import EndNode from "@/components/nodes/EndNode.vue";
import AddButton from "@/components/nodes/AddButton/index.vue";

import RightArrow from "@/components/icons/RightArrow.vue";
import { computed } from "vue";
import { NodeType } from "@/interfaces";
import { INodeMaterial } from "@/interfaces/material.ts";

const nodeStore = useNodeStore();
const startNode = computed(() => nodeStore.node);
const material = computed<INodeMaterial | undefined>(() => nodeStore.getMaterialByNodeType(NodeType.start));
const materialUi = computed(() => nodeStore.materialUis[NodeType.start]);
const defaultConfig = computed(() => materialUi.value?.defaultConfig)
const handleClick = () => {

};
</script>

<style scoped></style>