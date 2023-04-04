import { useContext, useReducer } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UserContext from "context/user/UserContext";
import {
	initWishlistsByUserIdAction,
	postWishlistAction,
	addWishlistItemAction,
	removeWishlistItemAction,
	setCurrentWishlistAction,
	removeWishlistAction,
	updateWishlistAction
} from "reducers/wishlist/wishlist.actions";
import WishlistContext from "./WishlistContext";
import wishlistReducer from "reducers/wishlist/wishlist.reducer";
import initialWishlistState from "./initialWishlistState";
import * as WishlistTypes from "reducers/wishlist/wishlist.types";

type Props = { children: React.ReactNode }

export default function WishlistProvider(props: Props) {
	const { children } = props;
	const { dbUser }: any = useContext(UserContext);
	const [wishlistState, dispatch] = useReducer(wishlistReducer, initialWishlistState);
	const { getIdTokenClaims, isAuthenticated, isLoading: isLoadingAuth0 } = useAuth0();

	const initWishlistsByUserId = async function () {
		dispatch({ type: WishlistTypes.SET_IS_LOADING, payload: true })
		const user: any = await getIdTokenClaims()
		initWishlistsByUserIdAction(
			dispatch,
			isAuthenticated,
			isLoadingAuth0,
			user?.__raw,
			dbUser
		);
	}

	const postNewWishlist = async (dbUserId: any, wishlistTitle: any) => {
		const data = {
			userId: dbUserId,
			wishlistName: wishlistTitle,
			backgroundColor: localStorage.getItem('color')
		}
		const user: any = await getIdTokenClaims()
		postWishlistAction(dispatch, data, isAuthenticated, user.__raw);
	}

	const addNewWishlistItem = async (item: any) => {
		const user: any = await getIdTokenClaims()
		addWishlistItemAction(dispatch, item, wishlistState, isAuthenticated, user.__raw);
	}

	const removeWishlistItem = async function (wishlistItem: any) {
		const user: any = await getIdTokenClaims()
		removeWishlistItemAction(dispatch, isAuthenticated, wishlistState, wishlistState.currentWishlist._id, wishlistItem.id, user.__raw);
	}
	const setCurrentWishlist = async function (wishlist: any) {
		dispatch({ type: WishlistTypes.SET_IS_LOADING, payload: true })
		const user: any = await getIdTokenClaims()
		setCurrentWishlistAction(dispatch, wishlist, isAuthenticated, user.__raw, dbUser)
	}

	const removeWishlist = async function (wishlistId: any) {
		const user: any = await getIdTokenClaims()
		removeWishlistAction(dispatch, isAuthenticated, wishlistState, wishlistId, user.__raw);
	}

	const updateWishlist = async function (wishlistId: string, data: any) {
		const user: any = await getIdTokenClaims()
		updateWishlistAction(dispatch, isAuthenticated, wishlistState, wishlistId, user.__raw, data);
	}

	return (
		<WishlistContext.Provider value={{
			...wishlistState,
			initWishlistsByUserId,
			postNewWishlist,
			addNewWishlistItem,
			removeWishlistItem,
			setCurrentWishlist,
			removeWishlist,
			updateWishlist,
		}}>
			{children}
		</WishlistContext.Provider>
	)
}