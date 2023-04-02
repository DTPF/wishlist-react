import { basePath, apiVersion } from "./utils/config";
import { WishList } from "interfaces/wishlist";

export const getWishlistsByUserIdApi = async (token: string, userId: string): Promise<WishList> => {
	const params = {
		method: "GET",
		headers: {
			Authorization: `Bearer ${token}`
		},
	}
	const response = await fetch(`${basePath}/${apiVersion}/get-wishlists-by-user-id/${userId}`, params)
	const data = await response.json()
	return data
}

export const postNewWishlistItemApi = async (wishlistId: string, item: object, token: string): Promise<WishList> => {
	const params = {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify(item),
	}
	const response = await fetch(`${basePath}/${apiVersion}/post-new-wishlist-item/${wishlistId}`, params)
	const data = await response.json()
	return data as WishList
}

export const removeWishlistItemApi = async (wishlistId: string, wishlistItemId: string, token: any): Promise<WishList> => {
	const params = {
		method: "DELETE",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	}
	const response = await fetch(`${basePath}/${apiVersion}/remove-wishlist-item/${wishlistId}/${wishlistItemId}`, params)
	const data = await response.json()
	return data
}