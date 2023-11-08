import styles from "./styles.module.css";

const AddressCard = ({ data }) => {
  console.log(data);
  return (
    <div className={styles.cardContainer}>
      <p className={styles.addressName}>{data.name}</p>
      <p className={styles.addressPhone}>Phone: {data.mobileNumber}</p>
      <p className={styles.address}>{data.address},</p>
      <p className={styles.address}>
        {data.city}, {data.state}
      </p>
      <p className={styles.address}>{`${data.country} - ${data.pincode}`}</p>
    </div>
  );
};

export default AddressCard;
