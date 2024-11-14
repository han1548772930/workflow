<script setup lang="ts">
import {
  Collapse,
  CollapsePanel,
  Input,
  Card,
  Button,
  Table,
  TableProps,
  Tag,
  Affix,
  Form,
  FormItem,
  Textarea
} from "ant-design-vue";
import {
  SearchOutlined,
  RedoOutlined,
  PlusOutlined,
  HighlightOutlined,
  DeleteOutlined,
  CopyOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons-vue';
import {ref, h, onBeforeMount, createVNode} from "vue";
import {ChangeEvent} from "ant-design-vue/lib/_util/EventInterface";
import useServiceStore from "@/store/modules/service";
import {capitalizeObjectKeys, getSelectRangeName, notifyError, notifySuccess, showLoading} from "@/utils";
import {useRouter} from "vue-router";
import useFormStore from '@/store/modules/form';
import CustomModal from '@/components/Modal/index.vue';
import {Category, NodeUsersDetail, Response, Template, TemplateItem} from "@/service/types.ts";
import {Modal} from 'ant-design-vue';
import useNodeStore from "@/store/modules/node";
import {SelectRangeEnum} from "@/interfaces";
import Report from "@/components/Report/index.vue";


const nodeStore = useNodeStore();
const formStore = useFormStore()
const activeKey = ref([formStore.activeKey]);
const router = useRouter();
const templateName = ref('');
const isLoading = ref(false);
const service = useServiceStore();
const templateList = ref<{ category: Category, data: TemplateItem[] }[]>([]);
const categoryData = ref<Category[]>([])
const templateData = ref<TemplateItem[]>([])
const open = ref(false)
const reportModal = ref({
  open: false,
  name: ''
})
const newCategory = ref({
  name: '',
  remark: '',
  title: '',
  sysid: -1
})
const columns: TableProps<TemplateItem>['columns'] = [
  {
    title: '模板名称',
    dataIndex: 'Name',
    key: 'Name',
    width: '300px'
  },

  {
    title: '是否启用',
    dataIndex: 'IsEnable',
    key: 'IsEnable',
    width: '200px'

  }, {
    title: '操作',
    key: 'action',

  },
]
onBeforeMount(async () => {
  const hide = showLoading()
  formStore.users = []
  formStore.roles = []
  const users: Response<NodeUsersDetail[]> = await service.getSysUser()
  if (!users.Success) {
    notifyError(users.Message)
    return;
  }
  const roles: Response<NodeUsersDetail[]> = await service.getSysRole()
  if (!roles.Success) {
    notifyError(roles.Message)
    return;
  }
  users.Data.forEach((i) => {
    formStore.users.push(i)
  })
  roles.Data.forEach((i) => {
    formStore.roles.push(i)
  })
  await getData();
  hide()

})

async function getData() {
  const category = await service.getAllCategory();
  if (!category.Success) {
    notifyError(category.Message);
    return;
  }
  categoryData.value = category.Data;
  formStore.category = category.Data;
  const template = await service.getAllTemplate();
  if (!template.Success) {
    notifyError(template.Message);
    return;
  }
  templateData.value = template.Data;
  category.Data.forEach(i => {
    const data = template?.Data.filter(j => j.CategoryId === i.Sysid)
    templateList.value.push({category: i, data: data ?? []})
  })
}

function onSrach(_: MouseEvent) {
  templateList.value = [];
  categoryData.value?.forEach(i => {
    const data = templateData?.value.filter(j => j.CategoryId === i.Sysid && j.Name.includes(templateName.value))
    if (data?.length !== 0) {
      templateList.value.push({category: i, data: data ?? []})
    }
  })
}

function onReset(_: MouseEvent) {
  templateName.value = '';
  templateList.value = [];
  categoryData.value?.forEach(i => {
    const data = templateData?.value.filter(j => j.CategoryId === i.Sysid)
    if (data?.length !== 0) {
      templateList.value.push({category: i, data: data ?? []})
    }
  })
}

async function onRefresh(_: MouseEvent) {
  isLoading.value = true;
  templateName.value = '';
  templateList.value = [];
  await getData();
  setTimeout(() => {
    isLoading.value = false;
  }, 500);
}

function addCategory() {
  newCategory.value.name = '';
  newCategory.value.remark = '';
  newCategory.value.title = '新增分组';
  open.value = true;
}

function onCategoryEdit(e: MouseEvent, item: { category: Category, data: TemplateItem[] }) {
  e.stopPropagation();
  newCategory.value.title = '修改分组';
  newCategory.value.name = item.category.Name;
  newCategory.value.remark = item.category.Remark;
  newCategory.value.sysid = item.category.Sysid;
  open.value = true;
}

async function onCategoryRemove(e: MouseEvent, item: { category: Category, data: TemplateItem[] }) {
  e.stopPropagation();
  if (item.data.length !== 0) {
    notifyError(`【${item.category.Name}】下有模板，不能删除`);
    return;
  }
  Modal.confirm({
    icon: createVNode(ExclamationCircleOutlined),
    content: '确定要删除吗？',
    async onOk() {
      const res = await service.deleteCategory(item.category.Sysid)
      if (!res.Success) {
        notifyError(res.Message);
        return;
      }
      const index = templateList.value.findIndex(i => i.category.Sysid === item.category.Sysid);
      templateList.value.splice(index, 1);
      notifySuccess('删除成功');
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onCancel() {
    },
  });


}

function addTemplate() {
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
  router.push('/Workflow/basicInformation')
}

async function onTableItemToReport(e: Record<string, any>) {
  const hide = showLoading("正在加载报表...")
  const res: Response<Template> = await service.getTemplate(e.Sysid)

  const data: Template = res.Data
  reportModal.value.name = data.DataBrowseFilename ?? data.Name
  hide()
  reportModal.value.open = true


}

async function onTableItemEdit(e: Record<string, any>) {
  const hide = showLoading("正在加载设计器...")
  const res: Response<Template> = await service.getTemplate(e.Sysid)

  const data: Template = res.Data
  formStore.activeKey = data.Category.Sysid.toString();
  formStore.form.sysid = data.Sysid;
  formStore.form.name = data.Name;
  formStore.form.remark = data.Remark ?? "";
  formStore.form.enable = data.IsEnable === 1;
  formStore.form.type = data.Category.Sysid;
  formStore.form.isDefault = data.IsDefault === 1;
  formStore.form.auditServiceName = data.AuditServiceName;
  formStore.form.billFormNamespace = data.BillFormNamespace;
  formStore.form.dataBrowseFilename = data.DataBrowseFilename ?? "";

  const d = capitalizeObjectKeys(data.Node, 2)
  if (d?.nodeUsers) {
    nodeStore.node.childNode = d;
    handleNodeContent(d)
  }
  hide()
  await router.push('/Workflow/basicInformation')

}

async function onTableItemCopy(e: Record<string, any>) {
  const hide = showLoading("正在加载设计器...")
  const res: Response<Template> = await service.getTemplate(e.Sysid)

  const data: Template = res.Data
  formStore.activeKey = data.Category.Sysid.toString();
  formStore.form.name = data.Name;
  formStore.form.remark = data.Remark ?? "";
  formStore.form.enable = data.IsEnable === 1;
  formStore.form.type = data.Category.Sysid;
  formStore.form.isDefault = data.IsDefault === 1;
  formStore.form.auditServiceName = data.AuditServiceName;
  formStore.form.billFormNamespace = data.BillFormNamespace;
  formStore.form.dataBrowseFilename = data.DataBrowseFilename ?? "";
  const d = capitalizeObjectKeys(data.Node, 2)
  if (d?.nodeUsers) {
    nodeStore.node.childNode = d;
    handleNodeContent(d)
  }


  hide()
  await router.push('/Workflow/basicInformation')

}

async function onTableItemDelete(e: Record<string, any>) {
  Modal.confirm({
    icon: createVNode(ExclamationCircleOutlined),
    content: '确定要删除吗？',
    async onOk() {
      const res = await service.deleteTemplate(e.Sysid)
      if (!res.Success) {
        notifyError(res.Message);
        return;
      }
      const index = templateList.value.findIndex(i => i.category.Sysid === e.CategoryId);
      const index2 = templateList.value[index].data.findIndex(i => i.Sysid === e.Sysid);
      templateList.value[index].data.splice(index2, 1);
      notifySuccess('删除成功');
    },
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onCancel() {
    },
  });
}

function onTemplateChange(e: ChangeEvent) {
  templateName.value = e.target.value ?? "";
}

function onModalChange(value: boolean) {
  open.value = value;
}

const onFinish = async (_: any) => {

};

async function handleCategory() {
  if (newCategory.value.title.includes('新增')) {
    const res: Response<Category> = await service.addCategory(newCategory.value.name, newCategory.value.remark);
    if (!res.Success) {
      notifyError(res.Message);
      return;
    }
    const category = {
      category: {
        Name: newCategory.value.name,
        Remark: newCategory.value.remark ?? "",
        Sysid: res.Data.Sysid // Assuming the response data contains the new category's Sysid
      },
      data: []
    };
    templateList.value.push(category);
  }
  if (newCategory.value.title.includes('修改')) {
    const res: Response<Category> = await service.updateCategory(newCategory.value.name, newCategory.value.remark, newCategory.value.sysid);
    if (!res.Success) {
      notifyError(res.Message);
      return;
    }
    const index = templateList.value.findIndex(i => i.category.Sysid === newCategory.value.sysid);
    templateList.value[index].category.Name = newCategory.value.name;
  }

  open.value = false;
}

function onCancal() {
  open.value = false;
}

const onFinishFailed = (errorInfo: any) => {
  notifyError(errorInfo.errorFields.map((i: any) => `【${i.errors[0]}】\r\n`).join('  '));
};

function handleNodeContent(obj: any) {
  if (!obj) return
  const s: string[] = []

  obj.nodeUsers.forEach((i: any) => {
    if (obj.selectRange === SelectRangeEnum.user) {
      const title = formStore.users.find((j: NodeUsersDetail) => j.Sysid === i.targetId)?.Name ?? ""
      s.push(title)
    }
    if (obj.selectRange === SelectRangeEnum.role) {
      const title = formStore.roles.find((j: NodeUsersDetail) => j.Sysid === i.targetId)?.Name ?? ""
      s.push(title)
    }
    if ([SelectRangeEnum.starter, SelectRangeEnum.originator, SelectRangeEnum.supervisor].includes(obj.selectRange)) {

      s.push(getSelectRangeName(obj.selectRange) ?? "")
    }

  })


  obj.nodeContent = s.join(",")
  if (!obj.childNode) return
  handleNodeContent(obj.childNode)
}


</script>


<template>
  <div class="container">
    <CustomModal :open="open" :width="'500px'" :top="'100px'" :on-change="onModalChange" :title="newCategory.title">
      <template #content>
        <Form :model="newCategory" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" autocomplete="off"
              @finish="onFinish" @finishFailed="onFinishFailed">
          <FormItem label="分组名称" name="name" :rules="[{ required: true, message: '请输入分组名称!' }]">
            <Input v-model:value="newCategory.name"/>
          </FormItem>
          <FormItem label="备注" name="remark">
            <Textarea v-model:value="newCategory.remark"/>
          </FormItem>
          <FormItem :wrapper-col="{ offset: 8, span: 16 }">
            <Button type="primary" html-type="submit" style="margin-right: 20px;" @click="handleCategory">提交</Button>
            <Button @click="onCancal">取消</Button>
          </FormItem>
        </Form>
      </template>

    </CustomModal>
    <div ref="globalModal">
      <Modal v-model:open="reportModal.open" :width="'100%'" style="top:0;padding: 0;" :footer="null"
             :getContainer="() => ($refs.globalModal as any)" destroyOnClose>
        <Report :name="reportModal.name"></Report>
      </Modal>
    </div>
    <Affix class="card">
      <Card :bordered="false">
        <div style="display: flex;justify-content: start;align-items: center">
          <div>
            流程名称:
          </div>
          <div style="margin:0 10px">
            <Input v-model:value="templateName" @change="onTemplateChange" allow-clear/>
          </div>
          <div>
            <Button type="primary" :icon="h(SearchOutlined)" style="margin-left: 10px;" @click="onSrach">搜索</Button>
          </div>
          <div style="margin:0 10px">
            <Button :icon="h(RedoOutlined)" @click="onReset">重置</Button>
          </div>
          <div>
            <Button :icon="h(PlusOutlined)" type="primary" @click="addTemplate">新增模板</Button>
          </div>
          <div style="margin:0 10px">
            <Button :icon="h(PlusOutlined)" type="primary" @click="addCategory">新增分组</Button>
          </div>
          <div>
            <Button type="primary" :loading="isLoading" @click="onRefresh">刷新</Button>
          </div>
        </div>

      </Card>
    </Affix>

    <Collapse v-model:activeKey="activeKey" style="width: 98%;" bordered>
      <CollapsePanel v-for="item in templateList" :key="item.category.Sysid.toString()" :show-arrow="false">
        <template #header>
          <div class="card-header">
            <span class="card-header-title">{{ item.category.Name }}({{ item.data.length }})</span>
            <Button :icon="h(HighlightOutlined)" type="text" class="card-button"
                    @click="(e) => onCategoryEdit(e, item)">编辑
            </Button>
            <Button :icon="h(DeleteOutlined)" type="text" class="card-button"
                    @click="(e) => onCategoryRemove(e, item)">删除
            </Button>
          </div>
        </template>
        <Table sticky :scroll="{ x: 1500 }" :columns="columns" :data-source="item.data" :pagination="false">
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'IsEnable'">
              <span>
                <Tag color="green">
                  {{ record.IsEnable == 1 ? '启用' : '禁用' }}
                </Tag>
              </span>
            </template>
            <template v-if="column.key === 'action'">
              <Button :icon="h(HighlightOutlined)" type="text" class="card-button"
                      @click="onTableItemEdit(record)">编辑
              </Button>
              <Button :icon="h(HighlightOutlined)" type="text" class="card-button"
                      @click="onTableItemToReport(record)">编辑报表
              </Button>
              <Button :icon="h(DeleteOutlined)" type="text" class="card-button"
                      @click="onTableItemDelete(record)">删除
              </Button>
              <Button :icon="h(CopyOutlined)" type="text" class="card-button"
                      @click="onTableItemCopy(record)">复制
              </Button>
            </template>
          </template>
        </Table>
      </CollapsePanel>
    </Collapse>
  </div>
</template>

<style scoped>
:deep(.ant-modal .ant-modal-content) {
  padding: 0;
  min-height: 100vh;
  box-sizing: border-box
}


.container {
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100%;
  background-color: rgb(240, 242, 245);
  /* overflow: scroll; */
}

.card {
  width: 98%;
  margin-top: 10px;
  margin-bottom: 10px
}

.card-header {
  display: flex;
  justify-content: start;
  align-items: center;
}

.card-header-title {
  width: 200px;
  font-size: 18px;
  font-weight: bold;
  min-width: 10%;
}

.card-button {
  color: rgb(63, 131, 238);
  font-size: 12px
}
</style>