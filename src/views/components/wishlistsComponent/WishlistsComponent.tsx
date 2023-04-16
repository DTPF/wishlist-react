import { useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import UserContext from 'context/user/UserContext'
import WishlistContext from 'context/wishlist/WishlistContext'
import AddNewWishlist from './addNewWishlist'
import WishlistCardItem from './wishlistCardItem'
import FilterDropdown from './filterDropdown/FilterDropdown'
import Spinner from 'views/UI/spinner'
import { useTranslation } from 'react-i18next'
import { Button, Empty, Skeleton, Space } from 'antd'
import { FaPlusCircle } from 'react-icons/fa'
import { AppstoreOutlined } from '@ant-design/icons'
import './wishlistsComponent.scss'

export default function WishlistsComponent() {
	const { wishlists, isLoading, postNewWishlist } = useContext(WishlistContext)
	const { dbUser } = useContext(UserContext)
	const { isLoading: isLoadingAuth0 } = useAuth0()
	const { wishlistsOrder, wishlistsDirection } = dbUser.wishlistsInfo
	const { t: translate } = useTranslation();
	type updatedAt = (string | number | Date)

	switch (wishlistsOrder) {
		case 'updatedAt':
			wishlists.sort(function (a: { updatedAt: updatedAt }, b: { updatedAt: updatedAt }) {
				const c: any = new Date(a.updatedAt)
				const d: any = new Date(b.updatedAt)
				if (wishlistsDirection === 'desc') return d - c
				return c - d
			})
			break

		case 'createdAt':
			wishlists.sort(function (a: { createdAt: updatedAt }, b: { createdAt: updatedAt }) {
				const c: any = new Date(a.createdAt)
				const d: any = new Date(b.createdAt)
				if (wishlistsDirection === 'desc') return d - c
				return c - d
			})
			break

		case 'name':
			wishlists.sort((a: { wishlistName: string }, b: { wishlistName: string }) => {
				if (wishlistsDirection === 'desc') return b.wishlistName.localeCompare(a.wishlistName)
				return a.wishlistName.localeCompare(b.wishlistName)
			})
			break
	}

	return (
		<>
			{(isLoadingAuth0 && isLoading) ? (
				<Space className='wishlists-component__skeleton'>
					{[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
						<Skeleton.Node key={item} active>
							<Spinner />
						</Skeleton.Node>
					))}
				</Space>
			) : (
				<section className='wishlists-component'>
					<div className='wishlists-component__filters'>
						{wishlists.length > 0 && (
							<>
								<div className='wishlists-component__filters--left-side'>
									<div className='wishlists-component__filters--left-side__select'>
										<FilterDropdown />
									</div>
								</div>
								<div className='wishlists-component__filters--right-side'>
									<AppstoreOutlined />
								</div>
							</>
						)}
					</div>

					<div className='wishlists-component__items'>
						{(wishlists.length === 0 && !isLoading) ? (
							<Empty
								image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
								imageStyle={{ width: 400, height: 200 }}
								description={
									<span>
										{translate('emptyWishlists')}
									</span>
								}
								className='wishlists-component__items--empty-msg'
							>
								<Button onClick={() => postNewWishlist(dbUser._id, null)} type="primary">
									{translate('createWishlist')}
								</Button>
							</Empty>
						) : (
							<>
								{wishlists.map((item: { _id: string }) => (
									<WishlistCardItem
										key={item._id}
										wishlistItem={item}
									/>
								))}
								{wishlists.length > 0 && (
									<div className='wishlists-component__items--add-item-desktop'>
										<AddNewWishlist />
									</div>
								)}
							</>
						)}
					</div>
					<div className='wishlists-component__add-item-mobile'>
						<FaPlusCircle onClick={() => {
							postNewWishlist(dbUser._id, null)
							window.scrollTo({ top: 0, behavior: 'smooth' })
						}}
						/>
					</div>
				</section>
			)}
		</>
	)
}