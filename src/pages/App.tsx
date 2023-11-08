import React, { useEffect, useState } from 'react'
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
import ThemeColorSchemeProvider from '@/components/theme-context'
import { useQueryParams } from '@/kits'
import { SVG_moon, SVG_sun } from '@/assets/iconfont'

// const local = 'zh'
const strings = getStrings('zh_CN')
const { name } = config

export const App: React.FC<Record<string, any>> = (props: Record<string, any>) => {
  console.log('props => ', props)
  const location = window.location
  const { local = 'zh' } = useQueryParams<Record<string, string>>(
    '' === location.search ? location.href : location.search
  )
  const [theme, putTheme] = useState<'light' | 'dark' | ''>()

  useEffect(() => {
    const canDebug = name.includes('dev') || __NODE_ENV__ != 'production'
    const vConsole = canDebug ? new VConsole({ theme }) : null
    return () => vConsole?.destroy()
  })

  return (
    <IntlProvider messages={strings} locale={local}>
      <ThemeColorSchemeProvider onColorScheme={value => putTheme(value)}>
        <Provider store={store}>
          <label
            className='theme_icon fixed_theme_button'
            onClick={() => putTheme(theme === 'light' ? 'dark' : 'light')}>
            {'light' === theme ? SVG_moon : SVG_sun}
          </label>
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
