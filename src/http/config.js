// 添加请求拦截器
import axios from "axios";
import {useTokenStore} from "@/stores/index.js";
import router from "@/router/index.js";

const tokenStore = useTokenStore()
const serve = new axios.create({
    timeout: 1000 * 30
})

serve.interceptors.request.use(function (config) {
    config.baseURL = "http://192.168.0.254:8080"
    if (tokenStore.token !== null && tokenStore.token !== undefined && tokenStore.token !== "") {
        config.headers.set("token", tokenStore.token);
    }
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
serve.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response;

}, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    const errorMessage = error.response.data.message
    alert(errorMessage)
    // token失效
    if (error.response.data.code === 40005) {

        router.push({
            name: "userLogin"
        }).then()
    }

    return error
});

export default serve