import { Category, FormState, NodeUsersDetail } from "@/service/types";
import { defineStore } from "pinia";
import { markRaw } from "vue";

const useFormStore = defineStore('form-store', {
  state: (): { form: FormState, category: Category[], users: NodeUsersDetail[], roles: NodeUsersDetail[], activeKey: string } => ({
    form: {
      type: '',
      name: "",
      enable: false,
      remark: "",
      // targetTable: "",
      isDefault: false,
      //AUDIT_SERVICE_NAMESPACE
      auditServiceName: "",
      //BILL_FORM_NAMESPCE
      billFormNamespace: "",
      //DATA_BROWSE_FILENAME
      dataBrowseFilename: "",
      sysid: 0,
    },
    category: [],
    users: markRaw([]),
    roles: markRaw([]),
    activeKey: ''
  })
});
export default useFormStore;