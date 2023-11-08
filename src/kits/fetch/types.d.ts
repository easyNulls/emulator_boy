import { type AxiosRequestConfig, type AxiosResponse, type AxiosError, InternalAxiosRequestConfig, AxiosInterceptorOptions } from 'axios'

export type Onfulfilled<V> = (value: V) => AxiosResponse<V> | Promise<AxiosResponse<V>>
export type OnRejected = ((error: AxiosError | any) => AxiosError | any) | null
export type RequestOnfulfilled = ((config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig> | InternalAxiosRequestConfig) | null

export type AxiosInterceptor<V> = [Onfulfilled<V>, OnRejected]
export type AxiosRequestInterceptor = [RequestOnfulfilled, OnRejected, AxiosInterceptorOptions]

// interface BaseResponse<T> {
//     code?: string | number
//     data?: T
//     message?: string
// }
