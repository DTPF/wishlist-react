import { useEffect, useState } from "react";
import { DB_NAME_AMAZEN, DB_VERSION, WISHLIST } from "../../config";
import { isDBValid } from "../../utils/validations";

export default function useGetWishlistByUserId(userId, status) {
  const [wishlist, setWishlist] = useState('');

  useEffect(() => {
    if (!isDBValid()) return;
    let isMounted = true;
    const openRequest = indexedDB.open(DB_NAME_AMAZEN, DB_VERSION);

    openRequest.onupgradeneeded = function (e) {
      const db = e.target.result;
      isMounted && getWishlist(db, setWishlist, userId, status);
    };

    openRequest.onsuccess = function (e) {
      const db = e.target.result;
      isMounted && getWishlist(db, setWishlist, userId, status);
    };

    openRequest.onerror = function (e) {
      if (e.target.error.code === 0) {
        indexedDB.deleteDatabase(DB_NAME_AMAZEN);
        window.location.reload();
      }
    };

    return () => { isMounted = false };
  }, [userId, status])

  return wishlist;
}

const getWishlist = (db, setWishlist, userId, status) => {
  if (db.objectStoreNames.contains(WISHLIST)) {
    const request = db.transaction(WISHLIST, "readonly")
      .objectStore(WISHLIST)
      .getAll();

    request.onsuccess = function () {
      const result = request.result;
      let arr = [];

      result && result.forEach(element => {
        if (element.userId === userId) {
          if (status) {
            if (status === 'active') {
              if (element.status === 'active') {
                arr.push(element);
                return;
              }
            }
            if (status === 'completed') {
              if (element.status === 'completed') {
                arr.push(element);
                return;
              }
            }
          } else {
            arr.push(element);
          }
        }
      });

      setWishlist(arr ? arr : [],);
    };

    request.onerror = function (e) {
      console.log("onerror!", e);
    };
  } else {
    setWishlist([]);
  }
};