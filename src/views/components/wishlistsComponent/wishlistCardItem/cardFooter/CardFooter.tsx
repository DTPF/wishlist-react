import { useContext } from 'react'
import { Link } from 'react-router-dom'
import UserContext from 'context/user/UserContext'
import WishlistContext from 'context/wishlist/WishlistContext'
import { useTranslation } from 'react-i18next'
import Moment from 'react-moment'
import { IoEnterOutline, IoTrash } from 'react-icons/io5'
import { HiDotsHorizontal } from 'react-icons/hi'
import './cardFooter.scss'

export default function CardFooter({ wishlistItem, showPopover, setShowPopover }: any) {
	const { setCurrentWishlist, removeWishlist } = useContext(WishlistContext)
	const { dbUser } = useContext(UserContext)
	const { t: translate } = useTranslation();

	return (
		<footer
			className='wishlist-card-footer'
			style={{ backgroundColor: wishlistItem.backgroundColor, color: wishlistItem.color }}
		>
			{showPopover && (
				<span className='wishlist-card-footer__popover'>
					<div onClick={() => removeWishlist(wishlistItem._id)} className='wishlist-card-footer__popover--remove-list'>
						<IoTrash /> <span>{translate('deleteList')}</span>
					</div>
				</span>
			)}

			<div onClick={() => setShowPopover(!showPopover)} className='wishlist-card-footer__menu'>
				<HiDotsHorizontal />
			</div>
			<p onClick={() => setShowPopover(false)} className='wishlist-card-footer__last-modified'>
				{translate('lastModified')} <Moment locale={dbUser.appInfo.language} fromNow>{wishlistItem.updatedAt}</Moment>
			</p>
			<Link
				className='wishlist-card-footer__go-to-list'
				to={'/wishlist/'}
				onClick={() => setCurrentWishlist(wishlistItem)}
			>
				<IoEnterOutline style={{ color: wishlistItem.color }} />
			</Link>
		</footer>
	)
}