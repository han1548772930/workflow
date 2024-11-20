<template>
  <div class="canvas-container">
    <div ref="canvasRef" class="flow-canvas canvas" :style="{
      cursor: state.mousePressedPoint ? 'grabbing' : 'grab'
    }" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mousemove="handleMouseMove" @mouseleave="handleMouseUp"
      @scroll="handleScroll">
      <div class="canvas-inner" :style="{ transform: `scale(${state.zoom})` }">
     
        <StartNode />
      </div>
    </div>
    <OperationBar :float="state.scrolled" />
    <ZoomBar :float="state.scrolled" :zoom="state.zoom" @zoomIn="handleZoomIn" @zoomOut="handleZoomOut" />
    <SettingsPanel />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import StartNode from '@/components/nodes/StartNode.vue';
import ZoomBar from '@/components/ZoomBar/index.vue';
import OperationBar from '@/components/OperationBar/index.vue';
import { IPosition } from "@/interfaces";
import SettingsPanel from "@/components/SettingsPanel/index.vue";
// import useNodeStore from '@/store/modules/node';

const state = reactive({
  zoom: 1,
  scrolled: false,
  mousePressedPoint: {} as IPosition | null,
});
// const nodeStore = useNodeStore();
const canvasRef = ref<HTMLDivElement | null>(null);

const toDecimal = (x: number) => {
  return Math.round(x * 10) / 10;
};

const handleZoomIn = () => {
  state.zoom = toDecimal(state.zoom < 3 ? state.zoom + 0.1 : state.zoom);
};

const handleZoomOut = () => {
  state.zoom = toDecimal(state.zoom > 0.1 ? state.zoom - 0.1 : state.zoom);
};

const handleMouseDown = (e: MouseEvent) => {
  if (canvasRef.value) {
    state.mousePressedPoint = {
      x: e.clientX,
      y: e.clientY,
      scrollLeft: canvasRef.value.scrollLeft,
      scrollTop: canvasRef.value.scrollTop
    }
  }
};

const handleMouseUp = () => {
  state.mousePressedPoint = null;
};

const handleMouseMove = (e: MouseEvent) => {
  if (!state.mousePressedPoint) {
    return;
  }
  const dragMoveDiff = {
    x: state.mousePressedPoint.x - e.clientX,
    y: state.mousePressedPoint.y - e.clientY
  }

  if (canvasRef.value) {
    canvasRef.value.scrollLeft = state.mousePressedPoint.scrollLeft + dragMoveDiff.x;
    canvasRef.value.scrollTop = state.mousePressedPoint.scrollTop + dragMoveDiff.y;
  }

};

const handleScroll = (e: Event) => {
  const target = e.currentTarget as HTMLDivElement;
  state.scrolled = target.scrollTop > 60 || target.scrollLeft > 60;
};

</script>

<style scoped>
.flow-canvas {
  flex: 1;
  padding: 56px 16px;
  padding-bottom: 0;
  overflow: auto;
  display: flex;
  justify-content: center;
}

.canvas-inner {
  flex: 1;
  transform-origin: 0px 0px;
}

.canvas {
  flex: 1;
  padding: 30px 16px;
  padding-bottom: 0;
  overflow: auto;
  cursor: grab;
  display: flex;
}

.canvas-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
}
</style>