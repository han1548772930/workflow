<template>
  <div class="node-title" :style="{ backgroundColor: material?.color }">
    <div class="node-icon">
      <icon />
    </div>
    <div v-if="!editing" class="title-response" @click="handleNameClick">
      <div class="node-title-text text">{{ node.name }}</div>
    </div>
    <CloseButton v-if="!editing" :nodeId="node.id" style="" />
    <Input v-if="editing" v-model:value="inputValue!" class="input" ref="inputRef" @blur="handleBlur"
      @keydown.enter="handleBlur" @click.stop="handleInputClick" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick, onUnmounted, watchEffect } from 'vue';
import { IWorkFlowNode } from "@/interfaces";
import CloseButton from "@/components/nodes/CloseButton.vue";
import { Input } from 'ant-design-vue';
import { INodeMaterial } from "@/interfaces/material.ts";

const props = defineProps<{
  node: IWorkFlowNode,
  material?: INodeMaterial,
}>();
const icon = props.material?.icon;
const editing = ref(false);
const inputValue = ref(props.node.name);
const inputRef = ref<HTMLInputElement>();


watchEffect(() => {
  inputValue.value = props.node.name;
})
const w2 = watch(() => inputRef.value, (newVal) => {
  if (newVal) {
    nextTick(() => {
      inputRef.value?.focus();
    });
  }
});
const handleNameClick = (e: MouseEvent) => {
  e.stopPropagation();

  editing.value = true;
};

const handleInputClick = (e: MouseEvent) => {
  e.stopPropagation();
  editing.value = true;
};

const handleBlur = () => {
  props.node.name = inputValue.value;
  editing.value = false;
};
onUnmounted(() => {
  w2();
})
</script>

<style>
.node-title {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 16px;
  padding-right: 30px;
  width: 100%;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  color: #fff;
  text-align: left;
  border-radius: 4px 4px 0 0;
  user-select: none;
}

.node-icon {
  font-size: 14px;
  margin-right: 8px;
}

.title-response {
  flex: 1;
  display: flex;
  padding: 2px 0;
  align-items: center;
}

.node-title-text {
  border: solid transparent 1px;
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.node-title-text:hover {
  line-height: 16px;
  border-bottom: dashed 1px #fff;
}

.input {
  flex: 1;
  height: 18px;
  padding-left: 4px;
  text-indent: 0;
  font-size: 12px;
  line-height: 18px;
  z-index: 1;
  outline: solid 2px rgba(80, 80, 80, 0.3);
  border: 0;
  border-radius: 4px;

  background-color: white;
}
</style>