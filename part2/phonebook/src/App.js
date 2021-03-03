import React, { useState } from 'react';
import Note from './components/Note';

const App = () => {
  const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
  const [newName, setNewName] = useState('');

  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
    }

    const personExist = persons.find(person => person.name === personObject.name);
    if (personExist) {
      alert(`${personObject.name} is already added to phonebook`);
      return;
    }

    setPersons(persons.concat(personObject));
    setNewName('');
  };

  const handleNameChange = e => setNewName(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => <Note key={person.name} name={person.name}/>)}
      </ul>
      {/* <p>debug: {newName}</p> */}
    </div>
  );
};

export default App;
