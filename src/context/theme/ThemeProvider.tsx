import { useCallback, useEffect, useMemo, useState } from 'react'
import { ConfigProvider } from 'antd'
import ThemeContext from './ThemeContext'
import invertHexColor from 'utils/invertHexColor'
import { InitialThemeContextType } from './initialThemeState'
import { ChildrenProps } from 'interfaces/globals'

export default function ThemeProvider({ children }: ChildrenProps) {
	const themeLS = localStorage.getItem('theme-color')
	const [currentThemeColor, setThemeColor] = useState<InitialThemeContextType>({
		colorPrimary: '#fff',
		colorPrimaryBg: '#232F3E'
	})

	useEffect(() => {
		if (themeLS) {
			setThemeColor({
				colorPrimary: themeLS ? invertHexColor(themeLS, true) : '#fff',
				colorPrimaryBg: themeLS ? themeLS : '#232F3E'
			})
		}
	}, [themeLS])

	const setThemeColorAction = useCallback(
		async (colorPrimary: string, colorPrimaryBg: string) => {
			setThemeColor({
				colorPrimary: colorPrimary ? colorPrimary : '#fff',
				colorPrimaryBg: colorPrimaryBg ? colorPrimaryBg : '#232F3E'
			})
			document.getElementsByTagName<any>("META")[2].content = colorPrimaryBg
		}, []
	);

	const memoProvider = useMemo(
		() => ({
			currentThemeColor,
			setThemeColorAction,
		}),
		[currentThemeColor, setThemeColorAction]
	);

	return (
		<ConfigProvider
			theme={{ token: { colorPrimary: currentThemeColor.colorPrimaryBg } }}
		>
			<ThemeContext.Provider value={memoProvider}>
				{children}
			</ThemeContext.Provider>
		</ConfigProvider>
	)
}