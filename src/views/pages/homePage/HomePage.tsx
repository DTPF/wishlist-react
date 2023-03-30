import { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WishlistContext from 'context/wishlist/WishlistContext';
import WishlistComponent from 'views/components/wishlistComponent';
import HelmetSEO from 'utils/helmetSEO';

export default function HomePage() {
  const { initWishlist } = useContext(WishlistContext);
  const params = useParams();

  useEffect(() => {
    initWishlist()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const title = () => {
    if (!params.isCompleted) {
      return 'Todo'
    } else if (params.isCompleted === 'active') {
      return 'Activo'
    } else {
      return 'Completado'
    }
  }

  return (
    <HelmetSEO
      title={`${title()} | Wishlist`}
      description='Wishlist Page'
    >
      <WishlistComponent params={params} />
    </HelmetSEO>
  );
}