import { useContext } from 'react'
import { Link } from 'react-router-dom'
import WishlistContext from 'context/wishlist/WishlistContext'
import ColorSelect from 'views/UI/colorSelect'
import Moment from 'react-moment'
import { IoEnterOutline, IoTrash } from 'react-icons/io5'
import { HiDotsHorizontal } from 'react-icons/hi'
import './cardFooter.scss'

export default function CardFooter({ wishlistItem, showPopover, setShowPopover }: any) {
	const { setCurrentWishlist, removeWishlist } = useContext(WishlistContext)

	return (
		<footer
			className='wishlist-card-footer'
			style={{ backgroundColor: `rgb(${wishlistItem.backgroundColor})`, color: wishlistItem.color }}
		>
			{showPopover && (
				<span className='wishlist-card-footer__popover'>
					<div className='wishlist-card-footer__popover--settings'>
						<ColorSelect wishlistItem={wishlistItem} />
					</div>
					<div onClick={() => removeWishlist(wishlistItem._id)} className='wishlist-card-footer__popover--remove-list'>
						<IoTrash /> <span>Eliminar lista</span>
					</div>
				</span>
			)}

			<div onClick={() => setShowPopover(!showPopover)} className='wishlist-card-footer__menu'>
				<HiDotsHorizontal />
			</div>
			<p onClick={() => setShowPopover(false)} className='wishlist-card-footer__last-modified'>
				Editado: <Moment locale="es" fromNow>{wishlistItem.updatedAt}</Moment>
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