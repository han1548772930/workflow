<template>
  <div class="mini-bar container">
    <tooltip placement="topRight" title="复制条件" arrow>
      <Button type="text" size="small" shape="circle" :icon="h(copyIcon as any, { style: { color: '#000' } } as any)"
        @click.stop="handleClone" />
    </tooltip>
    <Button type="text" size="small" shape="circle" :icon="h(CloseOutlined as any, { style: { color: '#000' } } as any)"
      @click.stop="handleClose" />
  </div>
</template>

<script setup lang="ts">
import { IBranchNode, IRouteNode } from "@/interfaces";
import useNodeStore from "@/store/modules/node.ts";
import { Tooltip, Button } from "ant-design-vue";
import { h } from "vue";
import { CloseOutlined } from "@ant-design/icons-vue";
import { copyIcon } from "@/components/icons";

const props = defineProps<{
  parent: IRouteNode,
  node: IBranchNode
}>();

const nodeStore = useNodeStore();


const handleClose = () => {
  if (props.node.id) {
    nodeStore.deleteCondition(props.parent, props.node);
  }
};

const handleClone = () => {
  if (props.node.id) {
    nodeStore.cloneCondition(props.parent, props.node);
  }
};
</script>
<style scoped>
.container {
  position: absolute;
  right: -4px;
  top: -4px;
  display: flex;
  opacity: 0.7;
  font-size: 11px;
}
</style>