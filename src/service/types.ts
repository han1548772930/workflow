

export interface Category {
    Sysid: number;
    Name: string;
    Remark: string;
}

export interface TemplateItem {
    Sysid: number;
    Code: string;
    Name: string;
    Remark: string | null;
    TargetTable: string;
    IsEnable: number;
    CategoryId: number;
    Category: Category;
}
export interface NodeUsersDetail {
    Sysid: number;
    Code?: string;
    Name: string;
    Type: number;
    ParentId: number;
}

export interface Response<T> {
    Success: boolean;
    Code: number;
    Message: string;
    Data: T;
    Extras: null;
    Timestamp: number;
}


interface NodeUser {
    TargetId: number;
    Type: number;
}

interface Node {
    Name: string;
    Type: number;
    SelectRange: number;
    ExamineMode: number;
    Remark: string;
    ChildNode: null;
    NodeUsers: NodeUser[];
}
export interface FormState {
    type?: number | string;
    name?: string;
    enable?: boolean;
    remark?: string;
    // targetTable?: string;
    isDefault?: boolean;
    //AUDIT_SERVICE_NAMESPACE
    auditServiceName?: string;
    //BILL_FORM_NAMESPCE
    billFormNamespace?: string;
    //DATA_BROWSE_FILENAME
    dataBrowseFilename?: string;
    sysid?: number;
}
export interface TemplateData {
    Sysid: number;
    Code: string;
    Name: string;
    Remark: string;
    TargetTable: string;
    IsEnable: number;
    CategoryId: number;
    Category: null;
    Node: Node;
}


export interface TodoOrDoneData {
    Sysid: number;
    TemplateName: string;
    CategoryName: string;
    CreateDate: string;
    Status: string;
    BillCode: string;
    ActiveNodeName: string;
    Creator: string;
    IsDel: number;
    BillId: number;
}

export interface ApprovalOpHis {
    Content: string | null;
    NodeName: string;
    CreateDate: string | null;
    Remark: string | null;
    Activity: number;
}

export interface ApprovalNodeType {
    NodeId: number | null;
    NodeName: string;
    Seq: number;
    VerifyUsersName: string | null;
    Activity: number;
}
export interface MenuItem {
    Parentid: number;
    Seq: number | null;
    Code: string;
    Name: string;
    Type: string;
    Param: any;
    Remark: any;
    Imageindex: any;
    Sysid: number;
    Children?: any[];
}
export interface Template {
    Code: string;
    Name: string;
    TargetTable: null | string;
    CategoryId: number;
    IsEnable: number;
    IsDefault: number;
    AuditServiceName: string;
    BillFormNamespace: string;
    DataBrowseFilename: null | string;
    Category: Category;
    Node: Node;
    CreatorId: number;
    CreateDate: string;
    EditorId: number;
    EditTime: string;
    Remark: null | string;
    Sysid: number;
};

