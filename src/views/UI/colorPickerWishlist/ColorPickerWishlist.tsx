import { useContext } from 'react'
import UserContext from 'context/user/UserContext';
import WishlistContext from 'context/wishlist/WishlistContext';
import ThemeContext from 'context/theme/ThemeContext';
import invertHexColor from 'utils/invertHexColor';
import './colorPickerWishlist.scss'

export default function ColorPickerWishlist() {
	const { updateWishlistColor } = useContext(UserContext)
	const { wishlistsInfo } = useContext(WishlistContext)
	const { currentThemeColor, setWishlistThemeColorAction } = useContext(ThemeContext)
	const { wishlistColor, wishlistColorBg } = currentThemeColor

	const handleSaveUsedWishlistColor = (color: any) => {
		const invertColor = invertHexColor(color)
		setWishlistThemeColorAction(color)
		updateWishlistColor({
			wishlistColor: invertColor,
			wishlistColorBg: color
		})
	}

	const handleSaveNewWishlistColor = () => {
		updateWishlistColor({ wishlistColor, wishlistColorBg })
	}

	return (
		<div className='color-picker-wishlist-container'>
			<div className="color-picker-wishlist-container__input">
				<input
					type='color'
					value={currentThemeColor.wishlistColorBg}
					onChange={(e) => setWishlistThemeColorAction(e.target.value)}
					style={{
						backgroundColor: `${currentThemeColor.wishlistColorBg}80`,
					}}
					onBlur={handleSaveNewWishlistColor}
				/>
			</div>
			{(wishlistsInfo.colorsUsed.length > 0) && (
				<div className="color-picker-wishlist-container__colors-used">
					{wishlistsInfo.colorsUsed.map((color: string) => (
						<button
							key={color}
							style={{
								color: color,
								backgroundColor: color,
								border: 0,
							}}
							onClick={() => handleSaveUsedWishlistColor(color)}
						/>
					))}
				</div>
			)}
		</div>
	)
}