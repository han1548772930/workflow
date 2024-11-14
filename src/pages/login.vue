<script setup lang="ts">
import useServiceStore from '@/store/modules/service';
import { Form, FormItem, Input, Button, InputPassword } from 'ant-design-vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { notifyError } from '@/utils';
interface FormState {
  username: string;
  password: string;
}
const service = useServiceStore();
const router = useRouter()
const formState = reactive<FormState>({
  username: '',
  password: '',
});
const onFinish = async (values: any) => {
  const res = await service.login(values.username, values.password);
  if (!res.Success) {
    notifyError(res.Message);
    return;
  }
  router.replace('/Workflow');
};

const onFinishFailed = (_: any) => {

};
</script>

<template>
  <div class="container">
    <Form :model="formState" name="basic" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
      @finish="onFinish" @finishFailed="onFinishFailed">
      <FormItem label="账号" name="username" :rules="[{ required: true, message: 'Please input your username!' }]">
        <Input v-model:value="formState.username" />
      </FormItem>

      <FormItem label="密码" name="password" :rules="[{ required: true, message: 'Please input your password!' }]">
        <InputPassword v-model:value="formState.password" />
      </FormItem>
      <FormItem :wrapper-col="{ offset: 8, span: 16 }">
        <Button type="primary" html-type="submit">登录</Button>
      </FormItem>
    </Form>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>