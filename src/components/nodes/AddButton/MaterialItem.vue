<template>
  <div class="material-shell">
    <div class="m-item" @click="handleClick">
      <div class="material-icon" :style="{ color: material.color }">
        <icon-component />
      </div>
      {{ material.label }}
    </div>
  </div>
</template>

<script setup lang="ts">

import { createUuid } from "@/utils/create-uuid";
import { INodeMaterial } from "@/interfaces/material.ts";
import useNodeStore from "@/store/modules/node.ts";

const props = defineProps<{
  nodeId: string,
  material: INodeMaterial,
  onClick?: () => void
}>();
const iconComponent = props.material.icon;
const nodeStore = useNodeStore();
const handleClick = () => {
  const newId = createUuid();
  const newName = props.material.label;
  if (props.material.defaultConfig) {

    nodeStore?.addNode(props.nodeId, { ...JSON.parse(JSON.stringify(props.material.defaultConfig)), id: newId, name: newName });
  } else if (props.material.createDefault) {
 
    nodeStore?.addNode(props.nodeId, { ...props.material.createDefault(), name: newName });
  } else {
    console.error("Material no defaultConfig or createDefault");
  }

  // nodeStore?.selectNode(newId);
  props.onClick?.();
};
</script>

<style scoped>
.material-shell {
  width: 50%;
  padding: 4px 8px;
}

.m-item {
  padding: 0 8px;
  height: 64px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.material-icon {
  display: flex;
  height: 40px;
  width: 40px;
  border: solid 1px;
  margin-right: 16px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #ff943e;
}
</style>