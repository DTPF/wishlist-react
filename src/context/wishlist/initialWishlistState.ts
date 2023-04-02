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
	initWishlistsByUserId: () => { },
	addNewWishlistItem: (data: any) => { },
	removeWishlistItem: (data: any) => { },
}

export default initialWishlistState;