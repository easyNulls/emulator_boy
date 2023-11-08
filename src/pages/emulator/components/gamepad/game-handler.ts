
export const __BUTTON_LABELS: { [key: number]: string } = {
    0: 'BUTTON_1',               // 按钮1
    1: 'BUTTON_2',               // 按钮2
    2: 'BUTTON_3',               // 按钮3
    3: 'BUTTON_4',               // 按钮4
    4: 'LEFT_TOP_SHOULDER',      // 左上肩键
    5: 'RIGHT_TOP_SHOULDER',     // 右上肩键
    6: 'LEFT_BOTTOM_SHOULDER',   // 左下肩键
    7: 'RIGHT_BOTTOM_SHOULDER',  // 右下肩键
    8: 'SELECT',                 // 选择按钮
    9: 'START',                  // 启动按钮
    10: 'LEFT_STICK',            // 左摇杆按钮
    11: 'RIGHT_STICK',           // 右摇杆按钮
    12: 'DPAD_UP',               // 十字键上
    13: 'DPAD_DOWN',             // 十字键下
    14: 'DPAD_LEFT',             // 十字键左
    15: 'DPAD_RIGHT',            // 十字键右
}

// __AXIS_KEYS 是一个数组，包含了游戏手柄轴的标签
// 这些标签分别代表左摇杆的X轴、左摇杆的Y轴、右摇杆的X轴和右摇杆的Y轴
// 这些轴值的范围通常是 -1.0 到 1.0 之间，其中 0.0 表示轴处于中立位置，-1.0 表示沿某个方向最大程度的负移动，1.0 表示最大程度的正移动。
export const __AXIS_KEYS = ['LEFT_STICK_X', 'LEFT_STICK_Y', 'RIGHT_STICK_X', 'RIGHT_STICK_Y', 'LEFT_TRIGGER', 'RIGHT_TRIGGER']


export const getAxisLabel = (axisName: string, value: number): string | null => {
    let valueLabel
    if (value > 0.5 || value < -0.5) valueLabel = value > 0 ? '+1' : '-1'

    if (!axisName || !valueLabel) return null
    return `${axisName}:${valueLabel}`
}

export const getButtonLabel = (index: number) => {
    // if (index === null || index === undefined)
    //     return null
    if (__BUTTON_LABELS[index])
        return `GAMEPAD_${index}`

    return __BUTTON_LABELS[index]
}

// // GamepadHandler 类，用于处理游戏手柄输入
// class GamepadHandler {
//     private gamepads: Gamepad[] // 存储已连接的游戏手柄
//     private timeout: number | NodeJS.Timeout | null// 更新循环的计时器
//     private listeners: { [eventName: string]: Function } // 事件监听器

//     // 按钮名称的映射
//     private readonly buttonLabels: { [key: number]: string } = {
//         0: 'BUTTON_1',
//         1: 'BUTTON_2',
//         2: 'BUTTON_3',
//         3: 'BUTTON_4',
//         4: 'LEFT_TOP_SHOULDER',
//         5: 'RIGHT_TOP_SHOULDER',
//         6: 'LEFT_BOTTOM_SHOULDER',
//         7: 'RIGHT_BOTTOM_SHOULDER',
//         8: 'SELECT',
//         9: 'START',
//         10: 'LEFT_STICK',
//         11: 'RIGHT_STICK',
//         12: 'DPAD_UP',
//         13: 'DPAD_DOWN',
//         14: 'DPAD_LEFT',
//         15: 'DPAD_RIGHT',
//     }

//     constructor() {
//         this.gamepads = []
//         this.listeners = {}
//         this.timeout = null
//         this.loop() // 启动游戏手柄状态更新循环
//     }

//     // 停止循环
//     terminate = () => this.timeout && window.clearTimeout(this.timeout)

//     // 获取游戏手柄列表
//     private getGamepads = () => (navigator.getGamepads ? navigator.getGamepads() :
//         ((navigator as any).webkitGetGamepads ? (navigator as any).webkitGetGamepads() : [])) as Array<Gamepad>

//     // 游戏手柄状态更新循环
//     private loop() {
//         this.updateGamepadState()
//         this.timeout = window.setTimeout(() => this.loop(), 10)
//     }

//     // 更新游戏手柄状态
//     private updateGamepadState() {
//         const gamepads = this.getGamepads()
//         if (!gamepads) return

