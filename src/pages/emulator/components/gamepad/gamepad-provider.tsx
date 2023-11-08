import React, { PropsWithChildren, createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { cAF, rAF, getGamepads, onConnected, onDisconnect, removeOnConnected, removeOnDisconnect } from './with-gamepad'
import { __AXIS_KEYS, getAxisLabel, getButtonLabel } from './game-handler'

// https://github.com/whoisryosuke/react-gamepads/tree/master
export type GamepadClickEvent = {
  index: string | number
  buttonIndex: number
  gamepadId: string | number
  label: string
  timestamp?: number
}
export type GameButtonAxis = {
  index: string | number
  gamepadId: string | number
  axis: string | number
  value: number
  label?: string | null
  timestamp?: number
}

export type GamepadEvents = {
  onDisconnect?: (gamepad: Gamepad) => void
  onConnected?: (gamepad: Gamepad) => void
  onKeyDown?: (event: GamepadClickEvent) => void
  onKeyUp?: (event: GamepadClickEvent) => void
  onAxischanged?: (event: GameButtonAxis) => void
}

type TypeGamdpadContext = {
  gamepads: Record<string | number, Gamepad>
} & GamepadEvents

const GamepadContext = createContext<TypeGamdpadContext>({
  gamepads: {}
  // onTouch: () => {},
  // onDisconnect: (gamepad: Gamepad) => console.log(gamepad),
  // onConnected: (gamepad: Gamepad) => console.log(gamepad),
  // onKeyDown: (event: GamepadClickEvent) => console.log(event),
  // onKeyUp: (event: GamepadClickEvent) => console.log(event),
  // onAxischanged: (event: GameButtonAxis) => console.log(event)
})

type GamepadProviderProps = PropsWithChildren<GamepadEvents>

const GamepadProvider: React.FC<GamepadProviderProps> = (props: GamepadProviderProps) => {
  const { onAxischanged, onKeyDown, onKeyUp, onDisconnect: __on_disconnect, onConnected: __on_connected } = props

  const [gamepads, putGamepads] = useState<Record<string | number, Gamepad>>({})
  const requestRef = useRef<number>()

  const addGamepad = useCallback(
    (gamepad: Gamepad) => {
      const o = Object.values(gamepads)
        .filter(g => null != g && g.index === gamepad.index)
        .shift()
      putGamepads({
        ...gamepads,
        [gamepad.index]: gamepad
      })
      if (!o && __on_connected) __on_connected(gamepad)
    },
    [gamepads, __on_connected]
  )

  const removeGamepad = useCallback(
    (gamepad: Gamepad) => {
      const o = gamepads[gamepad.index]
      o && delete gamepads[gamepad.index]
      putGamepads({
        ...gamepads
      })
      o && __on_disconnect && __on_disconnect(o)
    },
    [gamepads, __on_disconnect]
  )

  /**
   * Finds all gamepads and adds them to context
   */
  const scanGamepads = useCallback(
    () => getGamepads().forEach(detected => detected && addGamepad(detected)),
    [addGamepad]
  )

  useEffect(() => {
    const _onConnected = (event: Event) => addGamepad((event as GamepadEvent).gamepad)
    const _onDisconnect = (event: Event) => removeGamepad((event as GamepadEvent).gamepad)

    onDisconnect(_onDisconnect)
    onConnected(_onConnected)

    return () => {
      removeOnDisconnect(_onDisconnect)
      removeOnConnected(_onConnected)
    }
  }, [addGamepad, removeGamepad])

  const animate = useCallback(
    (time: DOMHighResTimeStamp) => {
      scanGamepads()
      const oldGamespads = getGamepads()
      Object.values(gamepads).forEach((newGamepad, newGamepadIndex) => {
        if (!newGamepad) return
        Object.values(oldGamespads).forEach((oldGamepad: Gamepad | null) => {
          if (null === oldGamepad || oldGamepad.index !== newGamepad.index) return // 不是相同的手柄 则退出
          // 更新摇杆数据
          oldGamepad.axes.forEach((oldAxis, axisIndex) => {
            const val = oldAxis < 0.01 && oldAxis > -0.01 ? 0 : oldAxis
            const n = newGamepad.axes[axisIndex]
            const newVal = n < 0.01 && n > -0.01 ? 0 : n
            if (newVal === val) return

            const axis = __AXIS_KEYS[axisIndex]
            if (!axis) return

            onAxischanged && onAxischanged({
                gamepadId: oldGamepad.id,
                index: newGamepadIndex,
                axis,
                value: newVal,
                label: getAxisLabel(axis, newVal),
                timestamp: time
              })
          })
          newGamepad.buttons.forEach((button, buttonIndex) => {
            const o = oldGamepad.buttons[buttonIndex].pressed
            const n = button.pressed
            const e: GamepadClickEvent = {
              gamepadId: oldGamepad.id,
              index: newGamepadIndex,
              buttonIndex,
              label: getButtonLabel(buttonIndex),
              timestamp: time
            }
            if (o === n) return // 无变化忽略
            if (!o && n) onKeyUp && onKeyUp(e) // 按下
            if (!n && o) onKeyDown && onKeyDown(e) // 释放
          })
        })
      })
      requestRef.current = rAF(animate)
    },
    [gamepads, scanGamepads, onAxischanged, onKeyUp, onKeyDown]
  )

  useEffect(() => {
    requestRef.current = rAF(animate)
    return () => cAF(requestRef.current!)
  }, [animate])
  return <GamepadContext.Provider value={{ gamepads }}>{props.children}</GamepadContext.Provider>
}

const useGamepadContext = () => {
  const context = useContext(GamepadContext)
  if (!context) throw new Error('useGamepadContext must be used within a GamepadProvider.')

  return context
}

export { GamepadProvider, GamepadContext, useGamepadContext }
