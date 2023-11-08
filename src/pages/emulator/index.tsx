import React, { PropsWithChildren, Ref, forwardRef, useEffect, useMemo, useRef, useState } from 'react'

import { FullScreen, useFullScreenHandle, ResizeObject, ResizeView, useHover, getClientSize } from '@/components'

import { EmulaterAlerts, TypeDisplayContext } from './components/emulator-alerts'

import GameViewDock, { EventIDs } from './components/emlator-dock/index.dock_game'
import { EmulatorDockButton } from './components/emlator-dock'
import { RetroarchCreator } from './retroarch-creator'

import './index.less'
import { GamepadProvider } from './components/gamepad'
import { GamepadClickEvent } from './components/gamepad/gamepad-provider'
import { _DEFAULT_KEY_MAP } from './components/gamepad/keys'
import { __BUTTON_LABELS } from './components/gamepad/game-handler'
import { UserController } from './components/gamepad/user-controller'

export type EmulatorProps = PropsWithChildren<{
  width?: string | number
  height?: string | number
  arguments: { rom: string; core: string; elemen?: string | HTMLElement }
}>

console.log(`version => ${__PACKAGE_VERSION__}`)

export const Emulator: React.FC<EmulatorProps> = forwardRef((props: EmulatorProps, _ref: Ref<{}>) => {
  const retro = useMemo(() => RetroarchCreator.instance(), [])
  const canvasEl = useRef<HTMLCanvasElement>(null)
  const alertsEl = useRef<TypeDisplayContext>(null)

  const [canvasSize, setCanvasSize] = useState<ResizeObject>(getClientSize())

  useEffect(() => {
    return () => retro.exit()
  }, [props, retro])

  const [isHover, hoverProps] = useHover({ mouseEnterDelayMS: 200, mouseLeaveDelayMS: 3000 })
  const { core, rom } = props.arguments
  // const { tips } = useEmulaterAlerts()
  const onTouch = (item?: EmulatorDockButton, event?: Event) => {
    console.log(item, event)
    const { tips } = alertsEl.current ?? {}

    if (!item) return
    switch (item.id) {
      case EventIDs.__DOCK_BUTTON_KEY_RESTART: //重新启动游戏
        // toast?.show('this is a restart')
        tips?.show('this is a restart')
        // retro.restart()
        break
      case EventIDs.__DOCK_BUTTON_KEY_GAMEPAD_SETTINGS: //游戏手柄设置
        break
      case EventIDs.__DOCK_BUTTON_KEY_WINDOW_STREAM_PAUSE: //暂停游戏
        retro.pause()
        break
      case EventIDs.__DOCK_BUTTON_KEY_WINDOW_STREAM_PLAY: //启动游戏
        if (canvasEl.current) retro.launch(core, rom, canvasEl.current)
        setTimeout(() => console.log(retro.getCurrentNostalgist()), 5000)
        break
      case EventIDs.__DOCK_BUTTON_KEY_SAVE_STATE: // 保存游戏存档
        break
      case EventIDs.__DOCK_BUTTON_KEY_LOAD_STATE: // 加载游戏存档
        break
      case EventIDs.__DOCK_BUTTON_KEY_SETTINGS: // 设置项
        break
      case EventIDs.__DOCK_BUTTON_KEY_FULL_SCREEN_EXIT: // 进入全屏
        fullScreenHandle.exit()
        break
      case EventIDs.__DOCK_BUTTON_KEY_FULL_SCREEN_ENTER: // 退出全屏
        fullScreenHandle.enter()
        break
    }
  }
  const fullScreenHandle = useFullScreenHandle((_, state) => {
    console.log('full screen')

    if ('exit' === state) {
      retro.resize({
        width: 640,
        height: 480
      })
    }
  })

  return (
    <FullScreen handle={fullScreenHandle}>
      <GamepadProvider
        onAxischanged={e => console.log('onAxischanged', e)}
        onConnected={e => {
          const { index, id, buttons, axes } = e
          console.log('【 %s 】 %d个按钮, %d个坐标方向  位于 %d 控制器  ', id, buttons.length, axes.length, index)
        }}
        onDisconnect={e => console.log('【 %s 】已断开: 位于 %d 控制器 ', e.id, e.index)}
        onKeyDown={(e: GamepadClickEvent) => {
          const playerId = Number(e.index)
          const userController = UserController.instance()
          const keymap = userController.getUserKeymap(playerId)(e.buttonIndex)
          console.log('onKeyDown', e, keymap)

          keymap.value &&
            retro.pressDown({
              player: playerId,
              button: keymap.value.toString(),
              time: e.timestamp
            })
        }}
        onKeyUp={(e: GamepadClickEvent) => {
          const player = Number(e.index)
          const userController = UserController.instance()
          const keymap = userController.getUserKeymap(player)(e.buttonIndex)
          console.log('onKeyUp', e, keymap)
          keymap?.value &&
            retro.pressUp({
              player,
              button: keymap?.value.toString(),
              time: e.timestamp
            })
        }}>
        <ResizeView
          onChanged={(size: ResizeObject) => {
            setCanvasSize(size)
          }}>
          <div
            className='emulator_container'
            style={
              fullScreenHandle.active
                ? {
                    width: 'auto',
                    height: '100%'
                  }
                : {
                    width: props.width ?? 'auto',
                    height: props.height ?? 'auto',
                    maxWidth: '100%'
                  }
            }
            {...hoverProps}>
            <EmulaterAlerts ref={alertsEl} />
            <GameViewDock visible={isHover} onTouch={onTouch} />
            <canvas
              ref={canvasEl}
              id='emulator-canvas'
              className='emulator_canvas'
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </ResizeView>
      </GamepadProvider>
    </FullScreen>
  )
})
export default Emulator
