import { NodeType } from "../interfaces";
import { INodeMaterial } from "../interfaces/material";
import { createUuid } from "../utils/create-uuid";
import { dealIcon, notifierIcon, routeIcon, sealIcon } from "../components/icons";


export const defaultMaterials: INodeMaterial[] = [
    //发起人节点
    {
        //标题，引擎会通过国际化t函数翻译
        label: "发起人",
        //颜色
        color: "rgb(87, 106, 149)",
        //引擎会直接去defaultConfig来生成一个节点，会克隆一份defaultConfig数据保证immutable
        defaultConfig: {
            //默认配置，可以把类型上移一层，但是如果增加其它默认属性的话，不利于扩展
            nodeType: NodeType.start,
        },
        //不在物料板显示
        hidden: true,
    },
    //审批人节点
    {
        color: "#ff943e",
        label: "审核人",
        icon: sealIcon,
        defaultConfig: {
            nodeType: NodeType.approver,
        },
    },
    //通知人节点
    {
        color: "#4ca3fb",
        label: "notifier",
        icon: notifierIcon,
        defaultConfig: {
            nodeType: NodeType.notifier,
        },

    },
    {
        color: "#fb602d",
        label: "dealer",
        icon: dealIcon,
        defaultConfig: {
            nodeType: NodeType.audit,
        },

    },
    //条件节点
    {
        color: "#15bc83",
        label: "routeNode",

        icon: routeIcon,
        createDefault: () => {
            return {
                id: createUuid(),
                nodeType: NodeType.route,
                conditionNodeList: [
                    {
                        id: createUuid(),
                        nodeType: NodeType.condition,
                        name: "条件" + "1"
                    },
                    {
                        id: createUuid(),
                        nodeType: NodeType.condition,
                        name: "条件" + "2"
                    }
                ]
            }
        },

    },
    //分支节点
    {
        label: "condition",
        color: "",
        defaultConfig: {
            nodeType: NodeType.condition,
        },
        //不在物料板显示
        hidden: true,
    },
]