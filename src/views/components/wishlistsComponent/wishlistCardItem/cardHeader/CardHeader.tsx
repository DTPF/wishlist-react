import { useContext, useRef } from 'react'
import WishlistContext from 'context/wishlist/WishlistContext'
import './cardHeader.scss'

export default function CardHeader({ wishlistItem }: any) {
	const { updateWishlist } = useContext(WishlistContext)
	const cardTitle: any = useRef(null);

	const handleUpdateTitle = (e: any) => {
		let { innerText } = e.target;
		if (!innerText || innerText === wishlistItem.wishlistName) {			
			cardTitle.current.innerText = wishlistItem.wishlistName
			return 
		}
		return updateWishlist(wishlistItem._id, { wishlistName: innerText })
	}

	return (
		<header
			className='wishlist-card-header'
			style={{ backgroundColor: `rgb(${wishlistItem.backgroundColor})`, color: wishlistItem.color }}>
			<span
				ref={cardTitle}
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