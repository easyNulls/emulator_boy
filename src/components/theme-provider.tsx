import { PropsWithChildren, Ref, createContext, forwardRef, useContext, useImperativeHandle } from 'react'
import { _TYPE_DARK_MODE, __KEY_THEME_COLOR_SCHEME__, useDarkMode } from './index'

type TypeThemeColorSchemeContext = {
  colorScheme: string | 'dark' | 'light'
}

const ThemeColorSchemeContext = createContext<TypeThemeColorSchemeContext>({
  colorScheme: 'light'
})

type ThemeProps = {
  onColorScheme?: (value: _TYPE_DARK_MODE) => void
  followOS: boolean
}

export type TypeThemeRef = {
  colorScheme: () => _TYPE_DARK_MODE // 获取当前的color 主题
  toDarkMode: (value: _TYPE_DARK_MODE) => void // 切换到指定的主题
  toggleDarkMode: () => void // 翻转主题颜色
}

export const ThemeColorSchemeProvider = forwardRef((props: PropsWithChildren<ThemeProps>, ref: Ref<TypeThemeRef>) => {
  const { children, onColorScheme, followOS } = props

  const [darkMode, toDarkMode, toggleDarkMode] = useDarkMode({
    followOS,
    colorSchemeKey: __KEY_THEME_COLOR_SCHEME__,
    onColorScheme
  })

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

export const useThemeColorScheme = (): TypeThemeColorSchemeContext => {
  const context = useContext(ThemeColorSchemeContext)
  if (!context) throw new Error('useThemeColorScheme must be used within a ThemeColorSchemeProvider.')
  return context
}

export default ThemeColorSchemeProvider
