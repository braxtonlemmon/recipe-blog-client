import React from 'react';
import styled from 'styled-components';
import { H2 } from './Headings';
import PropTypes from 'prop-types';
import Button from './Button';

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 5px solid black;
  padding: 15px;
  width: 80%;
  max-width: 1000px;
  grid-area: commentForm;
  margin: 15px 0;
  margin-top: 30px;
  label {
    padding: 8px;
  }
  input {
    padding: 10px 5px;
    line-height: 1.4em;
    font-size: 1.1em;
    text-align: center;
    outline: none;
    background: #fbfaff;
    border: 1px solid lightgray;
    border-radius: 5px;
  }

  textarea {
    resize: none;
    outline: none;
    padding: 10px;
    border-radius: 8px;
    font-size: 1.1em;
    text-align: center;
    margin-bottom: 10px;
    background: #fbfaff;
    border: 1px solid lightgray;
  }
`;

function CommentFormComponent({ data, handleChange, handleSubmit}) {
  return (
    <FormWrapper name="commentForm">

      <H2>Add Comment</H2>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        placeholder="Your name (optional)"
        name="name"
        id="name"
        value={data.name}
        onChange={handleChange}
      />

      <label htmlFor="content">Comment</label>
      <textarea
        name="content"
        id="content"
        cols="20"
        rows="10"
        required
        min="2"
        placeholder="Your comment here..."
        value={data.content}
        onChange={handleChange}
      >
      </textarea>

      <Button
        onClick={(e) => handleSubmit(e, 0)}
      >
        Submit
      </Button>

    </FormWrapper>

  )
}

CommentFormComponent.propTypes = {
  data: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func
}

export default CommentFormComponent;