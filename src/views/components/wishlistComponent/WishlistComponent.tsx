import { useContext } from 'react';
import WishlistContext from 'context/wishlist/WishlistContext';
import HeaderWishlist from '../layout/headerWishlist';
import PostNewItem from './postNewItem';
import WishlistItem from './wishListItem';
import FooterWishlist from '../layout/footerWishlist';
import './wishlistComponent.scss';
import { WishList } from 'interfaces/wishlist';

export default function WishlistComponent({ params }: any) {
  const { currentWishlist } = useContext(WishlistContext);

  const completedItems =
    currentWishlist.wishlistItems.filter((item: WishList) => item.isCompleted === true)

  const activeItems =
    currentWishlist.wishlistItems.filter((item: WishList) => item.isCompleted === false)

  function getStatus() {
    if (!params.isCompleted) {
      return currentWishlist.wishlistItems
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
        {currentWishlist.wishlistItems.length === 0 && <div>Lista vacía...</div>}
      </div>

      <div className='wishlist-component__list'>
        {getStatus()?.map((wishlistItem: any) => (
          <WishlistItem
            key={wishlistItem.id}
            wishlistItem={wishlistItem}
          />
        ))}
      </div>

      {params.isCompleted !== 'completed' && <PostNewItem />}
      <FooterWishlist />
    </section>
  )
}