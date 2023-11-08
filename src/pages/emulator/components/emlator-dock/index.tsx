import { ReactNode, Ref, forwardRef, useImperativeHandle } from 'react'

import './index.less'
type DockButtonProps = { value: EmulatorDockButton }

type EmulatorDockProps = {
  visible?: boolean
  left: Array<EmulatorDockButton>
  right: Array<EmulatorDockButton>
}

export interface EmulatorDockButton {
  id?: string | number
  title?: string
  actived?: boolean // 默认激活选择ID
  icon?: ReactNode
  onTouch?: (item?: EmulatorDockButton, event?: Event) => void
  children?: Array<EmulatorDockButton>
}

const Button = (props: DockButtonProps) => {
  const { value } = props

  const { children } = value

  const drawIconButton: React.FC<EmulatorDockButton> = (dockItem: EmulatorDockButton) => {
    const { title, icon, onTouch, id } = dockItem

    return (
      <div
        key={`docker_button_.${id}`}
        className='emulator_dock_button'
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          onTouch && onTouch(dockItem, e.nativeEvent)
        }}>
        <span className='emulator_dock_text'>{title}</span>
        <svg role='presentation' focusable='false'>
          {icon}
        </svg>
      </div>
    )
  }

  if (children) {
    if (children.length > 2) throw new Error('only support 2 button group. Now!!!')
    const n = children.filter(cn => cn.actived)
    return drawIconButton(n.length > 0 ? n[0] : children[0])
  } else {
    return drawIconButton(value)
  }
}

export const EmulatorDock = forwardRef((props: EmulatorDockProps, ref: Ref<{}>) => {
  const { visible = false, right, left } = props

  useImperativeHandle(ref, () => ({}), [])
  const renderIcons = (thisButtons: Array<EmulatorDockButton>) => thisButtons.map((item, index) => <Button value={item} key={`key_${item.title}_${index}`} />)

  const clazz = ['emulator_dock']
  if (!visible) clazz.push('emulator_dock_hidden')
  return (
    <div className={clazz.join(' ')}>
      {renderIcons(left)}
      <span className='emulator_dock_spacer'></span>
      {renderIcons(right)}
    </div>
  )
})
export default EmulatorDock
