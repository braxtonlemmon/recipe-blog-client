import React from 'react';
import styled from 'styled-components';
import SEO from '../components/SEOv2';
import { H1 } from '../components/Headings';
import ContactFormContainer from '../components/ContactFormContainer';

const Wrapper = styled.div`
  display: flex;
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
  padding-top: 2em;
  .contact-intro {
    margin: 30px 10px 10px 10px;
    text-align: center;
    font-size: 1.2em;
    line-height: 1.5em;
  }
`;

function Contact() {
  return ( 
    <>
      <SEO title="Contact" description="Contact page" />
      <Wrapper>
        <H1>Contact</H1>
        <h2 className="contact-intro">{`Send me something funny! Or serious. Either way, I'm all ears.`}</h2>
        <ContactFormContainer />
      </Wrapper>
    </>
  )
}

export default Contact;
