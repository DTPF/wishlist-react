import { useReducer } from "react";
import {
	addWishlistAction,
	initWishlistAction
} from "reducers/wishlist/wishlistActions";
import WishlistContext from "./WishlistContext";
import wishlistReducer from "reducers/wishlist/wishlistReducer";
import initialTracklistState from "./initialWishlistState";

export default function WishlistProvider({ children }: any) {
	const [tracklistState, dispatch] = useReducer(wishlistReducer, initialTracklistState);

	const initWishlist = function () {
		initWishlistAction(dispatch);
	}

	function addWishlist(item: any) {
		addWishlistAction(dispatch, item, tracklistState);
	}

	return (
		<WishlistContext.Provider value={{
			...tracklistState,
			initWishlist,
			addWishlist
		}}>
			{children}
		</WishlistContext.Provider>
	)
}