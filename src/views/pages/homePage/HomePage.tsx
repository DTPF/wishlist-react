import WishlistsComponent from 'views/components/wishlistsComponent'
import HelmetSEO from 'utils/helmetSEO/HelmetSEO'

export default function HomePage() {
	return (
		<HelmetSEO
			title={`Wishlists`}
			description='Wishlists Page'
		>
			<WishlistsComponent />
		</HelmetSEO>
	)
}