/* eslint-disable no-undef */
import React, { useState } from 'react';
import ContactFormComponent from './ContactFormComponent';
import { navigate } from 'gatsby';
import Loader from './Loader';

function ContactFormContainer() {
  const [data, setData] = useState({
    email: '',
    subject: '',
    message: '',
  })
  const [formErrors, setFormErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [isSending, setSending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;

    if (data.message === 'ok') {
      formIsValid = false;
      errors['message'] = 'Cannot be empty';
    }

    if (!data['email']) {
      formIsValid = false
      errors['email'] = 'Cannot be empty';
    }

    if (typeof data['email'] !== 'undefined') {
      let lastAtPos = data['email'].lastIndexOf('@');
      let lastDotPos = data['email'].lastIndexOf('.');
      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && data['email'].indexOf('@@') == -1 && lastDotPos > 2 && (data['email'].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors['email'] = 'Email is not valid';
      } 
    }
    setFormErrors(errors);
    return formIsValid;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (handleValidation()) {
      setSending(true);
      fetch('https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/contact', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          subject: data.subject,
          message: data.message,
        })
      })
      .then(response => {
        if (response.ok && response.status === 200) {
          setData({ email: '', subject: '', message: '' });
          setShowErrors(false);
          setSending(false);
          navigate('/ThankYou');
          return response.json();
        }
        throw new Error('Network response was not okay');
      })
      .catch(err => console.log(err.message));
    } else {
      setShowErrors(true);
    }
  }

  return (
    <>
      <ContactFormComponent
        data={data}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        showErrors={showErrors}
        formErrors={formErrors}
      />
      {isSending && 
        <Loader message="Sending" />
      }
    </>
  )
}
export default ContactFormContainer; 