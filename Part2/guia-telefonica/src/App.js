import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import personService from './services/personService';
import Notification from './components/Notification';

const App = () => {

  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  const [notificationMessage, setNotificationMessage] = useState(null);
  const [notificationType, setNotificationType] = useState('');

  useEffect(() => {
    personService
      .getAll()
      .then((data) => {
        setPersons(data);
      })
      .catch((error) => {
        console.log(error);
        setNotificationMessage(
          `'${error.content}'`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
  
    const existingPerson = persons.find((person) => person.name === newName);
  
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to the phonebook. Do you want to update the phone number?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        personService
          .update(existingPerson.id, updatedPerson)
          .then((response) => {
            setPersons(persons.map((person) => (person.id === existingPerson.id ? response.data : person)));
            setNewName('');
            setNewNumber('');
            setNotificationMessage(`Phone number updated for ${existingPerson.name}`);
            setNotificationType('success');
          })
          .catch((error) => {
            console.log(error);
            setNotificationMessage(`Failed to update the phone number for ${existingPerson.name}`);
            setNotificationType('error');
          });
      }
      return;
    }
  
    const personObject = {
      name: newName,
      number: newNumber,
    };
  
    personService
      .create(personObject)
      .then((person) => {
        setPersons(persons.concat(person));
        setNewName('');
        setNewNumber('');
        setNotificationMessage(`Added ${person.name}`);
        setNotificationType('success');
      })
      .catch((error) => {
        console.log(error);
        setNotificationMessage(`Failed to add ${newName}`);
        setNotificationType('error');
      });
  };
  

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterName(event.target.value);
  };

  const handleDelete = (id) => {
    return new Promise((resolve, reject) => {
      personService
        .destroy(id)
        .then(() => {
          setPersons(persons.filter((person) => person.id !== id));
          resolve(); // Resuelve la promesa después de eliminar correctamente
        })
        .catch((error) => {
          console.log(error);
          reject(error); // Rechaza la promesa en caso de error
        });
    });
  };
  

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );

  return (
    <div>
      <h1>Phonebook</h1>

      <Notification message={notificationMessage} type={notificationType}/>

      <h2>Search for a Contact</h2>
      <Filter filterName={filterName} handleFilterChange={handleFilterChange} />

      <h2>Add new Contact</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h2>Numbers</h2>
      <Person
        filteredPersons={filteredPersons}
        handleDelete={handleDelete}
        setNotificationMessage={setNotificationMessage}
        setNotificationType={setNotificationType}
      />
    </div>
  );
};

export default App;
