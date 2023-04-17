export interface InitialThemeContextType {
	colorPrimary: string;
	colorPrimaryBg: string
}

export interface UpdateCurrentThemeContextType {
	currentThemeColor: InitialThemeContextType;
	setThemeColorAction: (colorPrimary: string, colorPrimaryBg: string) => void
}

export const initialThemeState = {
	currentThemeColor: { colorPrimary: '', colorPrimaryBg: '' },
	setThemeColorAction: (colorPrimary: string, colorPrimaryBg: string) => { }
}