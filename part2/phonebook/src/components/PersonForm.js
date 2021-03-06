import React, { useState } from 'react';
import phonesService from '../services/phones';

const PersonForm = ({persons, setNewRequest}) => {
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

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
    } else {
      phonesService
        .create(personObject)
      setNewRequest(new Date());
      setNewName('');
      setNewPhone('');
    }
  };

  return (
    <form onSubmit={addPerson}>
    <div>
      name: <input value={newName} onChange={e => setNewName(e.target.value)} />
    </div>
    <div>
      number: <input value={newPhone} onChange={e => setNewPhone(e.target.value)} />
    </div>
    <button type="submit">add</button>
  </form>
  )
}

export default PersonForm;
