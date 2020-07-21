import React, { useState } from 'react';
import CommentFormComponent from './CommentFormComponent';
import PropTypes from 'prop-types';

function CommentFormContainer({ mongodb_id, setCommentsLoaded }) {
  const [selected, setSelected] = useState(5);
  const [data, setData] = useState({
    name: '',
    content: '',
  });

  const handleOptionChange = (value) => {
    setSelected(value);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  const handleSubmit = (e, level) => {
    e.preventDefault();
    if (data.content.length < 1 || data.content.length > 1000) {
      return alert('wrongo');
    }
    
    fetch('https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/comments', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        content: data.content,
        recipe: mongodb_id,
        level: level,
        fromAdmin: false,
        answered: false
      })
    })
    .then(response => {
      if (response.ok && response.status === 200) {
        setData({ name: '', content: '' });
        setCommentsLoaded(false);
        return response.json();
      }
      throw new Error('Network response was not okay');
    })
    .catch(err => console.log(err.message));

    fetch(
      `https://cauk2n799k.execute-api.eu-west-1.amazonaws.com/dev/api/recipes/${mongodb_id}/ratings`,
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: selected
        }),
      })
      .then(response => {
        if (response.ok && response.status === 200) {
          setSelected(5);
          return response.json()
        }
        throw new Error("Network response was not okay")
      })
      .catch(err => console.log(err.message))

  }

  return (
    <CommentFormComponent
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      data={data}
      selected={selected}
      handleOptionChange={handleOptionChange}
    />
  )
}

CommentFormContainer.propTypes = {
  mongodb_id: PropTypes.string,
  setCommentsLoaded: PropTypes.func,
}

export default CommentFormContainer;