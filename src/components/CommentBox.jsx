import React, { useState } from 'react';
import styled from 'styled-components';
import { H2 } from './Headings';
import ReplyFormContainer from './ReplyFormContainer';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-top: 5px solid black;
  align-items: center;
  /* background: blue; */
  width: 80%;
  max-width: 900px;
  grid-area: commentBox;
`;

const CommentRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90%;
  padding: 15px;
  padding-bottom: 30px;
  background: rgba(247, 191, 247, 0.78);
  box-shadow: -2px 2px 2px lightgrey;
  margin: 15px;
  margin-left: ${props => props.margin}px;
  border-radius: 8px;
  transition: all 5s ease;
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
  .comment-reply {
    height: 20px;
    width: 100%;
    border: 1px solid black;
  }
`;

const ReplyButton = styled.button`
  border: none;
  color: white;
  position: absolute;
  right: 10px;
  bottom: 10px;
  border-radius: 5px;
  padding: 3px;
  cursor: pointer;
  background: red;
  outline: none;
  &:hover {
    transform: scale(1.05);
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
`

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

const ReplyForm = styled.form`
  width: 100%;
  align-self: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 10px;
`

function Comment({ comment, comments, i, margin, setCommentsLoaded}) {
  const [replyClicked, setReplyClicked] = useState(false);
  const handleReplyClick = () => {
    // console.log(comment._id);
    const parent = document.getElementById(`${comment._id}`)
    const box = !replyClicked;
    setReplyClicked(box);
  }
  const children = comments.filter(comm => comm.parent === comment._id);

  const nestedComments = (children || []).map(comment => {
    return <Comment key={comment._id} setCommentsLoaded={setCommentsLoaded} comment={comment} margin={margin+30} comments={comments} type="child" />
  })

  return (
    <div>
      <CommentRow 
        margin={margin}
        key={comment._id}
        id={comment._id}
      >
        <div className="comment-info">
          <span className="comment-name">{comment.name.toUpperCase()}</span>
          <span className="comment-date">{comment.dateFormatted}</span>
        </div>
        <p className="comment-content">{comment.content}</p>
        {replyClicked && 
          <ReplyFormContainer 
            parent={comment._id}
            recipe={comment.recipe}
            setCommentsLoaded={setCommentsLoaded}
          />
        }
        <ReplyButton onClick={handleReplyClick}>{replyClicked ? 'Close' : 'Reply'}</ReplyButton>
      </CommentRow>
      {nestedComments}
    </div>
  )
}

function CommentBox(props) {
  const [comments, setComments] = useState(props.comments);
  // const generateComments = () => {
  //   let allComments = [];
  //   props.topComments.map((comment, i) => {
  //     return allComments.push(
  //       <CommentRow key={i}>
  //         <div className="comment-info">
  //           <span className="comment-name">{comment.name.toUpperCase()}</span>
  //           <span className="comment-date">{comment.dateFormatted}</span>
  //         </div>
  //         <p className="comment-content">{comment.content}</p>
  //       </CommentRow>
  //     )
  //   })
  //   console.log(props.comments);
  //   props.topComments.map(comment => {
  //     return (
  //       <>
  //         <h1>hey</h1>
  //         <Comment key={comment._id} comment={comment} comments={props.comments}/>
  //       </>
  //     )

  //   })
  //   return allComments;
  // }
  return (
    <Wrapper>
      <H2>Comments</H2>
      {/* <div>{
        props.topComments.length === 0 ?
          '- No comments yet -' :

          generateComments()}
      </div> */}
      <div>
        {
          props.topComments.map((comment, i) => {
            let margin = 15;
            return (
              <Comment key={comment._id} setCommentsLoaded={props.setCommentsLoaded} comment={comment} comments={comments} i={i} margin={margin}/>
            )
          })
        }
      </div>
    </Wrapper>
  )
}

export default CommentBox;