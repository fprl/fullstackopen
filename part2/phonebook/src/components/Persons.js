import React from 'react';
import Person from './Person';

const Persons = ({ personsToShow }) => {
  return(
    <ul>
    {personsToShow.map((person) => <Person key={person.name} name={person.name} phoneNumber={person.phoneNumber}/>)}
  </ul>
  )
};

export default Persons;
