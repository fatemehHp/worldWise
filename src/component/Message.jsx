import styles from "./Message.module.css";

function Message({ error }) {
  return (
    <p className={styles.message}>
      <span role="img">👋</span>
       {error}
    </p>
  );
}

export default Message;