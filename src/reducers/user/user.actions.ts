import * as UserTypes from "reducers/user/user.types";
import { initGetUserAPI, updateUserApi } from "api/user.api";

export const initGetUserAction = async function (
	dispatch: any,
	isAuthenticated: boolean,
	auth0User: any,
	i18n: any,
	isLoading: boolean
) {
	const themeLS = localStorage.getItem('theme-color')
	if (themeLS) {
		document.getElementsByTagName<any>("META")[2].content = (themeLS)
	}
	const initServices = (response: any) => {
		const { language, colorPrimaryBg } = response.user.appInfo
		i18n.changeLanguage(language)
		localStorage.setItem('theme-color', colorPrimaryBg)
		document.getElementsByTagName<any>("META")[2].content = colorPrimaryBg
	}
	if (!isLoading && isAuthenticated && auth0User.sub) {
		try {
			const response = await initGetUserAPI(auth0User.__raw, { userId: auth0User.sub });
			if (response.status === 200 || response.status === 201) {
				initServices(response)
				return dispatch({
					type: UserTypes.INIT_GET_USER,
					payload: {
						auth0User: auth0User,
						dbUser: response.user
					}
				});
			} else {
				throw new Error()
			}
		} catch (err) {
			throw new Error()
		}
	} else {
		if (!isLoading) {
			return dispatch({
				type: UserTypes.SET_GUESS,
				payload: true
			})
		}
	}
}

export const updateUserAction = async function (
	dispatch: any,
	userId: string,
	data: any,
	token: any
) {
	try {
		const response = await updateUserApi(userId, data, token.__raw);

		if (response.status === 200) {
			return dispatch({
				type: UserTypes.UPDATE_USER,
				payload: response.user
			});
		} else {
			throw new Error()
		}
	} catch (err) {
		throw new Error()
	}
}