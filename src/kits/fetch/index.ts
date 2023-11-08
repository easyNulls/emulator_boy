import axios from 'axios'
import { ResponseLoginterceptor } from './response-log-interceptor'
import { CookieRequestInterceptor } from './with-cookie-interceptor'

// https://axios-http.com/zh/
export const AxiosInstance = axios.create({
    headers: {
    }
})
AxiosInstance.defaults.headers.post.Accept = 'application/json;charset=utf-8'
AxiosInstance.defaults.headers.common['Content-Type'] = 'application/json;charset=utf-8'
AxiosInstance.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
AxiosInstance.defaults.headers.common['Access-Control-Allow-Credentials'] = 'true'
AxiosInstance.defaults.headers.common.credentials = 'include'
// AxiosInstance.defaults.withCredentials = true
AxiosInstance.interceptors.request.use(...CookieRequestInterceptor)

if (__DEV__) AxiosInstance.interceptors.response.use(...ResponseLoginterceptor)


export default AxiosInstance