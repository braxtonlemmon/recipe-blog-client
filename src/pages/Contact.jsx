import React from 'react';
import styled from 'styled-components';
import SEO from '../components/seo';
import { H1 } from '../components/Headings';

const Wrapper = styled.div`

`;

function Contact() {
  return (
    <>
      <SEO title="Contact" description="Contact page" />
      <Wrapper>
        <H1>Contact</H1>
      </Wrapper>
    </>
  )
}

export default Contact;
