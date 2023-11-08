import React, { useCallback, useState, useRef, useEffect, useMemo, PropsWithChildren } from 'react'
import { Fullscreen as fscreen } from '@/kits'

export interface FullScreenHandle {
  active: boolean
  enter: () => Promise<void | null> | undefined
  exit: () => Promise<void | null> | undefined
  element: React.MutableRefObject<HTMLDivElement | null>
}

export interface FullScreenProps {
  handle: FullScreenHandle
  onChange?: (state: boolean, handle: FullScreenHandle) => void
  className?: string
}

export const useFullScreenHandle = (onScreenChangeListener?: (e: Event, state: 'exit' | 'enter') => void): FullScreenHandle => {
  const [active, setActive] = useState<boolean>(false)
  const element = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleChange = (e: Event) => {
      const v = fscreen.fullScreenElement() === element.current
      setActive(v)
      onScreenChangeListener && onScreenChangeListener(e, v ? 'enter' : 'exit')
    }

    fscreen.addFullScreenChange(handleChange)
    return () => fscreen.removeFullScreenChange(handleChange)
  }, [onScreenChangeListener])

  const enter = useCallback(() => {
    if (!element.current) return Promise.resolve(void 0)

    if (fscreen.fullScreenElement()) {
      return fscreen.exitFullScreen()?.then(() => {
        if (!element.current) return Promise.resolve(void 0)
        return fscreen.requestFullScreen(element.current)
      })
    } else {
      return fscreen.requestFullScreen(element.current)
    }
  }, [])

  const exit = useCallback(() => {
    if (fscreen.fullScreenElement() === element.current) {
      return fscreen.exitFullScreen()
    }
    return Promise.resolve(void 0)
  }, [])

  return useMemo(
    () => ({
      active,
      enter,
      exit,
      element
    }),
    [active, enter, exit]
  )
}

export const FullScreen: React.FC<PropsWithChildren<FullScreenProps>> = ({ handle, onChange, children, className }) => {
  const classNames = []
  if (className) {
    classNames.push(className)
  }

  classNames.push('fullscreen')

  if (handle.active) {
    classNames.push('fullscreen-enabled')
  }

  useEffect(() => {
    onChange && onChange(handle.active, handle)
  }, [handle, handle.active, onChange])

  return (
    <div className={classNames.join(' ')} ref={handle.element} style={handle.active ? { height: '100%', width: '100%' } : undefined}>
      {children}
    </div>
  )
}
