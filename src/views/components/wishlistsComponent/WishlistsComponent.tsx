import { useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import WishlistContext from 'context/wishlist/WishlistContext'
import AddNewWishlist from './addNewWishlist';
import WishlistCardItem from './wishlistCardItem';
import Spinner from 'views/UI/spinner';
import './wishlistsComponent.scss'

export default function WishlistsComponent() {
	const { wishlists, isLoading } = useContext(WishlistContext)
	const { isLoading: isLoadingAuth0, isAuthenticated } = useAuth0();

	return (
		<>
			{(isLoading && isLoadingAuth0 && !isAuthenticated) ? (
				<span className='wishlists-component__spinner'>
					<Spinner />
				</span>
			) : (
				<section className='wishlists-component'>
					{wishlists.map((item: any) => (
						<WishlistCardItem
							key={item._id}
							wishlistItem={item}
						/>
					))}
					<AddNewWishlist />
				</section>
			)}
		</>
	)
}