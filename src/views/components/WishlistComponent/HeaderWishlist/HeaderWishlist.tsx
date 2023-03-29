import WishlistContext from 'context/wishlist/WishlistContext';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './HeaderWishlist.scss';

export default function HeaderWishlist() {
  const { wishlist } = useContext(WishlistContext);

  return (
    <div className='header-wishlist'>
      <div className='header-wishlist__title'>
        <h1>Wishlist</h1>
      </div>

      <div className='header-wishlist__nav'>
        <NavLink to={'/'}>
          <RenderButton title='Todo' />
          <GetWishlistLength wishlist={wishlist} />
        </NavLink>
        <NavLink to={'/active'}>
          <RenderButton title='Activo' />
          <GetWishlistLength wishlist={wishlist} />
        </NavLink>
        <NavLink to={'/completed'}>
          <RenderButton title='Completado' />
          <GetWishlistLength wishlist={wishlist} />
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

function GetWishlistLength({ wishlist }: any) {
  return <div className='header-wishlist__nav--items-count'>{wishlist.length}</div>
}