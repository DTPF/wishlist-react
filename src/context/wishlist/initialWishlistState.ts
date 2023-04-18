const initialWishlistState = {
	currentWishlist: {
		_id: '',
		wishlistItems: [],
		userId: '',
		wishlistName: '',
		color: '',
		backgroundColor: '',
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
	postNewWishlist: (wishlistTitle: any) => { },
	updateWishlist: (wishlistId: string, data: any) => { },
	removeWishlist: (wishlistId: string) => { },
	addNewWishlistItem: (data: any) => { },
	updateWishlistItem: (wishlistId: string, wishlistItemId: string, data: any) => { },
	removeWishlistItem: (data: any) => { },
	setCurrentWishlist: (data: any) => { },
	setIsLoading: (isLoading: boolean) => { }
}

export default initialWishlistState;