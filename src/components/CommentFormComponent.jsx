import React from "react"
import styled from "styled-components"
import { H2 } from "./Headings"
import PropTypes from "prop-types"
import Button from "./Button"
import Stars from "./Stars"

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-top: 5px solid ${props => props.theme.colors.dark};
  padding: 15px;
  width: 95%;
  grid-area: commentForm;
  margin-top: 15px;
  z-index: 501;
  margin-top: 30px;
  label {
    padding: 8px;
  }
  input {
    padding: 10px 5px;
    line-height: 1.4em;
    font-size: 1em;
    text-align: center;
    outline: none;
    background: #fbfaff;
    border: 1px solid lightgray;
    border-radius: 5px;
    width: 100%;
    max-width: 450px;
  }

  @media (min-width: 1200px) {
    width: 80%;
  }
`

const CommentArea = styled.textarea`
  resize: none;
  outline: none;
  padding: 15px 5px;
  border-radius: 8px;
  font-size: 1em;
  text-align: center;
  margin-bottom: 10px;
  background: #fbfaff;
  border: ${props =>
    props.commentOkay === true ? "1px solid lightgray" : "2px solid red"};
  width: 100%;
  max-width: 550px;
  height: ${props => props.height};
  min-height: 150px;
  overflow: hidden;
`

function CommentFormComponent({
  data,
  handleChange,
  handleSubmit,
  selected,
  handleOptionChange,
  commentOkay,
  commentRef,
}) {
  return (
    <FormWrapper name="commentForm" id="comments-anchor">
      <H2>What did you think? Leave a comment!</H2>
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
      <CommentArea
        name="content"
        id="content"
        required
        min="2"
        placeholder="Your comment here..."
        value={data.content}
        onChange={handleChange}
        commentOkay={commentOkay}
        ref={commentRef}
        height={`${
          commentRef.current ? commentRef.current.scrollHeight : "150"
        }px`}
      ></CommentArea>
      <Stars selected={selected} handleOptionChange={handleOptionChange} />
      <Button onClick={e => handleSubmit(e, 0)}>Submit</Button>
    </FormWrapper>
  )
}

CommentFormComponent.propTypes = {
  data: PropTypes.object,
  handleChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  selected: PropTypes.number,
  handleOptionChange: PropTypes.func,
  commentOkay: PropTypes.bool,
  commentRef: PropTypes.object,
}

export default CommentFormComponent
