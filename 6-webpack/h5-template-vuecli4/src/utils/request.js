import axios from 'axios';
import qs from 'qs';

// axios实例
const service = axios.create({
    baseURL: '/',
    withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000
});

const err = error => {
    if (error.response) {
        // TODO: 针对不同状态码响应 比如全局的错误提示
    }
    return Promise.reject(error);
};

// request拦截器
service.interceptors.request.use(config => {
    if (config.method === 'post') {
        // config.headers['X-Token'] = ''
        config.data = qs.stringify(config.data);
    }
    return config;
}, err);

// respone拦截器
service.interceptors.response.use(response => {
    const res = response.data
    if (res.status && res.status !== 200) {
        return Promise.reject(res || 'error')
    } else {
        return Promise.resolve(res)
    }
}, err);

const VueAxios = {
    vm: {},
    install(Vue, instance) {
        if (this.installed) {
            return;
        }
        this.installed = true;

        if (!instance) {
            console.error('you have to install axios');
            return;
        }

        Vue.axios = instance;

        // axios 挂载在vue原型上
        Object.defineProperties(Vue.prototype, {
            $http: {
                get() {
                    return instance;
                }
            }
        });
    }
}

export default {
    vm: {},
    install(Vue) {
        Vue.use(VueAxios, service);
    }
}
/*****************************
 * 用法说明:
 *      this.$http.get('/api1/service', {params: {uid: '11111'}})
 *                .then(res => console.log(res));
 * 
 *      this.$http.post('/api1/service', {uid: '1111'})
 *                .then(res => console.log(res));
 * 
 * 更多详见 https://github.com/axios/axios
 ****************************/