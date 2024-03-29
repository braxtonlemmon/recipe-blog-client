import React, { useState } from "react"
import styled from "styled-components"
import ReplyFormContainer from "./ReplyFormContainer"
import PropTypes from "prop-types"
import Button from "./Button"

const CommentRow = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  padding: 15px;
  padding-bottom: 30px;
  background: ${props =>
    props.fromAdmin ? "${props => props.theme.colors.medium}6e" : "#cdcbd640"};
  box-shadow: -2px 2px 2px lightgrey;
  z-index: 500;
  margin: 15px 0;
  margin-left: ${props => props.margin}px;
  border-radius: 8px;
  transition: all 5s ease;
  .comment-info {
    display: flex;
    flex-direction: column;
    display: grid;
    grid-auto-flow: row;
    gap: 2px;
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
    margin: 5px 10px 20px 10px;
    align-self: center;
    text-align: justify;
  }
  .comment-reply {
    height: 20px;
    width: 100%;
    border: 1px solid black;
  }
`

const ReplyButton = styled(Button)`
  position: absolute;
  right: 10px;
  bottom: 10px;
  margin-top: 20px;
  padding: 4px 5px;
`

const CloseButton = styled.div`
  font-size: 1em;
  position: absolute;
  right: 10px;
  bottom: 10px;
  margin-top: 20px;
  display: flex;
  cursor: pointer;
  text-align: center;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: 30px;
  padding: 4px 4px 5px 5px;
  border-radius: 50%;
  color: ${props => props.theme.colors.dark};
  background: rgba(0, 0, 0, 0.2);
  &:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`

function Comment({ comment, comments, margin, setCommentsLoaded }) {
  const [replyClicked, setReplyClicked] = useState(false)

  const handleReplyClick = () => {
    setReplyClicked(!replyClicked)
  }

  const getFormattedDate = date => {
    const months = {
      1: "January",
      2: "February",
      3: "March",
      4: "April",
      5: "May",
      6: "June",
      7: "July",
      8: "August",
      9: "September",
      10: "October",
      11: "November",
      12: "December",
    }
    if (date) {
      const splitDate = date.split(/[-T]+/)
      const year = splitDate[0]
      const month = months[parseInt(splitDate[1])]
      const day = splitDate[2]
      return `${month} ${day}, ${year}`
    }
    return ""
  }
  const children = comments.filter(
    comm => comm.parent?._ref && comm.parent._ref === comment._id
  )
  const nestedComments = (children || []).map(comment => {
    return (
      <Comment
        key={comment._id}
        setCommentsLoaded={setCommentsLoaded}
        comment={comment}
        margin={margin + 15}
        comments={comments}
        type="child"
      />
    )
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
          <span className="comment-date">
            {comment._createdAt ? getFormattedDate(comment._createdAt) : ""}
          </span>
        </div>
        <p className="comment-content">{comment.content}</p>
        {replyClicked && (
          <ReplyFormContainer
            parent={comment._id}
            recipe={comment.recipe._ref}
            setCommentsLoaded={setCommentsLoaded}
          />
        )}
        {replyClicked ? (
          <CloseButton onClick={handleReplyClick}>x</CloseButton>
        ) : (
          <ReplyButton onClick={handleReplyClick}>Reply</ReplyButton>
        )}
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

export default Comment
