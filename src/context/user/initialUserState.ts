const initialUserState = {
	auth0User: {},
	dbUser: {
		_id: '',
		userId: '',
		wishlistsInfo: {
			currentWishlist: ''
		},
		language: '',
	},
	initGetUser: () => { },
}

export default initialUserState;