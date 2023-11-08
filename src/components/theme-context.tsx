import { PropsWithChildren, Ref, createContext, forwardRef, useContext, useImperativeHandle } from 'react'
import { _TYPE_DARK_MODE, useDarkMode } from './index'

type TypeThemeColorSchemeContext = {
  colorScheme: string | 'dark' | 'light'
}

const ThemeColorSchemeContext = createContext<TypeThemeColorSchemeContext>({
  colorScheme: 'light'
})

type ThemeProps = {
  followOS?: boolean
  key?: string
  onColorScheme?: (value: _TYPE_DARK_MODE) => void
}

export type TypeThemeRef = {
  colorScheme: () => _TYPE_DARK_MODE             // 获取当前的color 主题
  toDarkMode: (value: _TYPE_DARK_MODE) => void   // 切换到指定的主题
  toggleDarkMode: () => void                     // 翻转主题颜色
}

export const ThemeColorSchemeProvider = forwardRef((props: PropsWithChildren<ThemeProps>, ref: Ref<TypeThemeRef>) => {
  const { followOS, children, onColorScheme } = props
  const [darkMode, toDarkMode, toggleDarkMode] = useDarkMode({ followOS: followOS ?? true, onColorScheme })

  useImperativeHandle(
    ref,
    () => ({
      colorScheme: () => darkMode,
      toDarkMode,
      toggleDarkMode
    }),
    [darkMode, toDarkMode, toggleDarkMode]
  )
  return (
    <ThemeColorSchemeContext.Provider value={{ colorScheme: darkMode }}>{children}</ThemeColorSchemeContext.Provider>
  )
})

export default ThemeColorSchemeProvider

export const useThemeColorScheme = (): TypeThemeColorSchemeContext => {
  const context = useContext(ThemeColorSchemeContext)
  if (!context) throw new Error('useThemeColorScheme must be used within a ThemeColorSchemeProvider.')
  return context
}
