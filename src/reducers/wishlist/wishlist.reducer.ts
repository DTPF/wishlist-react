import * as WishlistTypes from './wishlist.types';

export default function wishlistReducer(state: any, action: any) {
	const { type, payload } = action;

	switch (type) {
		case WishlistTypes.INIT_WISHLIST_BY_USER_ID:
			return {
				...state,
				currentWishlist: payload.currentWishlist,
				wishlists: payload.wishlists,
				wishlistsInfo: payload.wishlistsInfo
			}

		case WishlistTypes.ADD_WISHLIST:
			return {
				...state,
				wishlists: [...state.wishlists, payload],
				wishlistsInfo: {
					...state.wishlistsInfo,
					totalWishlists: ++state.wishlistsInfo.totalWishlists,
					lastModified: Date.now()
				}
			}

		case WishlistTypes.REMOVE_WISHLIST:
			return {
				...state,
				wishlists: payload.wishlists,
				wishlistsInfo: {
					...state.wishlistsInfo,
					totalWishlists: --state.wishlistsInfo.totalWishlists,
					lastModified: Date.now()
				}
			}

		case WishlistTypes.UPDATE_WISHLIST:
			return {
				...state,
				wishlists: payload.wishlists,
				currentWishlist: payload.currentWishlist,
				wishlistsInfo: {
					...state.wishlistsInfo,
					lastModified: Date.now()
				}
			}

		case WishlistTypes.ADD_WISHLIST_ITEM:
			return {
				...state,
				currentWishlist: { ...state.currentWishlist, wishlistItems: payload.newWishlistItems },
				wishlists: payload.wishlists,
				wishlistsInfo: {
					...state.wishlistsInfo,
					totalWishlistsNotes: ++state.wishlistsInfo.totalWishlistsNotes,
					lastModified: Date.now()
				}
			}

		case WishlistTypes.REMOVE_WISHLIST_ITEM:
			return {
				...state,
				wishlists: payload.wishlists,
				currentWishlist: payload.currentWishlist,
				wishlistsInfo: {
					...state.wishlistsInfo,
					totalWishlistsNotes: --state.wishlistsInfo.totalWishlistsNotes,
					lastModified: Date.now()
				}
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

		default:
			return state;
	}
}