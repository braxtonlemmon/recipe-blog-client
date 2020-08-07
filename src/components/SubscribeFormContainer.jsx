import React, { useState } from 'react';
import SubscribeFormComponent from './SubscribeFormComponent';
import PropTypes from 'prop-types';

function SubscribeFormContainer({ setSubscribed }) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState('');

  const handleChange = e => {
    const { value } = e.target
    setError('');
    setEmail(value);
  }

  const handleSubmit = e => {
    e.preventDefault()
    const isValid = handleValidation()
    if (isValid) {
      console.log("good")
      fetch(
        "https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/emails",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address: email
          }),
        }
      )
      .then(response => {
        if (response.ok && response.status === 200) {
          setEmail("")
          setSubscribed(true);
          return response.json()
        }
        throw new Error("Network response was not okay")
      })
      .catch(err => console.log(err.message))
    } else {
      console.log("bad")
    }
  }

  const handleValidation = () => {
    let formIsValid = true

    if (!email) {
      formIsValid = false
    }

    if (typeof email !== "undefined") {
      let lastAtPos = email.lastIndexOf("@")
      let lastDotPos = email.lastIndexOf(".")
      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          email.indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          email.length - lastDotPos > 2
        )
      ) {
        formIsValid = false
      }
    }
    formIsValid ? setError('') : setError('Oops! Enter a valid email!');
    return formIsValid
  }

  return (
    <SubscribeFormComponent 
      email={email}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      error={error}
    />
  )
}

SubscribeFormContainer.propTypes = {
  setSubscribed: PropTypes.func
}

export default SubscribeFormContainer;