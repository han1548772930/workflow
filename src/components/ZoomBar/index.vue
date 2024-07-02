<template>
  <div :class="['workflow-editor-zoombar', float ? 'float' : '']" :style="miniFloatContainerStyle">
    <Space>
      <Button type="text" size="small" :disabled="zoom <= 0.1" @click="onZoomOut">
        <MinusOutlined />
      </Button>
      {{ Math.round(zoom * 100) }}%
      <Button type="text" size="small" :disabled="zoom >= 3" @click="onZoomIn">
        <PlusOutlined />
      </Button>
    </Space>
  </div>
</template>

<script setup lang="ts">
import { CSSProperties, computed, toRefs } from 'vue';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue';
import { Button, Space } from 'ant-design-vue';
import { MouseEventHandler } from 'ant-design-vue/es/_util/EventInterface';

const props = defineProps<{
  float: boolean,
  zoom: number,
  onZoomIn: MouseEventHandler,
  onZoomOut: MouseEventHandler,
}>(

);

const { float, zoom, onZoomIn, onZoomOut } = toRefs(props);

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
  right: '32px',
}));
</script>

<style>
.workflow-editor-zoombar {
  right: 32px;
}

.float {
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.5);
  transform: scale(1.05);
}
</style>