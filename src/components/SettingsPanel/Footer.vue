<template>
  <div class="settings-footer">
    <Space>
      <Button @click="onCancel">
        取消
      </Button>
      <Button type="primary" @click="onConfirm">
        确认
      </Button>
    </Space>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { Button, Space } from 'ant-design-vue';

const props = defineProps<{
  onConfirm: () => void,
  onCancel: () => void
}>()

const { onConfirm, onCancel } = props


</script>

<style scoped>
.settings-footer {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  height: 48px;
}
</style>