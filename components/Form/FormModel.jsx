import styles from "./FormModel.module.css";
import FromMessage from "./FromMessage";

const FormModel = ({ children, formMessage, ...formProps }) => {
  return (
    <div className={styles.model_container}>
      <form {...formProps}>
        {formMessage && (
          <FromMessage type={formMessage.type} message={formMessage.message} />
        )}
        {children}
      </form>
    </div>
  );
};

export default FormModel;
