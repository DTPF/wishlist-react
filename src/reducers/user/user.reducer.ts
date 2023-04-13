import * as UserTypes from './user.types';

export default function userReducer(state: any, action: any) {
	const { type, payload } = action;

	switch (type) {
		case UserTypes.INIT_GET_USER:
			return {
				auth0User: payload.auth0User,
				dbUser: payload.dbUser
			}

		case UserTypes.UPDATE_USER:
			return {
				...state,
				dbUser: payload
			}

		default:
			return state;
	}
}