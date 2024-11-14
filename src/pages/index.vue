<template>
  <div class="container">
    <!-- <Menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys"
      style="min-width: 150px;width: 150px;max-width: 150px; height: 100%;" mode="inline" :items="items"
      @click="handleClick" :theme="'dark'"></Menu>
    <div class="content"> -->
    <RouterView></RouterView>
    <!-- </div> -->
    <FloatButtonGroup trigger="hover" shape="square" style="left: 20px;bottom: 70px;">
      <template #icon>
        <RightCircleTwoTone/>
      </template>
      <FloatButton v-for="b in floatButtonList" :key="b.key" shape="square" :description="b.description"
                   @click="handleClick(b.key)">
      </FloatButton>
    </FloatButtonGroup>
  </div>
</template>
<script setup lang='ts'>
// import { ref } from 'vue';
// import type { MenuProps } from 'ant-design-vue';
import {FloatButtonGroup, FloatButton} from 'ant-design-vue';
import {useRouter} from 'vue-router';
import {RightCircleTwoTone} from '@ant-design/icons-vue';
// const selectedKeys = ref<string[]>(['/Workflow']);
// const openKeys = ref<string[]>(['/Workflow']);
const router = useRouter();
const floatButtonList = [
  {
    description: '我的流程',
    key: '/Workflow',
  },
  {
    description: '已办',
    key: '/Workflow/approvalCenter/done',
  },
  {
    description: '登录',
    key: '/Workflow/login',
  },
  // {
  //   description: '报表',
  //   key: '/Workflow/report',
  // },
  {
    description: '待办',
    key: '/Workflow/approvalCenter/upcoming',
  },
  {
    description: '模板管理',
    key: '/Workflow/processManagement/template',
  },
]
const handleClick = (key: string) => {
  router.replace(key);
};

// const items = ref<MenuProps['items']>([
//   {
//     key: '/Workflow',
//     label: '我的流程',
//     title: '我的流程',
//   },
//   {
//     key: '/Workflow/approvalCenter',
//     label: '审批中心',
//     title: '审批中心',
//     children: [
//       {
//         label: '待办',
//         key: '/Workflow/approvalCenter/upcoming',
//       },
//       {
//         label: '已办',
//         key: '/Workflow/approvalCenter/done',
//       },
//     ]
//   },
//   {
//     key: '/Workflow/processManagement',
//     label: '流程管理',
//     title: '流程管理',
//     children: [
//       {
//         label: '模板管理',
//         key: '/Workflow/processManagement/template',
//       },
//     ]
//   },

// ]);

// const handleClick: MenuProps['onClick'] = e => {
//   router.push(e.key as string);
// };
</script>

<style scoped>
.container {
  width: 100%;
  /* height: 100vh; */
}

.content {
  flex: 1;
  height: 100%;
  /* width: 100%; */

}
</style>