import React from 'react';
import styled, {keyframes} from 'styled-components';
import Button from './Button';
import PropTypes from 'prop-types';

const left = keyframes`
  0% { transform: rotate(30deg)}
  50% { transform: rotate(-30deg)}
  100% { transform: rotate(30deg)}
`;

const right = keyframes`
  0% { transform: rotate(-30deg)}
  50% { transform: rotate(30deg) }
  100% { transform: rotate(-30deg)}
`;


const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
  position: relative;
  box-shadow: 0 0 10px rgba(0,0,0,0.4);
  border-radius: 15px;
  margin: 15px auto;
  & > * {
    margin: 10px 0;
  }
  width: 100%;
  .subscribe-error {
    color: red;
    font-weight: bold;
    height: 1.5em;
    margin: 0;
    position: absolute;
    bottom: 20px;
  }
  .error-left {
    left: 20px;
    transform: rotate(30deg);
    animation: ${left} 2s infinite 200ms;
  }
  .error-right {
    right: 20px;
    transform: rotate(-30deg);
    animation: ${right} 2s infinite 200ms;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  label {
    margin: 5px;
    font-size: 1.2em;
  }
  input {
    padding: 10px 6px;
    line-height: 1.2em;
    font-size: 1em;
    text-align: center;
    border-radius: 8px;
    outline: none;
    border: 1px solid rgba(0,0,0,0.3);
    margin: 10px;
    background: #fbfaff;
    width: 100%;
    min-width: 270px;
    max-width: 400px;
  }
`

function SubscribeFormComponent({ email, handleChange, handleSubmit, error }) {
  return (
    <Wrapper>
      <Box>
        <label htmlFor="email">Sign Up</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
          placeholder="Your email goes right here."
        />
      </Box>
      <Button onClick={handleSubmit}>Subscribe</Button>
      {error && 
        <>
          <p className="subscribe-error error-left">Uh oh!</p>
          <p className="subscribe-error error-right">Try again!</p>
        </>
      }
    </Wrapper>
  )
}

SubscribeFormComponent.propTypes = {
  email: PropTypes.string,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  error: PropTypes.string
}

export default SubscribeFormComponent;