import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useWishlistContext } from '../../../../providers/WishlistProvider';
import deleteWishItemById from '../../../../indexedDB/api/wishlist/deleteItemByIdIDB';
import { DB_NAME_AMAZEN, DB_VERSION, WISHLIST } from '../../../../indexedDB/config';
import { FiExternalLink, FiTrash2 } from 'react-icons/fi';
import { EMAIL } from '../../../../providers/WishlistProvider';
import './WishlistItem.scss'

export default function WishlistItem({ wishlistItem, status }: any) {
  const { wishlist, setWishlist } = useWishlistContext();
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
            onBlur={(e) => handleOnBlurTitle(e, wishlistItem, setWishlist)}
          />
        )}
      </div>
      <div className='wishlist-item__check-delete'>
        <span
          className='wishlist-item__check-delete--trash'
          onClick={() => handleDeleteItem(wishlistItem.id, wishlist, wishlistItem, setWishlist)}
        >
          <FiTrash2 />
        </span>
        <div className='wishlist-item__check-delete--checkbox'>
          <label>
            <input type="checkbox" onChange={() => handleOnChangeCheckbox(wishlistItem, setWishlist, status, wishlist, isChecked, setIsChecked)} checked={wishlistItem.status === 'completed' ? true : false} />
            <span></span>
          </label>
        </div>
      </div>
    </div>
  )
}

const removeDOMItem = (status: any, wishlist: any, setWishlist: any, wishlistItem: any) => {
  if (status !== '') {
    let list = [...wishlist];
    list.forEach((item, key) => {
      if (item.id === wishlistItem.id) {
        list.splice(key, 1);
      }
    })
    setWishlist(list);
  }
}

const handleDeleteItem = (id: any, wishlist: any, wishlistItem: any, setWishlist: any) => {
  deleteWishItemById(id).then(() => {
    let list = [...wishlist];
    list.forEach((item, key) => {
      if (item.id === wishlistItem.id) {
        list.splice(key, 1);
      }
    })
    setWishlist(list);
  });
}

const handleOnChangeCheckbox = (wishlistItem: any, setWishlist: any, status: any, wishlist: any, isChecked: any, setIsChecked: any) => {
  let openRequest = indexedDB.open(DB_NAME_AMAZEN, DB_VERSION);

  openRequest.onsuccess = function (e: any) {
    let db = e.target.result;
    let transaction = db.transaction([WISHLIST], "readwrite");
    let listItem = transaction.objectStore(WISHLIST);
    let request = listItem.getAll();

    request.onsuccess = function () {
      let result = request.result;
      let newResult: any = [];

      result.forEach((item: any) => {
        if (item.userId === EMAIL) {
          newResult.push(item);
        }
      });

      if (newResult) {
        newResult.forEach((item: any) => {
          if (item.id === wishlistItem.id) {
            if (item.status === 'completed') {
              item.status = 'active';
              listItem.put(item);
              newResult && newResult.forEach((item: any, key: number) => {
                if (item.id === wishlistItem.id) {
                  newResult[key].status = 'active';
                  setWishlist(newResult);
                  removeDOMItem(status, wishlist, setWishlist, item);
                  setIsChecked(!isChecked);
                }
              })
              return;
            }

            if (item.status === 'active') {
              item.status = 'completed';
              listItem.put(item);
              newResult && newResult.forEach((item: any, key: any) => {
                if (item.id === wishlistItem.id) {
                  newResult[key].status = 'completed';
                  setWishlist(newResult);
                  removeDOMItem(status, wishlist, setWishlist, item);
                  setIsChecked(!isChecked);
                }
              })
              return;
            }
          }
        })
      }
    };

    request.onerror = function () {
      console.log('error');
    };
  }

  openRequest.onerror = function () {
    console.log('Server error');
  }

};

const handleOnChangeTitle = (e: any, setTiltleInput: any) => {
  setTiltleInput(e.target.value);
}

const handleOnBlurTitle = (
  ev: any,
  wishlistItem: { id: string; },
  setWishlist: any
) => {
  let openRequest = indexedDB.open(DB_NAME_AMAZEN, DB_VERSION);

  openRequest.onsuccess = function (e: any) {
    let db = e.target.result;
    let transaction = db.transaction([WISHLIST], "readwrite");
    let listItem = transaction.objectStore(WISHLIST);
    let request = listItem.getAll();

    request.onsuccess = function (e: any) {
      let result = e.target.result;
      let newResult: any = [];

      result.forEach((item: any) => {
        if (item.userId === EMAIL) {
          newResult.push(item);
        }
      });

      if (newResult) {
        newResult.forEach((item: any) => {
          if (item.id === ev.target.parentElement.parentElement.id) {
            item.title = ev.target.value;
            listItem.put(item);
            newResult && newResult.forEach((item: { id: string }, key: number) => {
              if (item.id === wishlistItem.id) {
                newResult[key].status = 'active';
                setWishlist(newResult);
              }
            })
            return;
          }
        })
      }
    }
  }
}