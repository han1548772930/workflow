<script setup lang="ts">
import useNodeStore from "@/store/modules/node.ts";
import { Form, FormItem, RadioGroup, Card, Radio, Button, Checkbox, Textarea, Tree, Tag } from "ant-design-vue";
import { computed, h, onBeforeMount, ref } from "vue";
import { getSelectRangeName, getExamineModeEnum } from "@/utils";
import { UsergroupAddOutlined } from "@ant-design/icons-vue";
import useFormStore from "@/store/modules/form";
import CustomModal from "@/components/Modal/index.vue";
import { TreeDataNode } from "ant-design-vue/es/vc-tree-select/interface";
import { NodeUsersDetail } from "@/service/types";
import { SelectRangeEnum, ExamineModeEnum, NodeTypeEnum } from "@/interfaces";
const nodeStore = useNodeStore();
const selectNodeId = computed(() => nodeStore.selectedNode);
const selectNode = nodeStore.getNode(selectNodeId.value!)!;
const materialUi = nodeStore.materialUis[selectNode?.nodeType]!;
const formStore = useFormStore()


const ids = formStore.roles.filter(item => item.ParentId === 0)
const approverData = ref({
  remark: '',
  selectRange: SelectRangeEnum.user,
  methodValue: ExamineModeEnum.sign,
  autoPass: false,
})


const checkedKeys = ref<string[]>([]);
const nodeContent = ref<{ sysid: string, name: string }[]>([])
const modalData = ref<{ open: boolean, title: string, width: string, top: string }>({
  open: false,
  title: '',
  width: '500px',
  top: '20px'
})
const treeData = ref<TreeDataNode[]>([]);
onBeforeMount(() => {
  approverData.value.selectRange = selectNode.selectRange ?? SelectRangeEnum.user
  approverData.value.methodValue = selectNode.examineMode ?? ExamineModeEnum.sign
  approverData.value.autoPass = selectNode.autoPass === 1
  approverData.value.remark = selectNode.remark ?? ''
  onSelectRangeChange()
  if (selectNode.nodeUsers) {
    if ([SelectRangeEnum.user, SelectRangeEnum.role].includes(approverData.value.selectRange)) {
      checkedKeys.value = selectNode.nodeUsers.map(i => i.targetId.toString())
    }
  }

  if (selectNode.selectRange === SelectRangeEnum.user) {
    selectNode.nodeUsers?.forEach(i => {
      nodeContent.value.push({
        sysid: i.targetId.toString(),
        name: formStore.users.find(j => j.Sysid === i.targetId)?.Name ?? ''
      })
    })
  }
  if (selectNode.selectRange === SelectRangeEnum.role) {
    selectNode.nodeUsers?.forEach(i => {
      nodeContent.value.push({
        sysid: i.targetId.toString(),
        name: formStore.roles.find(j => j.Sysid === i.targetId)?.Name ?? ''
      })
    })
  }

})


materialUi.handleConfirm = () => {
  if ([SelectRangeEnum.starter, SelectRangeEnum.supervisor, SelectRangeEnum.originator].includes(approverData.value.selectRange)) {
    selectNode.nodeContent = getSelectRangeName(approverData.value.selectRange)
    selectNode.nodeUsers = [
      {
        type: approverData.value.selectRange,
        targetId: null as unknown as number
      }
    ]
  } else {
    selectNode.nodeContent = nodeContent.value.map(i => i.name).join(',');
    selectNode.nodeUsers = checkedKeys.value.map(i => ({
      type: approverData.value.selectRange,
      targetId: Number(i)
    }))
  }
  selectNode.selectRange = approverData.value.selectRange
  selectNode.examineMode = approverData.value.methodValue
  selectNode.type = NodeTypeEnum.approver

  selectNode.autoPass = approverData.value.autoPass ? 1 : 0
  selectNode.remark = approverData.value.remark
  nodeStore.selectedNode = undefined;
}
function addName() {

  const keys = checkedKeys.value.filter(i => !ids.find(j => j.Sysid.toString() === i))
  checkedKeys.value = keys
  nodeContent.value = getNodeContent()
  modalData.value.open = false;
}

function openModal() {
  modalData.value.open = true;
}

function onModalChange(value: boolean) {
  modalData.value.open = value;
}


