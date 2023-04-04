import { useContext, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import UserContext from 'context/user/UserContext'
import WishlistContext from 'context/wishlist/WishlistContext'
import FooterWishlist from 'views/components/layout/footerWishlist/FooterWishlist'
import HeaderWishlist from 'views/components/layout/headerWishlist/HeaderWishlist'

export default function MainLayout() {
	const { isAuthenticated } = useAuth0()
	const { initWishlistsByUserId } = useContext(WishlistContext)
	const { dbUser, initGetUser } = useContext(UserContext)
	
	useEffect(() => {
		initGetUser()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated])

	useEffect(() => {
		initWishlistsByUserId()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dbUser._id])

	return (
		<main>
			<HeaderWishlist />
			<Outlet />
			<FooterWishlist />
		</main>
	)
}