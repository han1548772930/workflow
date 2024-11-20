import { IMaterialUIs } from "../interfaces/material.ts";
import { IWorkFlowNode, NodeType } from "../interfaces";
import ApproverSetters from "@/components/Setters/ApproverSetters.vue";
import AuditSetters from "@/components/Setters/AuditSetters.vue";
import ConditionSetters from "@/components/Setters/ConditionSetters.vue";
import NotifierSetters from "@/components/Setters/NotifierSetters.vue";
import { DefineComponent } from "vue";

export const materialUis: IMaterialUIs = {
    //审批人物料UI
    [NodeType.approver]: {
        //属性面板
        defaultConfig: {
            secondary: true,
            content: "请选择审批人"
        },
        settersPanel: ApproverSetters as DefineComponent,
        handleConfirm: undefined,
        //校验，目前仅实现了空校验，其它校验过几天实现
        validate: (node: IWorkFlowNode) => {
            if (!node.nodeContent) {
                return "未选择审批人"
            }
            return false
        }
    },
    //办理人节点
    [NodeType.audit]: {
        defaultConfig: {
            secondary: true,
            content: "请选择办理人"
        },
        settersPanel: AuditSetters as DefineComponent,
        handleConfirm: undefined,
        //属性面板
        //校验函数
        validate: (node: IWorkFlowNode) => {
            if (!node.nodeContent) {
                return "未选择办理人"
            }
            return false
        }
    },
    //条件分支节点的分支子节点
    [NodeType.condition]: {
        //节点内容区
        //属性面板
        defaultConfig: {
            content: "请设置条件"
        },
        settersPanel: ConditionSetters as DefineComponent,
        handleConfirm: undefined,
        //校验函数
        validate: (node: IWorkFlowNode) => {
            if (!node.config) {
                return "未设置条件"
            }
            return false
        }
    },
    //通知人节点
    [NodeType.notifier]: {
        settersPanel: NotifierSetters as DefineComponent,
        defaultConfig: {
            content: "请选择通知人"
        },
        handleConfirm: undefined,
        validate: (node: IWorkFlowNode) => {
            if (!node.config) {
                return "未选择通知人"
            }
            return false
        }
    },
    //发起人节点
    [NodeType.start]: {

        defaultConfig: {
            content: "所有人"
        },
    },
}