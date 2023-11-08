import { db } from "@/firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";

const useGetCartProducts = async (uid) => {
  const temp = [];
  const productsRef = [];
  let products = [];

  const cartRes = await getDocs(collection(db, `users/${uid}/cart`));
  cartRes.forEach((item) => {
    temp.push({
      quantity: item.data().quantity,
      productId: item.data().productRef.id,
      cartItemDocId: item.id,
    });
    productsRef.push(item.data().productRef.id);
  });

  if (productsRef.length > 0) {
    const q = query(
      collection(db, `products`),
      where("productId", "in", productsRef)
    );

    const productRes = await getDocs(q);

    productRes.forEach((document) => {
      temp.forEach((item) => {
        if (item.productId === document.data().productId) {
          const temp = {
            ...item,
            ...document.data(),
          };
          products.push(temp);
        }
      });
    });
  }
  return products;
};

export default useGetCartProducts;
