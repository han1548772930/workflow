<template>
  <Card :bordered="false" class="card-table">
    <Table size="small" sticky :scroll="{ x: 1500 }" :columns="columns" :data-source="data"
      @resizeColumn="handleResizeColumn">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'Status'">
          <span>
            <Tag :color="handleStatusColor(record.Status)">
              {{ record.Status.toUpperCase() }}
            </Tag>
            <Tag v-if="record.IsDel === 1" :color="'red'">
              已反审
            </Tag>
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <Button @click="onTableItemClick(record)" style="color: rgb(80,166,255);">详情</Button>
        </template>
      </template>
    </Table>
  </Card>
</template>
<script setup lang='ts'>
import { TableColumnsType } from 'ant-design-vue';
import { ColumnType } from 'ant-design-vue/es/table';
import { ref } from 'vue';
import { Table, Tag, Card, Button } from "ant-design-vue";
import { handleStatusColor } from '@/utils';
import { TodoOrDoneData } from '@/service/types';
defineProps<{
  data: TodoOrDoneData[]
  onTableItemClick: (r: Record<string, any>) => void;
}>()

const columns = ref<TableColumnsType>([
  {
    dataIndex: 'TemplateName',
    key: 'TemplateName',
    title: '模板名称',
    resizable: true,
    width: 200,
  },
  {
    title: '流程分类',
    dataIndex: 'CategoryName',
    key: 'CategoryName',
    resizable: true,
    width: 150,
  },
  {
    title: '提报日期',
    dataIndex: 'CreateDate',
    resizable: true,
    key: 'CreateDate',
    width: 200,
  },
  {
    title: '状态',
    key: 'Status',
    dataIndex: 'Status',
    resizable: true,
    width: 100,
  },
  {
    title: '业务单据号',
    key: 'BillCode',
    dataIndex: 'BillCode',
    resizable: true,
    width: 120,
  }, {
    title: '当前节点',
    key: 'ActiveNodeName',
    dataIndex: 'ActiveNodeName',
    resizable: true,
    width: 100,

  }, {
    title: '提单人',
    key: 'Creator',
    dataIndex: 'Creator',
    resizable: true,
    width: 100,
  },
  {
    title: '操作',
    key: 'action',
  },
]);
function handleResizeColumn(w: number, col: ColumnType<any>) {
  col.width = w;
}
</script>

<style scoped>
.card-table {
  width: 98%;
  margin-top: 10px;
}
</style>