import { basePath, apiVersion } from "./utils/config";
import { WishList } from "interfaces/wishlist";

export const getWishlistApi = async (): Promise<WishList> => {
	const response = await fetch(`${basePath}/${apiVersion}/get-wishlist`)
	const data = await response.json()
	return data as WishList
}

export const postWishlistApi = async (item: any): Promise<WishList> => {
	const params = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(item),
	}
	const response = await fetch(`${basePath}/${apiVersion}/post-wishlist-item`, params)
	const data = await response.json()
	return data as WishList
}