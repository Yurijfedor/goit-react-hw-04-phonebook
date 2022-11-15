import { useState, useEffect } from 'react';
import { Box } from 'constans';
import { nanoid } from 'nanoid';
import { ContactForm } from './phonebook/contactForm';
import { ContactList } from './phonebook/contactList';
import { Filter } from './phonebook/filter';

const LS_KEY = 'my contacts';

export const App = () => {
  const [contacts, setContacts] = useState([
    // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = JSON.parse(localStorage.getItem(LS_KEY));
    if (savedContacts) {
      setContacts([...savedContacts]);
    }
    return;
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const handleFormSubmit = (name, number) => {
    const contact = {
      name,
      number,
      id: nanoid(),
    };
    const checkName = contacts.find(el => el.name === contact.name);
    !checkName
      ? setContacts([...contacts, contact])
      : alert(` ${checkName.name} is already in contacts `);
  };

  const changeFilterState = value => {
    setFilter(value);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Box
      width="400px"
      p={3}
      ml="auto"
      mr="auto"
      mt={4}
      boxShadow="rgba(0, 0, 0, 0.24) 0px 3px 8px"
    >
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleFormSubmit} />
      <h2>Contacts</h2>
      <Filter onChange={changeFilterState} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
    </Box>
  );
};
