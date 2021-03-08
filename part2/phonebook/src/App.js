import React, { useState, useEffect } from 'react';
import phonesService from './services/phones';
import Notification from './components/Notification';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [showAll, setShowAll] = useState('');
  const [newRequest, setNewRequest] = useState(new Date());
  const [notificationMessage, setNotificationMessage] = useState({text: null, action: null});

  const hookPersons = () => {
    phonesService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
    }

  useEffect(hookPersons, [newRequest]);

  const handleNotification = (action, person) => {
    const text = 
      action === 'error'
        ? `Information of ${person} has already been removed from server`
        : `${action} ${person}`;

    const newNotification = {text, action};
    setNotificationMessage(Object.assign(notificationMessage, newNotification));
    setTimeout(() => setNotificationMessage(Object.assign({text: null, action: null})), 5000);
  }

  const personsToShow = showAll === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(showAll.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage}/>
      <Filter setShowAll={setShowAll} />

      <h2>Add a new</h2>
      <PersonForm persons={persons} setNewRequest={setNewRequest} handleNotification={handleNotification} />
      
      <h2>Numbers</h2>
      <Persons persons={personsToShow} setNewRequest={setNewRequest} handleNotification={handleNotification} />
    </div>
  );
};

export default App;
