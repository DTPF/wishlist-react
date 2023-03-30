import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import WishlistContext from 'context/wishlist/WishlistContext';
import HeaderWishlist from './HeaderWishlist';
import PostNewItem from './PostNewItem';
import WishlistItem from './WishListItem';
import FooterWishlist from '../layout/footerWishlist';
import './WishlistComponent.scss';

export default function WishlistComponent() {
  const { wishlist } = useContext(WishlistContext);
  const params = useParams();

  const completedItems = wishlist.filter((item: any) => {
    return item.isCompleted === true
  })

  const activeItems = wishlist.filter((item: any) => {
    return item.isCompleted === false
  })

  function getStatus() {
    if (!params.isCompleted) {
      return wishlist
    } else if (params.isCompleted === 'active') {
      return activeItems
    } else {
      return completedItems
    }
  }

  return (
    <section className='wishlist-component'>
      <HeaderWishlist />
      <div className='wishlist-component__empty-list-msg'>
        {wishlist.length === 0 && <div>Lista vacía...</div>}
      </div>

      <div className='wishlist-component__list'>
        {getStatus().map((wishlistItem, index) => (
          <WishlistItem
            key={index}
            wishlistItem={wishlistItem}
          />
        ))}
      </div>

      {params.isCompleted !== 'completed' && <PostNewItem/>}
      <FooterWishlist />
    </section>
  )
}