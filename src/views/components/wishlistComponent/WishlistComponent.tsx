import { useContext } from 'react';
import WishlistContext from 'context/wishlist/WishlistContext';
import HeaderWishlist from './headerWishlist';
import PostNewItem from './postNewItem';
import WishlistItem from './wishListItem';
import FooterWishlist from '../layout/footerWishlist';
import './wishlistComponent.scss';

export default function WishlistComponent({ params }: any) {
  const { wishlist } = useContext(WishlistContext);

  const completedItems =
    wishlist.filter((item: any) => item.isCompleted === true)

  const activeItems =
    wishlist.filter((item: any) => item.isCompleted === false)

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

      {params.isCompleted !== 'completed' && <PostNewItem />}
      <FooterWishlist />
    </section>
  )
}