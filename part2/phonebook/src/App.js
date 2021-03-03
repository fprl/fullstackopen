import React, { useState } from 'react';
import Note from './components/Note';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
      { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [showAll, setShowAll] = useState('');

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      phoneNumber: newPhone,
    }

    const personExist = persons.find(person => person.name === personObject.name);
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
      <div>
        filter shown with <input onChange={handleSearchChange}></input>
      </div>

      <h2>Add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newPhone} onChange={handlePhoneChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => <Note key={person.name} name={person.name} phoneNumber={person.phoneNumber}/>)}
      </ul>
      {/* <p>debug: {newName}</p> */}
    </div>
  );
};

export default App;
