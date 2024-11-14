<template>
  <div class="container">
    <div
      style="display: flex;justify-content: start;align-items: center;width: 100%; max-height: 40px;box-sizing: border-box;">
      <Button type="primary" ghost style="margin:0 10px" :icon="h(RollbackOutlined)" @click="back">返回</Button>
      <Steps :current="current" :items="items">
      </Steps>
    </div>
    <div class="steps-content">
      <BaseForm v-if="current == 0" ref="form" :category="formStore.category" :form-state="formStore.form"></BaseForm>
      <WorkflowEditor v-if="current == 1"></WorkflowEditor>
    </div>
    <div class="steps-action">
      <Button v-if="current < steps.length - 1" type="primary" @click="next">下一步</Button>
      <Button v-if="current == steps.length - 1" type="primary" @click="onComplete">
        完成
      </Button>
      <Button v-if="current > 0" style="margin-left: 8px" @click="prev">上一步</Button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, h } from 'vue';
import { Button, Steps, Modal } from 'ant-design-vue';
import { RollbackOutlined } from '@ant-design/icons-vue';
import BaseForm from '@/components/BasicInformation/BaseForm.vue';
import useFormStore from '@/store/modules/form';
import WorkflowEditor from '@/components/WorkflowEditor/index.vue';
import { capitalizeObjectKeys, findEmptyNodeUsers, getSelectRangeName, notifyError, notifySuccess } from '@/utils';
import { useRouter } from 'vue-router';
import useServiceStore from '@/store/modules/service';
import { Response, TemplateData } from '@/service/types';
import useNodeStore from '@/store/modules/node';

const router = useRouter();
const formStore = useFormStore()
const form = ref();
const nodeStore = useNodeStore();
const current = ref<number>(0);
const service = useServiceStore()
const steps = [
  {
    title: '基础信息设置',
  },
  {
    title: '审批流程设置',
  },
];
const items = steps.map(item => ({ key: item.title, title: item.title }));
function back() {
  formStore.form = {
    name: '',
    remark: '',
    enable: false,
    type: 0,
    isDefault: false,
    auditServiceName: '',
    billFormNamespace: '',
    dataBrowseFilename: '',
    sysid: 0,
  }
  nodeStore.node.childNode = undefined
  nodeStore.undoList = []
  nodeStore.redoList = []

  router.go(-1)
}
const next = async () => {
  const res = await form.value.onCheck();
  if (res) {
    notifyError(res.errorFields.map((i: any) => h('div', i.errors[0])));
    return
  }

  current.value++;
};
const prev = () => {
  current.value--;
};

async function onComplete() {
  const err = findEmptyNodeUsers(nodeStore.node)
  if (err.length > 0) {
    Modal.error({
      title: '提示',
      content: err.map(i =>
        h('div', `${i.name}未选择${getSelectRangeName(i.selectRange)}`)
      ),
    });
    return;
  }

  const startNode = capitalizeObjectKeys(nodeStore.node, 1)
  const req = {
    "Name": formStore.form.name,
    "Remark": formStore.form.remark,
    // "TargetTable": formStore.form.targetTable,
    "IsEnable": formStore.form.enable ? 1 : 0,
    "CategoryId": formStore.form.type,
    "IsDefault": formStore.form.isDefault ? 1 : 0,
    "AuditServiceName": formStore.form.auditServiceName,
    "BillFormNamespace": formStore.form.billFormNamespace,
    "DataBrowseFilename": formStore.form.dataBrowseFilename,
    "Node": startNode.ChildNode,
    "Sysid": formStore.form.sysid,
  }


  if (formStore.form.sysid != 0) {
    const res: Response<TemplateData> = await service.updateTemplate(req)
    if (!res.Success) {
      notifyError(res.Message)
      return;
    }
    notifySuccess('更新成功')
  } else {
    const res: Response<TemplateData> = await service.createTemplate(req)
    if (!res.Success) {
      notifyError(res.Message)
      return;
    }
    notifySuccess('创建成功')
  }
  formStore.form = {
    name: '',
    remark: '',
    enable: false,
    type: '',
    isDefault: false,
    auditServiceName: '',
    billFormNamespace: '',
    dataBrowseFilename: '',
    sysid: 0,
  }
  nodeStore.node.childNode = undefined
  nodeStore.undoList = []
  nodeStore.redoList = []
  router.replace('/Workflow/processManagement/template')

}


</script>
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  max-height: 100%;
  background-color: rgb(240, 242, 245);
  padding: 10px;
  box-sizing: border-box;
}

.steps-content {
  width: 100%;
  margin-top: 10px;
  border: 1px dashed #bebaba;
  border-radius: 6px;
  background-color: #fafafa;
  height: calc(100vh - 100px);
  box-sizing: border-box;
}

.steps-action {
  box-sizing: border-box;
  padding-top: 10px;
  height: 40px;
}

[data-theme='dark'] .steps-content {
  background-color: #2f2f2f;
  border: 1px dashed #404040;
}
</style>
