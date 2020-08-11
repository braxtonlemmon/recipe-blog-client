import React from 'react';
import styled, { keyframes } from 'styled-components';
import SEO from '../components/seo';
import { H1 } from '../components/Headings';
import { Link } from 'gatsby';
import Button from '../components/Button';
import { GiChefToque } from 'react-icons/gi';

const spin = keyframes`
  0% {
    transform: rotate(0deg) scale(0.3);
  }
  100% {
    transform: rotate(1080deg) scale(1);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
  padding: 0 15px;
  padding-top: 2em;
  .thank-you-logo {
    margin-top: 15px;
    animation: ${spin} 3s forwards;

  }
  .thank-you-intro {
    margin: 20px 0;
    text-align: center;
    line-height: 1.5em;
    max-width: 400px;
  }
`;

function ThankYou() {
  return (
    <>
      <SEO title="Thank You" description="Success contact message submission." />
      <Wrapper>
        <H1>Thank you!</H1>
        <GiChefToque className="thank-you-logo" size={100} />
        <p className="thank-you-intro">Your message is on its way. I will get back to you soon. Now back to the kitchen! </p>
        <Link to="/">
          <Button>Home</Button>
        </Link>
      </Wrapper>
    </>
  )
}

export default ThankYou;