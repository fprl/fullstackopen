import React, { useState, useEffect } from 'react';
import phonesService from './services/phones';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [showAll, setShowAll] = useState('');
  const [delRequest, setDelRequest] = useState(new Date());

  const hookPersons = () => {
    phonesService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
    }

  useEffect(hookPersons, [delRequest]);


  const personsToShow = showAll === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(showAll.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setShowAll={setShowAll} />

      <h2>Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      
      <h2>Numbers</h2>
      <Persons persons={personsToShow} setDelRequest={setDelRequest} />
    </div>
  );
};

export default App;
