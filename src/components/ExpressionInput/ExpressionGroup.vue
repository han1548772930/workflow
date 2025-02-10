<template>
  <div class="expression-group">
    <div class="group-operator">
      <div class="group-operator-line" />
      <Select v-model:value="groupType" :options="groupOptions" @change="handleGroupTypeChange" />
    </div>
    <div class="expression-children">
      <template v-for="(child, index) in value.children" :key="child.id">
        <ExpressionGroup v-if="child.nodeType === ExpressionNodeType.Group" :value="child as IExpressionGroup"
          @change="handleChildChange" @remove="() => handleRemoveChild(child.id)" />
        <ExpressionItem v-else @addExpression="() => handleAddExpAfter(index)"
          @addGroup="(nodeType) => handleAddGroupAfter(index, nodeType)" @remove="() => handleRemoveChild(child.id)">
          <DefaultExpressionInput></DefaultExpressionInput>
        </ExpressionItem>
      </template>
      <div class="item" v-if="!value.children.length"></div>
      <div class="item">
        <div class="group-action">
          <AddMenu @addExpression="handleAddExp" @addGroup="handleAddGroup">
            <Button type="dashed" block>
              <template #icon>
                <PlusOutlined />
              </template>
              {{ "添加" }}
            </Button>
          </AddMenu>
          <Button v-if="!root" type="text" style="margin-left: 8px" @click="handleDeleteClick">
            <template #icon>
              <DeleteOutlined />
            </template>
          </Button>


        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Select, Button } from 'ant-design-vue';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons-vue';
import DefaultExpressionInput from "../ExpressionInput/DefaultExpressionInput.vue";
import { ExpressionGroupType, ExpressionNodeType, IExpression, IExpressionGroup, IExpressionNode } from '../../interfaces';
import ExpressionGroup from './ExpressionGroup.vue';
import { ExpressionInputProps } from '@/interfaces';
import ExpressionItem from './ExpressionItem.vue';
import AddMenu from './AddMenu.vue';
import { createUuid } from '../../utils/create-uuid';

const props = defineProps<{
  value: IExpressionGroup;
  onChange?: (value: IExpressionGroup) => void;
  onRemove?: (nodeId: string) => void;
  root?: boolean;
}>();



const groupType = ref(props.value.groupType);
const groupOptions = computed(() => [
  { value: ExpressionGroupType.And, label: "且" },
  { value: ExpressionGroupType.Or, label: "或" },
]);

const handleAddExp = () => {
  props.onChange?.({
    ...props.value,
    children: [
      ...props.value.children,
      {
        id: createUuid(),
        nodeType: ExpressionNodeType.Expression,
      },
    ],
  });
};

const handleAddGroup = (groupType: ExpressionGroupType) => {
  const newNode: IExpressionGroup = {
    id: createUuid(),
    nodeType: ExpressionNodeType.Group,
    groupType,
    children: [
      {
        id: createUuid(),
        nodeType: ExpressionNodeType.Expression,
      },
    ],
  };
  props.onChange?.({
    ...props.value,
    children: [...props.value.children, newNode],
  });
};

const handleAddExpAfter = (index: number) => {
  const newNode: IExpression = {
    id: createUuid(),
    nodeType: ExpressionNodeType.Expression,
  };
  const newChildren = [...props.value.children];
  newChildren.splice(index + 1, 0, newNode);
  props.onChange?.({
    ...props.value,
    children: newChildren,
  });
};

const handleAddGroupAfter = (index: number, groupType: ExpressionGroupType) => {
  const newNode: IExpressionGroup = {
    id: createUuid(),
    nodeType: ExpressionNodeType.Group,
    groupType,
    children: [
      {
        id: createUuid(),
        nodeType: ExpressionNodeType.Expression,
      },
    ],
  };
  const newChildren = [...props.value.children];
  newChildren.splice(index + 1, 0, newNode);
  props.onChange?.({
    ...props.value,
    children: newChildren,
  });
};

const handleChildChange = (node: IExpressionNode) => {
  props.onChange?.({
    ...props.value,
    children: props.value.children.map((child) =>
      child.id === node.id ? node : child
    ),
  });
};

const handleGroupTypeChange = (groupType: ExpressionGroupType) => {
  props.onChange?.({
    ...props.value,
    groupType,
  });
};

const handleRemoveChild = (nodeId: string) => {
  props.onChange?.({
    ...props.value,
    children: props.value.children.filter((child) => child.id !== nodeId),
  });
};

const handleDeleteClick = () => {
  props.onRemove?.(props.value.id);
};
</script>

<style>
.expression-group {
  display: flex;
  align-items: stretch;
  min-height: 88px;
}

.group-operator {
  position: relative;
  width: 80px;
  display: flex;
  align-items: center;
  padding-right: 16px;
}

.group-operator-line {
  position: absolute;
  left: calc(50% - 8px);
  width: 30px;
  border: solid 1px #d9d9d9;
  border-right: 0;
  border-radius: 5px 0 0 5px;
  height: calc(100% - 48px);
}

.group-operator-line::before,
.group-operator-line::after {
  content: "";
  position: absolute;
  right: 0;
  width: 6px;
  height: 6px;
  border: solid 1px #d9d9d9;
  border-radius: 50%;
}

.group-operator-line::before {
  top: 0;
  transform: translateX(100%) translateY(-50%);
}

.group-operator-line::after {
  bottom: 0;
  transform: translateX(100%) translateY(50%);
}

.expression-children {
  flex: 1;
  display: flex;
  flex-flow: column;
}

.group-action {
  display: flex;
  width: 100%;
  align-items: center;
}
</style>