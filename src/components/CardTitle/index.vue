<template>
  <Card :bordered="false" class="card">
    <div style="display: flex;justify-content: start;align-items: center">
      <div >
      流程名称:
      </div>
      <div style="margin: 0 10px">
      <Input :value="processName" @change="onProcessNameChange" allow-clear />
      </div>
      <div >
      流程分类:
      </div>
      <div style="margin: 0 10px">
      <Select :value="selectedValue" show-search style="width: 200px" :options="selectOptions"
        :filter-option="filterOption" @change="onSelectedValueChange"></Select>
      </div>
      <div v-if="isShowSwitch" style="margin-left: 10px;">
      <Switch :checked="switchValue" @change="onSwitchChange" checked-children="显示已反审" un-checked-children="不显示已反审" />
      </div>
      <div style="margin: 0 10px">
      <Button type="primary" :icon="h(SearchOutlined)" style="margin-left: 10px;" @click="onSrach">搜索</Button>
      </div>
      <div style="margin: 0 10px">
      <Button :icon="h(RedoOutlined)" @click="onReset">重置</Button>
      </div>
      <div>
      <Button type="primary" :loading="isLoading" @click="onRefresh">刷新</Button>
      </div>
    </div>

  </Card>
</template>
<script setup lang='ts'>
import { Card, Input, Select, Switch, Button } from 'ant-design-vue';
import type { SelectProps } from 'ant-design-vue';
import { SearchOutlined, RedoOutlined } from '@ant-design/icons-vue';
import { SelectValue } from 'ant-design-vue/es/select';
import { h, toRefs } from 'vue';
import { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface';




const props = defineProps<{
  processName: string;
  selectedValue: string | undefined;
  selectOptions: SelectProps['options'];
  switchValue: boolean;
  isLoading: boolean;
  isShowSwitch: boolean;
  onSwitchChange: (checked: boolean | string | number, _: Event) => void;
  onProcessNameChange: (value: ChangeEvent) => void;
  onSelectedValueChange: (value: SelectValue) => void;
  onSrach: (e: MouseEvent) => void;
  onReset: (e: MouseEvent) => void;
  onRefresh: (e: MouseEvent) => void;
}>()
const { processName, selectedValue, selectOptions } = toRefs(props)

const filterOption = (input: string, option: any) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};


</script>

<style scoped>
.card {
  width: 98%;
  margin-top: 10px;
}
</style>
