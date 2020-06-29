import React, { useState } from 'react';
import ContactFormComponent from './ContactFormComponent';

function ContactFormContainer() {
  const [data, setData] = useState({
    name: '',
    email: '',
    content: ''
  })
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitting');
  }

  return (
    <>
      <ContactFormComponent 
        data={data}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </>
  )
}

export default ContactFormContainer;