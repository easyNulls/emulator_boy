
const windowIsAvailable = () => typeof window !== 'undefined'

const _safe_document = (windowIsAvailable() && (window as (Record<string, any>)).document) || {}

const API_Methods = {
    fullscreenEnabled: 0,       // 是否支持全屏设置
    fullscreenElement: 1,       // 获取当前全屏element
    requestFullscreen: 2,       // 发起全屏
    exitFullscreen: 3,          // 退出全屏
    fullscreenchange: 4,        // 全屏事件回调函数
    fullscreenerror: 5,         // 全屏出错事件回调函数
    fullscreen: 6,              // 全屏模式样式
}

const webkit = [
    'webkitFullscreenEnabled',
    'webkitFullscreenElement',
    'webkitRequestFullscreen',
    'webkitExitFullscreen',
    'webkitfullscreenchange',
    'webkitfullscreenerror',
    '-webkit-full-screen',
]

const firefox = [
    'mozFullScreenEnabled',
    'mozFullScreenElement',
    'mozRequestFullScreen',
    'mozCancelFullScreen',
    'mozfullscreenchange',
    'mozfullscreenerror',
    '-moz-full-screen',
]

const ms = [
    'msFullscreenEnabled',
    'msFullscreenElement',
    'msRequestFullscreen',
    'msExitFullscreen',
    'MSFullscreenChange',
    'MSFullscreenError',
    '-ms-fullscreen',
]

const vendor =
    (Object.keys(API_Methods)[0] in _safe_document && Object.keys(API_Methods)) ||
    (webkit[0] in _safe_document && webkit) ||
    (firefox[0] in _safe_document && firefox) ||
    (ms[0] in _safe_document && ms) ||
    []



/**
 * 判断是否支持全屏设置
 * @returns  boolean
 */
export const fullScreenEnabled = () => Boolean(vendor[API_Methods.fullscreenEnabled])

/**
 * 发起html元素全屏请求
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Element/requestFullscreen
 * @param element target 需要全屏对象
 * @returns 
 */
export const requestFullScreen = (element: HTMLElement): Promise<void | null> =>
    (element[vendor[API_Methods.requestFullscreen] as keyof HTMLElement] as () => Promise<void | null>)()

/**
* 
* @see https://developer.mozilla.org/zh-CN/docs/Web/API/Document/exitFullscreen
* 
* Document.exitFullscreen() 方法用于让当前文档退出全屏模式（原文表述不准确，详见备注）。
* 调用这个方法会让文档回退到上一个调用Element.requestFullscreen()方法进入全屏模式之前的状态。
*/
export const exitFullScreen = (): (Promise<void | null>) => {
    const exitFullscreen = fullScreenElement() && _safe_document[vendor[API_Methods.exitFullscreen]]()
    return exitFullscreen as (Promise<void | null>)
}

/**
 * 
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/Document/fullscreenElement
 * 只读属性 Document.fullscreenElement 返回当前页面中以全屏模式呈现的 Element，如果当前页面未使用全屏模式，则返回 null。
 * 如果文档处于全屏模式（fullscreenElement 不为 null）return 全屏元素的 
 * @returns 
 */
export const fullScreenElement = () => _safe_document[vendor[API_Methods.fullscreenElement]] as HTMLElement | null | undefined


export const addFullScreenChange = (handler: (event: Event) => void) => {
    windowIsAvailable() && window?.addEventListener(vendor[API_Methods.fullscreenchange], handler)
}

export const removeFullScreenChange = (handler: (event: Event) => void) => {
    windowIsAvailable() && window?.removeEventListener(vendor[API_Methods.fullscreenchange], handler)
}


/**
 * @deprecated
 * 
 * 该函数使用请注意 标准的 Web API 接口参考,可能存在浏览器不兼容
 * @param handler 
 */
export const onFullScreenChange = (handler: ((event: Event) => void) | null) => {
    _safe_document[`on${vendor[API_Methods.fullscreenchange]}`] = handler
}


/**
 * 
 * 
 * 该函数使用请注意 标准的 Web API 接口参考,可能存在浏览器不兼容
 * @param handler 
 */
export const onFullScreenError = (handler: ((event: Event) => void) | null) => {
    _safe_document[`on${vendor[API_Methods.fullscreenerror]}`] = handler
}
