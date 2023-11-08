import OrderProductCard from "../OrderProductCard";
import styles from "./styles.module.css";

const OrderCard = ({ date, items, amount }) => {
  return (
    <div className={styles.order_card_container}>
      <header>{date}</header>
      {/* <OrderProductCard />
      <OrderProductCard /> */}
      {items.map((item, index) => (
        <OrderProductCard item={item} key={index} />
      ))}
      <footer>
        Total amount: <b>₹{amount}</b>
      </footer>
    </div>
  );
};

export default OrderCard;
