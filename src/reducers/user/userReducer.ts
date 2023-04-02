import * as UserTypes from './userTypes';

export default function userReducer(state: any, action: any) {
	const { type, payload } = action;

	switch (type) {
		case UserTypes.INIT_GET_USER:
			return {
				auth0User: payload.auth0User,
				dbUser: payload.dbUser
			}

		default:
			return state;
	}
}