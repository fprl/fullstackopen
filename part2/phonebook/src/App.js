import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [showAll, setShowAll] = useState('');

  const hook = () => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => setPersons(response.data))
  }

  useEffect(hook, []);

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      phoneNumber: newPhone,
    }

    const personExist = persons.find(person => person.name.toLowerCase() === personObject.name.toLowerCase());
    if (personExist) {
      alert(`${personObject.name} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat(personObject));
    setNewName('');
    setNewPhone('');
  };

  const handleNameChange = e => setNewName(e.target.value);

  const handlePhoneChange = e => setNewPhone(e.target.value);

  const handleSearchChange = e => setShowAll(e.target.value);

  const personsToShow = showAll === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(showAll.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearchChange={handleSearchChange} />

      <h2>Add a new</h2>
      <PersonForm handlers={{addPerson, handleNameChange, handlePhoneChange}} newName={newName} newPhone={newPhone} />
      
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  );
};

export default App;
