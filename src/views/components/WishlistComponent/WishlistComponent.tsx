import { useContext } from 'react';
import WishlistContext from 'context/wishlist/WishlistContext';
import HeaderWishlist from './HeaderWishlist';
import PostNewItem from './PostNewItem';
import WishlistItem from './WishListItem';
import BottomList from './BottomList';
import './WishlistComponent.scss';

export default function WishlistComponent({ status }: any) {
  const { wishlist } = useContext(WishlistContext);

  return (
    <section className='wishlist-component'>
      <HeaderWishlist />
      {status !== 'completed' && <PostNewItem/>}
      <div className='wishlist-component__empty-list-msg'>
        {wishlist.length === 0 && <div>Lista vacía...</div>}
      </div>
      <div className='wishlist-component__list'>
        {wishlist && wishlist.map((wishlistItem, index) => (
          <WishlistItem
            key={index}
            wishlistItem={wishlistItem}
          />

        ))}
      </div>
      {wishlist.length > 0 && <BottomList />}
    </section>
  )
}