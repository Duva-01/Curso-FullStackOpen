import React from 'react'

const Filter = ({ filterName, handleFilterChange }) => {
    return (
      <div>
        Filter by name: <input value={filterName} onChange={handleFilterChange} />
      </div>
    );
  };

  
  export default Filter