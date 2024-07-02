<template>
  <div class="end-node">
    <div class="end-node-circle"></div>
    <div class="end-node-text">{{ "流程结束" }}</div>
  </div>
</template>

<script setup lang="ts">


</script>

<style scoped>
.end-node {
  width: 100%;
  font-size: 14px;

  text-align: left;
  user-select: none;
  margin-bottom: 56px;
}

.end-node-circle {
  width: 10px;
  height: 10px;
  margin: auto;
  border-radius: 50%;
  background-color: #cacaca;
}

.end-node-text {
  margin-top: 5px;
  text-align: center;
}
</style>