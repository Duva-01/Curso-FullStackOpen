import React from 'react'

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addPerson }) => {
    return (
      <form onSubmit={addPerson}>
        <div>
          <b>Name:</b> <input value={newName} onChange={handleNameChange} />
        </div>
  
        <div>
          <b>Number:</b> <input value={newNumber} onChange={handleNumberChange} />
        </div>
  
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    );
  };

  export default PersonForm