import { useCallback, useEffect, useState } from 'react'

const __KEY_THEME_COLOR_SCHEME__ = 'color_scheme'

export type _TYPE_DARK_MODE = 'dark' | 'light' | ''

type DarkModeProps = {
	followOS: boolean
	colorSchemeKey?: string
	onColorScheme?: (value: _TYPE_DARK_MODE) => void
}

export const useDarkMode = (props: DarkModeProps = { followOS: true }): [
	_TYPE_DARK_MODE,
	(value: _TYPE_DARK_MODE) => void,
	() => void
] => {
	const { followOS, onColorScheme, colorSchemeKey = __KEY_THEME_COLOR_SCHEME__ } = props


	const matchDarkMedia = matchMedia('(prefers-color-scheme: dark)')

	// 获取初始主题模式
	const themeMode = useCallback(() => matchDarkMedia.matches ? 'dark' : 'light', [matchDarkMedia])

	const [darkMode, setDarkMode] = useState<_TYPE_DARK_MODE>(themeMode())



	// 更新通知 监听
	const putDarkMode = useCallback((value: _TYPE_DARK_MODE) => {
		setDarkMode(value)
		onColorScheme && onColorScheme(value)
	}, [onColorScheme])

	const toDarkMode = (value: _TYPE_DARK_MODE) => {
		const { dataset } = document.documentElement
		dataset[colorSchemeKey] = value
		putDarkMode(value)
	}
	const toggleDarkMode = () => toDarkMode(darkMode === 'dark' ? 'light' : 'dark')

	useEffect(() => {


		// 设置系统主题变更listen
		const onFollowOS = () => {
			const value = themeMode()
			const { dataset } = document.documentElement
			dataset[colorSchemeKey] = value	//同步到dataset中 触发css更新
			putDarkMode(value)
		}

		if (followOS) {
			const { dataset } = document.documentElement

			matchDarkMedia.addEventListener('change', onFollowOS)

			//判断是否跟随系统设置
			dataset[colorSchemeKey] = themeMode() //同步到dataset中 触发css更新

		} else {
			matchDarkMedia.removeEventListener('change', onFollowOS)
		}
		return () => matchDarkMedia.removeEventListener('change', onFollowOS)

	}, [colorSchemeKey, followOS, matchDarkMedia, putDarkMode, themeMode])



	return [darkMode, toDarkMode, toggleDarkMode]
}