//         // 校正游戏手柄数据，确保是数组
//         // if (!Array.isArray(gamepads) && gamepads.length) {
//         //     const gp = []
//         //     for (let i = 0; i < gamepads.length; i++) {
//         //         gp.push(gamepads[i])
//         //     }
//         //     gamepads = gp
//         // } else if (!Array.isArray(gamepads)) return

//         gamepads.forEach((gamepad, index) => {
//             if (!gamepad) return
//             let hasGamepad = false
//             this.gamepads.forEach((oldGamepad, oldIndex) => {
//                 if (oldGamepad.index !== gamepad.index) return
//                 const gamepadToSave = {
//                     ...oldGamepad, // 复制原有属性
//                     buttons: [],
//                     axes: [],
//                 }
//                 hasGamepad = true

//                 gamepad.axes.forEach((axisValue, axisIndex) => {
//                     const axisName = ['LEFT_STICK_X', 'LEFT_STICK_Y', 'RIGHT_STICK_X', 'RIGHT_STICK_Y'][axisIndex]
//                     const oldAxisValue = oldGamepad.axes[axisIndex]
//                     if (axisName && Math.abs(axisValue) > 0.01 && axisValue !== oldAxisValue) {
//                         this.dispatchEvent('axischanged', {
//                             axis: axisName,
//                             value: axisValue,
//                             index: gamepad.index,
//                             label: this.getAxisLabel(axisName, axisValue),
//                             gamepadIndex: gamepad.index,
//                         })
//                     }
//                     gamepadToSave.axes[axisIndex] = axisValue
//                 })

//                 gamepad.buttons.forEach((button, buttonIndex) => {
//                     const oldButton = oldGamepad.buttons[buttonIndex]
//                     const pressed = button.pressed || (typeof button === 'object' && button.pressed)
//                     const oldPressed = oldButton.pressed || (typeof oldButton === 'object' && oldButton.pressed)

//                     gamepadToSave.buttons[buttonIndex] = { pressed }

//                     if (pressed !== oldPressed) {
//                         if (pressed) {
//                             this.dispatchEvent('buttondown', { index: buttonIndex, label: this.getButtonLabel(buttonIndex), gamepadIndex: gamepad.index })
//                         } else {
//                             this.dispatchEvent('buttonup', { index: buttonIndex, label: this.getButtonLabel(buttonIndex), gamepadIndex: gamepad.index })
//                         }
//                     }
//                 })

//                 this.gamepads[oldIndex] = gamepadToSave
//             })
//             if (!hasGamepad) {
//                 this.gamepads.push(gamepad)
//                 this.dispatchEvent('connected', { gamepadIndex: gamepad.index })
//             }
//         })

//         for (let j = 0; j < this.gamepads.length; j++) {
//             if (!this.gamepads[j]) continue
//             let has = false
//             for (let i = 0; i < gamepads.length; i++) {
//                 if (!gamepads[i]) continue
//                 if (this.gamepads[j].index === gamepads[i].index) {
//                     has = true
//                     break
//                 }
//             }
//             if (!has) {
//                 this.dispatchEvent('disconnected', { gamepadIndex: this.gamepads[j].index })
//                 this.gamepads.splice(j, 1)
//                 j--
//             }
//         }
//     }

//     // 触发事件
//     private dispatchEvent(name: string, arg?: any) {
//         if (typeof this.listeners[name] !== 'function') return
//         if (!arg) arg = {}
//         arg.type = name
//         this.listeners[name](arg)
//     }

//     // 添加事件监听器
//     on(name: string, cb: Function) {
//         this.listeners[name.toLowerCase()] = cb
//     }

//     // 获取按钮名称
//     private getButtonLabel(index: number | null | undefined) {
//         if (index === null || index === undefined) {
//             return null
//         }
//         if (this.buttonLabels[index] === undefined) {
//             return `GAMEPAD_${index}`
//         }
//         return this.buttonLabels[index]
//     }

//     // // 获取轴的标签
//     // private getAxisLabel(axis: string, value: number) {
//     //     let valueLabel = null
//     //     if (Math.abs(value) > 0.5) {
//     //         valueLabel = value > 0 ? '+1' : '-1'
//     //     }
//     //     if (!axis || !valueLabel) {
//     //         return null
//     //     }
//     //     return `${axis}:${valueLabel}`
//     // }


// }



// (window as any).GamepadHandler = GamepadHandler
