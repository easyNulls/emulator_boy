import { useState } from 'react'

export interface UseHoverOptions {
  mouseEnterDelayMS?: number
  mouseLeaveDelayMS?: number
}

export type HoverProps = Pick<React.HTMLAttributes<HTMLElement>, 'onMouseEnter' | 'onMouseLeave'>

export const useHover = ({ mouseEnterDelayMS = 200, mouseLeaveDelayMS = 200 }): [boolean, HoverProps] => {
  const [isHovering, setIsHovering] = useState(false)
  let mouseEnterTimer: number | ReturnType<typeof setTimeout>
  let mouseOutTimer: number | ReturnType<typeof setTimeout>

  return [
    isHovering,
    {
      onMouseEnter: () => {
        // setIsHovering(true)
        clearTimeout(mouseOutTimer)
        mouseEnterTimer = setTimeout(() => setIsHovering(true), mouseEnterDelayMS)
      },
      onMouseLeave: () => {
        // setIsHovering(false)
        clearTimeout(mouseEnterTimer)
        mouseOutTimer = setTimeout(() => setIsHovering(false), mouseLeaveDelayMS)
      }
    }
  ]
}
