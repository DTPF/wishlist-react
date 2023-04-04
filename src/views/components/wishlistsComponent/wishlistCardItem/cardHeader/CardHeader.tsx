import { useContext } from 'react'
import WishlistContext from 'context/wishlist/WishlistContext'
import { toast } from 'react-hot-toast'
import './cardHeader.scss'

export default function CardHeader({ wishlistItem }: any) {
	const { updateWishlist } = useContext(WishlistContext)
	const handleUpdateTitle = (e: any) => {
		if (!e.target.innerText) {
			e.target.innerText = wishlistItem.wishlistName
			return toast.error(`El título no puede estar vacío`);
		}
		return updateWishlist(wishlistItem._id, { wishlistName: e.target.innerText })
	}

	return (
		<header
			className='wishlist-card-header'
			style={{ backgroundColor: `rgb(${wishlistItem.backgroundColor})`, color: wishlistItem.color }}>
			<span
				key={wishlistItem._id}
				className="wishlist-card-header__textarea"
				style={{ color: wishlistItem.color }}
				role="textbox"
				contentEditable
				suppressContentEditableWarning={true}
				onBlur={(e) => handleUpdateTitle(e)}
			>
				{wishlistItem.wishlistName}
			</span>
		</header>
	)
}