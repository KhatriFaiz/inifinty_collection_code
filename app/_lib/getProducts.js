import { db } from "@/firebase/config";
import { collection, getDocs, query } from "firebase/firestore";

async function getProductsWithQuery(...querys) {
  let products = [];

  const q2 = query(collection(db, "products"), ...querys);
  const productsData = await getDocs(q2);

  productsData.forEach((doc) => (products = [...products, doc.data()]));
  return products;
}

export { getProductsWithQuery };
