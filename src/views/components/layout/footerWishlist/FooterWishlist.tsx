import { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import WishlistContext from 'context/wishlist/WishlistContext';
import OutsideClickHandler from 'react-outside-click-handler';
import Moment from 'react-moment'
import './footerWishlist.scss'

export default function FooterWishlist() {
	const { wishlistsInfo } = useContext(WishlistContext)
	const { user, loginWithRedirect, isAuthenticated, logout }: any = useAuth0()
	const [lastModified, setLastModified] = useState("2023-04-05T12:25:50.606Z")
	const [showPopover, setShowPopover] = useState(false)

	useEffect(() => {
		setLastModified(wishlistsInfo.lastModified)
		const interval = setInterval(function () {
			setLastModified(wishlistsInfo.lastModified)
		}, 30000)
		return () => {
			clearInterval(interval)
		}
	}, [wishlistsInfo.lastModified])

	return (
		<footer className='footer-wish-list'>
			<section className='footer-wish-list__wishlists-info'>
				<div>
					<span>{wishlistsInfo.totalWishlists}</span> Listas
				</div>
				<div>
					<span>{wishlistsInfo.totalWishlistsNotes}</span> Notas
				</div>
			</section>
			{isAuthenticated && (
				<section className='footer-wish-list__last-updated'>
					<div>
						Actualizado: <Moment locale="es" fromNow>{new Date(lastModified).valueOf()}</Moment>
					</div>
				</section>
			)}

			<button onClick={user ? undefined : () => loginWithRedirect()} className='footer-wish-list__authentication'>
				{user ? (
					<div onClick={() => setShowPopover(!showPopover)} className='footer-wish-list__authentication--profile-image'>
						<img onClick={() => setShowPopover(!showPopover)} src={user?.picture} alt={`Imagen de usuario de ${user?.nickname}`} width={40} height={40} />
					</div>
				) : (
					<p>Identifícate</p>
				)}
				{showPopover && (
					<OutsideClickHandler onOutsideClick={() => setShowPopover(false)}>
						<span className='footer-wish-list__authentication--popover'>
							<div className='footer-wish-list__authentication--popover__content'>
								<div className='footer-wish-list__authentication--popover__content--language'>
									🇪🇸 | 🇬🇧
								</div>
								<div onClick={() => logout()} className='footer-wish-list__authentication--popover__content--logout'>
									<p>Cerrar sesión</p>
								</div>
							</div>
						</span>
					</OutsideClickHandler>
				)}
			</button>

		</footer>
	)
}