import { useContext } from 'react'
import WishlistContext from 'context/wishlist/WishlistContext'
import './colorSelect.scss'

export default function ColorSelect({ wishlistItem }: any) {
	const { updateWishlist } = useContext(WishlistContext)
	const colors = ['248, 177, 149', '246, 114, 128', '192, 108, 132', '109, 85, 124', '214, 249, 185', '172, 222, 169', '143, 187, 174', '105, 124, 140', '235, 237, 200', '154, 180, 193', '116, 104, 140', '192, 134, 123']

	const handleSetColor = (color: any) => {
		wishlistItem ? 
			updateWishlist(wishlistItem._id, { backgroundColor: color }) :
			localStorage.setItem('color', color)
	}
	return (
		<div className='color-select'>
			{colors.map((color: any) => (
				<button key={color} onClick={() => handleSetColor(color)} className='color-select__color' style={{ backgroundColor: `rgb(${color})` }}></button>
			))}
		</div>
	)
}