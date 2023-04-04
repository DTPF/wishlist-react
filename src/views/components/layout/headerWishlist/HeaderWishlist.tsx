import { useAuth0 } from '@auth0/auth0-react';
import './headerWishlist.scss';

export default function HeaderWishlist() {
  const { user, loginWithRedirect }: any = useAuth0();

  return (
    <div className='header-wishlist'>
      <button onClick={user ? undefined : () => loginWithRedirect()} className='header-wishlist__authentication'>
        {user ? (
          <div className='header-wishlist__authentication--profile-image'>
            <img src={user?.picture} alt={`Imagen de usuario de ${user?.nickname}`} />
          </div>
        ) : (
          <p>Identifícate</p>
        )}
      </button>

      <div className='header-wishlist__title'>
        <h1>Wishlist</h1>
      </div>
    </div>
  )
}