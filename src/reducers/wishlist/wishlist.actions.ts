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

				dispatch({
					type: WishlistTypes.INIT_WISHLIST_BY_USER_ID,
					payload: {
						currentWishlist: currentWishlist,
						wishlists: response.wishlists,
						wishlistsInfo
					}
				})
				return dispatch({ type: WishlistTypes.SET_IS_LOADING, payload: false })
			} else {
				return dispatch({ type: WishlistTypes.SET_IS_LOADING, payload: false })
			}
		} catch (err: any) {
			toast.error(err)
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
				dispatch({
					type: WishlistTypes.ADD_WISHLIST,
					payload: response.wishlist
				})
				localStorage.removeItem('color')
				return toast.success(response.message)
			} else {
				toast.error(response.message)
			}
		} catch (error) {
			console.log(error)
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

				let newWishlist = wishlistState.wishlists
				const findIndex = newWishlist.findIndex((item: any) => item._id === wishlistState.currentWishlist._id)
				newWishlist[findIndex] = response.wishlistStored

				toast.success(response.message)
				return dispatch({
					type: WishlistTypes.ADD_WISHLIST_ITEM,
					payload: {
						newWishlistItems,
						newWishlist
					}
				})
			} else {
				toast.error(response.message)
			}
		} catch (error: any) {
			toast.error(error)
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
			const newItem: any = await api.removeWishlistItemApi(wishlistId, wishlistItemId, token)

			let newWishlist = wishlistState.wishlists
			const findIndex = newWishlist.findIndex((item: any) => item._id === wishlistState.currentWishlist._id)
			newWishlist[findIndex] = newItem.newWishlist

			dispatch({
				type: WishlistTypes.REMOVE_WISHLIST_ITEM,
				payload: {
					newWishlistItems: newItem.newWishlist,
					newWishlist
				}
			})

			return toast.success(`${newItem.message}`)
		}
	} catch (err) {
		console.log(err)
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
				return setTimeout(() => {
					dispatch({ type: WishlistTypes.SET_IS_LOADING, payload: false })
				}, 50)
			}
		}
	} catch (error) {
		console.log(error)

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

				dispatch({
					type: WishlistTypes.REMOVE_WISHLIST,
					payload: {
						newWishlist: filteredWishlist
					}
				})
				return toast.success(`${response.message}`)
			} else {
				return toast.error(`${response.message}`)
			}

		}
	} catch (err) {
		console.log(err)
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
				let newWishlist = wishlistState.wishlists
				const findIndex = newWishlist.findIndex((item: any) => item._id === response.wishlist._id)
				newWishlist[findIndex] = response.wishlist

				dispatch({
					type: WishlistTypes.UPDATE_WISHLIST,
					payload: {
						newWishlist
					}
				})
			} else {
				return toast.error(`${response.message}`)
			}
		}
	} catch (err) {
		console.log(err)
	}
}

export async function reorderWishlistAction(
	dispatch: any,
	isAuthenticated: boolean,
	wishlistState: any,
	wishlistOrdered: any,
	token: any,
) {
	try {
		if (isAuthenticated) {
			console.log(wishlistOrdered);
			wishlistOrdered.forEach(async (item: any, index: number) => {
				const response: any = await api.updateWishlistApi(item._id, { position: index }, token)

				console.log(response);
				if (response.status === 200) {
					let newWishlist = wishlistState.wishlists
					const findIndex = wishlistOrdered.findIndex((item: any) => item._id === response.wishlist._id)
					newWishlist[findIndex] = response.wishlist
					console.log(newWishlist);

					// return

					return dispatch({
						type: WishlistTypes.UPDATE_WISHLIST,
						payload: {
							newWishlist
						}
					})
				} else {
					return toast.error(`${response.message}`)
				}
			});

		}
	} catch (err) {
		console.log(err)
	}
}