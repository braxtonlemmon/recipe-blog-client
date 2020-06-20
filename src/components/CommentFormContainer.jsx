import React, { useState } from 'react';
import CommentFormComponent from './CommentFormComponent';
import PropTypes from 'prop-types';

function CommentFormContainer({ mongodb_id, setCommentsLoaded }) {
  const [data, setData] = useState({
    name: '',
    content: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const handleSubmit = (e, level) => {
    e.preventDefault();
    if (data.content.length < 1 || data.content.length > 1000) {
      return alert('wrongo');
    }
    setData({ name: '', content: '' });
    // fetch('/api/comments/', {
    fetch(`http://localhost:4000/dev/api/comments/`, {

    // fetch('https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/comments', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        content: data.content,
        recipe: mongodb_id,
        level: level
      })
    })
      .then(response => {
        if (response.ok && response.status === 200) {
          setCommentsLoaded(false);
          return response.json();
        }
        throw new Error('Network response was not okay');
      })
      .catch(err => console.log(err.message));
  }

  return (
    <CommentFormComponent
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      data={data}
    />
  )
}

CommentFormContainer.propTypes = {
  mongodb_id: PropTypes.string,
  setCommentsLoaded: PropTypes.func,
}

export default CommentFormContainer;