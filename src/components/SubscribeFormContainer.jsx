import React, { useState } from "react"
import SubscribeFormComponent from "./SubscribeFormComponent"
import PropTypes from "prop-types"
import Loader from "./Loader"

function SubscribeFormContainer({ setSubscribed }) {
  const [email, setEmail] = useState("")
  const [error, setError] = useState(false)
  const [isSending, setSending] = useState(false)

  const handleChange = e => {
    const { value } = e.target
    setError(false)
    setEmail(value)
  }

  // same as #handleSubmit, but includes API PUT request to sendgrid to add to 'newsletter' contact list
  const handleSubmitWithPromises = e => {
    e.preventDefault()
    const isValid = handleValidation()
    if (isValid) {
      setSending(true)
      const sendgridObject = {
        list_ids: [`${process.env.GATSBY_SENDGRID_LIST_ID}`],
        contacts: [
          {
            email: email,
          },
        ],
      }

      fetch("https://api.sendgrid.com/v3/marketing/contacts", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${process.env.GATSBY_SENDGRID_API}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendgridObject),
      })
        .then(() => {
          setEmail("")
          setSubscribed(true)
          setSending(false)
        })
        .catch(error => {
          console.error("There was a problem subscribing.", error)
        })
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
    formIsValid ? setError(false) : setError(true)
    return formIsValid
  }

  return (
    <>
      <SubscribeFormComponent
        email={email}
        handleChange={handleChange}
        error={error}
        handleSubmitWithPromises={handleSubmitWithPromises}
      />
      {isSending && <Loader message="Sending" />}
    </>
  )
}

SubscribeFormContainer.propTypes = {
  setSubscribed: PropTypes.func,
}

export default SubscribeFormContainer
