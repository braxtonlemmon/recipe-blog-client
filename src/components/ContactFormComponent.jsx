import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  .contact-form-input {
    padding: 10px 6px;
    line-height: 1.2em;
    font-size: 1em;
    text-align: center;
    border-radius: 8px;
    outline: none;
    border: 1px solid grey;
    margin: 10px;
  }
  textarea {
    resize: none;
    height: 100px;
  }
`;

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
`;

const Buttons = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 15px;
  margin: 5px 0;
`;

function ContactFormComponent() {
  return (
    <FormWrapper
      name="contact"
      method="post"
      action="/ThankYou"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="bot-field" />
      <input type="hidden" name="form-name" value="contact" />
      
      <FormBox>
        <label htmlFor="name">Name</label>
        <input 
          className="contact-form-input"
          type="text"
          id="name"
          name="name"
          placeholder="Your name here."
        />
      </FormBox>

      <FormBox>
        <label htmlFor="email">Email</label>
        <input
          className="contact-form-input"
          type="email"
          id="email"
          name="email"
          placeholder="youremail@example.com"
        />
      </FormBox>

      <FormBox>
        <label htmlFor="content">Message</label>
        <textarea
          className="contact-form-input"
          id="content"
          name="content"
          placeholder="Your message here."
        />
      </FormBox>
      <Buttons>
        <Button type="submit">Submit</Button>
        <Button type="reset">Clear</Button>
      </Buttons>
    </FormWrapper>
  )
}

export default ContactFormComponent;