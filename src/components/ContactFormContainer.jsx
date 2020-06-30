import React, { useState } from 'react';
import ContactFormComponent from './ContactFormComponent';

const encode = data => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
}

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
    // fetch('/', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    //   body: encode({ 'form-name': , ...data})
    // })
    // .then(() => {
    //   setData({
    //     name: '',
    //     email: '',
    //     content: ''
    //   });
    //   alert('success!');
    // })
    // .catch(err => alert(err))
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