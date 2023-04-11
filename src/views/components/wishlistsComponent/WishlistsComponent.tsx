import { useContext, useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import UserContext from 'context/user/UserContext';
import WishlistContext from 'context/wishlist/WishlistContext'
import AddNewWishlist from './addNewWishlist';
import WishlistCardItem from './wishlistCardItem';
import Spinner from 'views/UI/spinner';
import { FiSettings } from 'react-icons/fi';
import { FaPlusCircle } from 'react-icons/fa';
import { HiOutlineArrowDown, HiOutlineArrowUp } from 'react-icons/hi';
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
				const c: any = new Date(a.updatedAt);
				const d: any = new Date(b.updatedAt);
				if (viewDescentetDirection) return d - c;
				return c - d
			})
			break;

		case 'createdAt':
			wishlists.sort(function (a: any, b: any) {
				const c: any = new Date(a.createdAt);
				const d: any = new Date(b.createdAt);
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
						<div className='wishlists-component__filters--left-side'>
							<div className='wishlists-component__filters--left-side__select'>
								<select name="select" onChange={(e) => setViewDirection(e.target.value)}>
									<option value="updatedAt">Última actualización</option>
									<option value="name">Nombre</option>
									<option value="createdAt">Fecha de creación</option>
								</select>
							</div>
							<div className='wishlists-component__filters--left-side__view-direction'>
								<span onClick={() => setViewDescentetDirection(!viewDescentetDirection)}>
									{viewDescentetDirection ? <HiOutlineArrowDown /> : <HiOutlineArrowUp />}
								</span>
							</div>
						</div>
						<div className='wishlists-component__filters--right-side'>
							<FiSettings />
						</div>
					</div>

					<div className='wishlists-component__items'>
						{wishlists.map((item: any) => (
							<WishlistCardItem
								key={item._id}
								wishlistItem={item}
							/>
						))}
						<div className='wishlists-component__add-item-desktop'>
							<AddNewWishlist />
						</div>
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