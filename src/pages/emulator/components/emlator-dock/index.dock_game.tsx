import { Ref, forwardRef, useState } from 'react'

import { useIntl } from 'react-intl'
import {
  SVG_Enter_FullScreen,
  SVG_Exit_FullScreen,
  SVG_GamePad,
  SVG_LoadState,
  SVG_Pause,
  SVG_Play,
  SVG_Restart,
  SVG_SaveState,
  SVG_Settings
} from './iconfonts'

import './index.less'
import EmulatorDock, { EmulatorDockButton } from './index'

export enum EventIDs {
  __DOCK_BUTTON_KEY_RESTART = 1,
  __DOCK_BUTTON_KEY_WINDOW_STREAM,
  __DOCK_BUTTON_KEY_WINDOW_STREAM_PLAY = 2.1,
  __DOCK_BUTTON_KEY_WINDOW_STREAM_PAUSE = 2.2,
  __DOCK_BUTTON_KEY_SAVE_STATE = 3,
  __DOCK_BUTTON_KEY_LOAD_STATE,
  __DOCK_BUTTON_KEY_GAMEPAD_SETTINGS,
  __DOCK_BUTTON_KEY_SETTINGS,
  __DOCK_BUTTON_KEY_FULL_SCREEN,
  __DOCK_BUTTON_KEY_FULL_SCREEN_EXIT = 7.1,
  __DOCK_BUTTON_KEY_FULL_SCREEN_ENTER = 7.2
}

export interface GameViewDockProps {
  visible: boolean
  onTouch?: (item?: EmulatorDockButton, event?: Event) => void
}

/**
 * 更改状态按钮状态
 * @param list
 * @param id
 */
const toggle = (list: Array<EmulatorDockButton>, id: string | number) => {
  return list.map(item => {
    if (item.id === id) item.children?.forEach(i => (i.actived = !i.actived))
    return item
  })
}

export const GameViewDock = forwardRef((props: GameViewDockProps, _ref: Ref<{}>) => {
  const intl = useIntl()
  const { onTouch, visible } = props
  const {
    __DOCK_BUTTON_KEY_RESTART,
    __DOCK_BUTTON_KEY_GAMEPAD_SETTINGS,
    __DOCK_BUTTON_KEY_WINDOW_STREAM,
    __DOCK_BUTTON_KEY_WINDOW_STREAM_PAUSE,
    __DOCK_BUTTON_KEY_WINDOW_STREAM_PLAY,
    __DOCK_BUTTON_KEY_SAVE_STATE,
    __DOCK_BUTTON_KEY_LOAD_STATE,
    __DOCK_BUTTON_KEY_SETTINGS,
    __DOCK_BUTTON_KEY_FULL_SCREEN,
    __DOCK_BUTTON_KEY_FULL_SCREEN_EXIT,
    __DOCK_BUTTON_KEY_FULL_SCREEN_ENTER
  } = EventIDs

  const leftMenuButtons: Array<EmulatorDockButton> = [
    {
      id: __DOCK_BUTTON_KEY_RESTART,
      title: intl.formatMessage({ id: 'Restart' }),
      icon: SVG_Restart,
      onTouch: (item, event) => {
        onTouch && onTouch(item, event)
      }
    },
    {
      id: __DOCK_BUTTON_KEY_WINDOW_STREAM,
      children: [
        {
          id: __DOCK_BUTTON_KEY_WINDOW_STREAM_PAUSE,
          title: intl.formatMessage({ id: 'Pause' }),
          icon: SVG_Pause,
          onTouch: (item, event) => {
            onTouch && onTouch(item, event)
            doToggle(__DOCK_BUTTON_KEY_WINDOW_STREAM)
          }
        },
        {
          id: __DOCK_BUTTON_KEY_WINDOW_STREAM_PLAY,
          title: intl.formatMessage({ id: 'Play' }),
          icon: SVG_Play,
          onTouch: (item, event) => {
            onTouch && onTouch(item, event)
            doToggle(__DOCK_BUTTON_KEY_WINDOW_STREAM)
          },
          actived: true
        }
      ]
    },
    {
      id: __DOCK_BUTTON_KEY_SAVE_STATE,
      title: intl.formatMessage({ id: 'Save State' }),
      icon: SVG_SaveState,
      onTouch: (item, event) => {
        onTouch && onTouch(item, event)
      }
    },
    {
      id: __DOCK_BUTTON_KEY_LOAD_STATE,
      title: intl.formatMessage({ id: 'Load State' }),
      icon: SVG_LoadState,
      onTouch: (item, event) => {
        onTouch && onTouch(item, event)
      }
    },
    {
      id: __DOCK_BUTTON_KEY_GAMEPAD_SETTINGS,
      title: intl.formatMessage({ id: 'Control Settings' }),
      icon: SVG_GamePad,
      onTouch: (item, event) => {
        onTouch && onTouch(item, event)
      }
    }
  ]

  const rightMenuButtons: Array<EmulatorDockButton> = [
    {
      id: __DOCK_BUTTON_KEY_SETTINGS,
      title: intl.formatMessage({ id: 'Settings' }),
      icon: SVG_Settings,
      onTouch: (item, event) => {
        onTouch && onTouch(item, event)
      }
    },
    {
      id: __DOCK_BUTTON_KEY_FULL_SCREEN,
      children: [
        {
          id: __DOCK_BUTTON_KEY_FULL_SCREEN_ENTER,
          title: intl.formatMessage({ id: 'Enter Fullscreen' }),
          icon: SVG_Enter_FullScreen,
          onTouch: (item, event) => {
            onTouch && onTouch(item, event)
            doToggle(__DOCK_BUTTON_KEY_FULL_SCREEN)
          },
          actived: true
        },
        {
          id: __DOCK_BUTTON_KEY_FULL_SCREEN_EXIT,
          title: intl.formatMessage({ id: 'Exit Fullscreen' }),
          icon: SVG_Exit_FullScreen,
          onTouch: (item, event) => {
            onTouch && onTouch(item, event)
            doToggle(__DOCK_BUTTON_KEY_FULL_SCREEN)
          }
        }
      ]
    }
  ]
  const [buttons, setButtons] = useState<Array<EmulatorDockButton[]>>([leftMenuButtons, rightMenuButtons])

  const doToggle = (id: string | number) => {
    setButtons([toggle(leftMenuButtons, id), toggle(rightMenuButtons, id)])
    // console.log(buttons)
  }

  return <EmulatorDock visible={visible} left={buttons[0]} right={buttons[1]} />
})

export default GameViewDock
