import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import WishlistContext from 'context/wishlist/WishlistContext';
import './statusBar.scss'

export default function StatusBar() {
	const { currentWishlist } = useContext(WishlistContext);

	return (
		<div className='status-bar'>
			<div className='status-bar__nav'>
				<NavLink to={'/wishlist/'}>
					<RenderButton title='Todo' />
					<GetWishlistLength currentWishlist={currentWishlist} />
				</NavLink>
				<NavLink to={'/wishlist/active'}>
					<RenderButton title='Activo' />
					<GetWishlistLength currentWishlist={currentWishlist} />
				</NavLink>
				<NavLink to={'/wishlist/completed'}>
					<RenderButton title='Completado' />
					<GetWishlistLength currentWishlist={currentWishlist} />
				</NavLink>
			</div>
		</div>
	)
}

function RenderButton({ title }: any) {
	return (
		<button className='status-bar__nav--button'>
			{title}
		</button>
	)
}

function GetWishlistLength({ currentWishlist }: any) {
	return <div className='status-bar__nav--items-count'>{currentWishlist.wishlistItems.length}</div>
}