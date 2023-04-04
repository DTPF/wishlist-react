import { useState } from 'react'
import CardHeader from './cardHeader'
import CardBody from './cardBody'
import { CardFooter } from './cardFooter'
import './wishlistCardItem.scss'

export default function WishlistCardItem({ wishlistItem }: any) {
	const [showPopover, setShowPopover] = useState(false)

	return (
		<div className='wishlist-card-item'>
			<CardHeader wishlistItem={wishlistItem} />
			<CardBody wishlistItem={wishlistItem} setShowPopover={setShowPopover} />
			<CardFooter wishlistItem={wishlistItem} showPopover={showPopover} setShowPopover={setShowPopover} />
		</div>
	)
}