const initialWishlistState = {
	currentWishlist: {
		_id: '',
		wishlistItems: [],
		userId: '',
		wishlistName: '',
		createdAt: '',
		updatedAt: ''
	},
	wishlistsInfo: {
		totalWishlists: 0,
		totalWishlistsNotes: 0,
		lastModified: ''
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