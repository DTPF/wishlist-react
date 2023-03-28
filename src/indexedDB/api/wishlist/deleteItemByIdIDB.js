import { DB_NAME_AMAZEN, DB_VERSION, WISHLIST } from "../../config";

export default async function deleteItemByIdIDB(id) {
  let openRequest = indexedDB.open(DB_NAME_AMAZEN, DB_VERSION);
  openRequest.onupgradeneeded = function () {
    let db = openRequest.result;
    console.log(db);
  };

  openRequest.onsuccess = function (e) {
    let db = e.target.result;
    const request = db.transaction([WISHLIST], "readwrite");
    const list = request.objectStore(WISHLIST);
    list.delete(id);
  }

  openRequest.onerror = function () {
    console.log('Delete auth error');
  }
}