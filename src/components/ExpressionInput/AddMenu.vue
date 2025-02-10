<template>
  <Dropdown :trigger="['click']" @openChange="handleOpenChange">
    <slot></slot>
    <template #overlay>
      <Menu>
        <MenuItem v-for="item in items" :key="item.key" @click="item.onClick">
        {{ item.label }}
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Dropdown, Menu, MenuItem } from 'ant-design-vue';

import { ExpressionGroupType, ExpressionNodeType } from '../../interfaces';

interface Props {
  onOpenChange?: (open: boolean) => void;
  onAddExpression: () => void;
  onAddGroup: (groupType: ExpressionGroupType) => void;
}

const props = defineProps<Props>();



const items = computed(() => [
  {
    label: "添加条件",
    key: ExpressionNodeType.Expression,
    onClick: props.onAddExpression,
  },
  {
    label: "添加且组",
    key: ExpressionGroupType.And,
    onClick: () => props.onAddGroup(ExpressionGroupType.And),
  },
  {
    label: "添加或组",
    key: ExpressionGroupType.Or,
    onClick: () => props.onAddGroup(ExpressionGroupType.Or),
  },
]);

const handleOpenChange = (open: boolean) => {
  if (props.onOpenChange) {
    props.onOpenChange(open);
  }
};
</script>