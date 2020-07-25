import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from './Button';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
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
    background: #fbfaff;
    width: 100%;
  }
  input {
    max-width: 450px;
  }
  textarea {
    resize: none;
    height: 150px;
    max-width: 500px;
  }
`;

const FormBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  display: grid;
  grid-auto-flow: column;
  gap: 30px;
  margin: 5px 0;
`;

function ContactFormComponent({ handleChange, data, handleSubmit, showErrors, formErrors }) {
  return (
    <FormWrapper>
      <FormBox>
        <label htmlFor="email">Your email address:</label>
        <input
          className="contact-form-input"
          type="email"
          id="email"
          name="email"
          placeholder="youremail@example.com"
          onChange={(e) => handleChange(e)}
          value={data.email}
        />
      </FormBox>

      <FormBox>
        <label htmlFor="subject">Subject (optional):</label>
        <input
          className="contact-form-input"
          type="subject"
          id="subject"
          name="subject"
          placeholder="Subject of your message here."
          onChange={(e) => handleChange(e)}
          value={data.subject}
        />
      </FormBox>

      <FormBox>
        <label htmlFor="message">Message:</label>
        <textarea
          className="contact-form-input"
          id="message"
          name="message"
          placeholder="Your message here"
          onChange={(e) => handleChange(e)}
          value={data.message}
        />
      </FormBox>
      
      <Buttons>
        <Button type="submit" onClick={(e) => handleSubmit(e)}>Submit</Button>
      </Buttons>
    </FormWrapper>
  )
}

ContactFormComponent.propTypes = {
  handleChange: PropTypes.func,
  data: PropTypes.object,
  handleSubmit: PropTypes.func,
  formErrors: PropTypes.object,
  showErrors: PropTypes.bool
}

export default ContactFormComponent;

// import React from 'react';
// import styled from 'styled-components';
// import Button from './Button';

// const FormWrapper = styled.form`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   margin-top: 15px;
//   .contact-form-input {
//     padding: 10px 6px;
//     line-height: 1.2em;
//     font-size: 1em;
//     text-align: center;
//     border-radius: 8px;
//     outline: none;
//     border: 1px solid grey;
//     margin: 10px;
//     background: #fbfaff;
//     width: 100%;
//   }
//   input {
//     max-width: 450px;
//   }
//   textarea {
//     resize: none;
//     height: 150px;
//     max-width: 500px;
//   }
// `;

// const FormBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   margin-bottom: 15px;
//   width: 100%;
// `;

// const Buttons = styled.div`
//   display: flex;
//   display: grid;
//   grid-auto-flow: column;
//   gap: 30px;
//   margin: 5px 0;
// `;

// function ContactFormComponent() {
//   return (
//     <FormWrapper
//       name="contact"
//       method="post"
//       action="/ThankYou"
//       data-netlify="true"
//       data-netlify-honeypot="bot-field"
//     >
//       <input type="hidden" name="bot-field" />
//       <input type="hidden" name="form-name" value="contact" />
      
//       <FormBox>
//         <label htmlFor="name">Name</label>
//         <input 
//           className="contact-form-input"
//           type="text"
//           id="name"
//           name="name"
//           placeholder="Your name here."
//           required
//         />
//       </FormBox>

//       <FormBox>
//         <label htmlFor="email">Email</label>
//         <input
//           className="contact-form-input"
//           type="email"
//           id="email"
//           name="email"
//           placeholder="youremail@example.com"
//           required
//         />
//       </FormBox>

//       <FormBox>
//         <label htmlFor="content">Message</label>
//         <textarea
//           className="contact-form-input"
//           id="content"
//           name="content"
//           placeholder="Your message here."
//           required
//         />
//       </FormBox>
//       <Buttons>
//         <Button type="submit">Submit</Button>
//       </Buttons>
//     </FormWrapper>
//   )
// }

// export default ContactFormComponent;

