import React from 'react';
import styled from 'styled-components';
import SEO from '../components/seo';
import { H1 } from '../components/Headings';
import PageTransition from 'gatsby-plugin-page-transitions';
import ContactFormContainer from '../components/ContactFormContainer';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
`;

function Contact() {
  return (
    <>
      <SEO title="Contact" description="Contact page" />
      <PageTransition>
        <Wrapper>
          <H1>Contact</H1>
          <ContactFormContainer />
        </Wrapper>
      </PageTransition>
    </>
  )
}

export default Contact;
