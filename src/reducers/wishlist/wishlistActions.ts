import { getWishlistApi, postWishlistApi } from "api/wishlist";
import * as WishlistTypes from "reducers/wishlist/wishlistTypes";
import toast from 'react-hot-toast';

export const initWishlistAction = function (dispatch: any) {
	getWishlistApi().then((res: any) => {
		if (res.status === 200) {
			dispatch({ type: WishlistTypes.INIT_WISHLIST, payload: res });
		} else {
			toast.error(res.message);
		}
	})
}

export const addWishlistAction = function (dispatch: any, item: any, tracklistState: any) {
	postWishlistApi(item).then((res: any) => {
		if (res.status === 200) {
			let newObj = [...tracklistState.wishlist];
			newObj.push(res.wishlistItem);

			dispatch({ type: WishlistTypes.ADD_WISHLIST, payload: newObj });
			toast.success(res.message);
		} else {
			toast.error(res.message);
		}
	})
}