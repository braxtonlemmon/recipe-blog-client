import React from 'react';
import styled from 'styled-components';
// import SEO from '../components/seo';
import SEO from '../components/SEOv2';
import { H1 } from '../components/Headings';
import ContactFormComponent from '../components/ContactFormComponent';

const Wrapper = styled.div`
  display: flex;
  width: 90%;
  margin: 0 auto;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
  padding-top: 2em;
  .contact-intro {
    margin: 30px 10px 10px 10px;
    text-align: center;
    font-size: 1.2em;
  }
`;

function Contact() {
  return ( 
    <>
      <SEO title="Contact" description="Contact page" />
      <Wrapper>
        <H1>Contact</H1>
        <h2 className="contact-intro">{`Send me a message! I'm all ears.`}</h2>
        <ContactFormComponent />
      </Wrapper>
    </>
  )
}

export default Contact;
