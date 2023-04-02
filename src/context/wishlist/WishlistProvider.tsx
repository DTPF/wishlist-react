import { useContext, useReducer } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UserContext from "context/user/UserContext";
import {
	initWishlistsByUserIdAction,
	addWishlistAction,
	removeWishlistItemAction
} from "reducers/wishlist/wishlistActions";
import WishlistContext from "./WishlistContext";
import wishlistReducer from "reducers/wishlist/wishlistReducer";
import initialWishlistState from "./initialWishlistState";

type Props = { children: React.ReactNode }

export default function WishlistProvider(props: Props) {
	const { children } = props;
	const { dbUser }: any = useContext(UserContext);
	const [wishlistState, dispatch] = useReducer(wishlistReducer, initialWishlistState);
	const { getIdTokenClaims, isAuthenticated } = useAuth0();	

	const initWishlistsByUserId = function () {
		getIdTokenClaims().then((auth0User) => {
			initWishlistsByUserIdAction(dispatch, isAuthenticated, auth0User, dbUser);
		})
	}

	function addNewWishlistItem(item: any) {
		getIdTokenClaims().then((auth0User) => {
			addWishlistAction(dispatch, item, wishlistState, isAuthenticated, auth0User);
		})
	}

	const removeWishlistItem = function (wishlistItem: any) {
		getIdTokenClaims().then((auth0User) => {
			removeWishlistItemAction(dispatch, isAuthenticated, wishlistState, wishlistState.currentWishlist._id, wishlistItem.id, auth0User);
		})
	}

	return (
		<WishlistContext.Provider value={{
			...wishlistState,
			initWishlistsByUserId,
			addNewWishlistItem,
			removeWishlistItem
		}}>
			{children}
		</WishlistContext.Provider>
	)
}