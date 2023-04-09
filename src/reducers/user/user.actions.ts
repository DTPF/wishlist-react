import * as UserTypes from "reducers/user/user.types";
import { initGetUserAPI } from "api/user.api";

export const initGetUserAction =
	async function (
		dispatch: any,
		isAuthenticated: boolean,
		auth0User: any
	) {
		if (isAuthenticated && auth0User.sub) {
			try {
				const response = await initGetUserAPI(auth0User.__raw, { userId: auth0User.sub });

				if (response.status === 200) {
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