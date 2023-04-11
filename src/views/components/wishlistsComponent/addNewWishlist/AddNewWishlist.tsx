import { useContext, useRef } from 'react'
import WishlistContext from 'context/wishlist/WishlistContext'
import UserContext from 'context/user/UserContext'
import ColorSelect from 'views/UI/colorSelect'
import { BsPlusCircleDotted } from 'react-icons/bs'
import './addNewWishlist.scss'

export default function AddNewWishlist() {
	const { postNewWishlist } = useContext(WishlistContext)
	const { dbUser } = useContext(UserContext)
	const title: any = useRef(null)

	return (
		<div className='add-new-wishlist__add-new-list'>
			<span
				ref={title}
				className="add-new-wishlist__add-new-list__textarea"
				role="textbox"
				contentEditable
				suppressContentEditableWarning={true}
				aria-placeholder="Nueva lista"
				aria-labelledby='label-new-list'
			>
				<div id='label-new-list'>Nueva lista</div>
			</span>
			<div className="add-new-wishlist__add-new-list__color-select">
				<ColorSelect />
			</div>
			<div className="add-new-wishlist__add-new-list__add-button">
				<BsPlusCircleDotted onClick={() => {
					postNewWishlist(dbUser._id, title.current.innerText)
					title.current.innerText = ''
					window.scrollTo({ top: 0, behavior: 'smooth' });
				}} />
			</div>
		</div>
	)
}