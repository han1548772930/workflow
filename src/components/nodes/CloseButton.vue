<template>
  <Button class="close" type="text" size="small" shape="circle" @click="(e) => handleClose(e)"
    :icon="h(CloseOutlined as any, { style: { color: '#fff' } } as any)">
  </Button>
</template>

<script setup lang="ts">
import { Button } from "ant-design-vue";
import { CloseOutlined } from "@ant-design/icons-vue";
import { h } from "vue";
import useNodeStore from "@/store/modules/node.ts";


const props = defineProps<{
  nodeId?: string
}>();
const nodeStore = useNodeStore();

const handleClose = (e: MouseEvent) => {
  e.stopPropagation();
  if (props.nodeId) {
    nodeStore.deleteNode(props.nodeId)
  }
};
</script>

<style scoped>
.close {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>