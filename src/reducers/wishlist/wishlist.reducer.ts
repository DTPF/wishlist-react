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
				...state,
				wishlists: [...state.wishlists, payload]
			}

		case WishlistTypes.ADD_WISHLIST_ITEM:
			return {
				...state,
				currentWishlist: { ...state.currentWishlist, wishlistItems: payload.newWishlistItems },
				wishlists: payload.newWishlist
			}

		case WishlistTypes.REMOVE_WISHLIST_ITEM:
			return {
				...state,
				currentWishlist: payload.newWishlistItems,
				wishlists: payload.newWishlist
			}

		case WishlistTypes.SET_CURRENT_WISHLIST:
			return {
				...state,
				currentWishlist: payload.currentWishlist,
			}

		case WishlistTypes.SET_IS_LOADING:
			return {
				...state,
				isLoading: payload
			}

		case WishlistTypes.REMOVE_WISHLIST:
			return {
				...state,
				wishlists: payload.newWishlist
			}

		case WishlistTypes.UPDATE_WISHLIST:
			return {
				...state,
				wishlists: payload.newWishlist
			}

		default:
			return state;
	}
}