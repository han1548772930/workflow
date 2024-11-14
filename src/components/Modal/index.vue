<template>
  <div ref="globalModal">
    <Modal ref="modalRef" :open="open" :onChange="onChange" :width="width" :style="{ top: top }" :centered="center"
      destroyOnClose>
      <template #title v-if="title">
        <div ref="modalTitleRef" style="width: 100%; cursor: move">{{ title }}</div>
      </template>
      <template #modalRender="{ originVNode }">
        <div :style="transformStyle">
          <component :is="originVNode" />
        </div>
      </template>
      <slot name="content"></slot>
      <template #footer>
        <slot name="footer">
        </slot>
      </template>
    </Modal>
  </div>
</template>
<script setup lang='ts'>
import { Modal } from "ant-design-vue";
import { useDraggable } from '@vueuse/core';
import { CSSProperties, computed, onUnmounted, ref, watch, watchEffect, toRefs } from "vue";
const props = defineProps<{
  open: boolean;
  width: string;
  title?: string;
  center?: boolean;
  top?: string;
  onChange: (value: boolean) => void;
}>()
const { open, title, top = '20px' } = toRefs(props);


const modalTitleRef = ref<HTMLElement | null>(null);

const { x, y, isDragging } = useDraggable(modalTitleRef);



const startX = ref<number>(0);
const startY = ref<number>(0);
const startedDrag = ref(false);
const transformX = ref(0);
const transformY = ref(0);
const preTransformX = ref(0);
const preTransformY = ref(0);
const dragRect = ref({ left: 0, right: 0, top: 0, bottom: 0 });
const w1 = watch([x, y], () => {
  if (!startedDrag.value) {
    startX.value = x.value;
    startY.value = y.value;
    const bodyRect = document.body.getBoundingClientRect();
    if (modalTitleRef.value) {
      const titleRect = modalTitleRef.value.getBoundingClientRect();
      dragRect.value.right = bodyRect.width - titleRect.width;
      dragRect.value.bottom = bodyRect.height - titleRect.height;
      preTransformX.value = transformX.value;
      preTransformY.value = transformY.value;
    }
  }
  startedDrag.value = true;
});
const w2 = watch(isDragging, () => {
  if (!isDragging) {
    startedDrag.value = false;
  }
});

watchEffect(() => {
  if (startedDrag.value) {
    transformX.value =
      preTransformX.value +
      Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) -
      startX.value;
    transformY.value =
      preTransformY.value +
      Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) -
      startY.value;
  }
});
const transformStyle = computed<CSSProperties>(() => {
  return {
    transform: `translate(${transformX.value}px, ${transformY.value}px)`,
  };
});
onUnmounted(() => {
  w1();
  w2();
});
</script>

<style scoped>

</style>