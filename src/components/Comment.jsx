import React, { useState } from 'react';
import styled from 'styled-components';
import ReplyFormContainer from './ReplyFormContainer';
import PropTypes from 'prop-types';
import Button from './Button';

const CommentRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  padding: 15px;
  padding-bottom: 30px;
  /* background: rgba(247, 191, 247, 0.78); */
  background: ${props => props.fromAdmin ? '#5962356e' : '#cdcbd640'};
  /* background: white; */
  /* background: #cdcbd680; */
  box-shadow: -2px 2px 2px lightgrey;
  /* box-shadow: 0 0 6px lightgrey; */
  z-index: 500;
  margin: 15px 0;
  margin-left: ${props => props.margin}px;
  border-radius: 8px;
  transition: all 5s ease;
  .comment-info {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10px;
  }
  .comment-name {
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

const ReplyButton = styled(Button)`
  position: absolute;
  left: 40%;
  /* right: 10px; */
  bottom: 10px;
  padding: 3px;
  /* margin-top: 20px; */
  background: #cdcbd680;
  border: 1px solid black;
  border-radius: 0;
  text-transform: uppercase;
  color: black;
  /* background: transparent;
  color: black;
  font-size: 1.2em; */
  `;

function Comment({ comment, comments, margin, setCommentsLoaded }) {
  const [replyClicked, setReplyClicked] = useState(false);

  const handleReplyClick = () => {
    setReplyClicked(!replyClicked);
  }

  const children = comments.filter(comm => comm.parent === comment._id);
  const nestedComments = (children || []).map(comment => {
    return (
      <Comment 
        key={comment._id} 
        setCommentsLoaded={setCommentsLoaded} 
        comment={comment} margin={margin + 15} 
        comments={comments} type="child" 
      />)
  })

  return (
    <div>
      <CommentRow
        margin={margin}
        key={comment._id}
        id={comment._id}
        fromAdmin={comment.fromAdmin}
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

Comment.propTypes = {
  comment: PropTypes.object,
  comments: PropTypes.array,
  margin: PropTypes.number,
  setCommentsLoaded: PropTypes.func,
}

export default Comment;