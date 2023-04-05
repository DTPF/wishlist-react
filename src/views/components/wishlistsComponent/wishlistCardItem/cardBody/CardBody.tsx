import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs'
import './cardBody.scss'

export default function CardBody({ wishlistItem, setShowPopover }: any) {
	const wishlistItemsCompleted =
		wishlistItem.wishlistItems.filter((item: any) => item.isCompleted === true)

	return (
		<div
			className='wishlist-card-body'
			onClick={() => setShowPopover(false)}
			style={{ backgroundColor: `rgba(${wishlistItem.backgroundColor}, 0.08)` }}
		>
			{wishlistItem.wishlistItems.length > 0 && (
				<span
					className='wishlist-card-body__items-completed'
					style={{ backgroundColor: `rgba(${wishlistItem.backgroundColor}, 0.3)` }}
				>
					{wishlistItemsCompleted.length}/
					{wishlistItem.wishlistItems.length} completado
				</span>
			)}
			{wishlistItem.wishlistItems.length === 0 ? (
				<div className='wishlist-card-body__empty-list'>Lista vacía</div>
			) : (
				wishlistItem.wishlistItems.map((item: any) => (
					<p key={item.id} className='wishlist-card-body__item'>
						{item.isCompleted ? <BsCheckCircleFill /> : <BsCheckCircle />} <span>{item.title}</span>
					</p>
				))
			)}
		</div>
	)
}