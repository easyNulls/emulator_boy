import React, { PropsWithChildren } from 'react'

import { SVG_moon, SVG_sun } from '@/assets/iconfont'

import './index.less'

type ColorSwitcherProps = PropsWithChildren<{ colorScheme: 'dark' | 'light' | ''; onToggle: () => void }>

export const ColorSchemeSwitcher: React.FC<ColorSwitcherProps> = (props: ColorSwitcherProps) => {
  const { onToggle } = props
  return (
    <label
      className='theme_icon'
      onClick={() => {
        onToggle && onToggle()
      }}>
      {'dark' === props.colorScheme ? SVG_moon : SVG_sun}
    </label>
  )
}
export default ColorSchemeSwitcher
