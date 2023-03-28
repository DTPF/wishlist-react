import React, { useEffect } from 'react';
import { useWishlistContext } from '../../../providers/WishlistProvider';
import useGetWishlistByUserId from '../../../indexedDB/api/wishlist/useGetWishlistByUserId';
import { EMAIL } from '../../../providers/WishlistProvider';
import HeaderWishlist from './HeaderWishlist';
import PostNewItem from './PostNewItem';
import WishlistItem from './WishListItem';
import BottomList from './BottomList';
import './WishlistComponent.scss';

export default function WishlistComponent({ status }: any) {
  const { wishlist, setWishlist }: any = useWishlistContext();
  const wishlistIdb: any = useGetWishlistByUserId(EMAIL, status);

  useEffect(() => {
    setWishlist(wishlistIdb)
  }, [setWishlist, wishlistIdb]);

  return (
    <div className='wishlist-component'>
      <HeaderWishlist />
      {status !== 'completed' && (
        <PostNewItem
          wishlist={wishlist}
          setWishlist={setWishlist}
        />
      )}
      <div className='wishlist-component__empty-list-msg'>
        {wishlist.length === 0 && <div>Lista vacía...</div>}
      </div>
      <div className='wishlist-component__list'>
        {wishlist && wishlist.map((wishlistItem: any, index: any) => (
          <WishlistItem
            key={index}
            wishlistItem={wishlistItem}
            status={status}
          />
        ))}
      </div>
      {(wishlist.length > 0) && <BottomList />}
    </div>
  )
}