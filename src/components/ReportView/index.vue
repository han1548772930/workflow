<template>
  <div v-if="data" ref="viewRef" style="height: 100%;"></div>
  <div v-else>未配置审批流数据展示模板，请到审批流模板设置中配置</div>
</template>
<script setup lang='ts'>
import { Viewer as ReportViewer } from "@grapecity/activereports/reportviewer";
import { onMounted, onUnmounted, ref } from "vue";

const props = defineProps<{
  data: any
}>()
const viewRef = ref(null)
const viewer = ref<ReportViewer | null>(null)

onMounted(() => {
  if (props.data) {
  
    const v = new ReportViewer(viewRef.value!, { language: "zh" });
    viewer.value = v
    v.toggleToolbar(false)
    v.toggleSidebar(false)
    v.viewMode = "Continuous"
    v.renderMode = 'Galley'
    if (props.data) {
      v.open(props.data).then(() => {
        setTimeout(() => {
          document.querySelector(".arjs-textBoxItem")?.remove()
        }, 500)
      })
    }
  }
})
onUnmounted(() => {
  viewRef.value = null
  viewer.value?.dispose()
})
</script>

<style scoped></style>