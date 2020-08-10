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
`;

const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MyButton = styled(Button)`

`;

function Unsubscribe() {
  const [isUnsubscribing, setUnsubscribing] = useState(false);
  const [finished, setFinished] = useState(false);
  const [isError, setError] = useState(false);
  const [email, setEmail] = useState('');

  const params = new URLSearchParams(document.location.search.substring(1));
  const id = params.get('subscriber')

  const handleYesClick = (e) => {
    e.preventDefault();
    setUnsubscribing(true);
    fetch(`http://localhost:4000/dev/api/emails/${id}`, {
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

      fetch(`http://localhost:4000/dev/api/emails/${id}`, {
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
            <Button onClick={handleYesClick}>Yes</Button>
            <Button onClick={handleNoClick}>No</Button>
          </Buttons>
        </>
      }
      {
        finished && !isError &&
        <>
          <p>You have unsubscribed from the mailing list.</p>
          <Link to="/">
            <Button>Home</Button>
          </Link>
        </>
      }
      {
        isError &&
        <>
          <p>There was a problem unsubscribing. Send me a message and I'll fix it. I will personally remove your email from the mailing list.</p>
          <Link to="/Contact">
            <Button>Contact</Button>
          </Link>
        </>
      }
      {
        isUnsubscribing &&
        <Loader message="Unsubscribing" />
      }
      <p>unsubscribing: {isUnsubscribing ? 'yes' : 'no'}</p>
      <p>finished: {finished ? 'yes' : 'no'}</p>
      <p>isError: {isError ? 'yes' : 'no'}</p>
    </Wrapper>
  )
}

export default Unsubscribe;