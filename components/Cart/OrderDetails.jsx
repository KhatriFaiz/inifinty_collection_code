import styles from "./styles.module.css";

const OrderDetails = ({ total }) => {
  return (
    <div className={styles.order_summary_container}>
      <h3>Order details</h3>
      <hr />
      <p className={styles.order_summary_total}>
        <span>subtotal</span>
        <span>{`₹` + total}</span>
      </p>
    </div>
  );
};

export default OrderDetails;
