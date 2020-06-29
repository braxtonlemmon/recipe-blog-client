import React from 'react';
import styled from 'styled-components';
import SEO from '../components/seo';
import { H1 } from '../components/Headings';
import PageTransition from 'gatsby-plugin-page-transitions';

const Wrapper = styled.div`

`;

function Contact() {
  return (
    <>
      <SEO title="Contact" description="Contact page" />
      <PageTransition>
        <Wrapper>
          <H1>Contact</H1>
        </Wrapper>
      </PageTransition>
    </>
  )
}

export default Contact;
