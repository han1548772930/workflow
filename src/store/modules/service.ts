import { defineStore } from "pinia";
import { request } from "@/service/index"
import CryptoJS from 'crypto-js';
import { ApprovalNodeType, ApprovalOpHis, Category, MenuItem, Response, TemplateItem, TodoOrDoneData, NodeUsersDetail, TemplateData, Template } from "@/service/types.ts";

const useServiceStore = defineStore('service-store', {
  actions: {
    async login(u: string, p: string) {
      const key = 'nmcsoft';
      const hash = CryptoJS.HmacSHA256(p, key);
      const pwd = CryptoJS.enc.Base64.stringify(hash);
      const res: Response<null> = await request.post({
        url: '/auth/login',
        data: {
          "Username": u,
          "Password": pwd
        }
      })

      return res;
    },
    async getMyBill() {
      const res: Response<TodoOrDoneData[]> = await request.get({
        url: '/workflow/instance/my-bill',
      })
      return res;
    },
    async getReportData(name: string) {
      const reportData = await request.post({ url: `/workflow/template/download-data-design/${name}.json` })
      return reportData;
    },
    async getOpHis(sysid: number) {
      const res: Response<ApprovalOpHis[]> = await request.get({ url: "/workflow/instance/get-op-his/" + sysid })
      return res;
    },
    async getNodes(sysid: number) {
      const nodes: Response<ApprovalNodeType[]> = await request.get({ url: "/workflow/instance/get-nodes/" + sysid })
      return nodes;
    },
    async getDone() {
      const nodes: Response<TodoOrDoneData[]> = await request.get({ url: "/workflow/instance/done" })
      return nodes;
    },
    async getTodo() {
      const nodes: Response<TodoOrDoneData[]> = await request.get({ url: "/workflow/instance/todo" })
      return nodes;
    },
    async getAllCategory() {
      const nodes: Response<Category[]> = await request.get({ url: "/workflow/category/get-all" })
      return nodes;
    },
    async getAllTemplate() {
      const nodes: Response<TemplateItem[]> = await request.get({ url: "/workflow/template/get-all" })
      return nodes;
    },
    async addCategory(name: string, remark: string) {
      const res: Response<Category> = await request.post({
        url: "/workflow/category/create",
        data: { "Name": name, "Remark": remark }
      })
      return res;
    },
    async updateCategory(name: string, remark: string, sysid: number) {
      const res: Response<Category> = await request.post({
        url: "/workflow/category/update",
        data: { "Name": name, "Remark": remark ?? "", "Sysid": sysid }
      })
      return res;
    },
    async deleteCategory(sysid: number) {
      const res: Response<null> = await request.post({
        url: `/workflow/category/delete/${sysid}`,
      })
      return res;
    },
    async verify(remark: string, sysid: number) {
      const res: Response<null> = await request.post({
        url: '/workflow/instance/verify', data: {
          "InstanceId": sysid,
          "EVerificationResult": 2,
          "Remark": remark
        }
      })
      return res;
    },
    async reject(remark: string, sysid: number) {
      const res: Response<null> = await request.post({
        url: '/workflow/instance/verify', data: {
          "InstanceId": sysid,
          "EVerificationResult": 3,
          "Remark": remark
        }
      })
      return res;
    },
    async getAllmenus() {
      const res: Response<MenuItem[]> = await request.get({
        url: '/workflow/category/get-menus',
      })
      return res;
    },
    async getSysRole() {
      const res: Response<NodeUsersDetail[]> = await request.get({
        url: '/workflow/sys-role/get-all',
      })
      return res;
    },
    async getSysUser() {
      const res: Response<NodeUsersDetail[]> = await request.get({
        url: '/workflow/sys-user/get-all',

      })
      return res;
    },
    async createTemplate(t: any) {
      const res: Response<TemplateData> = await request.post({ url: "/workflow/template/create", data: t });
      return res;
    },
    async updateTemplate(t: any) {
      const res: Response<TemplateData> = await request.post({ url: "/workflow/template/update", data: t });
      return res;
    },
    async deleteTemplate(sysid: number) {
      const res: Response<null> = await request.post({ url: "/workflow/template/delete/" + sysid });
      return res;
    },
    async getTemplate(sysid: number) {
      const res: Response<Template> = await request.get({ url: `/workflow/template/get/${sysid}` });
      return res;
    },
    async uploadDataDesign(data: FormData) {
      const res: Response<null> = await request.post({
        url: "/workflow/template/upload-data-design",
        data: data,
      })
      return res;
    },
    async getDataDesign(name: string) {
      const res: any = await request.post({
        url: `/workflow/template/download-data-design/${name}.json`,
      })
      return res;
    },
    async getDataDesignPdf(name: string) {
      const res: any = await request.post({
        url: `/workflow/template/download-data-design/${name}.pdf`,
      })
      return res;
    },
  }
});
export default useServiceStore;