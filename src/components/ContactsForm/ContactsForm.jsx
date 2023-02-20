import { Component } from 'react';
import { Notify } from 'notiflix';
import styles from './ContactsForm.module.css';
import PropTypes from 'prop-types';

class ContactsForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInput = ev => {
    const { name, value } = ev.target;
    this.setState({ [name]: value });
  };

  onSubmitData = ev => {
    ev.preventDefault();
    const name = this.state.name;
    const number = this.state.number;
    if (
      this.props.contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return Notify.warning('This contact is already in the list');
    }

    this.props.handleSubmit({ name, number });
    this.setState({ number: '', name: '' });
  };

  render() {
    return (
      <div className={styles.form_wrapper}>
        <h1 className={styles.title}>{this.props.title}</h1>

        <form onSubmit={this.onSubmitData} className={styles.form}>
          <label name="name" className={styles.input_wrapper}>
            <span className={styles.label_text}>Name:</span>
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.handleInput}
              value={this.state.name}
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
              onChange={this.handleInput}
              value={this.state.number}
              className={styles.input}
            />
          </label>
          <button type="submit" className={styles.submit}>
            Add contact
          </button>
        </form>
      </div>
    );
  }
}
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
