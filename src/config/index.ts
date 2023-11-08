import DevConfig from './index.dev'
import ProdConfig from './index.prod'
import { IConfig } from './types'

const _Envs = [DevConfig, ProdConfig]
// const _LocalHost = ['127.0.0.1', 'localhost', '::1']

export const getDomainFromHost = (): IConfig => {
  const { hostname } = window.location
  // if (_LocalHost.includes(hostname)) return DevConfig
  const envs = _Envs.filter(({ name }) => hostname.includes(name))
  // if (devHostnames.includes(hostname)) {
  //   return DevConfig
  // } else {
  //   return ProdConfig
  // }
  return envs.length > 0 ? envs[0] : _Envs[0]
}

// export const config = getDomainFromHost(['127.0.0.1', 'localhost', '::1'])

export const config = getDomainFromHost()

console.log('config => ', config)
