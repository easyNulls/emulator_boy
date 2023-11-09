import { useCallback, useEffect, useState } from 'react'

export const __KEY_THEME_COLOR_SCHEME__ = 'color_scheme'

export type _TYPE_DARK_MODE = 'dark' | 'light' | ''

type DarkModeProps = {
	followOS: boolean
	colorSchemeKey?: string
	onColorScheme?: (value: _TYPE_DARK_MODE) => void
}

export const browserColorScheme = () => matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'


export const useDarkMode = (props: DarkModeProps = { followOS: true }): [
	_TYPE_DARK_MODE,
	(value: _TYPE_DARK_MODE) => void,
	() => void,
] => {
	const { followOS, colorSchemeKey = __KEY_THEME_COLOR_SCHEME__, onColorScheme } = props


	const matchDarkMedia = matchMedia('(prefers-color-scheme: dark)')

	// 获取初始主题模式
	const browserColorScheme = useCallback(() => matchDarkMedia.matches ? 'dark' : 'light', [matchDarkMedia])

	const [darkMode, setDarkMode] = useState<_TYPE_DARK_MODE>(browserColorScheme())



	// 更新通知 监听
	const putDarkMode = useCallback((value: _TYPE_DARK_MODE) => {
		document.documentElement.dataset[colorSchemeKey] = value
		onColorScheme && onColorScheme(value)
		setDarkMode(value)
	}, [colorSchemeKey, onColorScheme])

	const toDarkMode = (value: _TYPE_DARK_MODE) => {
		putDarkMode(value)
	}
	const toggleDarkMode = () => {
		toDarkMode(darkMode === 'dark' ? 'light' : 'dark')
	}


	useEffect(() => {

		// 设置系统主题变更listen
		const onFollowOS = () => {
			const value = browserColorScheme()
			document.documentElement.dataset[colorSchemeKey] = value	//同步到dataset中 触发css更新
			putDarkMode(value)
		}

		if (followOS) {
			//判断是否跟随系统设置
			document.documentElement.dataset[colorSchemeKey] = browserColorScheme() //同步到dataset中 触发css更新
			matchDarkMedia.addEventListener('change', onFollowOS)
		} else {
			matchDarkMedia.removeEventListener('change', onFollowOS)
		}
		return () => matchDarkMedia.removeEventListener('change', onFollowOS)

	}, [followOS, matchDarkMedia, putDarkMode, browserColorScheme, colorSchemeKey])



	return [darkMode, toDarkMode, toggleDarkMode]
}
