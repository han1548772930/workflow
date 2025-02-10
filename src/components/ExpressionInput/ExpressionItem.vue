<template>
  <div class="item">
    <div class="expression-content">
      <slot></slot>
    </div>
    <div class="actions">
      <div :class="['actions-space', { 'add-open': addOpen }]">
        <AddMenu v-if="onAddExpression && onAddGroup" @addExpression="onAddExpression" @addGroup="onAddGroup">
          <Button type="text">
            <template #icon>
              <PlusOutlined />
            </template></Button>
        </AddMenu>
        <Button type="text" @click="onRemove">
          <template #icon>
            <DeleteOutlined />
          </template>
        </Button>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Button } from 'ant-design-vue';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { ExpressionGroupType } from '../../interfaces';
import AddMenu from './AddMenu.vue';

const props = defineProps<{
  onAddExpression?: () => void;
  onAddGroup?: (nodeType: ExpressionGroupType) => void;
  onRemove?: () => void;
}>();

const addOpen = ref(false);

// const handleOpenChange = (open: boolean) => {
//   addOpen.value = open;
// };
</script>

<style>
.item {
  display: flex;
  align-items: center;
  min-height: 48px;
}

.actions-space {
  display: none;
}

.actions-space.add-open {
  display: flex;
}

.item:hover .actions-space {
  display: flex;
}

.actions {
  width: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.add-icon,
.remove-icon {
  font-size: 12px;
}

.expression-content {
  flex: 1;
}
</style>