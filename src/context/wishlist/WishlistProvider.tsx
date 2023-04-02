import { useContext, useReducer } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UserContext from "context/user/UserContext";
import {
	addWishlistAction,
	initWishlistsByUserIdAction
} from "reducers/wishlist/wishlistActions";
import WishlistContext from "./WishlistContext";
import wishlistReducer from "reducers/wishlist/wishlistReducer";
import initialWishlistState from "./initialWishlistState";

type Props = {
  children: React.ReactNode
}

export default function WishlistProvider(props: Props) {
	const { children } = props;
	const { dbUser }: any = useContext(UserContext);
	const [wishlistState, dispatch] = useReducer(wishlistReducer, initialWishlistState);
	const { getIdTokenClaims, isAuthenticated } = useAuth0();	

	const initWishlistsByUserId = function () {
		getIdTokenClaims().then((token) => {
			initWishlistsByUserIdAction(dispatch, isAuthenticated, token, dbUser);
		})
	}

	function addNewWishlistItem(item: any) {
		getIdTokenClaims().then((token) => {
			addWishlistAction(dispatch, item, wishlistState, isAuthenticated, token);
		})
	}

	return (
		<WishlistContext.Provider value={{
			...wishlistState,
			initWishlistsByUserId,
			addNewWishlistItem
		}}>
			{children}
		</WishlistContext.Provider>
	)
}