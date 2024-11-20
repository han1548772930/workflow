<template>
  <div class="add-node-button-box">
    <div class="button-shell">
      <popover placement="rightTop" v-model:open="open" trigger="click">
        <template #content>
          <ContentPanel :nodeId="props.nodeId" :on-click-material="handleMaterialClick" />

        </template>
        <div class="btn">
          <PlusOutlined style="font-size: 20px" />
        </div>
      </popover>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Popover } from 'ant-design-vue';
import ContentPanel from './ContentPanel.vue';
import {
  PlusOutlined
} from '@ant-design/icons-vue';

const props = defineProps<{
  nodeId: string
}>();

const open = ref(false);

const handleMaterialClick = () => {
  open.value = false;
};
</script>

<style scoped>
.add-node-button-box {
  width: 240px;
  display: inline-flex;
  flex-shrink: 0;
  flex-grow: 1;
  position: relative;
  z-index: 1;
}

.add-node-button-box:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  margin: auto;
  width: 2px;
  height: 100%;
  background-color: #cacaca;
}

.button-shell {
  user-select: none;
  width: 240px;
  padding: 20px 0 32px;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  flex-grow: 1;
}

.button-shell .btn {
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
  border: none;
  line-height: 28px;
  transition: all .3s cubic-bezier(.645, .045, .355, 1);
  cursor: pointer;
  color: #fff;
  font-size: 20px;
  background-color: rgb(22, 119, 255);
}

.button-shell .btn:hover {
  transform: scale(1.3);
  box-shadow: 0 13px 27px 0 rgba(0, 0, 0, .1);
}

.button-shell .btn:active {
  transform: none;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .1);
}
</style>