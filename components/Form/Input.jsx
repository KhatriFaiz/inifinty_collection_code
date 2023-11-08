import styles from "./Input.module.css";

const Input = ({
  type = "text",
  label,
  fieldTouched,
  errorMessage,
  ...inputProps
}) => {
  return (
    <div className={styles.form_control}>
      {label && type !== "submit" ? (
        <label htmlFor={label}>{label}</label>
      ) : null}
      <input type={type} id={label} className={styles.input} {...inputProps} />
      {errorMessage && fieldTouched ? (
        <p className={styles.errorMessage}>{errorMessage}</p>
      ) : null}
    </div>
  );
};

export default Input;
