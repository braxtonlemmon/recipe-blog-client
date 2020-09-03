import React, { useEffect } from 'react';
import styled from 'styled-components';
import SEO from '../components/SEOv2';
import { H1 } from '../components/Headings';
import ContactFormContainer from '../components/ContactFormContainer';
import PropTypes from 'prop-types';

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
    padding-bottom: 15px;
    border-bottom: 1px solid ${props => props.theme.colors.dark};
  }
  .contact-email {
    margin: 10px 0 20px 0;
    font-size: 1.2em;
    line-height: 1.5em;
    text-align: center;
    box-shadow: 0 0 8px rgba(0,0,0,0.2);
    padding: 10px;
    border-radius: 12px;
    a {
      color: ${props => props.theme.colors.medium};
    }
  }
  .contact-or {
    position: relative;
    display: inline-block;
    font-size: 1.3em;
    margin: 10px 0;
  }
  .contact-or:before,
  .contact-or:after {
    content: "";
    position: absolute;
    height: 5px;
    border-bottom: 1px solid ${props => props.theme.colors.dark};
    border-top: 1px solid ${props => props.theme.colors.dark};
    top: 6px;
    width: 30px;
  }
  .contact-or:before {
    right: 100%;
    margin-right: 5px;
  }
  .contact-or:after {
    left: 100%;
    margin-left: 5px;
  }
`;

function Contact({ setLoader }) {
  useEffect(() => {
    setLoader(false)
  }, [])

  return ( 
    <>
      <SEO title="Contact" description="Contact page" />
      <Wrapper>
        <H1>Contact</H1>
        <h2 className="contact-intro">{`Send me something funny! Or serious. Either way, I'm all ears.`}</h2>
        <p className="contact-email">Email me: <a href="mailto: hello@peelthegarlic.com" target="_blank" rel="noreferrer noopener">hello@peelthegarlic.com</a></p>
        <p className="contact-or">OR</p>
        <ContactFormContainer />
      </Wrapper>
    </>
  )
}

Contact.propTypes = {
  setLoader: PropTypes.func
}

export default Contact;
