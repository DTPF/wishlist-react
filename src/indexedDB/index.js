import { DB_NAME_AMAZEN, DB_VERSION, LS_VERSION } from "./config";
import { createObjects } from "./utils/manageObjects";
import firstPostArticles from "./firstInsertDB/articles/firstPostArticles";
import firstPostWishlist from "./firstInsertDB/wishlist/firstPostWishlist";

export default function dbIndexed() {
  let openRequest = indexedDB.open(DB_NAME_AMAZEN, DB_VERSION);

  openRequest.onupgradeneeded = function () {
    let db = openRequest.result;
    createObjects(db);
  };

  openRequest.onsuccess = function (e) {
    const db = e.target.result;
    firstPostArticles(LS_VERSION, db);
    firstPostWishlist(LS_VERSION, db);
  }
}