import { useState } from 'react';
import { FiTrash2 } from 'react-icons/fi';
import './wishlistItem.scss'

export default function WishlistItem({ status, wishlistItem }: any) {
  const [titleInput, setTiltleInput] = useState(wishlistItem.title);

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
          onClick={() => handleDeleteItem()}
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

const handleDeleteItem = () => {
  console.log('delete item');  
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