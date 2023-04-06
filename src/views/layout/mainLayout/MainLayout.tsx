import { Outlet } from 'react-router-dom'
import FooterWishlist from 'views/components/layout/footerWishlist/FooterWishlist'
import HeaderWishlist from 'views/components/layout/headerWishlist/HeaderWishlist'

export default function MainLayout() {
	return (
		<main>
			<HeaderWishlist />
			<Outlet />
			<FooterWishlist />
		</main>
	)
}