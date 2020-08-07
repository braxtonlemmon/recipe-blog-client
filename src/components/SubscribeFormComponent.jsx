import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import PropTypes from 'prop-types';

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  align-items: center;
  & > * {
    margin: 10px 0;
  }
  width: 100%;
  .subscribe-error {
    color: red;
    font-weight: bold;
    height: 1.5em;
    margin: 0;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  label {
    margin: 5px;
  }
  input {
    padding: 10px 6px;
    line-height: 1.2em;
    font-size: 1em;
    text-align: center;
    border-radius: 8px;
    outline: none;
    border: 1px solid grey;
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
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
      </Box>
      <p className="subscribe-error">{error}</p>
      <Button onClick={handleSubmit}>Subscribe</Button>
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