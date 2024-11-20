<template>
  <div v-if="!editing" @click="handleNameClick" class="text-response">
    <span class="title-text">{{ inputValue }}</span>
    <EditOutlined />
  </div>
  <Input v-else ref="inputRef" v-model:value="inputValue" @blur="handleBlur" @keydown.enter="handleBlur" />
</template>

<script setup lang="ts">
import { nextTick, onUnmounted, ref, watch, watchEffect } from 'vue'
import { EditOutlined } from '@ant-design/icons-vue'
import { Input } from 'ant-design-vue'

const props = defineProps<{
  value: string,
  onChange: (value: string) => void
}>()
const inputRef = ref<HTMLInputElement>();
const editing = ref(false)
const inputValue = ref(props.value)

watchEffect(() => {
  inputValue.value = props.value
})
const w2 = watch(() => inputRef.value, (newVal) => {
  if (newVal) {
    nextTick(() => {
      inputRef.value?.focus();
    });
  }
});
const handleNameClick = () => {
  editing.value = true
}

const handleBlur = () => {

  props.onChange(inputValue.value)
  editing.value = false
}
onUnmounted(() => {
  w2();
})
</script>

<style scoped>
.text-response {
  display: flex;
  cursor: pointer;
}

.title-text {
  margin-right: 8px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>