import React, { useState } from 'react';
import phonesService from '../services/phones';

const PersonForm = ({persons, setNewRequest, handleNotification}) => {
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const addPerson = (e) => {
    e.preventDefault();

    const personObject = {
      firstName: newName,
      phoneNumber: parseInt(newPhone),
    }
    const personExist = persons.find(person => person.firstName.toLowerCase() === personObject.firstName.toLowerCase());
    const numberExist = 
      personExist
      ? Object.values(personExist).includes(personObject.phoneNumber)
      : undefined;

    if (personExist && numberExist) {
      alert(`${personExist.firstName} is already added to phonebook`);
      return;
    } else if (personExist && !numberExist) {
      const result = window.confirm(`${personExist.firstName} is already added to phonebook, replace the old number with a new one?`);
      if (result) {
        phonesService.updatePerson(personExist.id, personObject)
          .then(updatedPerson => {
            setNewRequest(new Date());
            handleNotification('update', updatedPerson.firstName)
            setNewName('');
            setNewPhone('');
          })
          .catch(error => handleNotification('validation-error', error.response.data.error))
      }
    } else {
      phonesService.create(personObject)
        .then(createdPerson => {
          handleNotification('add', createdPerson.firstName);
          setNewName('');
          setNewPhone('');
          setNewRequest(new Date());
        })
        .catch(error => handleNotification('validation-error', error.response.data.error))
    }
  };

  return (
    <form onSubmit={addPerson}>
    <div>
      name: <input type="text" required value={newName} onChange={e => setNewName(e.target.value)} />
    </div>
    <div>
      number: <input type="tel" required value={newPhone} onChange={e => setNewPhone(e.target.value)} />
    </div>
    <button type="submit">add</button>
  </form>
  )
}

export default PersonForm;
