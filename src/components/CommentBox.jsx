import React from 'react';
import styled from 'styled-components';
import { H2 } from './Headings';
import Comment from './Comment';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  border-top: 5px solid black;
  align-items: center;
  width: 80%;
  max-width: 900px;
  grid-area: commentBox;
`;

function CommentBox({ comments, topComments, setCommentsLoaded}) {
  return (
    <Wrapper>
      <H2>Comments</H2>
      <div>
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
      </div>
    </Wrapper>
  )
}

CommentBox.propTypes = {
  topComments: PropTypes.array,
  comments: PropTypes.array,
  setCommentsLoaded: PropTypes.func
}

export default CommentBox;
