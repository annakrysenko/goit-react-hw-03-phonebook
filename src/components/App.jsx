import { Component } from 'react';
import ContactsForm from './ContactsForm/ContactsForm';
import ContactsList from './Contacts/ContactsList';
import Filter from './Filter/Filter';
import Wrapper from './Wrapper/Wrapper';
import { nanoid } from 'nanoid';
import styles from './App.module.css';
import ContactsWrapper from './ContactsWrapper/ContactsWrapper';

export class App extends Component {
  state = {
    contacts: [],

    filter: '',
  };

  componentDidMount() {
    const contactsLocal = JSON.parse(localStorage.getItem('contacts'));
    this.setState(prevProps => {
      return { contacts: contactsLocal };
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts.length !== this.state.contacts.length) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleSubmit = ({ number, name }) => {
    this.setState(prevState => {
      return {
        contacts: [...prevState.contacts, { id: nanoid(), name, number }],
      };
    });
  };

  handleFilter = ev => {
    const { value } = ev.target;
    this.setState({ filter: value });
  };

  showFilteredContacts = () => {
    if (this.state.contacts.length > 0) {
      return this.state.contacts.filter(contact =>
        contact.name
          .toLowerCase()
          .includes(this.state.filter.toLocaleLowerCase())
      );
    }
  };

  OnClickDelete = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  render() {
    return (
      <div className={styles.container}>
        <Wrapper>
          <ContactsForm
            title="Phonebook"
            handleSubmit={this.handleSubmit}
            contacts={this.state.contacts}
          />

          <ContactsWrapper>
            <Filter
              handleFilter={this.handleFilter}
              filter={this.state.filter}
            />
            <ContactsList
              title="Contacts"
              showFilteredContacts={this.showFilteredContacts()}
              OnClickDelete={this.OnClickDelete}
            />
          </ContactsWrapper>
        </Wrapper>
      </div>
    );
  }
}
