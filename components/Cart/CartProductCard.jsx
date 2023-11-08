import Image from "next/image";
import styles from "./styles.module.css";
import QuantityCounter from "./QuantityCounter";

const CartProductCard = ({ product, uid, handleRemove, handleUpdate }) => {
  return (
    <div className={styles.card_container}>
      <div className={styles.product_image_container}>
        <Image
          src={product.coverImage}
          fill={true}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          alt="cart product"
        />
      </div>
      <div className={styles.product_details_container}>
        <div className={styles.product_details}>
          <h4>{product.title}</h4>
          <p>
            <span className={styles.discount_price}>
              {"₹" + product.discountPrice}
            </span>
            <span className={styles.original_price}>{"₹" + product.price}</span>
          </p>
          <QuantityCounter
            quantityCount={product.quantity}
            uid={uid}
            cartItemId={product.cartItemDocId}
            handleUpdate={handleUpdate}
          />
          <div>
            <button
              className={styles.remove_button}
              onClick={() => handleRemove(product.cartItemDocId)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProductCard;
