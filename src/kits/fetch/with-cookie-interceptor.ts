import { CookieJar } from 'tough-cookie'
import { type AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { AxiosRequestInterceptor, type AxiosInterceptor } from './types'

const cookieJar = new CookieJar()

export const CookieRequestInterceptor: AxiosRequestInterceptor = [
	(config: InternalAxiosRequestConfig<any>): Promise<InternalAxiosRequestConfig<any>> | InternalAxiosRequestConfig<any> => {
		const { url } = config
		if (url) {
			const cookiesString = cookieJar.getCookieStringSync(url, { allPaths: true })
			// Logger.debug(cookiesString)
			if (cookiesString && cookiesString.length > 0) config.headers.cookie = cookiesString
		}

		return config
	},
	(error: AxiosError | any): AxiosError | any => console.error(error),
	{}
]

export const CookieResponseInterceptor: AxiosInterceptor<AxiosResponse<any>> = [
	(response: AxiosResponse<any>) => {
		const { url } = response?.config ?? {}
		const cookies = response?.headers['set-cookie'] ?? []
		if (url && cookies instanceof Array) cookies.forEach(cookie => cookieJar.setCookieSync(cookie, url))
		return response
	},
	(error: AxiosError | any): AxiosError | any => console.error(error)
]
