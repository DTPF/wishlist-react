import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiExternalLink, FiTrash2 } from 'react-icons/fi';
import './WishlistItem.scss'

export default function WishlistItem({ wishlistItem, status }: any) {
  const [isChecked, setIsChecked] = useState(false);
  const [titleInput, setTiltleInput] = useState(wishlistItem.title);

  useEffect(() => {
    setIsChecked(wishlistItem.status === 'completed' ? true : false)
  }, [wishlistItem]);

  return (
    <div className={`wishlist-item ${isChecked ? 'wishlist-item-checked' : ''}`} id={wishlistItem.id}>
      <div className='wishlist-item__title'>
        {wishlistItem.link ? (
          <div className='wishlist-item__title--link'>
            <Link to={wishlistItem.link}><FiExternalLink /></Link>
            <h3>{wishlistItem.title}</h3>
          </div>
        ) : (
          <input
            value={titleInput}
            onChange={(e) => handleOnChangeTitle(e, setTiltleInput)}
            onBlur={(e) => handleOnBlurTitle()}
          />
        )}
      </div>
      <div className='wishlist-item__check-delete'>
        <span
          className='wishlist-item__check-delete--trash'
          onClick={() => handleDeleteItem()}
        >
          <FiTrash2 />
        </span>
        <div className='wishlist-item__check-delete--checkbox'>
          <label>
            <input type="checkbox" onChange={() => handleOnChangeCheckbox()} checked={wishlistItem.status === 'completed' ? true : false} />
            <span></span>
          </label>
        </div>
      </div>
    </div>
  )
}

const handleDeleteItem = () => { }

const handleOnChangeCheckbox = () => { };

const handleOnChangeTitle = (e: any, setTiltleInput: any) => {
  setTiltleInput(e.target.value);
}

const handleOnBlurTitle = () => { }