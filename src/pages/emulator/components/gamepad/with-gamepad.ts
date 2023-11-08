

const haveEvents = 'GamepadEvent' in window
const haveWebkitEvents = 'WebKitGamepadEvent' in window

// https://developer.mozilla.org/zh-CN/docs/Web/API/Gamepad_API
const windowIsAvailable = () => (typeof window !== 'undefined')


/**
 * 通常用于在浏览器中执行动画和其他需要持续性更新的操作。
 * 它的主要特点是与显示器的刷新率同步，通常是每秒 60 次，以确保动画和视觉效果的流畅性。
 */
export const rAF = window.requestAnimationFrame ||
    (window as Record<string, any>).webkitRequestAnimationFrame ||
    (window as Record<string, any>).mozRequestAnimationFrame

export const cAF = window.cancelAnimationFrame ||
    (window as Record<string, any>).webkitCancelAnimationFrame ||
    (window as Record<string, any>).mozCancelAnimationFrame

/**
 * 
 * Gamepad 对象
 * 对象 gamepad 中有包含了许多有用的信息，其中就包括按钮和坐标轴的状态等重要信息：
 *  id:             一个包含关于控制器信息的字符串。
 *  index:          一个为已连接的设备分配的唯一标识。
 *  connected:      一个布尔变量，true 表示设备已连接。
 *  mapping:        键位的布局类型；现在只有 standard 是唯一可用的值。
 *  axes:           每一个坐标轴的状态。表示为存储浮点值的数组。
 *  buttons:        每个按钮的状态，表示为一个 GamepadButton 对象，其包含 pressed 和 value 属性。
 *  
 *  通过navigator 获取连接成功的游戏手柄
 * 
 * @returns  游戏手柄对象集合
 */
export const getGamepads = () => navigator.getGamepads
    ? navigator.getGamepads()
    : ((navigator as any).webkitGetGamepads ? (navigator as any).webkitGetGamepads() : []) as Array<Gamepad>

export const vibration = navigator.vibrate || (navigator as any).mozVibrate || (navigator as any).webkitVibrate

// // 振动设备，参数为[振动时长（毫秒），停顿时长（毫秒）]，例如：震动 2 秒，停顿 1 秒
// vibration([2000, 1000])
// // 用摩斯密码振动“SOS”
// vibration([
//     100, 30, 100, 30, 100, 30, 200, 30, 200, 30, 200, 30, 100, 30, 100, 30, 100,
// ])

export const onConnected = (connecthandler: (event: Event) => void) => {
    if (!windowIsAvailable()) return
    if (haveEvents) {
        window.addEventListener('gamepadconnected', connecthandler)
    } else if (haveWebkitEvents) {
        window.addEventListener('webkitgamepadconnected', connecthandler)
    } else {
        //   setInterval(scangamepads, 500);
    }
}


/**
 * 
 * @param connecthandler 
 */
export const removeOnConnected = (connecthandler: (event: Event) => void) => {
    if (!windowIsAvailable()) return
    if (haveEvents) {
        window.removeEventListener('gamepadconnected', connecthandler)
    } else if (haveWebkitEvents) {
        window.removeEventListener('webkitgamepadconnected', connecthandler)
    } else {
        // clearInterval()
    }
}
export const onDisconnect = (disconnecthandler: (event: Event) => void) => {
    if (!windowIsAvailable()) return
    if (haveEvents) {
        window.addEventListener('gamepaddisconnected', disconnecthandler)
    } else if (haveWebkitEvents) {
        window.addEventListener('webkitgamepaddisconnected', disconnecthandler)
    } else {
        //   setInterval(scangamepads, 500);
    }
}


export const removeOnDisconnect = (disconnecthandler: (event: Event) => void) => {
    if (!windowIsAvailable()) return
    if (haveEvents) {
        window.removeEventListener('gamepaddisconnected', disconnecthandler)
    } else if (haveWebkitEvents) {
        window.removeEventListener('webkitgamepaddisconnected', disconnecthandler)
    } else {
        // clearInterval()
    }
}
