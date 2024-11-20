import { defineStore } from 'pinia'
import { IBranchNode, IRouteNode, ISnapshot, IWorkFlowNode, NodeType } from "../../interfaces";
import { IMaterialUIs, INodeMaterial } from "../../interfaces/material.ts";
import { defaultMaterials } from "../../FlowEditor/defaultMaterials.ts";
import { computed, markRaw } from "vue";
import { materialUis } from "../../FlowEditor/materialUis.ts";
import { createUuid } from "../../utils/create-uuid.ts";

interface INodeStore {
    node: IWorkFlowNode,
    materials: INodeMaterial[],
    materialUis: IMaterialUIs,
    undoList: ISnapshot[],
    redoList: ISnapshot[],
    validated: boolean,
    selectedNode?: string
}

const useNodeStore = defineStore('node', {
    state: (): INodeStore => {
        return {
            node: {
                id: "start",
                nodeType: NodeType.start,
            },
            materials: markRaw(defaultMaterials),
            materialUis: markRaw(materialUis),
            redoList: [],
            undoList: [],
            validated: false,
            selectedNode: undefined
        }
    },
    getters: {
        startNode: (state) => computed(() => state.node),

    },
    actions: {

        setSelectNode(nodeId: string) {
            this.selectedNode = nodeId
        },
        setStartNode(node: IWorkFlowNode) {
            this.node = node;
        },
        getMaterialByNodeType(nodeType: NodeType): INodeMaterial | undefined {
            return this.materials.find((material: { defaultConfig: { nodeType: NodeType; }; }) => material.defaultConfig?.nodeType === nodeType)
        },
        addNode(parentId: string, newNode: IWorkFlowNode) {
            this.backup();
            this.recursiveAdd(this.node, parentId, newNode);

        },
        addCondition(node: IRouteNode, condition: IBranchNode) {
            this.backup();
            node.conditionNodeList = [...node.conditionNodeList, condition];
        },
        transConditionOneStepToLeft(node: IRouteNode, index: number) {
            if (index > 0) {
                this.backup();
                const newConditions = [...node.conditionNodeList]
                newConditions[index] = newConditions.splice(index - 1, 1, newConditions[index])[0]
                node.conditionNodeList = newConditions
            }
        },
        transConditionOneStepToRight(node: IRouteNode, index: number) {
            const newConditions = [...node.conditionNodeList]
            if (index < newConditions.length - 1) {
                this.backup();
                newConditions[index] = newConditions.splice(index + 1, 1, newConditions[index])[0]
                node.conditionNodeList = newConditions
            }
        },
        cloneCondition(node: IRouteNode, condition: IBranchNode) {
            const newCondition = JSON.parse(JSON.stringify(condition))
            newCondition.id = createUuid()
            newCondition.name = `${condition.name} - 副本`
            const index = node.conditionNodeList.indexOf(condition)
            const newList = [...node.conditionNodeList]
            newList.splice(index + 1, 0, newCondition)
            node.conditionNodeList = newList
        },
        deleteNode(id: string) {
            this.backup();
            this.node = this.recursiveDelete(this.node, id)!;
        },
        deleteCondition(parentNode: IRouteNode, index: IBranchNode) {
            if (parentNode.conditionNodeList.length <= 2) {
                this.deleteNode(parentNode.id)
                return
            }
            this.backup();
            parentNode.conditionNodeList = parentNode.conditionNodeList.filter((item) => item.id !== index.id)
        },
        recursiveAdd(state: IWorkFlowNode, parentId: string, newNode: IWorkFlowNode) {
            // 检查当前节点是否是目标父节点
            if (state.id === parentId) {
                // 将新节点添加为当前节点的子节点
                if (!state.childNode) {
                    // 如果当前没有子节点，直接添加
                    state.childNode = newNode;
                } else {
                    // 如果已有子节点，将新节点插入为第一个子节点
                    newNode.childNode = state.childNode;
                    state.childNode = newNode;
                }
                return;
            }

            // 递归处理子节点
            if (state.childNode) {
                this.recursiveAdd(state.childNode, parentId, newNode);
            }
            const routeNode = state as IRouteNode
            // 如果当前节点是路由节点，还需要处理条件节点列表
            if (routeNode.nodeType === NodeType.route && routeNode.conditionNodeList) {
                routeNode.conditionNodeList.forEach(conditionNode => {
                    this.recursiveAdd(conditionNode, parentId, newNode);
                });
            }

        },
        recursiveDelete(node: IWorkFlowNode, id: string): IWorkFlowNode | undefined {
            if (node.id === id) {
                return node.childNode;
            }

            if (node.childNode) {
                node.childNode = this.recursiveDelete(node.childNode, id);
            }

            if (node.nodeType === NodeType.route) {
                const routeNode = node as IRouteNode;
                routeNode.conditionNodeList = routeNode.conditionNodeList
                    .map(conditionNode => this.recursiveDelete(conditionNode, id))
                    .filter(conditionNode => conditionNode !== null) as IBranchNode[];
            }

            return node;
        },
        undo() {

            if (this.undoList.length === 0) {
                console.error("No element in undo list");
                return;
            }

            const snapshot = this.undoList.pop();

            this.redoList.push(JSON.parse(JSON.stringify({
                startNode: this.node,
                validated: snapshot?.validated,
            })));

            if (snapshot) {
                this.node = snapshot.startNode;
            }
        },
        redo() {
            if (this.redoList.length === 0) {
                console.error("No element in redo list");
                return;
            }

            const snapshot = this.redoList.pop();

            this.undoList.push({
                startNode: this.node,
                validated: snapshot?.validated,
            });

            if (snapshot) {
                this.node = snapshot.startNode;
            }
        },
        backup() {
            this.undoList.push(JSON.parse(JSON.stringify({
                startNode: this.node,
                validated: this.validated,
            })));

            this.redoList = [];

        },
        getNode(nodeId: string, parentNode?: IWorkFlowNode): IWorkFlowNode | undefined {
            const startNode = parentNode || this.node
            if (startNode?.id === nodeId && nodeId) {
                return startNode
            }
            if (startNode?.childNode) {
                const foundNode = this.getNode(nodeId, startNode?.childNode)
                if (foundNode) {
                    return foundNode
                }
            }
            if (startNode?.nodeType === NodeType.route) {
                for (const conditionNode of (startNode as IRouteNode).conditionNodeList) {
                    const foundNode = this.getNode(nodeId, conditionNode)
                    if (foundNode) {
                        return foundNode
                    }
                }
            }
            return undefined
        }
    },
})

export default useNodeStore