function getRoleData(data: NodeUsersDetail[]) {
  const temp: TreeDataNode[] = []
  function generateTreeData(menuItems: NodeUsersDetail[], parentId: number): TreeDataNode[] {
    return menuItems
      .filter(item => item.ParentId === parentId)
      .map(item => {
        const children = generateTreeData(menuItems, item.Sysid);
        return {
          title: item.Name,
          key: item.Sysid.toString(),
          children: children,
          isLeaf: children.length === 0,
          selectable: children.length === 0,
        }
      });
  }
  ids.forEach(id => {
    const children = generateTreeData(data, id.Sysid);
    if (children.length !== 0) {
      temp.push({
        title: id.Name,
        key: id.Sysid.toString(),
        children: children,
        isLeaf: children.length === 0,
        selectable: children.length === 0
      });
    }

  });
  return temp
}
function getNodeContent() {
  const temp: { sysid: string, name: string }[] = []
  if (approverData.value.selectRange === SelectRangeEnum.role) {
    formStore.roles.forEach(item => {

      if (checkedKeys.value.includes(item.Sysid.toString())) {
        temp.push({
          sysid: item.Sysid.toString(),
          name: item.Name
        })
      }
    })
  }
  if (approverData.value.selectRange === SelectRangeEnum.user) {
    formStore.users.forEach(item => {
      if (checkedKeys.value.includes(item.Sysid.toString())) {
        temp.push({
          sysid: item.Sysid.toString(),
          name: item.Name
        })
      }
    })
  }
  return temp
}

function onTagClose(sysid: string) {


  const index = nodeContent.value.findIndex(i => i.sysid === sysid)
  nodeContent.value.splice(index, 1)
  const keys = checkedKeys.value.filter(i => i !== sysid)
  checkedKeys.value = keys
}
function clearTag() {
  nodeContent.value = []
  checkedKeys.value = []
}
function onSelectRangeChange() {
  clearTag()
  if (approverData.value.selectRange === SelectRangeEnum.role) {
    modalData.value.title = '选择指定角色'
    treeData.value = getRoleData(formStore.roles)
  } else if (approverData.value.selectRange === SelectRangeEnum.user) {
    modalData.value.title = '选择指定人员'
    treeData.value = formStore.users.map(item => {
      return {
        title: item.Name,
        key: item.Sysid.toString(),
        isLeaf: true,
        selectable: true
      }
    })
  } else {
    treeData.value = []
  }
}
</script>

<template>
  <div>
    <CustomModal :open="modalData.open" :width="modalData.width" :on-change="onModalChange" :title="modalData.title"
      :top="modalData.top">
      <template #content>
        <Tree v-model:checkedKeys="checkedKeys" :height="600" default-expand-all checkable :tree-data="treeData">
        </Tree>
      </template>
      <template #footer>
        <Button type="primary" @click="addName">确定</Button>
        <Button @click="modalData.open = false">取消</Button>

      </template>
    </CustomModal>
    <Form layout="vertical" :model="approverData" name="basic" autocomplete="off">
      <FormItem label="指定方式" name="selectRange">
        <RadioGroup v-model:value="approverData.selectRange" @change="onSelectRangeChange">
          <Radio :value="2">{{ getSelectRangeName(2) }}</Radio>
          <Radio :value="3">{{ getSelectRangeName(3) }}</Radio>
          <Radio :value="4">{{ getSelectRangeName(4) }}</Radio>
          <Radio :value="5">{{ getSelectRangeName(5) }}</Radio>
          <Radio :value="6">{{ getSelectRangeName(6) }}</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem>
        <Card hoverable>
          <template #cover>
            <div style="display: flex;justify-content: start;align-items: center;">
              <Button type="text" :icon="h(UsergroupAddOutlined)"
                :style="{ color: treeData.length === 0 ? '' : 'rgb(80,166,255)' }" @click="openModal"
                :disabled="treeData.length === 0">添加/修改成员</Button>
              <Button type="text" danger :disabled="treeData.length === 0" @click="clearTag">清空</Button>
            </div>
          </template>
          <div style="border: 1px solid #eee;padding: 5px;border-radius: 5px;min-height: 50px">
            <Tag color="processing" closable v-for="i in nodeContent" :key="i.sysid" @close="onTagClose(i.sysid)">{{
      i.name
    }}</Tag>

          </div>
        </Card>
      </FormItem>
      <FormItem label="多人审批时采用的审批方式" name="methodValue">
        <RadioGroup v-model:value="approverData.methodValue">
          <Radio :value="2">{{ getExamineModeEnum(2) }}</Radio>
          <Radio :value="3">{{ getExamineModeEnum(3) }}</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="其他设置" name="autoPass">
        <Checkbox v-model:checked="approverData.autoPass">当审批人在前面节点审批过或与申请人是同一人时，自动通过</Checkbox>
      </FormItem>
      <FormItem label="备注" name="remark">
        <Textarea v-model:value="approverData.remark" :rows="4" />
      </FormItem>
    </Form>
  </div>
</template>

<style scoped></style>