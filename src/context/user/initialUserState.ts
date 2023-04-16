const initialUserState = {
	auth0User: {},
	dbUser: {
		_id: '',
		userId: '',
		email: '',
		name: '',
		lastname: '',
		language: '',
		guess: false,
		wishlistsInfo: {
			currentWishlist: '',
			wishlistsOrder: '',
			wishlistsDirection: ''
		},
	},
	initGetUser: () => { },
	updateUser: (data: any) => { },
}

export default initialUserState;