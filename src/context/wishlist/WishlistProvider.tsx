import { useReducer } from "react";
import WishlistContext from "./WishlistContext";
import wishlistReducer from "reducers/wishlist/wishlistReducer";
import initialTracklistState from "./initialWishlistState";
import * as WishlistTypes from "reducers/wishlist/wishlistTypes";

export default function WishlistProvider({ children }: any) {
	const [tracklistState, dispatch] = useReducer(wishlistReducer, initialTracklistState);

	const initWishlist = function () {}

	function addWishlist(item: any) {
		let newObj = [...tracklistState.wishlist];
		newObj.push(item);
		dispatch({ type: WishlistTypes.ADD_WISHLIST, payload: newObj });
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