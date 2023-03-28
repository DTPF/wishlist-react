import { ARTICLES, WISHLIST, DB_VERSION, LS_NAME } from "../config";

export function createObjects(db) {
  if (!db.objectStoreNames.contains(ARTICLES)) {
    db.createObjectStore(ARTICLES, { keyPath: 'id' });
  }

  if (!db.objectStoreNames.contains(WISHLIST)) {
    db.createObjectStore(WISHLIST, { keyPath: 'id' });
  }

  localStorage.setItem(LS_NAME, DB_VERSION);
}