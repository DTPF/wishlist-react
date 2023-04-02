import { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import WishlistContext from 'context/wishlist/WishlistContext';
import { NavLink } from 'react-router-dom';
import './headerWishlist.scss';

export default function HeaderWishlist() {
  const { currentWishlist } = useContext(WishlistContext);
  const { user, loginWithRedirect } = useAuth0();

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

      <div className='header-wishlist__nav'>
        <NavLink to={'/'}>
          <RenderButton title='Todo' />
          <GetWishlistLength currentWishlist={currentWishlist} />
        </NavLink>
        <NavLink to={'/active'}>
          <RenderButton title='Activo' />
          <GetWishlistLength currentWishlist={currentWishlist} />
        </NavLink>
        <NavLink to={'/completed'}>
          <RenderButton title='Completado' />
          <GetWishlistLength currentWishlist={currentWishlist} />
        </NavLink>
      </div>
    </div>
  )
}

function RenderButton({ title }: any) {
  return (
    <button className='header-wishlist__nav--button'>
      {title}
    </button>
  )
}

function GetWishlistLength({ currentWishlist }: any) {
  return <div className='header-wishlist__nav--items-count'>{currentWishlist.wishlistItems.length}</div>
}