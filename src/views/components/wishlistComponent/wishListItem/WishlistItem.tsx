import { useContext, useState } from 'react';
import WishlistContext from 'context/wishlist/WishlistContext';
import { FiTrash2 } from 'react-icons/fi';
import './wishlistItem.scss'

export default function WishlistItem({ wishlistItem }: any) {
  const [titleInput, setTiltleInput] = useState(wishlistItem.title);
  const { currentWishlist, removeWishlistItem, updateWishlistItem } = useContext(WishlistContext)

  const handleUpdateWishlistItem = (e: any) => {
    if (!e.target.value || e.target.value === wishlistItem.title) {
      setTiltleInput(wishlistItem.title)
      return
    }
    updateWishlistItem(currentWishlist._id, wishlistItem.id, { title: titleInput })
  }

  return (
    <article className={`wishlist-item ${wishlistItem.isCompleted ? 'wishlist-item-checked' : ''}`}>
      <div className='wishlist-item__title'>
        <input
          value={titleInput}
          onChange={(e) => setTiltleInput(e.target.value)}
          onBlur={handleUpdateWishlistItem}
        />
      </div>
      <div className='wishlist-item__check-delete'>
        <span
          className='wishlist-item__check-delete--trash'
          onClick={() => removeWishlistItem(wishlistItem)}
        >
          <FiTrash2 />
        </span>
        <div className='wishlist-item__check-delete--checkbox-container'>
          <label className='wishlist-item__check-delete--checkbox-container__label'>
            <input
              className='wishlist-item__check-delete--checkbox-container__label--input'
              type="checkbox"
              value={titleInput}
              onChange={() => updateWishlistItem(currentWishlist._id, wishlistItem.id, { isCompleted: !wishlistItem.isCompleted })} checked={wishlistItem.isCompleted}
            />
            <span className='wishlist-item__check-delete--checkbox-container__label--input__checkbox'></span>
          </label>
        </div>
      </div>
    </article>
  )
}