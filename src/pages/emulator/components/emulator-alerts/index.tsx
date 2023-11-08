import {
  PropsWithChildren,
  ReactNode,
  Ref,
  createContext,
  forwardRef,
  useContext,
  useImperativeHandle,
  useMemo,
  useState
} from 'react'

import './index.less'

type EmulaterAlertsProps = {}

type DisplayState<T> = { visible: boolean; children: T }

export type TypeDisplayContext = {
  dialog: { show: (view: ReactNode) => void; hidden: () => void }
  tips: { show: (message: string) => void; hidden: () => void }
}

const EmulaterDialogContext = createContext<TypeDisplayContext>({
  dialog: {
    show: () => {},
    hidden: () => {}
  },
  tips: {
    show: () => {},
    hidden: () => {}
  }
})

export const EmulaterAlerts = forwardRef(
  (props: PropsWithChildren<EmulaterAlertsProps>, ref: Ref<TypeDisplayContext>) => {
    const [dialogState, setDialogState] = useState<DisplayState<ReactNode | null | undefined>>({
      visible: false,
      children: null
    })
    const [toastState, setToastState] = useState<DisplayState<string | null | undefined>>({
      visible: false,
      children: null
    })

    const toDialogVisible = (visible: boolean, children?: ReactNode | null) =>
      setDialogState({ visible: visible, children })
    const toTipsVisible = (visible: boolean, message?: string | null) =>
      setToastState({ visible: visible, children: message })
    // const { gamepads } = useGamepadContext()
    // console.log(gamepads)
    const dialogAPIs = useMemo(
      () => ({
        show: (view: ReactNode) => toDialogVisible(true, view),
        hidden: () => toDialogVisible(false, null)
      }),
      []
    )
    const tipsAPIs = useMemo(() => {
      let timerID: NodeJS.Timeout | number = -1
      return {
        show: (message: string) => {
          if (-1 !== timerID) {
            clearTimeout(timerID)
            timerID = -1
          }
          toTipsVisible(true, message)

          timerID = setTimeout(() => {
            toTipsVisible(false, null)
            clearTimeout(timerID)
            timerID = -1
          }, 5000)
        },
        hidden: () => {
          if (-1 !== timerID) {
            clearTimeout(timerID)
            timerID = -1
          }
          toTipsVisible(false, null)
        }
      }
    }, [])
    useImperativeHandle(
      ref,
      () => ({
        dialog: dialogAPIs,
        tips: tipsAPIs
      }),
      [dialogAPIs, tipsAPIs]
    )

    return (
      <EmulaterDialogContext.Provider
        value={{
          dialog: dialogAPIs,
          tips: tipsAPIs
        }}>
        {props.children}
        {dialogState.visible && <div className='emulator_popup_container'>{dialogState.children}</div>}
        {toastState.children && (
          <div className='emulator_loading_text emulator_loading_text_glow'>{toastState.children}</div>
        )}
      </EmulaterDialogContext.Provider>
    )
  }
)

export const useEmulaterAlerts = (): TypeDisplayContext => {
  const context = useContext(EmulaterDialogContext)
  if (!context) throw new Error('useEmulaterAlerts must be used within a EmulaterAlerts.')

  return context
}
