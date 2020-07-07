import React from 'react';
import styled from 'styled-components';
import { H2 } from './Headings';
import Comment from './Comment';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0;
  border-top: 5px solid #2f3020;
  align-items: center;
  width: 100%;
  z-index: 501;
  background: white;
  /* max-width: 900px; */
  grid-area: commentBox;
`;

const List = styled.div`
  width: 95%;
  max-width: 600px;
`

function CommentBox({ comments, topComments, setCommentsLoaded}) {
  if (topComments.length < 1) {
    return (
      <Wrapper>
        <p>No comments yet . . . What did you think??</p>
      </Wrapper>
    )
  } else {
  return (
    <Wrapper>
      <H2>Comments</H2>
      <List>
        {
          topComments.map((comment, i) => {
            let margin = 15;
            return (
              <Comment 
                key={comment._id} 
                setCommentsLoaded={setCommentsLoaded} 
                comment={comment} 
                comments={comments} 
                margin={margin}/>
            )
          })
        }
      </List>
    </Wrapper>
  )
}
}

CommentBox.propTypes = {
  topComments: PropTypes.array,
  comments: PropTypes.array,
  setCommentsLoaded: PropTypes.func
}

export default CommentBox;
