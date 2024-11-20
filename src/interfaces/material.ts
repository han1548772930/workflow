import { IWorkFlowNode, NodeType } from "./workflow"
import { DefineComponent } from "vue";


//节点物料
export interface INodeMaterial {
    //颜色
    color: string
    //标题
    label: string
    //图标
    icon?: DefineComponent | undefined,
    //默认配置
    defaultConfig?: { nodeType: NodeType | string }
    //创建一个默认节点，跟defaultCofig只选一个
    createDefault?: () => IWorkFlowNode
    //从物料面板隐藏，比如发起人节点、条件分支内的分支节点
    hidden?: boolean
}

export interface defaultConfig {
    secondary?: boolean,
    content?: string
}

//物料UI配置
export interface IMaterialUI<FlowNode extends IWorkFlowNode> {
    //节点内容区
    defaultConfig?: defaultConfig,
    settersPanel?: DefineComponent,
    handleConfirm?: Function,
    //校验失败返回错误消息，成功返回ture
    validate?: (node: FlowNode) => string | false | undefined
}

//物料UI的一个map，用于组件间通过props传递物料UI，key是节点类型
export interface IMaterialUIs {
    [nodeType: string]: IMaterialUI<any> | undefined
}