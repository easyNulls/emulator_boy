import { debounce } from '@/kits/debance'
import { useState, useEffect } from 'react'

type Orientation = 'portrait' | 'landscape'
    | 'portrait-primary'
    | 'portrait-secondary'
    | 'landscape-primary'
    | 'landscape-secondary'

interface OrientationOptions {
    defaultOrientation?: Orientation
}

interface OrientationResults {
    orientation: Orientation
    portrait: boolean
    landscape: boolean
}

export const getOrientationType = (orientation: number, throwError: boolean = false): 'landscape-primary' | 'landscape-secondary' | 'portrait-primary' | 'portrait-secondary' | null => {
    if (orientation === 0 || orientation === 180) {
        return orientation === 0 ? 'portrait-primary' : 'portrait-secondary'
    } else if (orientation === 90 || orientation === -90) {
        return orientation === 90 ? 'landscape-primary' : 'landscape-secondary'
    } else {
        // 默认情况，可以根据需要返回一个默认值或抛出错误
        if (throwError)
            throw new Error('未知的屏幕方向类型')
        else
            return null
    }
}


export const useWindowOrientation = (options: OrientationOptions = {}): OrientationResults => {
    if (typeof options !== 'object') throw new TypeError('The options argument must be formatted as an object.')
    const { defaultOrientation = window.screen.orientation.type ?? getOrientationType(window.orientation) ?? 'portrait' } = options
    if (defaultOrientation !== 'portrait' && defaultOrientation !== 'landscape') throw new TypeError(`The defaultOrientation is not a valid defaultOrientation.Use 'portrait' or 'landscape'.`)

    const [orientation, setOrientation] = useState<Orientation>(defaultOrientation)

    useEffect(() => {

        // switch (window.orientation) {
        //     case 0: break;
        //     case -90: console.log('左旋'); break
        //     case 90: console.log('右旋'); break
        //     case 180: break
        // }
        // 获取设备屏幕方向信息
        const screenOrientation = window.screen.orientation

        // 检查设备屏幕方向信息
        if (screenOrientation) {
            console.log(`window.screen[orientation]: ${screenOrientation.type}`)
            console.log(`window.screen[angle]: ${screenOrientation.angle}`)
        } else {
            console.log('屏幕方向信息不可用。')
        }

        const handleResize = debounce(
            () => setOrientation(window.innerWidth <= window.innerHeight ? 'portrait' : 'landscape'),
            1000,
        )
        handleResize()
        // window.addEventListener('resize', handleResize)
        window.addEventListener('orientationchange', handleResize);

        return () => {
            window.removeEventListener('orientationchange', handleResize);

            // window.removeEventListener('resize', handleResize)
            handleResize.cancel()
        }
    }, [])

    return {
        orientation,
        portrait: (orientation === 'portrait' || orientation === 'portrait-primary' || orientation === 'portrait-secondary'),
        landscape: (orientation === 'landscape' || orientation === 'landscape-primary' || orientation === 'landscape-secondary'),
    }
}
