const initialWishlistState = {
	currentWishlist: {
		_id: '',
		wishlistItems: [],
		userId: '',
		wishlistName: '',
		createdAt: '',
		updatedAt: ''
	},
	wishlists: [],
	isLoading: false,
	initWishlistsByUserId: () => { },
	postNewWishlist: (dbUserId: any, wishlistTitle: any) => { },
	addNewWishlistItem: (data: any) => { },
	removeWishlistItem: (data: any) => { },
	setCurrentWishlist: (data: any) => { },
	setIsLoading: (isLoading: boolean) => { },
	updateWishlist: (wishlistId: string, data: any) => { },
	removeWishlist: (wishlistId: string) => { },
}

export default initialWishlistState;