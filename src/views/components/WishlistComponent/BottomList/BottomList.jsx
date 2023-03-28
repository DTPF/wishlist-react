import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlistContext } from '../../../../providers/WishlistProvider';
import { DB_NAME_AMAZEN, DB_VERSION, WISHLIST } from '../../../../indexedDB/config';
import './BottomList.scss';

export default function BottomList() {
  const { wishlist, setWishlist } = useWishlistContext();
  const [hasCompletedItems, setHasCompletedItems] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    wishlist && wishlist.forEach(item => {
      if (item.status === 'active') {
        isMounted && setHasCompletedItems(false);
      }
    });
    return () => { isMounted = false }
  }, [wishlist]);

  useEffect(() => {
    let isMounted = true;
    wishlist && wishlist.forEach(item => {
      if (item.status === 'completed') {
        isMounted && setHasCompletedItems(true);
      }
    });
    return () => { isMounted = false }
  }, [wishlist]);

  const handleClickDelete = () => {
    let openRequest = indexedDB.open(DB_NAME_AMAZEN, DB_VERSION);

    openRequest.onsuccess = function (e) {
      let db = e.target.result;
      let transaction = db.transaction([WISHLIST], "readwrite");
      let listItem = transaction.objectStore(WISHLIST);
      let request = listItem.getAll();

      request.onsuccess = function (e) {
        let result = e.target.result;

        result.forEach((item) => {
          if (item.status === 'completed') {
            listItem.delete(item.id);
            let request = listItem.getAll();

            request.onsuccess = function (e) {
              const result = e.target.result;
              setWishlist(result);
            }
          }
        });
        window.location.pathname === '/completed' && navigate('/');
      };

      request.onerror = function () {
        console.log('Request error');
      };
    }

    openRequest.onerror = function () {
      console.log('Server error');
    }
  }

  return (
    <div className='bottom-list'>
      {hasCompletedItems && (
        <p className='bottom-list__delete-completed' onClick={() => handleClickDelete()}>
          Borrar completado
        </p>
      )}
    </div>
  )
}