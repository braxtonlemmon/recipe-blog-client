/* eslint-disable no-undef */
import React, { useEffect, useState } from "react"
import CommentBox from "./CommentBox"
import CommentFormContainer from "./CommentFormContainer"
import PropTypes from "prop-types"

function Comments({
  handleNewRating,
  comments,
  commentsLoaded,
  setCommentsLoaded,
  setRatingsLoaded,
  recipe,
}) {
  const [topComments, setTopComments] = useState([])

  useEffect(() => {
    const getDate = date => new Date(date)
    if (comments) {
      const topLevel = comments
        .filter(comment => comment.level === 0)
        .sort((a, b) => getDate(b._createdAt) - getDate(a._createdAt))
      setTopComments(topLevel)
    }
  }, [comments])

  
  return (
    <>
      <CommentFormContainer
        setCommentsLoaded={setCommentsLoaded}
        setRatingsLoaded={setRatingsLoaded}
        handleNewRating={handleNewRating}
        recipe={recipe}
      />
      <CommentBox
        id="comment-box"
        comments={comments}
        topComments={topComments}
        setCommentsLoaded={setCommentsLoaded}
        commentsLoaded={commentsLoaded}
      />
    </>
  )
}

Comments.propTypes = {
  handleNewRating: PropTypes.func,
}

export default Comments
