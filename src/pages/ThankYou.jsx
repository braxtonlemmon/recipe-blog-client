import React from 'react';
import styled from 'styled-components';
import SEO from '../components/seo';
import { H1 } from '../components/Headings';
import PageTransition from 'gatsby-plugin-page-transitions';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
`;

function ThankYou() {
  return (
    <>
      <SEO title="Thank You" description="Success contact message submission." />
      <PageTransition>
        <Wrapper>
          <H1>Thank you!</H1>
          <p>Your message has been sent. I will reply soon!</p>
        </Wrapper>
      </PageTransition>
    </>
  )
}

export default ThankYou;