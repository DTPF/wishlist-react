import { useCallback, useMemo, useState } from 'react'
import ThemeContext from './ThemeContext'
import invertHexColor from 'utils/invertHexColor'
import { InitialThemeContextType } from './initialThemeState'
import { ChildrenProps } from 'interfaces/globals'

export default function ThemeProvider({ children }: ChildrenProps) {
	const themeLS = localStorage.getItem('theme-color')
	const theme = themeLS ? themeLS : '#232F3E'
	const [currentThemeColor, setThemeColor] = useState<InitialThemeContextType>({
		colorPrimary: themeLS ? invertHexColor(theme, true) : '#fff',
		colorPrimaryBg: themeLS ? themeLS : '#232F3E'
	})

	const setThemeColorAction = useCallback(async (colorPrimary: string, colorPrimaryBg: string) => {
		setThemeColor({
			colorPrimary: colorPrimary ? colorPrimary : '#fff',
			colorPrimaryBg: colorPrimaryBg ? colorPrimaryBg : '#232F3E'
		})
		document.getElementsByTagName<any>("META")[2].content = colorPrimaryBg
	}, []);

	const memoProvider = useMemo(
		() => ({
			currentThemeColor,
			setThemeColorAction,
		}),
		[currentThemeColor, setThemeColorAction]
	);

	return (
		<ThemeContext.Provider value={memoProvider}>
			{children}
		</ThemeContext.Provider>
	)
}