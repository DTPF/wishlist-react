import { useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import UserContext from "context/user/UserContext";
import WishlistContext from "./WishlistContext";
import wishlistReducer from "reducers/wishlist/wishlist.reducer";
import initialWishlistState from "./initialWishlistState";
import * as action from "reducers/wishlist/wishlist.actions";
import * as WishlistTypes from "reducers/wishlist/wishlist.types";

type Props = { children: React.ReactNode }

export default function WishlistProvider(props: Props) {
	const { children } = props;
	const { dbUser }: any = useContext(UserContext);
	const [wishlistState, dispatch] = useReducer(wishlistReducer, initialWishlistState);
	const { getIdTokenClaims, isAuthenticated } = useAuth0();

	useEffect(() => {
		initWishlistsByUserId()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dbUser])

	const initWishlistsByUserId = useCallback(async () => {
		dispatch({ type: WishlistTypes.SET_IS_LOADING, payload: true })
		const user: any = await getIdTokenClaims()
			action.initWishlistsByUserIdAction(
				dispatch,
				isAuthenticated,
				user?.__raw,
				dbUser
			);
	}, [getIdTokenClaims, isAuthenticated, dbUser]);

	const postNewWishlist = useCallback(async (dbUserId: any, wishlistTitle: any) => {
		const data = {
			userId: dbUserId,
			wishlistName: wishlistTitle,
			backgroundColor: localStorage.getItem('color')
		}
		const user: any = await getIdTokenClaims()
		action.postWishlistAction(dispatch, data, isAuthenticated, user.__raw);
	}, [getIdTokenClaims, isAuthenticated]);

	const addNewWishlistItem = useCallback(async (item: any) => {
		const user: any = await getIdTokenClaims()
		action.addWishlistItemAction(dispatch, item, wishlistState, isAuthenticated, user.__raw);
	}, [getIdTokenClaims, isAuthenticated, wishlistState]);

	const removeWishlistItem = useCallback(async (wishlistItem: any) => {
		const user: any = await getIdTokenClaims()
		action.removeWishlistItemAction(dispatch, isAuthenticated, wishlistState, wishlistState.currentWishlist._id, wishlistItem.id, user.__raw);
	}, [getIdTokenClaims, isAuthenticated, wishlistState]);

	const setCurrentWishlist = useCallback(async (wishlist: any) => {
		dispatch({ type: WishlistTypes.SET_IS_LOADING, payload: true })
		const user: any = await getIdTokenClaims()
		action.setCurrentWishlistAction(dispatch, wishlist, isAuthenticated, user.__raw, dbUser)
	}, [getIdTokenClaims, isAuthenticated, dbUser]);

	const removeWishlist = useCallback(async (wishlistId: any) => {
		const user: any = await getIdTokenClaims()
		action.removeWishlistAction(dispatch, isAuthenticated, wishlistState, wishlistId, user.__raw);
	}, [getIdTokenClaims, isAuthenticated, wishlistState]);

	const updateWishlist = useCallback(async (wishlistId: string, data: any) => {
		const user: any = await getIdTokenClaims()
		action.updateWishlistAction(dispatch, isAuthenticated, wishlistState, wishlistId, user.__raw, data);
	}, [getIdTokenClaims, isAuthenticated, wishlistState]);

	const updateWishlistItem = useCallback(async (wishlistId: string, wishlistItemId: string, data: any) => {
		const user: any = await getIdTokenClaims()
		action.updateWishlistItemAction(dispatch, isAuthenticated, wishlistId, wishlistItemId, wishlistState, user.__raw, data);
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
		updateWishlistItem
	}), [
		wishlistState,
		initWishlistsByUserId,
		addNewWishlistItem,
		postNewWishlist,
		removeWishlist,
		removeWishlistItem,
		setCurrentWishlist,
		updateWishlist,
		updateWishlistItem
	])

	return (
		<WishlistContext.Provider value={memoizedProvider}>
			{children}
		</WishlistContext.Provider>
	)
}