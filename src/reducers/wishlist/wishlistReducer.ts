import * as WishlistTypes from './wishlistTypes';

export default function wishlistReducer(state: any, action: any) {
	const { type, payload } = action;

	switch (type) {
		case WishlistTypes.INIT_WISHLIST:
			return {
				...state,
				wishlist: payload.wishlistItems
			}

		case WishlistTypes.ADD_WISHLIST:
			return {
				...state,
				wishlist: payload
			}

		default:
			return state;
	}
}