<template>
  <div class="priority">
    {{ '优先级' + (props.index + 1) }}
  </div>
</template>

<script setup lang="ts">


const props = defineProps<{
  index: number
}>();


</script>

<style scoped>
.priority {
  position: absolute;
  right: 0px;
  top: 0px;
  display: flex;
}
</style>