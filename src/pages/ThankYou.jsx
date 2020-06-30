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
  padding: 0 15px;
  .thank-you-intro {
    margin: 15px;
    text-align: center;
  }
`;

function ThankYou() {
  return (
    <>
      <SEO title="Thank You" description="Success contact message submission." />
      <PageTransition>
        <Wrapper>
          <H1>Thank you!</H1>
          <p className="thank-you-intro">Your message is on its way. I will get back to you soon. Now back to the kitchen! </p>
        </Wrapper>
      </PageTransition>
    </>
  )
}

export default ThankYou;