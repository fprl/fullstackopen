import React, { useState } from 'react';
import phonesService from '../services/phones';

const PersonForm = ({persons, setNewRequest}) => {
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const addPerson = (e) => {
    e.preventDefault();

    const personObject = {
      name: newName,
      number: newPhone,
    }

    const personExist = persons.find(person => person.name.toLowerCase() === personObject.name.toLowerCase());
    const numberExist = persons.find(person => person.number === personObject.number)

    if (personExist && numberExist) {
      alert(`${personExist.name} is already added to phonebook`);
      return;
    } else if (personExist && !numberExist) {
      const result = window.confirm(`${personExist.name} is already added to phonebook, replace the old number with a new one?`);
      if (result) {
        phonesService
          .updatePerson(personExist.id, personObject)
        setNewRequest(new Date());
        setNewName('');
        setNewPhone('');
      }
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
