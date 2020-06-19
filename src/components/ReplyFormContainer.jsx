import React, { useState } from 'react';
import ReplyFormComponent from './ReplyFormComponent';

function ReplyFormContainer({ parent, recipe, setCommentsLoaded }) {
  const [data, setData] = useState({
    name: '',
    content: '',
    parent: parent,
    recipe: recipe,
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
        recipe: data.recipe,
        parent: data.parent,
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
    <ReplyFormComponent
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      data={data}
    />
  )
}

export default ReplyFormContainer;