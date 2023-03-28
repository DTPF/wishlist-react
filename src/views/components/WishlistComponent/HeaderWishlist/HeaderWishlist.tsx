import React from 'react';
import { NavLink } from 'react-router-dom';
import { useWishlistContext } from '../../../../providers/WishlistProvider';
import './HeaderWishlist.scss';

export default function HeaderWishlist() {
  const { wishlist }: any = useWishlistContext();

  return (
    <div className='header-wishlist'>
      <div className='header-wishlist__title'>
        <h1>Wishlist</h1>
      </div>

      <div className='header-wishlist__nav'>
        <NavLink to={'/'}>
          <button className='header-wishlist__nav--button'>
            Todo
          </button>
          <div className='header-wishlist__nav--items-count'>{wishlist.length}</div>
        </NavLink>
        <NavLink to={'/active'}>
          <button className='header-wishlist__nav--button'>
            Activo
          </button>
          <div className='header-wishlist__nav--items-count'>{wishlist.length}</div>
        </NavLink>
        <NavLink to={'/completed'}>
          <button className='header-wishlist__nav--button'>
            Completado
          </button>
          <div className='header-wishlist__nav--items-count'>{wishlist.length}</div>
        </NavLink>
      </div>
    </div>
  )
}