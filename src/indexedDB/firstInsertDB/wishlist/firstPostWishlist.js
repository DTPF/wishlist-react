import { WISHLIST } from "../../config";
import { wishlistData } from "./wishlistData";

export default function firstPostWishlist(vls, db) {
  if (vls === 1 || vls < db.version) {
    wishlistData.forEach((wishlistItem) => {
      const { id, userId, title, link, status, createdAt } = wishlistItem;
      postWishlist(db, id, userId, title, link, status, createdAt);
    });
  }
}

function postWishlist(db, id, userId, title, link, status, createdAt) {
  let transaction = db.transaction([WISHLIST], "readwrite");
  let wishlist = transaction.objectStore(WISHLIST);
  let wishlistItem = {
    id: id,
    userId: userId,
    title: title,
    link: link,
    status: status,
    createdAt: createdAt
  };
  let request = wishlist.put(wishlistItem);

  request.onsuccess = function (e) {
    // console.log('wishlist guardada!!');
  };

  request.onerror = function () {
    console.log("Error", request.error);
  };
}