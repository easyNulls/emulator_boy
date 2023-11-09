// export const debounce = <F extends (...args: any[]) => any>(callback: F, waitFor: number) => {
//     let timeout: ReturnType<typeof setTimeout> | null = null

//     const debounced = (...args: Parameters<F>) => {
//         if (null !== timeout) {
//             clearTimeout(timeout)
//             timeout = null
//         }
//         timeout = setTimeout(() => callback(...args), waitFor)
//     }

//     return debounced as (...args: Parameters<F>) => ReturnType<F>
// }

/**
    * 防抖用于确保一个函数在指定时间内只触发一次。它在短时间内屡次触发同一个事件时，会勾销之前的触发，直到最初一次触发后的肯定工夫距离内没有新的触发才执行函数。
    *
    *   常见的利用场景包含：
    *
    * 输入框实时搜寻：当用户在输入框中输出时，能够应用防抖技术提早执行搜寻查问，缩小不必要的查问和服务器压力。
    * 窗口大小调整：当用户调整浏览器窗口大小时，能够应用防抖技术防止在调整过程中频繁地从新计算布局。
    * 表单验证：当用户在表单输出时，能够应用防抖技术在用户进行输出一段时间后再执行验证，缩小验证的次数。
    * @description 防抖函数
    * @param {Function} fn
    * @param {number} delay
    * @param {boolean} immediate
    * @returns {Function}
 */
export function debounce<T extends (...args: any[]) => any>(
    fn: T,
    delay: number,
    immediate: boolean = false
): T & { cancel(): void } {
    let timerId: ReturnType<typeof setTimeout> | null = null
    // 定义一个cancel办法,用于勾销防抖
    const cancel = (): void => {
        if (timerId) {
            clearTimeout(timerId)
            timerId = null
        }
    }
    const debounced = (context: ThisParameterType<T>, ...args: Parameters<T>): void => {
        // const context = context
        if (timerId) cancel()
        if (immediate) {
            // 如果 immediate 为 true 并且没有正在期待执行的定时器，立刻执行指标函数
            if (!timerId) fn.apply(context, args)
            // 设置定时器，在延迟时间后将 timeoutId 设为 null
            timerId = setTimeout(() => {
                timerId = null
            }, delay)
        } else {
            // 设置定时器，在延迟时间后执行指标函数
            timerId = setTimeout(() => {
                fn.apply(context, args)
            }, delay)
        }
    }
    // 将 cancel 办法附加到 debounced 函数上
    (debounced as any).cancel = cancel
    return debounced as T & { cancel(): void }
}


/**
 * 节流函数
 * @param func 要进行节流的指标函数
 * @param delay 节流的工夫距离（毫秒）
 * @returns 返回一个通过节流解决的函数
 */
export function throttle<T extends (...args: any[]) => ReturnType<T> | void>(fn: T, delay: number): (...args: Parameters<T>) => ReturnType<T> | void {
    let lastCall: number | null = null // 上一次调用的时间戳
    let result: ReturnType<T> | void // 用于存储函数执行的结果

    return (...args: Parameters<T>) => {
        const now = Date.now() // 当前时间戳
        // 如果之前没有调用过,或者时间间隔超过了设定的值,执行指定函数
        if (!lastCall || now - lastCall >= delay) {
            lastCall = now
            result = fn(null, args)
        }
        return result
    }
}