import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .contact-form-input {
    padding: 6px;
    text-align: center;
    border-radius: 8px;
    outline: none;
    border: 1px solid grey;
    margin: 10px;
  }
`;

function ContactFormComponent({ handleChange, data, handleSubmit}) {
  return (
    <FormWrapper
      name="contact"
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="bot-field" />
      <input type="hidden" name="form-name" value="contact" />
      <label htmlFor="name">Name</label>
      <input 
        className="contact-form-input"
        type="text"
        id="name"
        name="name"
        placeholder="name"
        // onChange={(e) => handleChange(e)}
        // value={data.name}
      />

      <label htmlFor="email">Email</label>
      <input
        className="contact-form-input"
        type="email"
        id="email"
        name="email"
        placeholder="youremail@example.com"
        // onChange={(e) => handleChange(e)}
        // value={data.email}
      />

      <label htmlFor="content">Message</label>
      <textarea
        className="contact-form-input"
        id="content"
        name="content"
        placeholder="Your message here"
        // onChange={(e) => handleChange(e)}
        // value={data.content}
      />

      <button type="submit">Submit</button>
      <input type="reset" value="Clear" />
    </FormWrapper>
  )
}

ContactFormComponent.propTypes = {
  handleChange: PropTypes.func,
  data: PropTypes.object,
  handleSubmit: PropTypes.func
}

export default ContactFormComponent;