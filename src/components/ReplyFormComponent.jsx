import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Button from './Button';

// Styled components
const ReplyForm = styled.form`
  width: 100%;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 10px;
  border-top: 1px solid #2f3020;
  padding-top: 10px;
`;

const ReplyBox = styled.textarea`
  height: 120px;
  width: 100%;
  padding: 10px;
  resize: none;
  border-radius: 8px;
  border: none;
  outline: none;
  text-align: center;
  margin-bottom: 10px;
  font-size: 1em;
`;

const ReplyName = styled.input`
  border-radius: 5px;
  padding: 10px 5px;
  width: 100%;
  border: none;
  outline: none;
  margin-bottom: 10px;
  text-align: center;
  font-size: 1em;
`;

// Functional component
function ReplyFormComponent({ data, handleChange, handleSubmit}) {
  return (
    <ReplyForm name="replyForm">
      <ReplyName
        id="name"
        name="name"
        placeholder="Your name (optional)"
        type="text"
        value={data.name}
        onChange={handleChange}
      />

      <ReplyBox
        placeholder="Your reply here..."
        id="content"
        name="content"
        required
        value={data.content}
        onChange={handleChange}
      ></ReplyBox>

      <Button
        onClick={(e) => handleSubmit(e, 1)}
      >
        Submit
      </Button>
    </ReplyForm>
  )
}

ReplyFormComponent.propTypes = {
  data: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
}

export default ReplyFormComponent;