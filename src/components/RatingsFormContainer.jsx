import React, { useState } from 'react';
import RatingsFormComponent from './RatingsFormComponent';

function RatingsFormContainer() {
  const [selected, setSelected] = useState(5);
  
  const handleOptionChange = (value) => {
    setSelected(value);
  }

  return (
    <RatingsFormComponent 
      handleOptionChange={handleOptionChange}
      selected={selected}
    />
  )
}

export default RatingsFormContainer;