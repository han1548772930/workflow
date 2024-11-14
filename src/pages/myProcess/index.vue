<script setup lang="ts">
import CardTitle from "@/components/CardTitle/index.vue";
import CardTable from "@/components/CardTable/index.vue";
import { ApprovalNodeType, ApprovalOpHis, Response, TodoOrDoneData } from "@/service/types.ts";
import { SelectProps, SelectValue } from "ant-design-vue/es/select";
import { ChangeEvent } from "ant-design-vue/lib/_util/EventInterface";
import { computed, onBeforeMount, ref } from "vue";
import CustomModal from "@/components/Modal/index.vue";
import useServiceStore from "@/store/modules/service";
import { notifyError, showLoading } from "@/utils";
import { Tabs, TabPane } from "ant-design-vue";
import ReportView from "@/components/ReportView/index.vue";
import OpHisSteps from "@/components/Steps/OpHisSteps.vue";
import ApprovalNodeSteps from "@/components/Steps/ApprovalNodeSteps.vue";
const service = useServiceStore();
const firstData = ref<TodoOrDoneData[]>([]);
const switchValue = ref<boolean>(false)
const selectOptions = ref<SelectProps['options']>([])
const selectValue = ref<string>('')
const processName = ref<string>('')
const processNameTemp = ref<string>('')
const loading = ref<boolean>(false)
const open = ref<boolean>(false);
const currentItem = ref<TodoOrDoneData | null>(null)
const activeKey = ref('1');
const details: { reportData: any, opHisData: ApprovalOpHis[] | null, approvalNode: ApprovalNodeType[] | null } = {
  reportData: null,
  opHisData: null,
  approvalNode: null
}
onBeforeMount(async () => {
  const hide = showLoading()
  await getData();
  hide()
});
async function getData() {
  const res: Response<TodoOrDoneData[]> = await service.getMyBill();


  if (!res.Success) {
    notifyError(res.Message);
    return;
  }
  firstData.value = res.Data;
  selectOptions.value = Array.from(new Set(firstData.value.map((item) => item.CategoryName))).map((item) => ({
    label: item,
    value: item,
  }));

}
// 使用计算属性自动处理数据更新
const filteredData = computed(() => {
  let result = firstData.value;

  // 根据switchValue过滤
  if (!switchValue.value) {
    result = result.filter((item) => item.IsDel !== 1);
  }

  // 根据selectValue过滤
  if (selectValue.value) {
    result = result.filter((item) => item.CategoryName === selectValue.value);
  }

  // 根据processName过滤
  if (processName.value) {
    result = result.filter((item) => item.TemplateName.includes(processName.value));
  }

  return result;
});


function onSrach(_: MouseEvent) {
  if (processNameTemp.value.trim() !== '') {
    processName.value = processNameTemp.value;
  }
}
function onReset(_: MouseEvent) {
  selectValue.value = '';
  switchValue.value = false;
  processName.value = '';
}
async function onRefresh(_: MouseEvent) {
  loading.value = true;
  // onReset(_);
  await getData();
  setTimeout(() => {
    loading.value = false;
  }, 500);
}
function oprocessNameChange(e: ChangeEvent) {
  processNameTemp.value = e.target.value ?? "";
  if (e.target.value === '') {
    processName.value = '';
  }
}
function selectValueChange(v: SelectValue) {
  selectValue.value = v as string;

}
function onSwitchChange(checked: boolean | string | number, _: Event) {
  switchValue.value = checked as boolean
}

async function onTableItemClick(r: Record<string, any>) {
  const hide = showLoading("加载报表中...")
  activeKey.value = '1';
  currentItem.value = r as TodoOrDoneData;
  const res = await service.getReportData(r.TemplateName)
  if (res?.Message) {
    notifyError(res.Message);
    details.reportData = null
  } else {
    if (res?.DataSources) {
      const t = res?.DataSources[0].ConnectionProperties.ConnectString.split(";")[0]
      const tt = t.split("/")
      const temp = tt[tt.length - 1]
      res.DataSources[0].ConnectionProperties.ConnectString = res?.DataSources[0]?.ConnectionProperties?.ConnectString?.replace(temp, r.BillId)
      const token = localStorage.getItem("token")
      const t2 = res?.DataSources[0]?.ConnectionProperties?.ConnectString.split("Bearer ")[1]
      res.DataSources[0].ConnectionProperties.ConnectString = res?.DataSources[0]?.ConnectionProperties?.ConnectString?.replace(t2, token)
    }
    details.reportData = res
  }
  const opHis: Response<ApprovalOpHis[]> = await service.getOpHis(r.Sysid)

  if (!opHis.Success) {
    notifyError(opHis.Message);
    details.opHisData = null
  } else {
    details.opHisData = opHis.Data
  }
  const nodes: Response<ApprovalNodeType[]> = await service.getNodes(r.Sysid)

  if (!nodes.Success) {
    notifyError(nodes.Message);
    details.approvalNode = null
  } else {
    details.approvalNode = nodes.Data
  }
  hide()
  open.value = true;

}

function onModalChange(value: boolean) {
  open.value = value;
}

</script>

<template>
  <div class="container">
    <CardTitle :is-show-switch="true" :process-name="processNameTemp" :is-loading="loading"
      :on-process-name-change="oprocessNameChange" :switch-value="switchValue" :on-switch-change="onSwitchChange"
      :select-options="selectOptions" :on-selected-value-change="selectValueChange" :selected-value="selectValue"
      :on-srach="onSrach" :on-refresh="onRefresh" :on-reset="onReset">
    </CardTitle>
    <CardTable :on-table-item-click="onTableItemClick" :data="filteredData"></CardTable>
    <CustomModal width="95%" :open="open" :on-change="onModalChange" :title="currentItem?.TemplateName">
      <template #content>
        <Tabs v-model:activeKey="activeKey" type="card">
          <TabPane key="1" tab="流程详情" style="height: 70vh;">
            <ReportView :data="details.reportData"></ReportView>
          </TabPane>
          <TabPane key="2" tab="审批记录">
            <OpHisSteps :op-his-data="details.opHisData"></OpHisSteps>
          </TabPane>
          <TabPane key="3" tab="审批流程">
            <ApprovalNodeSteps :approval-node="details.approvalNode"></ApprovalNodeSteps>
          </TabPane>
        </Tabs>
      </template>

    </CustomModal>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100%;
  background-color: rgb(240, 242, 245);
}
</style>