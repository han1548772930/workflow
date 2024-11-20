<template>
  <div class="col-box" draggable="false">
    <div class="condition-node branch-style-node" draggable="false">
      <div class="condition-node-box branch-node-box" draggable="false">
        <div class="auto-judge" draggable="false" @click="handleClick">
          <div v-if="index !== 0" class="sort-handler left" @click.stop="handleMoveLeft">
            &lt;
          </div>
          <ConditionNodeTitle :node="node" :parent="parent" :index="index" />

          <div class="node-content-b">
            <span :class='["text", defaultConfig?.secondary ? " secondary" : ""]'>
              {{ props.node.nodeContent ?? defaultConfig?.content }}
            </span>
          </div>
          <div v-if="index !== (length - 1)" class="sort-handler right" @click.stop="handleMoveRight">
            &gt;
          </div>
          <ErrorTip :node="node" />
        </div>
        <AddButton v-if="node?.id" :nodeId="node?.id" />
        <ChildNode v-if="node?.childNode" :node="node?.childNode!" />
      </div>
    </div>
    <div v-if="index === 0" class="line-cover top left " />
    <div v-if="index === 0" class="line-cover bottom left " />
    <div v-if="index === (length - 1)" class="line-cover top right " />
    <div v-if="index === (length - 1)" class="line-cover bottom right " />
  </div>
</template>

<script setup lang="ts">
import { IBranchNode, IRouteNode } from "@/interfaces";
import useNodeStore from "@/store/modules/node.ts";
import ChildNode from "@/components/nodes/ChildNode.vue";
import ConditionNodeTitle from "@/components/nodes/RouteNode/ConditionNodeTitle.vue";
import ErrorTip from "@/components/nodes/ErrorTip.vue";
import AddButton from "@/components/nodes/AddButton/index.vue";

const props = defineProps<{
  parent: IRouteNode,
  node: IBranchNode,
  index: number,
  length: number
}>();

const nodeStore = useNodeStore();
const materialUi = nodeStore.materialUis[props.node.nodeType];
const defaultConfig = materialUi?.defaultConfig


const handleClick = () => {
  if (props.node?.id) {
    nodeStore.selectedNode = props.node.id;
  }
};

const handleMoveLeft = (e: MouseEvent) => {
  e.stopPropagation();
  nodeStore.transConditionOneStepToLeft(props.parent, props.index);
};

const handleMoveRight = (e: MouseEvent) => {
  e.stopPropagation();
  nodeStore.transConditionOneStepToRight(props.parent, props.index);
};
</script>

<style>
.col-box {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  user-select: none;
  background-color: #f5f5f7;
}

.col-box::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  margin: auto;
  width: 2px;
  height: 100%;
  background-color: #cacaca;
}

.branch-style-node {
  min-height: 220px;
  display: inline-flex;
  flex-direction: column;
  flex-grow: 1;
  user-select: none;
}

.branch-node-box {
  padding-top: 30px;
  padding-right: 50px;
  padding-left: 50px;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  flex-grow: 1;
  user-select: none;
}

.auto-judge {
  position: relative;
  width: 220px;
  min-height: 72px;
  background: white;
  border: solid 0px;
  border-radius: 4px;
  padding: 8px 16px;
  user-select: none;
  cursor: pointer;
}

.auto-judge::after {
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

.auto-judge.active::after {
  border: 1px solid #3296fa;
  box-shadow: 0 0 6px 0 rgba(50, 150, 250, .3);
}

.auto-judge .mini-bar {
  display: none;
}

.auto-judge .priority {
  display: flex;
}

.auto-judge:hover::after {
  border: 1px solid #3296fa;
  box-shadow: 0 0 6px 0 rgba(50, 150, 250, .3);
}

.auto-judge:hover .sort-handler {
  display: flex;
  align-items: center;
}

.auto-judge:hover .mini-bar {
  display: flex;
}

.auto-judge:hover .priority {
  display: none;
}

.line-cover {
  position: absolute;
  height: 8px;
  width: 50%;
  background-color: #f5f5f7;
}

.line-cover.left {
  left: -1px;
}

.line-cover.right {
  right: -1px;
}

.line-cover.top {
  top: -4px;
}

.line-cover.bottom {
  bottom: -4px;
}

.sort-handler {
  position: absolute;
  top: 0;
  bottom: 0;
  display: none;
  z-index: 1;
  height: 100%;

}

.sort-handler.left {
  left: 0;
  border-right: 1px solid;
}

.sort-handler.right {
  right: 0;
  border-left: 1px solid;
}

.sort-handler:hover {
  background-color: white;
}

.node-content-b {
  position: relative;
  font-size: 14px;
  padding: 16px 30px 16px 0;

  user-select: none;
}
</style>