import * as UserTypes from "reducers/user/user.types";
import { initGetUserAPI, updateUserApi } from "api/user.api";

export const initGetUserAction =
	async function (
		dispatch: any,
		isAuthenticated: boolean,
		auth0User: any,
		i18n: any
	) {
		if (isAuthenticated && auth0User.sub) {
			try {
				const response = await initGetUserAPI(auth0User.__raw, { userId: auth0User.sub });

				if (response.status === 200) {
					i18n.changeLanguage(response.user.language)
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
		}
	}

export const updateUserAction =
	async function (
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