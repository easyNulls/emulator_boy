import { useEffect } from "react"

const KEY_DOWN_EVENT_TYPE = 'keydown'
// const KEY_UP_EVENT_TYPE = 'keyup'

// "keydown": KeyboardEvent;
//     "keypress": KeyboardEvent;
//     "keyup": KeyboardEvent;

interface KeyboardEventMap {
    [key: string | '*']: (e: KeyboardEvent) => any
}


export const useKeyPressOnCallback = (keyboardEventMap: KeyboardEventMap): void => {

    useEffect(() => {
        const windowIsAvailable = typeof window !== 'undefined'

        const keyboardEventCallback = (keyEvent: KeyboardEvent): void => {
            const { key } = keyEvent
            console.log(keyEvent)
            if (Object.prototype.hasOwnProperty.call(keyboardEventMap, key))
                keyboardEventMap[key](keyEvent)
            if (Object.prototype.hasOwnProperty.call(keyboardEventMap, '*'))
                keyboardEventMap['*'](keyEvent)

        }

        if (windowIsAvailable) {
            window.addEventListener(KEY_DOWN_EVENT_TYPE, keyboardEventCallback)
            // window.addEventListener(KEY_UP_EVENT_TYPE, keyboardEventListener)

        }

        return () => {
            if (windowIsAvailable) {
                window.removeEventListener(KEY_DOWN_EVENT_TYPE, keyboardEventCallback)
                // window.removeEventListener(KEY_UP_EVENT_TYPE, keyboardEventListener)
            }
        }
    }, [keyboardEventMap])
}
