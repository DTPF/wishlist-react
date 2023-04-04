import { BsCheckCircle, BsCheckCircleFill } from 'react-icons/bs'
import './cardBody.scss'

export default function CardBody({ wishlistItem, setShowPopover }: any) {
	const wishlistItemsCompleted =
		wishlistItem.wishlistItems.filter((item: any) => item.isCompleted === true)

	return (
		<div
			className='wishlist-card-body'
			onClick={() => setShowPopover(false)}
		>
			<span className='wishlist-card-body__items-completed'>
				{wishlistItemsCompleted.length}/
				{wishlistItem.wishlistItems.length} completado
			</span>
			{wishlistItem.wishlistItems.map((item: any) => (
				<p key={item.id} className='wishlist-card-body__item'>
					{item.isCompleted ? <BsCheckCircleFill /> : <BsCheckCircle />} <span>{item.title}</span>
				</p>
			))}
		</div>
	)
}