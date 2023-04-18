import { useContext } from 'react'
import { Link } from 'react-router-dom'
import WishlistContext from 'context/wishlist/WishlistContext'
import ColorSelect from 'views/UI/colorSelect'
import Moment from 'react-moment'
import { IoEnterOutline, IoTrash } from 'react-icons/io5'
import { HiDotsHorizontal } from 'react-icons/hi'
import './cardFooter.scss'
import { useTranslation } from 'react-i18next'
import UserContext from 'context/user/UserContext'

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
					<div className='wishlist-card-footer__popover--color-select'>
						<ColorSelect wishlistItem={wishlistItem} />
					</div>
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