import React from 'react';

const Person = ({ filteredPersons, handleDelete, setNotificationMessage, setNotificationType }) => {
  
  const confirmDelete = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      handleDelete(person.id)
        .then(() => {
          setNotificationMessage(`Deleted ${person.name}`);
          setNotificationType('success');
        })
        .catch((error) => {
          console.log(error);
          setNotificationMessage(`Failed to delete ${person.name}`);
          setNotificationType('error');
        });
    }
  };

  return (
    <div>
      {filteredPersons.map((person) => (
        <div key={person.id}>
          <b>Name:</b> {person.name} <b>Number:</b> {person.number}
          <button onClick={() => confirmDelete(person)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Person;
