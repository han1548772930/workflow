import { createRouter, createWebHistory } from 'vue-router'


const routes = [
    {
        path: '/Workflow',
        component: () => import('../pages/myProcess/index.vue')
        // component: () => import('@/components/WorkflowEditor/index.vue')
    },
    {
        path: '/Workflow/login',
        component: () => import('@/pages/login.vue')

    },
    {
        path: '/Workflow/report',
        component: () => import('@/components/Report/index.vue')

    },
    {
        path: '/Workflow/basicInformation',
        name: 'basicInformation',
        component: () => import('@/components/BasicInformation/index.vue')

    },
    {
        path: '/Workflow/approvalCenter',
        redirect: '/Workflow/approvalCenter/upcoming',
        children: [
            {
                path: 'upcoming',
                component: () => import('../pages/approvalCenter/upcoming/index.vue')
            },
            {
                path: 'done',
                component: () => import('../pages/approvalCenter/done/index.vue')
            }
        ]
    },
    {
        path: '/Workflow/processManagement',
        redirect: '/Workflow/processManagement/template',
    
        children: [
            {
            
                path: 'template',
                component: () => import('../pages/processManagement/template/index.vue')
            },
        ]
    },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})