import { Notify } from 'notiflix';
import styles from './ContactsForm.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

const ContactsForm = ({ title, handleSubmit, contacts }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInput = ev => {
    const { name, value } = ev.target;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        alert('Error');
    }
  };

  const onSubmitData = ev => {
    ev.preventDefault();
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return Notify.warning('This contact is already in the list');
    }

    handleSubmit({ name, number });
    setName('');
    setNumber('');
  };

  return (
    <div className={styles.form_wrapper}>
      <h1 className={styles.title}>{title}</h1>

      <form onSubmit={onSubmitData} className={styles.form}>
        <label name="name" className={styles.input_wrapper}>
          <span className={styles.label_text}>Name:</span>
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleInput}
            value={name}
            className={styles.input}
          />
        </label>
        <label name="number" className={styles.input_wrapper}>
          <span className={styles.label_text}>Number:</span>
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleInput}
            value={number}
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.submit}>
          Add contact
        </button>
      </form>
    </div>
  );
};
ContactsForm.propTypes = {
  title: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    })
  ),
};

export default ContactsForm;
