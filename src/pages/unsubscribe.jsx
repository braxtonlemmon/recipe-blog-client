import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { H1 } from '../components/Headings';
import Loader from '../components/Loader';
import Button from '../components/Button';
import { navigate, Link } from 'gatsby';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
  width: 80%;
  padding-top: 2em;
  margin: 0 auto;
  p {
    text-align: center;
    margin: 20px 0;
    line-height: 1.4em;
    font-size: 1.2em;
    max-width: 500px;
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyButton = styled(Button)`
margin: 10px 8px;
`;

function Unsubscribe() {
  const [isUnsubscribing, setUnsubscribing] = useState(false);
  const [finished, setFinished] = useState(false);
  const [isError, setError] = useState(false);
  const [email, setEmail] = useState('');
  let params;
  let id;

  if (typeof window !== 'undefined') {
    params = new URLSearchParams(document.location.search.substring(1));
    id = params.get('subscriber');
  }

  const handleYesClick = (e) => {
    e.preventDefault();
    setUnsubscribing(true);
    fetch(`https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/emails/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    })
    .then(response => {
      if (response.ok && response.status === 200) {
        console.log('booyah');
        setUnsubscribing(false);
        setFinished(true);
        return;
      }
      throw new Error('Network response was not okay.')
    })
    .catch(err => {
      console.log(err.message)
      setUnsubscribing(false);
      setError(true);
    })
  }

  const handleNoClick = (e) => {
    e.preventDefault();
    navigate('/');
  }
  
  useEffect(() => {
    if (!finished) {

      fetch(`https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/emails/${id}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok && response.status === 200) {
          return response.json();
        }
        throw new Error('Network response was not okay');
      })
      .then(data => {
        setEmail(data.address);
      })
      .catch(err => {
        console.log(err.message);
        setError(true);
      })
    }
  }, [finished])

  return (
    <Wrapper>
      <H1>Unsubscribe</H1>
      { 
        !finished && !isError &&
        <>
          <p>Are you sure you want to unsubscribe {email || ''}?</p>
          <Buttons>
            <MyButton onClick={handleYesClick}>Yes</MyButton>
            <MyButton onClick={handleNoClick}>No</MyButton>
          </Buttons>
        </>
      }
      {
        finished && !isError &&
        <>
          <p>You have unsubscribed from the mailing list.</p>
          <Link to="/">
            <MyButton>Home</MyButton>
          </Link>
        </>
      }
      {
        isError &&
        <>
          <p>
            Hmm, weird. Something went wrong with your unsubscription. Maybe you already unsubscribed? If you keep receiving emails, send me a message and I will fix the problem
          </p>
          <Link to="/Contact">
            <MyButton>Contact Me</MyButton>
          </Link>
        </>
      }
      {
        isUnsubscribing &&
        <Loader message="Unsubscribing" />
      }
    </Wrapper>
  )
}

export default Unsubscribe;