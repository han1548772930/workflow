<template>
  <div>
    <Form ref="formRef" :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 8 }"
      style="margin-top: 20px" autocomplete="off">
      <FormItem label="流程类型" name="type" :rules="[{ required: true, message: '请选择流程类型' }]">
        <Select v-model:value="formState.type" show-search
          :options="category.map((i) => ({ label: i.Name, value: i.Sysid }))" :filter-option="filterOption"></Select>
      </FormItem>
      <FormItem label="流程名称" name="name" :rules="[{ required: true, message: '请输入流程名称' }]">
        <Input v-model:value="formState.name" />
      </FormItem>

      <FormItem label="是否启用" name="enable" :rules="[{ required: true }]">
        <Switch v-model:checked="formState.enable" />
      </FormItem>
      <FormItem label="是否默认" name="isDefault" :rules="[{ required: true }]">
        <Switch v-model:checked="formState.isDefault" />
      </FormItem>
      <FormItem label="审计服务名称" name="auditServiceName">
        <Textarea v-model:value="formState.auditServiceName" :rows="4" />
      </FormItem>
      <FormItem label="业务窗体命名空间" name="billFormNamespace"
        :rules="[{ required: formState.enable, message: '请选择业务窗体命名空间' }]">
        <Button @click="openModal" style="margin-bottom: 5px;">选择业务窗体命名空间</Button>
        <Textarea v-model:value="formState.billFormNamespace" :rows="4" />
      </FormItem>
      <FormItem label="数据展示文件名" name="dataBrowseFilename">

        <Textarea v-model:value="formState.dataBrowseFilename" :rows="4" />
      </FormItem>
      <FormItem label="备注" name="remark">
        <Textarea v-model:value="formState.remark" :rows="4" />
      </FormItem>
    </Form>
    <CustomModal :open="open" :width="'500px'" :on-change="onModalChange" :title="'选择业务窗体命名空间'">
      <template #content>
        <DirectoryTree v-model:expandedKeys="expandedKeys" :height="600" v-model:selectedKeys="selectedKeys"
          :tree-data="treeData">
        </DirectoryTree>
      </template>
      <template #footer>
        <Button type="primary" @click="onSelect">确定</Button>
        <Button @click="open = false">取消</Button>
      </template>
    </CustomModal>

  </div>
</template>
<script lang="ts" setup>

import { Category, FormState, Response, MenuItem } from '@/service/types';
import { Form, FormItem, Input, Select, Switch, Textarea, Button, DirectoryTree } from 'ant-design-vue';
import { onBeforeMount, ref } from 'vue';
import type { FormInstance } from 'ant-design-vue';
import useServiceStore from '@/store/modules/service';
import { notifyError } from '@/utils';
import CustomModal from '@/components/Modal/index.vue';
import { TreeDataNode } from 'ant-design-vue/es/vc-tree-select/interface';



const open = ref(false);
const expandedKeys = ref<string[]>([]);
const selectedKeys = ref<string[]>([]);
let selectData: MenuItem[] = []
const treeData = ref<TreeDataNode[]>([]);
const service = useServiceStore();

const formRef = ref<FormInstance>();
const props = defineProps<{
  formState: FormState;
  category: Category[]
}>()

function onSelect() {
  if (selectedKeys.value.length === 0) {
    notifyError('请选择业务窗体命名空间');
    return;
  }
  const res = selectData.filter(i => i.Sysid.toString() === selectedKeys.value[0])
  props.formState.billFormNamespace = res[0].Code

  open.value = false;
}



onBeforeMount(async () => {
  const res: Response<MenuItem[]> = await service.getAllmenus();
  if (!res.Success) {
    notifyError(res.Message);
    return;
  }
  selectData = res.Data
  setKeys()
  const ids = res.Data.filter(item => item.Parentid === 0)
  function generateTreeData(menuItems: MenuItem[], parentId: number): TreeDataNode[] {
    return menuItems
      .filter(item => item.Parentid === parentId)
      .map(item => {
        const children = generateTreeData(menuItems, item.Sysid);
        return {
          title: item.Name,
          key: item.Sysid.toString(),
          children: children,
          isLeaf: children.length === 0,
          selectable: children.length === 0
        }
      });
  }
  ids.forEach(id => {
    const children = generateTreeData(res.Data, id.Sysid);
    if (children.length !== 0) {
      treeData.value.push({
        title: id.Name,
        key: id.Sysid.toString(),
        children: children,
        isLeaf: children.length === 0,
        selectable: children.length === 0
      });
    }

  });
})
const filterOption = (input: string, option: any) => {
  return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

const onCheck = async () => {
  try {
    await formRef.value?.validateFields();
  } catch (errorInfo) {
    return errorInfo;
  }
};
function setKeys() {
  selectedKeys.value = selectData.filter(i => i.Code === props.formState.billFormNamespace).map(i => i.Sysid.toString())
  expandedKeys.value = selectedKeys.value
}
function openModal() {
  setKeys()
  open.value = true;
}
function onModalChange(value: boolean) {
  open.value = value;
}
defineExpose({
  onCheck
})


</script>
