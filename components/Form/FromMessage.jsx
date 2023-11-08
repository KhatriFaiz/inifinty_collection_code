import styles from "./FromMessage.module.css";

const FromMessage = ({ type, message }) => {
  if (type === "success") {
    return <p className={styles.form_message_sucess}>{message}</p>;
  }

  if (type === "error") {
    return <p className={styles.form_message_error}>{message}</p>;
  }

  return null;
};

export default FromMessage;
