<template>
  <div :class="['workflow-operation-bar', float ? 'float' : '']" :style="miniFloatContainerStyle">
    <Button type="text" size="small" :disabled="undoList === 0" @click="handleUndo" :icon="h(undoIcon as any)">
    </Button>
    <Button type="text" size="small" :disabled="redoList === 0" @click="handleRedo" :icon="h(redoIcon as any)">

    </Button>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs, h, CSSProperties } from 'vue';
import { undoIcon, redoIcon } from '@/components/icons';
import { Button } from 'ant-design-vue';
import useNodeStore from "@/store/modules/node.ts";


const props = defineProps<{ float?: boolean }>();

const { float } = toRefs(props);

const nodeStore = useNodeStore();

const undoList = computed(() => nodeStore.undoList.length);
const redoList = computed(() => nodeStore.redoList.length);

const handleUndo = () => {
  nodeStore.undo();
};

const handleRedo = () => {
  nodeStore.redo();
};

const miniFloatContainerStyle = computed<CSSProperties>(() => ({
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  userSelect: 'none',
  backgroundColor: '#ffffff', // replace with your actual canvas color
  padding: '4px 8px',
  borderRadius: '5px',
  top: '60px',
  boxShadow: float.value ? '0 2px 8px 0 rgba(0, 0, 0, 0.5)' : '0 2px 8px 0 rgba(0, 0, 0, 0.15)',
  transform: float.value ? 'scale(1.05)' : '',
  transition: 'all 0.3s',
  left: '32px',
}));
</script>

<style scoped>
.workflow-operation-bar {
  left: 32px;
}

.float {
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.5);
  transform: scale(1.05);
}
</style>