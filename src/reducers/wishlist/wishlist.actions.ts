import * as api from "api/wishlist.api"
import * as WishlistTypes from "reducers/wishlist/wishlist.types"
import toast from 'react-hot-toast'

export async function initWishlistsByUserIdAction(
	dispatch: any,
	isAuthenticated: boolean,
	isLoadingAuth0: any,
	token: any,
	dbUser: any
) {
	if (isAuthenticated && !isLoadingAuth0 && dbUser._id) {
		try {
			const response: any = await api.getWishlistsByUserIdApi(token, dbUser._id)

			if (response.status === 200) {
				let totalWishlistsNotes = 0
				let lastModified = "2023-04-05T12:25:50.606Z"
				response.wishlists.forEach((item: any) => {
					totalWishlistsNotes += item.wishlistItems.length
					if (item.updatedAt > lastModified) lastModified = item.updatedAt
				})

				const wishlistsInfo = {
					totalWishlists: response.wishlists.length,
					totalWishlistsNotes,
					lastModified
				}

				const findCurrentWishlist =
					response.wishlists.find((item: any) => item._id === dbUser.wishlistsInfo.currentWishlist)
				const currentWishlist =
					findCurrentWishlist ? findCurrentWishlist : response.wishlists[0]

				currentWishlist.wishlistItems.sort((a: any, b: any) => a.position - b.position)

				dispatch({
					type: WishlistTypes.INIT_WISHLIST_BY_USER_ID,
					payload: {
						currentWishlist,
						wishlists: response.wishlists,
						wishlistsInfo
					}
				})
				return dispatch({ type: WishlistTypes.SET_IS_LOADING, payload: false })
			} else {
				return dispatch({ type: WishlistTypes.SET_IS_LOADING, payload: false })
			}
		} catch (err: any) {
			return toast.error('Ha ocurrido un problema')
		}
	}
}

export async function postWishlistAction(
	dispatch: any,
	data: object,
	isAuthenticated: boolean,
	token: any
) {
	if (isAuthenticated) {
		try {
			const response: any = await api.postNewWishlistApi(data, token)

			if (response.status === 200) {
				localStorage.removeItem('color')
				toast.success(response.message)
				return dispatch({
					type: WishlistTypes.ADD_WISHLIST,
					payload: response.wishlist
				})
			} else {
				toast.error(response.message)
			}
		} catch (error) {
			return toast.error('No se ha podido crear')
		}
	}
}

export async function addWishlistItemAction(
	dispatch: any,
	item: object,
	wishlistState: any,
	isAuthenticated: boolean,
	token: any
) {
	if (isAuthenticated && wishlistState.currentWishlist._id) {
		try {
			const response: any = await api.postNewWishlistItemApi(wishlistState.currentWishlist._id, item, token)

			if (response.status === 200) {
				let newWishlistItems = wishlistState.currentWishlist.wishlistItems
				newWishlistItems.push(response.newWishlistItem)

				let wishlists = wishlistState.wishlists
				const findIndex = wishlists.findIndex((item: any) => item._id === wishlistState.currentWishlist._id)
				wishlists[findIndex] = response.wishlistStored

				toast.success(response.message)
				return dispatch({
					type: WishlistTypes.ADD_WISHLIST_ITEM,
					payload: {
						newWishlistItems,
						wishlists
					}
				})
			} else {
				toast.error('No se ha podido crear la nota')
			}
		} catch (error: any) {
			toast.error('No se ha podido crear la nota')
		}
	} else {
		let newWishlistItems = wishlistState.currentWishlist.wishlistItems
		newWishlistItems.push(item)

		let newWishlist = wishlistState.wishlists
		const findIndex = newWishlist.findIndex((item: any) => item._id === wishlistState.currentWishlist._id)
		newWishlist[findIndex] = newWishlistItems

		const wishlistTemporary = [{
			wishlistName: 'Temporary list',
			wishlistItems: newWishlistItems
		}]

		return dispatch({
			type: WishlistTypes.ADD_WISHLIST_ITEM,
			payload: {
				newWishlistItems,
				newWishlist: wishlistTemporary
			}
		})
	}
}

