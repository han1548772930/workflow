<template>
  <div class="title-wrapper">
    <template v-if="!editing">
      <div class="title-response" @click.stop="handleNameClick">
        <div class="title-text">
          {{ node.name || 'condition' }}
        </div>
      </div>
      <ConditionButtons :parent="parent" :node="node"/>
    </template>
    <template v-else>
      <Input
          v-if="editing"
          v-model:value="inputValue"
          class="input"
          ref="inputRef"
          @blur="handleBlur"
          @keydown.enter="handleBlur"
          @click.stop="handleInputClick"
      />
    </template>
    <ConditionPriority v-if="!editing" :index="index"/>
  </div>
</template>

<script setup lang="ts">
import {nextTick, onUnmounted, ref, watch, watchEffect} from 'vue';
import {IBranchNode, IRouteNode} from "@/interfaces";

import ConditionButtons from "@/components/nodes/RouteNode/ConditionButtons.vue";
import ConditionPriority from "@/components/nodes/RouteNode/ConditionPriority.vue";
import {Input} from "ant-design-vue";


const props = defineProps<{
  node: IBranchNode,
  parent: IRouteNode,
  index: number
}>();
const inputRef = ref<HTMLInputElement>();



let editing = ref(false);
let inputValue = ref(props.node.name);

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

const changeName = () => {
  props.node.name = inputValue.value;
};

const handleNameClick = (e: MouseEvent) => {
  e.stopPropagation();
  editing.value = true;
};

const handleInputClick = (e: MouseEvent) => {
  e.stopPropagation();
};

const handleBlur = () => {
  changeName();
  editing.value = false;
};
onUnmounted(() => {
  w2();
})
</script>

<style scoped>
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

.title-wrapper {
  position: relative;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.65);
  text-align: left;
  line-height: 16px;
  display: flex;
  user-select: none;
}

.title-text {
  border: solid transparent 1px;
  width: 150px;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.title-text:hover {
  line-height: 16px;
  border-bottom: dashed 1px;
}
</style>