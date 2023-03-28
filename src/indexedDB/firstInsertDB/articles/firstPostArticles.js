import { ARTICLES } from "../../config";
import { articlesData } from "./articlesData";

export default function firstPostArticles(vls, db) {
  if (vls === 1 || vls < db.version) {
    articlesData.forEach((article, index) => {
      const { title, stars, price, image, sizes, info, stock } = article;
      postArticles(db, title, stars, price, image, sizes, info, stock, index);
    });
  }
}

function postArticles(db, title, stars, price, image, sizes, info, stock, index) {
  let transaction = db.transaction([ARTICLES], "readwrite");
  let articles = transaction.objectStore(ARTICLES);
  let article = {
    id: index,
    title: title,
    stars: stars,
    price: price,
    image: image,
    sizes: sizes,
    info: info,
    stock: stock
  };
  let request = articles.put(article);

  request.onsuccess = function (e) {
  };

  request.onerror = function () {
    console.log("Error", request.error);
  };
}