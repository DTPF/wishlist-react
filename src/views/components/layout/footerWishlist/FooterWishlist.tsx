import { useContext } from 'react';
import WishlistContext from 'context/wishlist/WishlistContext';
import RemoveWishlist from 'views/components/wishlistComponent/removeWishlist'
import './footerWishlist.scss'

export default function FooterWishlist() {
	const { wishlist } = useContext(WishlistContext);

	return (
		<footer className='footer-wish-list'>
			<div className='footer-wish-list__authentication'>
				Identifícate para tener tu propia lista
			</div>
			<div className='footer-wish-list__remove-list'>
				{wishlist.length > 0 && <RemoveWishlist />}
			</div>
		</footer>
	)
}