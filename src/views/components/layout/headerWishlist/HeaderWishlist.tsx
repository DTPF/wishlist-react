import UserProfile from 'views/components/userProfile'
import './headerWishlist.scss'

export default function HeaderWishlist() {
  return (
    <div className='header-wishlist'>
      <UserProfile />
      <div className='header-wishlist__title'>
        <h1>DaList</h1>
      </div>
    </div>
  )
}