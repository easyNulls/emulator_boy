import { type AxiosError, type AxiosResponse } from 'axios'
import { type AxiosInterceptor } from './types'


export const ResponseLoginterceptor: AxiosInterceptor<AxiosResponse<any>> = [
    (response: AxiosResponse<any>) => {
        console.log(`request url is ${response.config.url ?? ''}`)
        console.log(`request body is ${JSON.stringify(response.config.data ?? {})}`)
        console.log('response', response)
        return response
    },
    (error: AxiosError) => {
        if (error.request) {
            console.warn('======================================================')
            console.warn('[error] request is', error.request)
            console.warn('[error] response is', error.response)
            console.warn('======================================================')
        }
    }
]
