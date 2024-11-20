<template>
  <div class="node-wrap">
    <div class="node-wrap-box" @click="handleClick">
      <NodeTitle :node="node" :material="material" />
      <div class="node-content">
        <span :class='["text", defaultConfig?.secondary ? " secondary" : ""]'>
          {{ props.node.nodeContent || defaultConfig?.content }}
        </span>

        <RightArrow class="arrow" />
      </div>
      <ErrorTip :node="node" />
    </div>
    <AddButton v-if="node?.id" :nodeId="node?.id" />
    <ChildNode v-if="node?.childNode" :node="node?.childNode!" />
  </div>
</template>

<script setup lang="ts">
import { IWorkFlowNode } from "@/interfaces";
import ChildNode from "@/components/nodes/ChildNode.vue";
import ErrorTip from "@/components/nodes/ErrorTip.vue";
import AddButton from "@/components/nodes/AddButton/index.vue";
import NodeTitle from "@/components/nodes/NodeTitle.vue";
import RightArrow from "@/components/icons/RightArrow.vue";
import useNodeStore from "@/store/modules/node.ts";
import { computed } from "vue";

const props = defineProps<{
  node: IWorkFlowNode
}>();

const nodeStore = useNodeStore();
const materialUi = computed(() => nodeStore.materialUis[props.node.nodeType]);
const defaultConfig = computed(() => materialUi.value?.defaultConfig)
const material = computed(() => nodeStore.getMaterialByNodeType(props.node.nodeType));
const handleClick = () => {
  if (props.node?.id) {
    nodeStore.setSelectNode(props.node?.id)
  }
};

</script>

<style>
.node-wrap {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  flex-grow: 1;
  padding: 0 50px;
  position: relative;
  user-select: none;
}

.node-wrap::before {
  content: "";
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 4px;
  border-style: solid;
  border-width: 8px 6px 4px;
  border-color: #cacaca transparent transparent;
  background: #f5f5f7;
}

.node-wrap.start::before {
  height: 0;
  border-width: 0;
}

.node-wrap-box {
  display: inline-flex;
  flex-direction: column;
  position: relative;
  width: 220px;
  min-height: 72px;
  flex-shrink: 0;
  background: white;

  border-radius: 4px;
  cursor: pointer;
  user-select: none;
}

.node-wrap-box::after {
  pointer-events: none;
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  border-radius: 4px;
  border: 1px solid transparent;
  transition: all .1s cubic-bezier(.645, .045, .355, 1);
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, .1);
}

.node-wrap-box .close {
  display: none;
}

.node-wrap-box:hover {
  outline: solid 1px #1677ff;
}

.node-wrap-box:hover .close {
  display: inline-flex;
}

.node-content {
  position: relative;
  font-size: 14px;
  padding: 16px 30px 16px 16px;
  user-select: none;
}

.node-content .text {
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  white-space: nowrap;
}

.node-content .secondary {
  color: rgba(0, 0, 0, 0.65);
  opacity: 0.8;
}

.node-content .arrow {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 14px;
  font-size: 14px;

}
</style>
<script setup>
</script>