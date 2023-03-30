import WishlistContext from 'context/wishlist/WishlistContext';
import { useContext, useEffect } from 'react';
import WishlistComponent from 'views/components/WishlistComponent';

export default function HomePage() {
  const { initWishlist } = useContext(WishlistContext);

  useEffect(() => {
    initWishlist()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <WishlistComponent />;
}