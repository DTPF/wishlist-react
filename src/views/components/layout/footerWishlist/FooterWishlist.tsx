import { useContext } from 'react';
import WishlistContext from 'context/wishlist/WishlistContext';
import RemoveWishlist from 'views/components/wishlistComponent/removeWishlist'
import './footerWishlist.scss'
import { useAuth0 } from '@auth0/auth0-react';
import { IoMdExit } from 'react-icons/io';

export default function FooterWishlist() {
	const { currentWishlist } = useContext(WishlistContext);
	const { loginWithRedirect, isAuthenticated, logout } = useAuth0();

	return (
		<footer className='footer-wish-list'>
			<div className='footer-wish-list__authentication'>
				{!isAuthenticated && (
					<p>
						<span onClick={() => loginWithRedirect()}>
							Identifícate para tener tu propia lista
						</span>
					</p>
				)}
			</div>
			<div className='footer-wish-list__remove-list'>
				{currentWishlist?.wishlistItems?.length > 0 && <RemoveWishlist />}
				{isAuthenticated && (
					<button onClick={() => logout()}>
						<IoMdExit />
					</button>
				)}
			</div>
		</footer>
	)
}