import { useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UserContext from "context/user/UserContext";
import {
	initWishlistsByUserIdAction,
	postWishlistAction,
	addWishlistItemAction,
	removeWishlistItemAction,
	setCurrentWishlistAction,
	removeWishlistAction,
	updateWishlistAction,
	reorderWishlistAction
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

	useEffect(() => {
		initWishlistsByUserId()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dbUser._id])

	const initWishlistsByUserId = useCallback(async () => {
		dispatch({ type: WishlistTypes.SET_IS_LOADING, payload: true })
		const user: any = await getIdTokenClaims()
		initWishlistsByUserIdAction(
			dispatch,
			isAuthenticated,
			isLoadingAuth0,
			user?.__raw,
			dbUser
		);
	}, [getIdTokenClaims, isAuthenticated, isLoadingAuth0, dbUser]);

	const postNewWishlist = useCallback(async (dbUserId: any, wishlistTitle: any) => {
		const data = {
			userId: dbUserId,
			wishlistName: wishlistTitle,
			backgroundColor: localStorage.getItem('color')
		}
		const user: any = await getIdTokenClaims()
		postWishlistAction(dispatch, data, isAuthenticated, user.__raw);
	}, [getIdTokenClaims, isAuthenticated]);

	const addNewWishlistItem = useCallback(async (item: any) => {
		const user: any = await getIdTokenClaims()
		addWishlistItemAction(dispatch, item, wishlistState, isAuthenticated, user.__raw);
	}, [getIdTokenClaims, isAuthenticated, wishlistState]);

	const removeWishlistItem = useCallback(async (wishlistItem: any) => {
		const user: any = await getIdTokenClaims()
		removeWishlistItemAction(dispatch, isAuthenticated, wishlistState, wishlistState.currentWishlist._id, wishlistItem.id, user.__raw);
	}, [getIdTokenClaims, isAuthenticated, wishlistState]);

	const setCurrentWishlist = useCallback(async (wishlist: any) => {
		dispatch({ type: WishlistTypes.SET_IS_LOADING, payload: true })
		const user: any = await getIdTokenClaims()
		setCurrentWishlistAction(dispatch, wishlist, isAuthenticated, user.__raw, dbUser)
	}, [getIdTokenClaims, isAuthenticated, dbUser]);

	const removeWishlist = useCallback(async (wishlistId: any) => {
		const user: any = await getIdTokenClaims()
		removeWishlistAction(dispatch, isAuthenticated, wishlistState, wishlistId, user.__raw);
	}, [getIdTokenClaims, isAuthenticated, wishlistState]);

	const updateWishlist = useCallback(async (wishlistId: string, data: any) => {
		const user: any = await getIdTokenClaims()
		updateWishlistAction(dispatch, isAuthenticated, wishlistState, wishlistId, user.__raw, data);
	}, [getIdTokenClaims, isAuthenticated, wishlistState]);

	const reorderWishlist = useCallback(async (wishlistId: string) => {
		const user: any = await getIdTokenClaims()
		reorderWishlistAction(dispatch, isAuthenticated, wishlistState, wishlistId, user.__raw);
	}, [getIdTokenClaims, isAuthenticated, wishlistState]);

	const memoizedProvider = useMemo(() => ({
		...wishlistState,
		initWishlistsByUserId,
		postNewWishlist,
		addNewWishlistItem,
		removeWishlistItem,
		setCurrentWishlist,
		removeWishlist,
		updateWishlist,
		reorderWishlist
	}), [
		wishlistState,
		initWishlistsByUserId,
		addNewWishlistItem,
		postNewWishlist,
		removeWishlist,
		removeWishlistItem,
		setCurrentWishlist,
		updateWishlist,
		reorderWishlist
	])

	return (
		<WishlistContext.Provider value={memoizedProvider}>
			{children}
		</WishlistContext.Provider>
	)
}