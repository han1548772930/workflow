<script setup lang="ts">
import { computed } from 'vue';
import { IWorkFlowNode, NodeType, IRouteNode } from "@/interfaces/workflow.ts";
import NormalNode from "@/components/nodes/NormalNode.vue";
import RouteNode from "@/components/nodes/RouteNode/index.vue";
const props = defineProps<{
  node: IWorkFlowNode;
}>();

const isRouteNode = computed(() => props.node.nodeType === NodeType.route);
</script>

<template>
  <RouteNode v-if="isRouteNode" :node="<IRouteNode>node" />
  <NormalNode v-else :node="node" />
</template>