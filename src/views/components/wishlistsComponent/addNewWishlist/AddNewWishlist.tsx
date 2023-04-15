import { useContext, useRef } from 'react'
import WishlistContext from 'context/wishlist/WishlistContext'
import UserContext from 'context/user/UserContext'
import ColorSelect from 'views/UI/colorSelect'
import { useTranslation } from 'react-i18next'
import { BsPlusCircleDotted } from 'react-icons/bs'
import './addNewWishlist.scss'

export default function AddNewWishlist() {
	const { postNewWishlist } = useContext(WishlistContext)
	const { dbUser } = useContext(UserContext)
	const title: any = useRef(null)
	const { t: translate } = useTranslation();

	return (
		<div className='add-new-wishlist__add-new-list'>
			<span
				ref={title}
				className="add-new-wishlist__add-new-list__textarea"
				role="textbox"
				contentEditable
				suppressContentEditableWarning={true}
				aria-placeholder={translate('createWishlistPlaceholder') || ''}
				aria-labelledby='label-new-list'
			>
				<div id='label-new-list'>{translate('createWishlistPlaceholder')}</div>
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