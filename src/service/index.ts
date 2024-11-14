import { notifyError } from '@/utils';
import Request from './request'
import {BASE_URL, TIME_OUT} from "./request/config"

import {AxiosRequestConfig, AxiosResponse,} from 'axios';


// 初始化实例
const request = new Request({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    headers: {
        "Content-Type": "application/json",
    },
    interceptors: {
        requestSuccessHook: (config: AxiosRequestConfig): any => {
            const token = localStorage.getItem("token")
            if (token) {
                config.headers = {
                    Authorization: `Bearer ${token?.toString()}`,
                }
            }
            return config
        },
        requestErrorHook: (err: any): any => {
            console.log('请求失败')
            return err
        },
        responseSuccessHook: (res: AxiosResponse): any => {
            if (res.headers['access-token']) {
                localStorage.setItem("token", res.headers['access-token'])
            }
            console.log('响应成功')
            return res
        },
        responseErrorHook: (err: any): any => {
            notifyError('网络异常',0);
            console.log('响应失败')
            return err
        },
    },
})
export {
    request
}