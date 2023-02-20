import styles from './ContactsWrapper.module.css';

const ContactsWrapper = ({ children }) => {
  return <div className={styles.wrapper}>{children}</div>;
};

export default ContactsWrapper;
