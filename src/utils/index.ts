import { NodeUsersDetail } from '@/service/types';
import { notification, message } from 'ant-design-vue';
import { TreeDataNode } from 'ant-design-vue/es/vc-tree-select/interface';
import { createUuid } from './create-uuid';
import { IWorkFlowNode, SelectRangeEnum } from '@/interfaces';

export function notifyError(msg: string, duration = 4.5) {
  notification.error({
    message: '错误',
    description: msg,
    type: 'error',
    duration
  });
}
export function notifySuccess(msg: string, duration = 4.5) {
  notification.success({
    message: '成功',
    description: msg,
    type: 'success',
    duration
  });
}
export function showLoading(msg: string = "加载中...") {
  const hide = message.loading(msg, 20);
  return hide;
}

function handleStatusColor(status: string) {
  switch (status) {
    case "审批中":
      return "blue";
    case "审批失败":
      return "red";
    case "审批通过":
      return "green";
  }
}
function getSelectRangeName(type: number) {
  switch (type) {
    case 1:
      return "所有人";
    case 2:
      return "指定人员";
    case 3:
      return "指定角色";
    case 4:
      return "发起人";
    case 5:
      return "制单人";
    case 6:
      return "上级主管";
  }
}



function capitalizeObjectKeys(obj: any, type: number) {
  const capitalizedObj: any = {};
  for (let key in obj) {
    const capitalizedKey = capitalizeFirstLetter(key, type);
    if (Array.isArray(obj[key])) {
      capitalizedObj[capitalizedKey] = obj[key].map((item: any) => {
        if (typeof item === 'object' && item !== null) {
          return capitalizeObjectKeys(item, type);
        } else {
          return item;
        }
      });
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      capitalizedObj[capitalizedKey] = capitalizeObjectKeys(obj[key], type);
    } else {
      const newId = createUuid()
      capitalizedObj[capitalizedKey] = obj[key];
      capitalizedObj['nodeType'] = handleRole(capitalizedObj['type'])
      capitalizedObj['id'] = newId
    }
  }
  return capitalizedObj;
}

function capitalizeFirstLetter(s: string, type: number) {
  const t = type === 1 ? s.charAt(0).toUpperCase() : s.charAt(0).toLowerCase();
  const tt = s.slice(1);
  return t + tt;
}

function handleRole(type: number) {
  if (type === 1) {
    return 'approver'
  } else if (type === 2) {
    return 'notifier'
  } else if (type === 3) {
    return 'audit'
  } else if (type === 4) {
    return 'route'
  } else if (type === 5) {
    return 'condition'
  }
}

function getExamineModeEnum(type: number) {
  switch (type) {
    case 1:
      return "依次审批";
    case 2:
      return "会签(须所有审批人同意)";
    case 3:
      return "或签(一名审批人同意或拒绝即可)";
  }
}
function transformArray(data: NodeUsersDetail[]) {
  const ref: TreeDataNode = {
    key: ''
  };
  data.forEach((item: NodeUsersDetail) => {
    ref[item.Sysid] = { key: item.Sysid.toString(), title: item.Name, children: [] };
  });

  data.forEach((item: NodeUsersDetail) => {
    if (item.ParentId !== 0 && ref[item.ParentId]) {
      ref[item.ParentId].children.push(ref[item.Sysid]);
    }
  });

  return Object.values(ref).filter((item: any) => data.find((d: any) => d.Sysid === parseInt(item.key))?.ParentId === 0);
}
function findEmptyNodeUsers(node: IWorkFlowNode, res: { name: string, selectRange: SelectRangeEnum }[] = []) {

  // 如果 NodeUsers 为空，将 Name 和 SelectRange 添加到结果数组
  if (node.nodeUsers && node.nodeUsers.length === 0 && node.selectRange && ![SelectRangeEnum.starter, SelectRangeEnum.supervisor, SelectRangeEnum.originator].includes(node.selectRange)) {
    res.push({ name: node.name ?? "", selectRange: node.selectRange });
  }

  // 如果存在 ChildNode，递归调用此函数
  if (node.childNode) {
    findEmptyNodeUsers(node.childNode, res);
  }

  return res;
}

export {
  handleStatusColor,
  getSelectRangeName,
  getExamineModeEnum,
  transformArray,
  capitalizeObjectKeys,
  findEmptyNodeUsers
}