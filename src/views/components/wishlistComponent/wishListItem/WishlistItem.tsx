import { useContext, useState } from 'react';
import WishlistContext from 'context/wishlist/WishlistContext';
import { FiTrash2 } from 'react-icons/fi';
import './wishlistItem.scss'

export default function WishlistItem({ wishlistItem }: any) {
  const [titleInput, setTiltleInput] = useState(wishlistItem.title);
  const { removeWishlistItem } = useContext(WishlistContext)

  return (
    <article className={`wishlist-item ${wishlistItem.isCompleted ? 'wishlist-item-checked' : ''}`}>
      <div className='wishlist-item__title'>
        <input
          value={titleInput}
          onChange={(e) => handleOnChangeTitle(e, setTiltleInput)}
          onBlur={(e) => handleOnBlurTitle()}
        />
      </div>
      <div className='wishlist-item__check-delete'>
        <span
          className='wishlist-item__check-delete--trash'
          onClick={() => removeWishlistItem(wishlistItem)}
        >
          <FiTrash2 />
        </span>
        <div className='wishlist-item__check-delete--checkbox'>
          <label>
            <input type="checkbox" onChange={() => handleOnChangeCheckbox()} checked={wishlistItem.isCompleted} />
            <span></span>
          </label>
        </div>
      </div>
    </article>
  )
}

const handleOnChangeCheckbox = () => {
  console.log('handle checkbox'); 
};

const handleOnChangeTitle = (e: any, setTiltleInput: any) => {
  setTiltleInput(e.target.value);
}

const handleOnBlurTitle = () => {
  console.log('on blur input'); 
}