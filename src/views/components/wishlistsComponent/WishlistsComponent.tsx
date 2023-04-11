import { useContext, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import UserContext from 'context/user/UserContext';
import WishlistContext from 'context/wishlist/WishlistContext'
import AddNewWishlist from './addNewWishlist';
import WishlistCardItem from './wishlistCardItem';
import Spinner from 'views/UI/spinner';
import { BsFillArrowDownCircleFill, BsFillArrowUpCircleFill } from 'react-icons/bs';
import { FaPlusCircle } from 'react-icons/fa';
import './wishlistsComponent.scss'

export default function WishlistsComponent() {
	const { wishlists, isLoading, postNewWishlist }: any = useContext(WishlistContext)
	const { dbUser } = useContext(UserContext)
	const { isLoading: isLoadingAuth0, isAuthenticated } = useAuth0();
	const [viewDirection, setViewDirection] = useState('updatedAt')
	const [viewDescentetDirection, setViewDescentetDirection] = useState(true)

	switch (viewDirection) {
		case 'updatedAt':
			wishlists.sort(function (a: any, b: any) {
				var c: any = new Date(a.updatedAt);
				var d: any = new Date(b.updatedAt);
				if (viewDescentetDirection) return d - c;
				return c - d
			})
			break;

		case 'createdAt':
			wishlists.sort(function (a: any, b: any) {
				var c: any = new Date(a.createdAt);
				var d: any = new Date(b.createdAt);
				if (viewDescentetDirection) return d - c;
				return c - d
			})
			break;

		case 'name':
			wishlists.sort((a: any, b: any) => {
				if (viewDescentetDirection) return a.wishlistName.localeCompare(b.wishlistName)
				return b.wishlistName.localeCompare(a.wishlistName)
			})
			break;

		default:
			throw new Error()
	}

	return (
		<>
			{(isLoading && isLoadingAuth0 && !isAuthenticated) ? (
				<span className='wishlists-component__spinner'>
					<Spinner />
				</span>
			) : (
				<section className='wishlists-component'>
					<div className='wishlists-component__filters'>

						<div className='wishlists-component__filters--select'>
							<select name="select" onChange={(e) => setViewDirection(e.target.value)}>
								<option value="updatedAt">Última actualización</option>
								<option value="name">Nombre</option>
								<option value="createdAt">Fecha de creación</option>
							</select>
						</div>
						<div className='wishlists-component__filters--view-direction'>
							<span onClick={() => setViewDescentetDirection(!viewDescentetDirection)}>
								{viewDescentetDirection ? <BsFillArrowDownCircleFill /> : <BsFillArrowUpCircleFill />}
							</span>
						</div>
					</div>

					<div className='wishlists-component__items'>
						<div className='wishlists-component__add-item-desktop'>
							<AddNewWishlist />
						</div>
						{wishlists.map((item: any) => (
							<WishlistCardItem
								key={item._id}
								wishlistItem={item}
							/>
						))}
					</div>
					<div className='wishlists-component__add-item-mobile'>
						<FaPlusCircle onClick={() => {
							postNewWishlist(dbUser._id)
							window.scrollTo({ top: 0, behavior: 'smooth' });
						}}
						/>
					</div>
				</section>
			)}
		</>
	)
}