<template>
  <div v-if="errorMsg" class="schell">
    <Tooltip :title="errorMsg">
      <InfoCircleOutlined class="error-icon" />
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { InfoCircleOutlined } from '@ant-design/icons-vue';
import Tooltip from 'ant-design-vue/lib/tooltip';
import { IWorkFlowNode } from "@/interfaces";
import useNodeStore from "@/store/modules/node.ts";


const props = defineProps<{ node: IWorkFlowNode }>();

const nodeStore = useNodeStore();
const materialUi = computed(() => nodeStore.materialUis[props.node.nodeType]);

const errorMsg = computed(() => materialUi?.value?.validate?.(props.node))
</script>

<style scoped>
.schell {
  position: absolute;
  z-index: 2;
  top: 0;
  right: -40px;
}

.error-icon {
  color: red;
  font-size: 24px;
}
</style>