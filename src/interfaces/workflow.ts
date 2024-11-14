export enum NodeType {
    //开始节点
    start = "start",
    //审批人
    approver = "approver",
    //抄送人？
    notifier = "notifier",
    //处理人？
    audit = "audit",
    //路由(条件节点)，下面包含分支节点
    route = "route",
    //分支节点
    condition = "condition",
}
export interface IPosition {
    x: number,
    y: number,
    scrollLeft: number,
    scrollTop: number
}
export interface ISnapshot {
    //开始节点
    startNode: IWorkFlowNode,
    //是否校验过
    validated?: boolean,
}
export enum SelectRangeEnum {
    //所有人
    all = 1,
    //指定人员
    user = 2,
    //指定角色
    role = 3,
    //發起人
    starter = 4,
    //制单人
    originator = 5,
    //上级主管
    supervisor = 6,

}


export enum ExamineModeEnum {
    //1.依次审批 2.会签 3.或签
    //依次审批
    sequence = 1,
    //会签
    countersign = 2,
    //或签
    sign = 3,

}

export enum NodeUserTypeEnum {
    //指定人员
    user = 1,
    //指定角色
    role = 2,
    //發起人
    starter = 3,
}

//节点类型 0.发起人 1.审批 2.抄送 3.条件 4.路由 99.流程结束
export enum NodeTypeEnum {
    //发起人
    starter = 0,
    //审批
    approver = 1,
    //抄送
    notifier = 2,
    //条件
    condition = 3,
    //路由
    route = 4,
    //流程结束
    end = 99,
}

export interface NodeUsersList {
    targetId: number
    type: number
}

//审批流节点
export interface IWorkFlowNode<Config = unknown> {

    id: string
    //名称
    name?: string
    //string可以用于自定义节点，暂时用不上
    nodeType: NodeType
    //描述
    desc?: string
    type?: NodeTypeEnum
    //子节点
    childNode?: IWorkFlowNode
    selectRange?: SelectRangeEnum
    nodeUsers?: NodeUsersList[]
    examineMode?: ExamineModeEnum
    remark?: string
    //配置
    config?: Config,
    nodeContent?: string
    autoPass?: number
}


//条件根节点，下面包含各分支节点
export interface IRouteNode extends IWorkFlowNode {
    //分支节点
    conditionNodeList: IBranchNode[]
}

//条件分支的子节点，分支节点
export interface IBranchNode extends IWorkFlowNode {
    //条件表达式，后端就是这样的名字，保留了
    //后面考虑通过泛型放入config，视条件复杂度决定
    //flowNodeConditionVOList?: IExpression[]
}

//审批流，代表一张审批流图
export interface IWorkflow {
    //审批流Id
    flowId: string;
    //审批流名称
    name?: string;
    //开始节点
    startNode: IWorkFlowNode;
}