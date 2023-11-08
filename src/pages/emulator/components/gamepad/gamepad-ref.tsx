import { useCallback, useEffect, useRef } from 'react'
import { cAF, getGamepads, onConnected, onDisconnect, rAF, removeOnConnected, removeOnDisconnect } from './with-gamepad'

interface GamepadRef {
  [key: number]: Gamepad
}

export const useGamepad = (callback: (data: GamepadRef) => void) => {
  const gamepads = useRef<GamepadRef>([])
  const requestRef = useRef<number>()

  const addGamepad = useCallback(
    (gamepad: Gamepad) => {
      gamepads.current = {
        ...gamepads.current,
        [gamepad.index]: gamepad
      }
      callback(gamepads.current)
    },
    [callback, gamepads]
  )

  const removeGamepad = useCallback(
    (gamepad: Gamepad) => {
      gamepads.current[gamepad.index] && delete gamepads.current[gamepad.index]

      callback(gamepads.current)
    },
    [callback]
  )

  /**
   * Finds all gamepads and adds them to context
   */
  const scanGamepads = useCallback(() => {
    const allGamepads = getGamepads().forEach(detected => {
      detected && addGamepad(detected)
    })
    return allGamepads
  }, [addGamepad])

  useEffect(() => {
    const _onConnected = (event: Event) => {
      addGamepad((event as GamepadEvent).gamepad)
    }
    const _onDisconnect = (event: Event) => {
      removeGamepad((event as GamepadEvent).gamepad)
    }
    onDisconnect(_onDisconnect)
    onConnected(_onConnected)

    return () => {
      removeOnDisconnect(_onDisconnect)
      removeOnConnected(_onConnected)
    }
  }, [addGamepad, removeGamepad])

  const animate = useCallback(() => {
    scanGamepads()
    requestRef.current = rAF(animate)
  }, [requestRef, scanGamepads])

  useEffect(() => {
    requestRef.current = rAF(animate)
    return () => cAF(requestRef.current!)
  }, [animate])

  return gamepads.current
}
