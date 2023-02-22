import ContactsForm from './ContactsForm/ContactsForm';
import ContactsList from './Contacts/ContactsList';
import Filter from './Filter/Filter';
import Wrapper from './Wrapper/Wrapper';
import { nanoid } from 'nanoid';
import styles from './App.module.css';
import ContactsWrapper from './ContactsWrapper/ContactsWrapper';
import { useState, useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleSubmit = ({ number, name }) => {
    setContacts(prevState => [...prevState, { id: nanoid(), name, number }]);
  };

  const handleFilter = ev => {
    const { value } = ev.target;
    setFilter(value);
  };

  const showFilteredContacts = contacts.filter(({ name }) =>
    name.toLowerCase().includes(filter.toLowerCase())
  );

  const OnClickDelete = id =>
    setContacts(prevState => prevState.filter(contact => contact.id !== id));

  return (
    <div className={styles.container}>
      <Wrapper>
        <ContactsForm
          title="Phonebook"
          handleSubmit={handleSubmit}
          contacts={contacts}
        />

        <ContactsWrapper>
          <Filter handleFilter={handleFilter} filter={filter} />
          <ContactsList
            title="Contacts"
            showFilteredContacts={showFilteredContacts}
            OnClickDelete={OnClickDelete}
          />
        </ContactsWrapper>
      </Wrapper>
    </div>
  );
};
