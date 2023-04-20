import invertHexColor from "utils/invertHexColor";
const themeLS = localStorage.getItem('theme-color')

export interface InitialThemeContextType {
	colorPrimary: string
	colorPrimaryBg: string,
	wishlistColor: string,
	wishlistColorBg: string
}

export interface UpdateCurrentThemeContextType {
	currentThemeColor: InitialThemeContextType;
	setAppThemeColorAction: (color: string) => void
	setWishlistThemeColorAction: (color: string) => void
}

export const initialThemeContext = {
	currentThemeColor: {
		colorPrimary: '',
		colorPrimaryBg: '',
		wishlistColor: '',
		wishlistColorBg: ''
	},
	setAppThemeColorAction: (color: string) => { },
	setWishlistThemeColorAction: (color: string) => { }
}

export const initialThemeState = {
	colorPrimary: themeLS ? invertHexColor(themeLS) : '#fff',
	colorPrimaryBg: themeLS ? themeLS : '#232F3E',
	wishlistColor: '',
	wishlistColorBg: ''
}