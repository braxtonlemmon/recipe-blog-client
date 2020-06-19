import React from 'react';
import styled from 'styled-components';

const ReplyForm = styled.form`
  width: 100%;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 10px;
`;

const ReplyBox = styled.textarea`
  height: 80px;
  width: 90%;
  padding: 10px;
  resize: none;
  border-radius: 8px;
  border: none;
  outline: none;
  text-align: center;
  margin-bottom: 10px;
`;

const ReplyName = styled.input`
  border-radius: 5px;
  padding: 10px 5px;
  width: 90%;
  border: none;
  outline: none;
  margin-bottom: 10px;
  text-align: center;
`;

const ReplySubmit = styled.button`
  border-radius: 5px;
  padding: 5px;
  border: none;
  background: red;
  color: white;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;

function ReplyFormComponent(props) {
  return (
    <ReplyForm name="replyForm">
      <ReplyName
        id="name"
        name="name"
        placeholder="Your name (optional)"
        type="text"
        value={props.data.name}
        onChange={props.handleChange}
      />

      <ReplyBox
        placeholder="Your reply here..."
        id="content"
        name="content"
        required
        value={props.data.content}
        onChange={props.handleChange}
      ></ReplyBox>

      <ReplySubmit
        onClick={(e) => props.handleSubmit(e, 1)}
      >
        Submit
      </ReplySubmit>
    </ReplyForm>
  )
}

export default ReplyFormComponent;