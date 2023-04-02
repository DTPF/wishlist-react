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
}

export default initialWishlistState;