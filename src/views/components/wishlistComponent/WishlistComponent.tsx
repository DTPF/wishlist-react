import { useContext } from 'react';
import WishlistContext from 'context/wishlist/WishlistContext';
import PostNewItem from './postNewItem';
import WishlistItem from './wishListItem';
import StatusBar from './statusBar/StatusBar';
import Spinner from 'views/UI/spinner';
import { WishList } from 'interfaces/wishlist';
import './wishlistComponent.scss';

export default function WishlistComponent({ params }: any) {
  const { isLoading, currentWishlist } = useContext(WishlistContext);

  const completedItems =
    currentWishlist.wishlistItems.filter((item: WishList) => item.isCompleted === true)

  const activeItems =
    currentWishlist.wishlistItems.filter((item: WishList) => item.isCompleted === false)

  function getStatus() {
    if (!params.isCompleted) return currentWishlist.wishlistItems
    if (params.isCompleted === 'active') return activeItems
    return completedItems
  }

  return (
    <section className='wishlist-component'>
      <StatusBar />
      {isLoading ? (
        <div className='wishlist-component__spinner'>
          <Spinner />
        </div>
      ) : (
        <>
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
        </>

      )}
    </section>
  )
}