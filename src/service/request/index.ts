import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

interface Interceptors {
    requestSuccessHook?: any;
    requestErrorHook?: (error: any) => any;
    responseSuccessHook?: (response: AxiosResponse) => AxiosResponse;
    responseErrorHook?: (error: any) => any;
}

interface RequestConfig extends AxiosRequestConfig {
    interceptors?: Interceptors;
}

class Request {
    instance: AxiosInstance;
    interceptors?: Interceptors;

    constructor(config: RequestConfig) {
        this.instance = axios.create(config);
        this.interceptors = config.interceptors;

        this.instance.interceptors.request.use(
            this.interceptors?.requestSuccessHook,
            this.interceptors?.requestErrorHook,
        );
        this.instance.interceptors.response.use(
            this.interceptors?.responseSuccessHook,
            this.interceptors?.responseErrorHook,
        );
        // 全局拦截
        this.instance.interceptors.request.use(
            (config: any) => {
                return config;
            },
            (err: any) => {
                return err;
            },
        );
        this.instance.interceptors.response.use(
            (res: AxiosResponse) => {
                return res.data;
            },
            (err: any) => {
                return err;
            },
        );
    }

    // 处理
    request(config: RequestConfig): Promise<any> {
        return new Promise((resolve, reject) => {
            if (config.interceptors?.requestSuccessHook) {
                config = config.interceptors.requestSuccessHook(config);
            }

            this.instance
                .request(config)
                .then((res) => {
                    if (config.interceptors?.responseSuccessHook) {
                        res = config.interceptors?.responseSuccessHook(res);
                    }

                    resolve(res);
                })
                .catch((err) => {
                    reject(err);
                    return err;
                });
        });
    }

    get(config: RequestConfig): Promise<any> {
        return this.request({...config, method: 'get'});
    }

    post(config: RequestConfig): Promise<any> {
        return this.request({...config, method: 'post'});
    }

    put(config: RequestConfig): Promise<any> {
        return this.request({...config, method: 'put'});
    }

    delete(config: RequestConfig): Promise<any> {
        return this.request({...config, method: 'delete'});
    }

    patch(config: RequestConfig): Promise<any> {
        return this.request({...config, method: 'patch'});
    }
}

export default Request;