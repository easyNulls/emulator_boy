import React, { useEffect, useMemo, useRef, useState } from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom'
import { InjectGame, NotFound, HotGameList } from '@pages'

import { Provider } from 'react-redux'
import { config } from '@config'
import { getStrings } from '@assets'
import { store } from '@/store'

import './App.less'

// import enUS from 'antd/lib/locale/en_US'
// import zhCN from 'antd/lib/locale/zh_CN'
import VConsole from 'vconsole'

import { IntlProvider } from 'react-intl'
// import { useDarkMode } from '@/components/use-darkMode'
import ThemeColorSchemeProvider, { TypeThemeRef } from '@/components/theme-provider'
import { useQueryParams } from '@/kits'
import { SVG_moon, SVG_sun } from '@/assets/iconfont'
import ColorSchemeSwitcher from '@/components/theme-switcher'
import { browserColorScheme } from '@/components'

// const local = 'zh'
const strings = getStrings('zh_CN')
const { name } = config

export const App: React.FC<Record<string, any>> = (props: Record<string, any>) => {
  console.log('props => ', props)
  const location = window.location
  const { local = 'zh' } = useQueryParams<Record<string, string>>(
    '' === location.search ? location.href : location.search
  )
  const [theme, putTheme] = useState<'light' | 'dark' | ''>('light')
  const colorSchemeRef = useRef<TypeThemeRef>(null)
  const followOS = useMemo(() => theme === browserColorScheme(), [theme])

  useEffect(() => {
    const canDebug = name.includes('dev') || __NODE_ENV__ != 'production'
    const vConsole = canDebug ? new VConsole({ theme }) : null
    return () => vConsole?.destroy()
  })

  return (
    <IntlProvider messages={strings} locale={local}>
      <ThemeColorSchemeProvider ref={colorSchemeRef} onColorScheme={putTheme} followOS={followOS}>
        <Provider store={store}>
          <ColorSchemeSwitcher colorScheme={theme} onToggle={() => colorSchemeRef.current?.toggleDarkMode()} />
          <Router>
            <Routes>
              <Route path={'/inject_game'} element={<InjectGame />} />
              <Route path={'/hot_game_list'} element={<HotGameList />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Router>
        </Provider>
      </ThemeColorSchemeProvider>
    </IntlProvider>
  )
}

export default App
