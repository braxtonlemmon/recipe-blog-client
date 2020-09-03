import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { H1 } from '../components/Headings';
import SubscribeFormContainer from '../components/SubscribeFormContainer';
import SubscribePopup from '../components/SubscribePopup'; 
import SocialMedia from '../components/SocialMedia';
import { FaPizzaSlice } from 'react-icons/fa';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
  width: 90%;
  padding-top: 2em;
  margin: 0 auto;
  .subscribe-also {
    margin: 20px 0;
    border-top: 1px solid black;
    width: 100%;
    text-align: center;
    padding-top: 20px;
  }
  .subscribe-connect {
    display: flex;
    align-items: center;
    text-align: center;
    & > * {
      margin-right: 5px;
    }
  }
  p {
    font-size: 1.2em;
  }
`;

const Intro = styled.p`
  margin: 20px auto;
  max-width: 500px;
  line-height: 1.5em;
  text-align: center;
  .subscribe-pizza {
    margin-left: 5px;
  }
`;

function Subscribe({ setLoader }) {
  const [subscribed, setSubscribed] = useState(false);

  const handleClose = () => {
    setSubscribed(false);
  }
  useEffect(() => {
    setLoader(false)
  }, [])
  return (
    <Wrapper>
      <H1>Subscribe</H1>
      <Intro>
        {`Here's the deal. You'll get one email each week that contains a new recipe from Peel the Garlic. Every email will have an unsubscribe link at the bottom in case you get sick of me, or decide that cooking is for the birds and that the take-out life is the life for you`}
        <FaPizzaSlice className="subscribe-pizza" size={18}/>
      </Intro>
      <SubscribeFormContainer setSubscribed={setSubscribed} />
      {
        subscribed && <SubscribePopup handleClose={handleClose} /> 
      }
      <H1 className="subscribe-also">Also</H1>
      <p className="subscribe-connect">Some other ways to connect:</p>
      <SocialMedia inverse={false} />
    </Wrapper>
  )
}

export default Subscribe;