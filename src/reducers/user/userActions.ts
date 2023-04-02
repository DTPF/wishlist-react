import * as UserTypes from "reducers/user/userTypes";
import { initGetUserAPI } from "api/user";

export const initGetUserAction =
	async function (
		dispatch: any,
		isAuthenticated: boolean,
		auth0User: any
	) {
		if (isAuthenticated && auth0User.sub) {
			try {
				const response = await initGetUserAPI(auth0User.__raw, { userId: auth0User.sub });
				return dispatch({
					type: UserTypes.INIT_GET_USER,
					payload: {
						auth0User: auth0User,
						dbUser: response.user
					}
				});
			} catch (err) {
				console.log(err);
			}
		}
	}