import { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import UserContext from 'context/user/UserContext';
import WishlistContext from 'context/wishlist/WishlistContext';
import { useTranslation } from 'react-i18next';
import Moment from 'react-moment'
import './footerWishlist.scss'

export default function FooterWishlist() {
	const { wishlistsInfo } = useContext(WishlistContext)
	const { dbUser } = useContext(UserContext)
	const { isAuthenticated, isLoading }: any = useAuth0()
	const [lastModified, setLastModified] = useState("2023-04-05T12:25:50.606Z")
	const { t: translate } = useTranslation();

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
					<span>{wishlistsInfo.totalWishlists}</span> {translate('lists')}
				</div>
				<div>
					<span>{wishlistsInfo.totalWishlistsNotes}</span> {translate('notes')}
				</div>
			</section>
			{(!isLoading && isAuthenticated && lastModified) && (
				<section className='footer-wish-list__last-updated'>
					<div>
						{translate('dateLabel')} <Moment locale={dbUser.language} fromNow>
							{new Date(lastModified).valueOf()}
						</Moment>
					</div>
				</section>
			)}
		</footer>
	)
}