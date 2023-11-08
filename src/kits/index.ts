import mitt from 'mitt'
import qs from 'qs'

export * from './fetch'
export * as Fullscreen from './full-screen'

export type orNullable<T> = null | undefined | T

export const Msg = mitt<{} & any>()

export const useQueryParams = <QueryParams extends { [K in keyof QueryParams]?: unknown } = {}>(url: string): QueryParams =>
    qs.parse(url, { ignoreQueryPrefix: true }) as QueryParams