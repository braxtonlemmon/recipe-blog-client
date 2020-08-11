import React, { useState, useEffect } from 'react';
import CommentBox from './CommentBox';
import CommentFormContainer from './CommentFormContainer';
import PropTypes from 'prop-types';
import CommentsLoader from './CommentsLoader';

function Comments({ mongodb_id, handleNewRating }) {
  const [comments, setComments] = useState([]);
  const [topComments, setTopComments] = useState([]);
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  useEffect(() => {
    // const abortController = new AbortController();

    // fetch(`https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/comments/${mongodb_id}`, { signal: abortController.signal })
        fetch(
          `https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/comments/${mongodb_id}`,
        )
          .then(result => result.json())
          .then(data => {
            const topLevel = data.data.filter(comment => comment.level === 0)
            setTopComments(topLevel)
            setComments(data.data)
          })
          .then(() => setCommentsLoaded(true))
          .catch(err => console.error("Request failed", err))
      // return () => abortController.abort();
  }, [commentsLoaded, mongodb_id])
  
  return (
      <>
        <CommentFormContainer
          mongodb_id={mongodb_id}
          setCommentsLoaded={setCommentsLoaded}
          handleNewRating={handleNewRating}
        />
        {/* { commentsLoaded &&  */}
          <CommentBox
            id="comment-box"
            comments={comments}
            topComments={topComments}
            setCommentsLoaded={setCommentsLoaded}
            commentsLoaded={commentsLoaded}
          />
        {/* } */}
      </>
    )
}

Comments.propTypes = {
  mongodb_id: PropTypes.string,
  handleNewRating: PropTypes.func
}

export default Comments;