<template>
  <div class="add-node-content">
    <MaterialItem
        v-for="(material, index) in materials"
        :key='material.defaultConfig?.nodeType || "" + index'
        :nodeId="nodeId"
        :material="material"
        @click="onClickMaterial"
    />
  </div>
</template>

<script setup lang="ts">
import MaterialItem from "@/components/nodes/AddButton/MaterialItem.vue";
import useNodeStore from "@/store/modules/node.ts";
import {computed} from "vue";

const props = defineProps<{
  nodeId: string,
  onClickMaterial: () => void,
}>();
const nodeStore = useNodeStore();

const materials = computed(() => nodeStore?.materials?.filter(material => !material.hidden));

const onClickMaterial = () => {
  props.onClickMaterial();
};
</script>

<style scoped>
.add-node-content {
  display: flex;
  flex-wrap: wrap;
  width: 360px;
}
</style>