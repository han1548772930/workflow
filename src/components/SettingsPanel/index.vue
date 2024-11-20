<template>
  <Drawer placement="right" width="656" :closable="false" @close="handleClose" :open="!!selectNodeId">
    <div class="settings-panel-content" v-if="materialUi?.settersPanel">
      <component :is="materialUi.settersPanel">
      </component>
    </div>
    <template #title>
      <NodeTitle v-if="selectNode" :node="selectNode!" :on-name-change="handleNameChange" />
    </template>
    <template #extra>

      <Button size="small" type="text" :icon="h(CloseOutlined as any, { style: { color: '#000' } } as any)"
        @click="handleClose" />
    </template>
    <template #footer>
      <Footer :on-cancel="handleClose" :on-confirm="handleConfirm"></Footer>
    </template>

  </Drawer>
</template>

<script setup lang="ts">
import { computed, h } from 'vue';
import { CloseOutlined } from '@ant-design/icons-vue';
import Drawer from 'ant-design-vue/lib/drawer';
import Button from 'ant-design-vue/lib/button';
import useNodeStore from "@/store/modules/node.ts";
import Footer from "@/components/SettingsPanel/Footer.vue";
import NodeTitle from "@/components/SettingsPanel/SettingNodeTitle.vue";


const nodeStore = useNodeStore();
const selectNodeId = computed(() => nodeStore.selectedNode);



const selectNode = computed(() => nodeStore.getNode(selectNodeId.value!));
const materialUi = computed(() => nodeStore.materialUis[selectNode?.value?.nodeType!]);

const handleClose = () => {
  nodeStore.selectedNode = undefined;
};
const handleConfirm = () => {
  materialUi.value?.handleConfirm && materialUi.value?.handleConfirm();
}


const handleNameChange = (name?: string) => {
  selectNode.value!.name = name!;
};




</script>

<style scoped>
.settings-panel-content {
  display: flex;
  flex-flow: column;
}
</style>