/* eslint-disable no-undef */
import React, { useState, useRef } from "react"
import CommentFormComponent from "./CommentFormComponent"
import PropTypes from "prop-types"
import sanityClient from "@sanity/client"

function CommentFormContainer({
  setCommentsLoaded,
  setRatingsLoaded,
  handleNewRating,
  recipe,
}) {
  const commentRef = useRef(null)
  const [selected, setSelected] = useState(5)
  const [commentOkay, setCommentOkay] = useState(true)
  const [data, setData] = useState({
    name: "",
    content: "",
  })

  const handleOptionChange = value => {
    setSelected(value)
  }

  const handleChange = e => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }

  const handleSubmit = (e, level) => {
    e.preventDefault()
    if (data.content.length < 1 || data.content.length > 1000) {
      setCommentOkay(false)
      return
    }
    setCommentOkay(true)
    const client = sanityClient({
      projectId: process.env.GATSBY_SANITY_PROJECT_ID,
      dataset: process.env.GATSBY_SANITY_DATASET,
      apiVersion: "2022-01-01",
      token: process.env.GATSBY_SANITY_TOKEN,
    })

    // Create a new comment
    client
      .create({
        _type: "comment",
        name: data.name,
        content: data.content,
        level: level,
        fromAdmin: false,
        answered: false,
        recipe: {
          _type: "reference",
          _ref: recipe,
        },
      })
      .then(() => {
        setData({ name: "", content: "" })
        setCommentsLoaded(false)
        setRatingsLoaded(false)
      })
      .catch(err => {
        throw new Error(`There was a problem creating comment: ${err.message}`)
      })

    // Submit new rating
    client
      .patch(recipe)
      .setIfMissing({ ratings: [] })
      .append("ratings", [selected])
      .commit()
      .catch(err => {
        throw new Error(`There was a problem submitting rating: ${err.message}`)
      })
      .finally(() => {
        setSelected(5)
        handleNewRating()
      })
  }

  return (
    <CommentFormComponent
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      data={data}
      selected={selected}
      handleOptionChange={handleOptionChange}
      commentOkay={commentOkay}
      commentRef={commentRef}
    />
  )
}

CommentFormContainer.propTypes = {
  setCommentsLoaded: PropTypes.func,
  handleNewRating: PropTypes.func,
}

export default CommentFormContainer
