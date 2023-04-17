import { useState } from 'react'
import ThemeContext from './ThemeContext'
import invertHexColor from 'utils/invertHexColor'
import { InitialThemeContextType } from './initialThemeState'
import { ChildrenProps } from 'interfaces/globals'

export default function ThemeProvider({ children }: ChildrenProps) {
	const themeLS = localStorage.getItem('theme-color')
	const [currentThemeColor, setThemeColor] = useState<InitialThemeContextType>({
		colorPrimary: themeLS ? invertHexColor(themeLS ? themeLS : '#232F3E', true) : '#fff',
		colorPrimaryBg: themeLS ? themeLS : '#232F3E'
	})
	const setThemeColorAction = (colorPrimary: string, colorPrimaryBg: string) => {
		setThemeColor({
			colorPrimary,
			colorPrimaryBg
		})
		document.getElementsByTagName<any>("META")[2].content = colorPrimaryBg
	}

	return (
		<ThemeContext.Provider value={{ currentThemeColor, setThemeColorAction }}>
			{children}
		</ThemeContext.Provider>
	)
}