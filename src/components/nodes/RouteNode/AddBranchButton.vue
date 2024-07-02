<script setup lang="ts">
import {IRouteNode, NodeType} from "@/interfaces/workflow.ts";
import {createUuid} from "@/utils/create-uuid.ts";
import useNodeStore from "@/store/modules/node.ts";

const props = defineProps<{
  node: IRouteNode;
}>();
const nodeStore = useNodeStore();

const handleClick = () => {
  const newId = createUuid();
  nodeStore?.addCondition(props.node, {
    id: newId,
    nodeType: NodeType.condition,
    name: "条件" + (props.node.conditionNodeList.length + 1)
  })
};
</script>

<template>
  <button class="add-branch" @click="handleClick">
    {{ "添加条件" }}
  </button>
</template>

<style scoped>
.add-branch {
  border: none;
  outline: none;
  user-select: none;
  justify-content: center;
  font-size: 12px;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
  color: #1677ff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
  position: absolute;
  top: -16px;
  left: 50%;
  transform: translateX(-50%);
  transform-origin: center center;
  cursor: pointer;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  transition: all .3s cubic-bezier(.645, .045, .355, 1);
  white-space: nowrap;
  background: white;
  border: solid 0;
}

.add-branch:hover {
  transform: translateX(-50%) scale(1.1);
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, .1);
}

.add-branch:active {
  transform: translateX(-50%);
  box-shadow: none;
}
</style>