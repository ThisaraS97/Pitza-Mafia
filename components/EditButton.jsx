import styles from "../styles/Admin.module.css";

const EditButton = ({ setClose1 }) => {
  return (
    <div onClick={() => setClose1(false)} className={styles.button}>
Edit</div>
  );
};

export default EditButton;
