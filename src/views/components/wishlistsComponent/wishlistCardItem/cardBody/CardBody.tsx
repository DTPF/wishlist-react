import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import WishlistContext from 'context/wishlist/WishlistContext'
import { CheckOutlined } from '@ant-design/icons'
import './cardBody.scss'

export default function CardBody({ wishlistItem, setShowPopover }: any) {
	const { setCurrentWishlist } = useContext(WishlistContext)
	const { t: translate } = useTranslation();
	const wishlistItemsCompleted =
		wishlistItem.wishlistItems.filter((item: any) => item.isCompleted === true)

	return (
		<Link
			to={'/wishlist/'}
			onClick={() => setCurrentWishlist(wishlistItem)}
			style={{ textDecoration: 'none'}}
		>
			<div
				className='wishlist-card-body'
				onClick={() => setShowPopover(false)}
				style={{ backgroundColor: `${wishlistItem.backgroundColor}0D` }}
			>
				{wishlistItem.wishlistItems.length > 0 && (
					<span
						className='wishlist-card-body__items-completed'
						style={{ backgroundColor: `rgba(${wishlistItem.backgroundColor}, 0.3)` }}
					>
						{wishlistItemsCompleted.length}/
						{wishlistItem.wishlistItems.length} {translate('completedItems')}
					</span>
				)}
				{wishlistItem.wishlistItems.length === 0 ? (
					<div className='wishlist-card-body__empty-list'>{translate('emptyMessage')}</div>
				) : (
					wishlistItem.wishlistItems.map((item: any) => (
						<article key={item.id} className='wishlist-card-body__item'>
							<div style={{ backgroundColor: item.isCompleted && `rgba(${wishlistItem.backgroundColor}, 0.1)` }}>
								{item.isCompleted ? <CheckOutlined /> : '' }
								<span style={{ color: item.isCompleted ? '#656565' : '#383838' }}>{item.title}</span>
							</div>
						</article>
					))
				)}
			</div>
		</Link>
	)
}