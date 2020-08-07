import React, { useState } from 'react';
import styled from 'styled-components';
import { H1 } from '../components/Headings';
import SubscribeFormContainer from '../components/SubscribeFormContainer';
import SubscribePopup from '../components/SubscribePopup'; 
import SocialMedia from '../components/SocialMedia';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
  width: 80%;
  padding-top: 2em;
  margin: 0 auto;
`;

function Subscribe() {
  const [subscribed, setSubscribed] = useState(false);

  const handleClose = () => {
    setSubscribed(false);
  }

  return (
    <Wrapper>
      <H1>Subscribe</H1>
      <SubscribeFormContainer setSubscribed={setSubscribed} />
      {
        subscribed && <SubscribePopup handleClose={handleClose} /> 
      }
      <p>Follow me on social media:</p>
      <SocialMedia inverse={false} />
    </Wrapper>
  )
}

export default Subscribe;