export async function removeWishlistItemAction(
	dispatch: any,
	isAuthenticated: boolean,
	wishlistState: any,
	wishlistId: string,
	wishlistItemId: string,
	token: any
) {
	try {
		if (isAuthenticated) {
			const response: any = await api.removeWishlistItemApi(wishlistId, wishlistItemId, token)

			let wishlists = wishlistState.wishlists
			const findIndex = wishlists.findIndex((item: any) => item._id === wishlistState.currentWishlist._id)
			wishlists[findIndex] = response.wishlist

			let orderedList: any = []
			response.wishlist.wishlistItems.forEach((item: any, index: any) => {
				item.position = index
				orderedList.push(item)
			});

			try {
				const response: any = await api.updateWishlistApi(wishlistId, { wishlistItems: orderedList }, token)

				return dispatch({
					type: WishlistTypes.REMOVE_WISHLIST_ITEM,
					payload: {
						wishlists,
						currentWishlist: response.wishlist
					}
				})
			} catch (error) {
				return toast.error('No se ha podido borrar la nota')
			}
		}
	} catch (err) {
		return toast.error('No se ha podido borrar la nota')
	}
}

export async function setCurrentWishlistAction(
	dispatch: any,
	wishlist: any,
	isAuthenticated: boolean,
	token: any,
	dbUser: any
) {
	try {
		if (isAuthenticated) {
			const response: any = await api.setCurrentWishlistAPI(wishlist._id, dbUser._id, token)

			if (response.status === 200) {
				dispatch({
					type: WishlistTypes.SET_CURRENT_WISHLIST,
					payload: {
						currentWishlist: response.wishlist,
					}
				})
				return dispatch({ type: WishlistTypes.SET_IS_LOADING, payload: false })
			}
		}
	} catch (error) {
		return toast.error('No se ha podido encontrar la lista')
	}
}

export async function removeWishlistAction(
	dispatch: any,
	isAuthenticated: boolean,
	wishlistState: any,
	wishlistId: string,
	token: any
) {
	try {
		if (isAuthenticated) {
			const response: any = await api.removeWishlistAPI(wishlistId, token)

			if (response.status === 200) {
				const filteredWishlist =
					wishlistState.wishlists.filter((item: any) => item._id !== response.wishlistItemIdDeleted)

				toast.success(`${response.message}`)
				return dispatch({
					type: WishlistTypes.REMOVE_WISHLIST,
					payload: {
						wishlists: filteredWishlist
					}
				})
			} else {
				return toast.error('No se ha podido borrar')
			}

		}
	} catch (err) {
		return toast.error('No se ha podido borrar')
	}
}

export async function updateWishlistAction(
	dispatch: any,
	isAuthenticated: boolean,
	wishlistState: any,
	wishlistId: string,
	token: any,
	data: any
) {
	try {
		if (isAuthenticated) {
			const response: any = await api.updateWishlistApi(wishlistId, data, token)

			if (response.status === 200) {
				let wishlists = wishlistState.wishlists
				const findIndex = wishlists.findIndex((item: any) => item._id === response.wishlist._id)
				wishlists[findIndex] = response.wishlist

				return dispatch({
					type: WishlistTypes.UPDATE_WISHLIST,
					payload: {
						wishlists,
						currentWishlist: response.wishlist
					}
				})
			} else {
				return toast.error(`${response.message}`)
			}
		}
	} catch (err) {
		return toast.error(`Error del servidor`)
	}
}

export async function updateWishlistItemAction(
	dispatch: any,
	isAuthenticated: boolean,
	wishlistId: string,
	wishlistItemId: any,
	wishlistState: any,
	token: any,
	data: any
) {
	try {
		if (isAuthenticated) {
			const response: any = await api.updateWishlistItemApi(wishlistId, wishlistItemId, data, token)

			if (response.status === 200) {
				let wishlists = wishlistState.wishlists
				const findIndex = wishlists.findIndex((item: any) => item._id === response.wishlist._id)
				wishlists[findIndex] = response.wishlist

				return dispatch({
					type: WishlistTypes.UPDATE_WISHLIST,
					payload: {
						wishlists,
						currentWishlist: response.wishlist
					}
				})
			} else {
				return toast.error('No se ha podido actualizar')
			}
		}
	} catch (err) {
		return toast.error('No se ha podido actualizar')
	}
}