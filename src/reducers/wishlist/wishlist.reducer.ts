import * as WishlistTypes from './wishlist.types';

export default function wishlistReducer(state: any, action: any) {
	const { type, payload } = action;

	switch (type) {
		case WishlistTypes.INIT_WISHLIST_BY_USER_ID:
			return {
				...state,
				currentWishlist: payload.currentWishlist,
				wishlists: payload.wishlists,
			}

		case WishlistTypes.ADD_WISHLIST:
			return {
				currentWishlist: { ...state.currentWishlist, wishlistItems: payload.newWishlistItems },
				wishlists: payload.newWishlist
			}

		case WishlistTypes.REMOVE_WISHLIST_ITEM:
			return {
				currentWishlist: payload.newWishlistItems,
				wishlists: payload.newWishlist
			}

		default:
			return state;
	}
}