import React, { useState } from 'react';
import SubscribeFormComponent from './SubscribeFormComponent';
import PropTypes from 'prop-types';
import Loader from './Loader';

function SubscribeFormContainer({ setSubscribed }) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState(false);
  const [isSending, setSending] = useState(false);

  const handleChange = e => {
    const { value } = e.target
    setError(false);
    setEmail(value);
  }

  const handleSubmit = e => {
    e.preventDefault()
    const isValid = handleValidation();
    if (isValid) {
      setSending(true);
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
          setSending(false);
          return response.json()
        }
        throw new Error("Network response was not okay")
      })

      .then(data => {
        if (data.success) {
          console.log('yo');
          fetch("https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/newsletter/welcome", {
            method: "POST",
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              address: 'braxtonlemmon@gmail.com'
            })
          })

          .then(response => {
            if (response.ok && response.status === 200) {
              console.log('Welcome email sent');
              return response.json();
            }
            throw new Error("Network response was not okay");
          })
        } else {
          console.log('Already signed up');
        }
      })
      .catch(err => console.log(err.message))
    } else {
      console.log("Invalid email. Try again.")
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
    formIsValid ? setError(false) : setError(true);
    return formIsValid
  }

  return (
    <>
      <SubscribeFormComponent 
        email={email}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        error={error}
      />
      {isSending &&
        <Loader message="Sending" />
      }
    </>
  )
}

SubscribeFormContainer.propTypes = {
  setSubscribed: PropTypes.func
}

export default SubscribeFormContainer;