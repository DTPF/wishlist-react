const initialUserState = {
	auth0User: {},
	dbUser: {
		_id: '',
		userId: '',
		email: '',
		name: '',
		lastname: '',
		guess: false,
		appInfo: {
			colorPrimary: '',
			colorPrimaryBg: '',
			language: ''
		},
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