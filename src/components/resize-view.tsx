// 网页可见区域宽：document.body.clientWidth;
// 网页可见区域高：document.body.clientHeight;
// 网页可见区域宽：document.body.offsetWidth; 		// 包括边线和滚动条的宽
// 网页可见区域高：document.body.offsetHeight;		// 包括边线的宽
// 网页正文全文宽：document.body.scrollWidth;
// 网页正文全文高：document.body.scrollHeight;
// 网页被卷去的高(ff)：document.body.scrollTop;
// 网页被卷去的高(ie)：document.documentElement.scrollTop;
// 网页被卷去的左：document.body.scrollLeft;
// 网页正文部分上：window.screenTop;
// 网页正文部分左：window.screenLeft;
// 屏幕分辨率的高：window.screen.height;
// 屏幕分辨率的宽：window.screen.width;
// 屏幕可用工作区高度：window.screen.availHeight;
// 屏幕可用工作区宽度：window.screen.availWidth;
// 屏幕彩色位设置是: window.screen.colorDepth;
// 屏幕像素/英寸设置: window.screen.deviceXDPI;

import React, { PropsWithChildren, createContext, useCallback, useContext, useEffect, useState } from 'react'

export type ResizeObject = { height?: number | string; width?: number | string }

export const getClientSize = () => ({
  width: document.documentElement.clientWidth || document.documentElement.scrollWidth,
  height: document.documentElement.clientHeight || document.documentElement.scrollHeight
})

const ResizeViewContext = createContext<ResizeObject>(getClientSize())

type ResizeViewProps = PropsWithChildren<{ onChanged?: (value: ResizeObject) => void }>

export const ResizeView: React.FC<ResizeViewProps> = (props: ResizeViewProps) => {
  const { children } = props

  const [lastSize, setLastSize] = useState<ResizeObject>({
    width: document.documentElement.clientWidth || document.documentElement.scrollWidth,
    height: document.documentElement.clientHeight || document.documentElement.scrollHeight
  })

  const onResize = useCallback(() => {
    setLastSize(getClientSize())
    const { onChanged } = props
    if (onChanged) onChanged(lastSize)
  }, [lastSize, props])

  useEffect(() => {
    const windowIsAvailable = typeof window !== 'undefined'
    if (windowIsAvailable) window.addEventListener('resize', onResize)
    return () => {
      if (windowIsAvailable) window.removeEventListener('resize', onResize)
    }
  }, [onResize])

  return <ResizeViewContext.Provider value={lastSize}>{children}</ResizeViewContext.Provider>
}

export const useWindowSize = (): ResizeObject => {
  const context = useContext(ResizeViewContext)
  if (!context) throw new Error('useWindowSize must be used within a ResizeView.')
  console.log('context', context)
  return context
}

export default ResizeView
