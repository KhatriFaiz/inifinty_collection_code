import Image from "next/image";
import styles from "./styles.module.css";

const OrderProductCard = ({ item }) => {
  return (
    <div className={styles.card_container}>
      <div className={styles.cover_image_container}>
        <Image
          src={item.coverImage}
          alt={item.title}
          className={styles.cover_image}
          fill
        />
      </div>
      <div className={styles.product_details}>
        <h3 className={styles.product_details_title}>{item.title}</h3>
        <p>₹{"discountPrice" in item ? item.discountPrice : item.price}</p>
        <p>
          <b>Quantity:</b> {item.quantity}
        </p>
      </div>
    </div>
  );
};

export default OrderProductCard;
