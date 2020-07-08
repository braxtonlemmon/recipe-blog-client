import React from 'react';
import styled from 'styled-components';
import SEO from '../components/seo';
import { H1 } from '../components/Headings';
import ContactFormContainer from '../components/ContactFormContainer';

const Wrapper = styled.div`
  display: flex;
  /* background: blue; */
  width: 90%;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
  padding-top: 2em;
  .contact-intro {
    margin: 10px;
  }
`;

function Contact() {
  return (
    <>
      <SEO title="Contact" description="Contact page" />
      <Wrapper>
        <H1>Contact</H1>
        <h2 className="contact-intro">Send me a message! I'm all ears.</h2>
        <ContactFormContainer />
      </Wrapper>
    </>
  )
}

export default Contact;
