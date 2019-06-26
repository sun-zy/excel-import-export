import axios from 'axios';
import Vue from 'vue';
//import router from '../../../router';
import { AxiosInstance } from "axios";
import { Options } from './interface';


let TIME_OUT_MAX = 30000;

const _instance: AxiosInstance = axios.create({
    timeout: TIME_OUT_MAX,
})

// request拦截器
_instance.interceptors.request.use(config => {
    return config;
}, (error) => {
    return Promise.reject(error);
});    

// response拦截器
_instance.interceptors.response.use(res => {
    return res;
}, (error) => {
    return Promise.reject(error);
});

// get、post/postFile请求
export default (url: string, method: string = 'post', _data:any,noticeTitle:string): Promise<any> => {
    let _opts: Options = { method, url }
	_data=_data || {};
	const _query: any = {}
    //通用数据的合并（token）
    if(method.toLocaleUpperCase() !== 'POSTFILE'){
	    for (let _key in _data) {
	        if (_data.hasOwnProperty(_key)) {
	            _query[_key] = _data[_key]
	        }
	    }
    }
    
	//  console.log(_query,978)
    //判断请求类型
    if (method.toLocaleUpperCase() === 'POST') {
        _opts.data = _query
    } else if(method.toLocaleUpperCase() === 'POSTFILE'){
    		 _opts.method = 'post'
    		 _opts.data = _data
    }else{
        _opts.params = _query
    }

    return new Promise((resolve: (data: any) => void, reject: (data: any) => void) => {
        //axios实例发送当前请求
        //请求完成：1、取消当前请求的定时器；2、在当前请求标识队列中移除当前标识；
        // 3、成功的话返回统一处理后的数据，失败则对状态码进行判断
        _instance.request(_opts).then((res: any) => {
            // 通知开启
            if(res.data.code != 0) {
                // 通知关闭
            }
            resolve(res.data)
        }).catch((res: any) => {
            // 通知关闭
            reject(res)
        })
    })
}