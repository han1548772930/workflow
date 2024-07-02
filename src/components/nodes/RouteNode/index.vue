<template>
  <div class="route-wrap" draggable="false">
    <div class="route-box-wrap" draggable="false">
      <div class="route-box" draggable="false">
        <AddBranchButton :node="node" />
        <BranchNode v-for="(child, index) in node.conditionNodeList" :key="child.id" :parent="node" :node="child"
          :index="index" :length="node.conditionNodeList.length || 0" />
      </div>
      <AddButton v-if="node?.id" :nodeId="node?.id" />
      <ChildNode v-if="node?.childNode" :node="node?.childNode!" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IRouteNode } from "@/interfaces";
import ChildNode from "@/components/nodes/ChildNode.vue";
import AddBranchButton from "@/components/nodes/RouteNode/AddBranchButton.vue";
import BranchNode from "@/components/nodes/RouteNode/BranchNode.vue";
import AddButton from "@/components/nodes/AddButton/index.vue";

defineProps<{
  node: IRouteNode
}>();
</script>

<style scoped>
.route-wrap {
  display: inline-flex;
}

.route-box-wrap {
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  min-height: 270px;
  width: 100%;
  -ms-flex-negative: 0;
  flex-shrink: 0;
}

.route-box {
  display: flex;
  overflow: visible;
  min-height: 180px;
  height: auto;
  border-bottom: 2px solid;
  border-top: 2px solid;
  border-color: #cacaca;
  position: relative;
  margin-top: 15px;
}
</style>