<template>
  <div class="viewer-host">
    <div v-show="designerVisible" ref="designerRef" style="height: 100%;"></div>
    <div v-show="!designerVisible" ref="viewRef" style="height: 100%;"></div>
  </div>
</template>
<script setup lang='ts'>
import { Viewer as ReportViewer } from "@grapecity/activereports/reportviewer";
import { Designer as ReportDesigner } from "@grapecity/activereports/reportdesigner";
import { exportDocument } from "@grapecity/activereports/pdfexport"
import { PageReport } from "@grapecity/activereports/core";
import { onMounted, onUnmounted, ref } from "vue";
import * as ArDesignerNs from "@grapecity/activereports/reportdesigner";
import useServiceStore from "@/store/modules/service";
import { notifyError, notifySuccess } from "@/utils";
import { FontStore } from "@grapecity/activereports/core";
import { BASE_URL } from "@/service/request/config";



const props = defineProps<{
  name?: string
}>()

const viewRef = ref(null)
const designerRef = ref(null)
const designerVisible = ref(true);
const viewer = ref<ReportViewer | null>(null)
const designer = ref<ReportDesigner | null>(null)
const service = useServiceStore();

const token = localStorage.getItem("token")
const dataSource = {
  Name: "Northwind",
  ConnectionProperties: {
    DataProvider: "JSON",
    ConnectString: `endpoint=${BASE_URL}/mat/query-single/528808089174085;Header$Authorization=Bearer ${token ?? ""}`,
  },
};

function onRender(report: ArDesignerNs.ReportDefinition, _?: any): Promise<void> {
  designerVisible.value = false
  viewer.value?.open(report.definition).then(() => {
    setTimeout(() => {
      document.querySelector(".arjs-textBoxItem")?.remove()
    }, 500)
  });

  return Promise.resolve();
}
async function onSave(info: ArDesignerNs.ReportDefinition) {
  // if (!props.name) return
  const data = {
    id: props.name ?? '123',
    displayName: props.name,
  };
  const pageReport = new PageReport();
  await pageReport.load(info.definition)
  const pageDocument = await pageReport.run()
  const result = await exportDocument(pageDocument, {
    info: {
      title: props.name,
      author: "Nmc Soft",
    },

    pdfVersion: "1.7",
    renderOptions: {
      galleyMode: true,
      interactivityActions: []
    }
  });

  let formData2 = new FormData();


  formData2.append('formFile', result.data, `${props.name}.pdf`);
  const res2 = await service.uploadDataDesign(formData2)
  if (!res2.Success) {
    notifyError(res2.Message)
    return Promise.reject(res2.Message)
  }

  let formData = new FormData();

  const blob = new Blob([JSON.stringify(info.definition)], { type: 'application/json' });

  formData.append('formFile', blob, `${props.name}.json`);
  const res = await service.uploadDataDesign(formData)
  if (!res.Success) {
    notifyError(res.Message)
    return Promise.reject(res.Message)
  }
  notifySuccess("保存成功")
  return Promise.resolve(data);
}
async function onSaveAs(info: ArDesignerNs.ReportDefinition) {
  // if (!props.name) return
  const data = {
    id: props.name ?? '123',
    displayName: props.name,
  };

  const pageReport = new PageReport();
  await pageReport.load(info.definition)
  const pageDocument = await pageReport.run()
  const result = await exportDocument(pageDocument, {
    info: {
      title: props.name,
      author: "Nmc Soft",
    },

    pdfVersion: "1.7",
    renderOptions: {
      galleyMode: true,
      interactivityActions: []
    }
  });

  let formData2 = new FormData();
  formData2.append('formFile', result.data, `${props.name}.pdf`);
  const res2 = await service.uploadDataDesign(formData2)
  if (!res2.Success) {
    notifyError(res2.Message)
    return Promise.reject(res2.Message)
  }
  let formData = new FormData();

  const blob = new Blob([JSON.stringify(info.definition)], { type: 'application/json' });

  formData.append('formFile', blob, `${props.name}.json`);
  const res = await service.uploadDataDesign(formData)
  if (!res.Success) {
    notifyError(res.Message)
    return Promise.reject(res.Message)
  }
  notifySuccess("保存成功")
  return Promise.resolve(data);
}

onMounted(async () => {

  await FontStore.registerFonts("/Workflow/fonts/fontsConfig.json")

  const d = new ReportDesigner(designerRef.value!, {
    language: "zh", fontSet: "registered",
  });
  d.setActionHandlers({
    onRender,
    onSave,
    onSaveAs
    // onOpen,
  })

  d.setDataSourceTemplates([
    {
      id: "Northwind",
      title: "Northwind",
      template: dataSource,
      canEdit: true,
      shouldEdit: true,
    },
  ]);
  designer.value = d
  setTimeout(() => {
    document.querySelector(".gc-app-window-button")?.remove()
    document.querySelector(".eval-text")?.remove()
    // document.querySelector(".wd-menu-logo")?.remove()
  })

  const v = new ReportViewer(viewRef.value!, { language: "zh" });

  const designButton = {
    key: "$openDesigner",
    text: "编辑报表",
    iconCssClass: "my-custom-pen-icon",
    enabled: true,
    action: () => {
      designerVisible.value = true
    },
  };
  v?.toolbar.addItem(designButton);
  v?.toolbar.updateLayout({
    default: [
      "$openDesigner",
      "$split",
      "$navigation",
      "$split",
      "$refresh",
      "$split",
      "$history",
      "$split",
      "$zoom",
      "$fullscreen",
      "$split",
      "$print",
      "$split",
      "$singlepagemode",
      "$continuousmode",
      "$galleymode",
    ],
  });
  v.viewMode = "Continuous";
  v.renderMode = "Galley"; //设置画廊模式

  viewer.value = v
  if (props.name) {
    const res = await service.getDataDesign(props.name)


    if (res?.Message) {
      return
    }
    if (res?.DataSources) {
      const token = localStorage.getItem("token")
      const t2 = res?.DataSources[0]?.ConnectionProperties?.ConnectString.split("Bearer ")[1]
      res.DataSources[0].ConnectionProperties.ConnectString = res?.DataSources[0]?.ConnectionProperties?.ConnectString?.replace(t2, token)
    }
    const report = {
      id: props.name,
      displayName: props.name,
      definition: res,
    }
    d.setReport(report)
  }

})
onUnmounted(() => {
  viewer.value?.dispose()
})
</script>

<style scoped>
.viewer-host {
  width: 100%;
  height: 100vh;
}
</style>