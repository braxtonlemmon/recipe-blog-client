import React from 'react';
import styled from 'styled-components';
import { H2 } from './Headings';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-top: 5px solid black;
  align-items: left;
  /* background: blue; */
  width: 80%;
  max-width: 900px;
  grid-area: commentBox;
`;

const CommentRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 15px;
  background: rgba(242,232,242,0.80);
  box-shadow: -2px 2px 2px lightgrey;
  margin: 15px;
  border-radius: 8px;
  /* border-bottom: 2px dashed black; */
  .comment-info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
  }
  .comment-name {
    /* text-decoration: underline; */
    letter-spacing: 1.5px;
    font-style: italic;
  }
  .comment-date {
    font-size: 0.8em;
    font-style: italic;
  }
  .comment-content {
    margin: 5px 20px;
    align-self: center;
    text-align: justify;
  }
`;

// const CommentRow = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   padding: 15px 0;
//   border-bottom: 2px dashed black;
//   .comment-info {
//     display: flex;
//     justify-content: space-between;
//     width: 100%;
//     margin-bottom: 10px;
//   }
//   .comment-name {
//     /* text-decoration: underline; */
//     letter-spacing: 1.5px;
//     font-style: italic;
//   }
//   .comment-date {
//     font-size: 0.8em;
//     font-style: italic;
//   }
//   .comment-content {
//     margin-left: 20px;
//   }
// `;

function CommentBox(props) {
  const generateComments = () => {
    let allComments = [];
    props.comments.map((comment, i) => {
      return allComments.push(
        <CommentRow key={i}>
          <div className="comment-info">
            <span className="comment-name">{comment.name.toUpperCase()}</span>
            <span className="comment-date">{comment.dateFormatted}</span>
          </div>
          <p className="comment-content">{comment.content}</p>
        </CommentRow>
      )
    })
    return allComments;
  }

  return (
    <Wrapper>
      <H2>Comments</H2>
      <div>{
        props.comments.length === 0 ?
          '- No comments yet -' :
          generateComments()}
      </div>
    </Wrapper>
  )
}

export default CommentBox;